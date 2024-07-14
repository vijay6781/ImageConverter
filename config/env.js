const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const fs = require('fs');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

const sortingPettern = ['Budget', 'Premium', 'Luxury'];
const defaultPackage = 'Budget';

dotenv.config({ path: path.join(__dirname, `../.env`) });

const secretsManagerClient = new SecretsManagerClient({
  region: process.env.AWS_REGION,
});

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('prod', 'dev', 'uat', 'test').required(),
    PORT: Joi.number().default(3000),
    DB_SYNC: Joi.string().valid('true', 'false').allow('').optional().description('DB Sync'),
    DB_HOST: Joi.string().required().description('DB Host'),
    DB_USERNAME: Joi.string().required().description('DB Username'),
    DB_NAME: Joi.string().required().description('DB Name'),
    DB_PORT: Joi.string().required().description('DB Port'),
    DB_REGION: Joi.string().required().description('DB Region'),
    DB_DIALECT: Joi.string().required().description('DB dialect'),
    AWS_BUCKET_NAME: Joi.string().required().description('S3 Bucket name'),
    AWS_S3_ENDPOINT: Joi.string().required().description('S3 Endpoint'),
    EXTERNAL_URL: Joi.string().required().description('External url'),
  })
  .unknown();

const envs = {};

const setEnvs = (keys = {}) => {
  const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(keys);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  Object.assign(envs, {
    env: process.env.NODE_ENV,
    port: envVars.PORT,
    serverDomain: envVars.SERVER_DOMAIN,
    pimcore: {
      url: envVars.PIM_CORE_BASE_API_URL,
    },
    database: {
      dbSync: envVars.DB_SYNC === 'true',
    },
    development: {
      username: envVars.DB_USERNAME,
      database: envVars.DB_NAME,
      host: envVars.DB_HOST,
      port: envVars.DB_PORT,
      region: envVars.DB_REGION,
      dialect: envVars.DB_DIALECT,
      logging: true,
      dialectOptions: {
        ssl: {
          ca: fs.readFileSync(path.resolve(envVars.DB_CERT)).toString(),
        },
      },
    },
    api: {
      url: envVars.API_URL,
      externalUrl: envVars.EXTERNAL_URL,
      domainUrl: envVars.DYNAMIC_URL,
      xApiKey: envVars.DYNAMIC_URL_ACCESS_KEY,
    },
    aws: {
      s3: {
        bucketName: envVars.AWS_BUCKET_NAME,
        endpoint: envVars.AWS_S3_ENDPOINT,
      },
      sqs: envVars.AWS_SQS_URL,
    },
    sortingPettern,
    defaultPackage,
    moodboardSearch: {
      cutoff: envVars.MOODBOARD_SEARCH_CUTOFF,
      marqoCutoff: envVars.MOODBOARD_MARQO_SEARCH_CUTOFF,
      interval: envVars.MOODBOARD_SEARCH_INDEX_INTERVAL,
      filtering: {
        tagFilter: envVars.MOODBOARD_TAG_FILTER_CUTOFF,
        nameFilter: envVars.MOODBOARD_NAME_FILTER_CUTOFF,
        projectFilter: envVars.MOODBOARD_PROJECT_FILTER_CUTOFF,
      },
      sorting: {
        tagIndex: envVars.MOODBOARD_TAG_SIMILARITY_INDEX,
        nameIndex: envVars.MOODBOARD_NAME_SIMILARITY_INDEX,
        projectIndex: envVars.MOODBOARD_PROJECT_SIMILARITY_INDEX,
      },
    },
    redisConfig: {
      host: envVars.REDIS_HOST,
      port: envVars.REDIS_PORT,
      disable: envVars.REDIS_CONFIG_DISABLE,
    },
  });

  return envs;
};

module.exports = envs;
module.exports.init = async () => {
  if (envs?.env) {
    return envs;
  }

  if (process.env.AWS_SECRETSMANAGER_ENTRY) {
    const command = new GetSecretValueCommand({
      SecretId: process.env.AWS_SECRETSMANAGER_ENTRY,
    });

    let keys = (await secretsManagerClient.send(command)).SecretString;
    keys = dotenv.parse(Buffer.from(keys));

    return setEnvs(keys);
  }

  return setEnvs(process.env);
};
