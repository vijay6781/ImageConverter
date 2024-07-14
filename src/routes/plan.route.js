const express = require("express");
const aws = require("aws-sdk");
const { isWbAuthorization, csvValidator } = require("../middlewares/auth");
const controller = require("../controllers/plan.controller");
const { upload } = require("../utils");
const pimController = require("../controllers/pim.controller");

const router = express.Router();
aws.config.update({
  secretAccessKey: process.env.secretAccessKey,
  accessKeyId: process.env.accessKeyId,
  region: process.env.region,
});

/**
 * @swagger
 * /engage/plan/upload/csv:
 *   post:
 *     summary: Upload plan image
 *     tags: [GFC]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "200":
 *         description: Ok
 */

router.post(
  "/upload/csv",
  upload.single("file"),
  csvValidator,
  controller.uploadCSV
);

router.get("/status/id/:id", controller.checkStatus);

// /**
//  * @swagger
//  * /engage/plan/bin/all/delete:
//  *   delete:
//  *     security:
//  *       - bearerAuth: []
//  *     summary: plan delete from bin
//  *     tags: [GFC]
//  *     responses:
//  *       "200":
//  *         description: Ok
//  */

// router.delete('/bin/all/delete', isWbAuthorization, controller.deleteAllFromBin);
// router.get('/pim/v1/cad/wdr/all', isWbAuthorization, pimController.allDetails);

module.exports = router;
