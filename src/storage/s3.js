/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require('fs');
const { uuid } = require('uuidv4');
const { getDefaultRoleAssumerWithWebIdentity } = require('@aws-sdk/client-sts');
const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const S3 = require('aws-sdk/clients/s3');
const axios = require('axios').default;
const config = require('../../config/env');

const provider = defaultProvider({
  roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(),
});

const s3 = new S3({ credentialDefaultProvider: provider });
const s3RootPath = '/leads/attachments';

const uploadFile = async ({ name, data, path, ACL = 'public-read', ContentType, subDir, rootPath = s3RootPath }) => {
  let fileData;
  if (path) {
    fileData = fs.readFileSync(path);
  }
  const extension = name.split('.').pop();
  const fileName = extension ? `${uuid()}.${extension}` : uuid();

  const result = await s3
    .upload({
      Bucket: `${config.aws.s3.bucketName}${rootPath}${subDir}`,
      Body: data || fileData,
      Key: fileName,
      ACL,
      ContentType,
    })
    .promise()
    // eslint-disable-next-line no-console
    .catch((error) => console.error(error));

  if (path) {
    fs.unlinkSync(path);
  }

  return { ...result, url: `${config.aws.s3.endpoint}/${result.Key}` };
};

const downloadImage = async (url) => {
  const res = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  return res.data;
};

module.exports = {
  uploadFile,
  downloadImage,
};
