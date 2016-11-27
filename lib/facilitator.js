'use strict';

const yargs = require('yargs');

module.exports = {
  facilitate () {
    return yargs.argv;
  },

  prepare () {
    yargs.usage(
        'Usage: test-cat [options]',
      {
        'test-dir': {
          description: 'Directory to search',
          required: true,
          alias: 't',
          default: 'test',
          nargs: 1
        },
        'output': {
          description: 'Output file',
          required: true,
          alias: 'o',
          nargs: 1
        },
        'framework': {
          description: 'Testing framework to search for',
          required: true,
          alias: 'f',
          default: 'mocha',
          nargs: 1
        },
        'root-dir': {
          description: 'sub directory to use as root dir in output',
          required: false,
          alias: 'k',
          nargs: 1
        },
        'sort': {
          description: 'Sort test files',
          required: false,
          alias: 's',
          default: true,
          nargs: 0
        },
        'randomize': {
          description: 'Randomize test files',
          required: false,
          alias: 'r',
          default: false,
          nargs: 0
        },
        'dry-run': {
          description: 'Performs a dry run; does not output file',
          required: false,
          alias: 'd',
          default: false,
          nargs: 0
        },
        'quiet': {
          description: 'Does not output any text',
          required: false,
          alias: 'q',
          default: false,
          nargs: 0
        }
      }
      )
      .strict()
      .help('h')
      .alias('help', 'h');
  }
};
