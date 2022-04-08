const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const { nanoid } = require('nanoid');
const config = require('./config');

const tryToCreateDir = async dirName => {
  const dirPath = path.join(config.uploadPath, dirName);

  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, {recursive: true});
  }
};

const createMulter = dirName => {
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      await tryToCreateDir(dirName);

      cb(null, config.uploadPath);
    },
    filename: async (req, file, cb) => {
      const filename = nanoid() + path.extname(file.originalname);
      const filepath = path.join(dirName, filename);

      cb(null, filepath);
    }
  });

  return multer({storage});
};

const avatars = createMulter('avatars');

module.exports = {
  avatars,
};
