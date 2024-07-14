/* eslint-disable security/detect-non-literal-fs-filename */
const multer = require('multer');
const fs = require('fs');

const dir = './files';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: fileStorageEngine });

module.exports = upload;
