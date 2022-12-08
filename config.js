const env = process.env.NODE_ENV || "development";

// const credentials = require(`./.credentials.${env}`);
const credentials = require('./credentials');

module.exports = { credentials };
