/**
 * This file is used for migration only
 */

const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const { Signer } = require('@aws-sdk/rds-signer');

const dotenvData = dotenv.config({ path: path.join(__dirname, `../.env`) });

if (dotenvData.error) {
  throw dotenvData.error;
}

let envs = dotenvData.parsed;

const secretsManagerClient = new SecretsManagerClient({
  region: process.env.AWS_REGION,
});

module.exports = {
  username: envs.DB_USERNAME || '',
  database: envs.DB_NAME || '',
  hooks: {
    beforeConnect: async (config) => {
      if (envs.AWS_SECRETSMANAGER_ENTRY) {
        const command = new GetSecretValueCommand({
          SecretId: envs.AWS_SECRETSMANAGER_ENTRY,
        });

        let keys = (await secretsManagerClient.send(command)).SecretString;
        keys = dotenv.parse(Buffer.from(keys));

        envs = keys;
      }

      const signer = new Signer({
        hostname: envs.DB_HOST,
        port: envs.DB_PORT,
        username: envs.DB_USERNAME,
        region: envs.DB_REGION,
      });

      // eslint-disable-next-line no-param-reassign
      config.password = await signer.getAuthToken();

      config.username = envs.DB_USERNAME;
      config.database = envs.DB_NAME;
      config.host = envs.DB_HOST;
      config.port = envs.DB_PORT;
      config.region = envs.DB_REGION;
      config.dialect = envs.DB_DIALECT;
      config.dialectOptions = {
        ssl: {
          ca: fs.readFileSync(path.resolve(envs.DB_CERT)).toString(),
        },
      };
    },
  },
  host: envs.DB_HOST || '',
  port: envs.DB_PORT || '',
  region: envs.DB_REGION || '',
  dialect: envs.DB_DIALECT || 'postgres',
};
