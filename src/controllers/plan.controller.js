const httpStatus = require("http-status");

const manager = require("../manager/plan.manager");

const uploadCSV = async function (req, res) {
  await manager
    .uploadCSV(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    });
};
const checkStatus = async function (req, res) {
  await manager
    .checkStatus(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    });
};

module.exports = {
  uploadCSV,
  checkStatus,
};
