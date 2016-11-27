'use strict';

const logger = require('./logger');
const cardinal = require('cardinal');
const jsBeautify = require('js-beautify').js_beautify;

function generate (processedResults) {
  logger.info('Generating file...');

  const fileContents = jsBeautify(
    `'use strict';

    define(${JSON.stringify(processedResults)});`,
    {
      'indent_size': 2,
      'wrap_line_length': 1
    }
  );

  logger.info('Here\'s the generated file contents...');
  logger.info('=====');
  logger.info(
    cardinal.highlight(
      fileContents,
      {
        linenos: true
      }
    )
  );
  logger.info('=====');

  return fileContents;
}

module.exports = {
  generate: generate
};
