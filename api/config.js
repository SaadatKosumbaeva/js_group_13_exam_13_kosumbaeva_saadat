const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public'),
  mongo: {
    db: 'mongodb://localhost/project-template',
    options: {useNewUrlParser: true},
  },
};