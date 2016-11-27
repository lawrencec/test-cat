#!/usr/bin/env node

'use strict';

const facilitator = require('./lib/facilitator');
const logger = require('./lib/logger');
const searcher = require('./lib/searcher');
const generator = require('./lib/generator');
const processor = require('./lib/processor');
const writer = require('./lib/writer');

facilitator.prepare();
const args = facilitator.facilitate();
const testDir = args.testDir;
const framework = args.framework;
const outputFile = args.output;
const isDryRun = args.dryRun;
const shouldSort = args.sort;
const shouldRandomise = args.randomize;
const quietMode = args.quiet;
const subDirToUseAsRoot = (
  typeof (args.rootDir) === 'string'
) ? args.rootDir : testDir;

if (quietMode) {
  logger.quiet = true;
}

module.exports = searcher.find(testDir, framework)
  .then((results) => {
    const output = generator.generate(
      processor.process(testDir, results, subDirToUseAsRoot, shouldRandomise, shouldSort)
    );
    if (!isDryRun) {
      writer.write(outputFile, output);
    } else {
      logger.warn('In dry run mode; file is *not* saved.');
    }
  })
  .catch((err) => {
    logger.error('ARGH! test-cat encountered an error and could not continue.');
    logger.error(err);
  }
);

