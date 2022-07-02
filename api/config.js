const path = require('path');

const rootPath = __dirname;

let port = 8000;
let dbUrl = 'mongodb://localhost/exam13';

if (process.env.NODE_ENV === 'test') {
  dbUrl = 'mongodb://localhost/exam13-test';
  port = 8010;
}

module.exports = {
  port,
  corsWhiteList: [
    'http://localhost:4200',
    'https://localhost:4200',
    'http://localhost:4210',
    'https://localhost:4210',
  ],
  rootPath,
  uploadPath: path.join(rootPath, 'public'),
  mongo: {
    db: dbUrl,
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId: '',
    appSecret: '',
  },
};