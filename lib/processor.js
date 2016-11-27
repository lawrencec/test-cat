'use strict';

const logger = require('./logger');
const path = require('path');
const shuffle = require('lodash.shuffle');

function normalizeFilePath (testDir, subDirToUseAsRoot, file) {
  return ((testDir !== subDirToUseAsRoot)
              ? file.slice(file.indexOf(subDirToUseAsRoot))
              : `${testDir}${path.sep}${file}`
         ).replace('.js', '');
}

function removeFilesThatAreOutsideOfSubDir (testDir, subDirToUseAsRoot, result) {
  return testDir === subDirToUseAsRoot || result.file.indexOf(subDirToUseAsRoot) !== -1;
}

function processResults (testDir, results, subDirToUseAsRoot, shouldRandomise, shouldSort) {
  logger.info('Processing results');

  let processedResults = results
    .filter((result, pos) => {
      return results.indexOf(result) === pos && removeFilesThatAreOutsideOfSubDir(testDir, subDirToUseAsRoot, result);
    })
    .map((result) => {
      return normalizeFilePath(testDir, subDirToUseAsRoot, result.file);
    }
  );
  processedResults = Array.from(new Set(processedResults));
  if (shouldSort !== false) {
    logger.info('    Sorting...');
    processedResults = processedResults.sort();
  }
  if (shouldRandomise) {
    logger.info('    Randomising...');
    processedResults = shuffle(processedResults);
  };

  return processedResults;
}

module.exports = {
  process: processResults
};
