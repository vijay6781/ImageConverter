const httpStatus = require("http-status");
const fs = require("fs");
const csv = require("csv-parser");
const { default: axios } = require("axios");
const { api } = require("../../config/env");
const { getLayoutExtToken } = require("../manager/service/Lead");
/**
 * Route authentication middleware to verify a token
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 *
 */
// module.exports.isWbAuthorization = function (req, res, next) {
//   axios
//     .get(`${api.url}/auth/v1/wb/verifytoken`, {
//       headers: {
//         authorization: req.headers.authorization,
//       },
//     })
//     .then(async (s) => {
//       req.user = s.data;
//       next();
//     })
//     .catch((error) => {
//       if (error?.response?.status === 401) {
//         res.status(httpStatus.UNAUTHORIZED).send('Unauthorized');
//       } else {
//         res.status(error?.response?.status || httpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
//       }
//     });
// };

module.exports.csvValidator = function (req, res, next) {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      console.log("Parsed row:", data); // Log each parsed row
      results.push(data);
    })
    .on("end", () => {
      console.log("CSV Data:", results);
      req.csvData = results;
      next();
    })
    .on("error", (err) => {
      console.error("CSV Parsing Error:", err);
      res.status(400).json({ error: "Invalid CSV format" });
    });
};
