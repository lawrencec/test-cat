'use strict';

const logger = require('./logger');
const fs = require('fs');

function write (outputFile, output) {
  logger.info(`Writing to ${outputFile}`);

  fs.writeFileSync(outputFile, output);
  logger.info(`File is saved at "${outputFile}"`);
}

module.exports = {
  write: write
};
