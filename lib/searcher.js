'use strict';

const TextSearch = require('rx-text-search');
const logger = require('./logger');

module.exports = {
  find: (testDir, framework) => {
    logger.info('Searching...');

    const searchString = (framework === 'mocha') ? 'it' : 'test';
    return TextSearch.findAsPromise(`${searchString}\\(`, '**/*.js', {cwd: testDir});
  }
};
