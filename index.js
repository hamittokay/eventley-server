require = require('esm')(module);
const dotenv = require('dotenv');

const config = dotenv.config();

if (config.error) {
  console.log(config.error);
}

module.exports = require('./src/app');
