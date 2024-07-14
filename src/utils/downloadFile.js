/* eslint-disable security/detect-non-literal-fs-filename */
const axios = require('axios').default;
const fs = require('fs');
const Path = require('path');

const downloadImage = async (url, name) => {
  let response;
  try {
    response = await axios.get(url, { responseType: 'stream', maxContentLength: 10 * 1024 * 1024 });
  } catch (error) {
    return null;
  }
  const contentType = response?.headers?.['content-type'];
  const path = Path.resolve(name);
  const writer = fs.createWriteStream(path);
  response.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });

  return contentType;
};

module.exports = { downloadImage };
