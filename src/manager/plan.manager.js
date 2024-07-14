const axios = require("axios");
const Jimp = require("jimp");
const fs = require("fs");
const planDbContext = require("../dbAccess/planDbContext");
const { S3 } = require("../storage");
const imageStorage = require("../../models/imageStorage");
const { imageStorage } = require("../../models");
const { where } = require("sequelize");

const checkStatus = async (req, res) => {
  const { requestId } = req.params;
  const result = await imageStorage.findOne({ where: { id: req.params.id } });
  if (result.rows.length) {
    res.json({ status: result.rows[0].status });
  } else {
    res.status(404).json({ error: "Request ID not found" });
  }
};
const uploadCSV = async (req, res) => {
  const data = req.csvData;
  const filePath = req.file.path;

  try {
    // Process each row asynchronously
    for (const row of data) {
      const urls = row["Input Image Urls"].split(",");
      console.log("urls", urls);

      const outputUrls = await Promise.all(
        urls.map(async (url) => {
          try {
            const { data: imageBuffer } = await axios({
              url,
              responseType: "arraybuffer",
            });
            const image = await Jimp.read(imageBuffer);
            image.quality(50);
            const processedImageBuffer = await image.getBufferAsync(
              Jimp.MIME_JPEG
            );

            let { filename: name, path, mimetype: ContentType } = req.file;
            const subDir = `/engage/test`;
            const result = await S3.uploadFile({
              name,
              data: processedImageBuffer,
              path,
              ContentType,
              subDir,
            });
            return result;
          } catch (err) {
            console.error(`Error processing image from URL ${url}:`, err);
            return null; // Continue processing other images
          }
        })
      );

      // Filter out null results from failed uploads
      const validOutputUrls = outputUrls.filter((url) => url !== null);

      await imageStorage.create({
        productName: row["Product Name"],
        imageUrls: validOutputUrls,
      });
    }

    // Update request status to completed
    // await pool.query('UPDATE requests SET status = $1 WHERE id = $2', ['completed', requestId]);

    res.status(200).json({ requestId });
  } catch (err) {
    console.error("Error processing CSV:", err);

    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Ensure the file is deleted after processing
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted:", filePath);
      }
    });
  }
};

module.exports = {
  uploadCSV,
  checkStatus,
};
