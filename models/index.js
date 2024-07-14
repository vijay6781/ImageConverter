/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-non-literal-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const { Signer } = require("@aws-sdk/rds-signer");

const Sequelize = require("sequelize");
const configFile = require("../config/env");
const imageStorage = require("./imageStorage");

const config = configFile.development;

const signer = new Signer({
  hostname: config.host,
  port: config.port,
  username: config.username,
  region: config.region,
});

const token = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const resp = await signer.getAuthToken();
    resolve(resp);
  });
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  token,
  config
);

const imageStorage = require("./imageStorage")(sequelize, Sequelize);

const db = {};
db.imageStorage = imageStorage;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Unable to connect to the database:", err);
  });

// if change anything in model then please uncomment the below line
// sequelize
//   .sync({
//     alter: true,
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = db;
