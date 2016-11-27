const hugs = require('hugs');
const test = hugs(require('mocha'));
const assert = test.assert;
const stub = test.stub;
const facilitator = require('../../lib/facilitator');
const yargs = require('yargs');

test(
  'generates command-line help correctly',
  () => {
    stub(yargs, 'usage').returnsThis();
    facilitator.prepare();
    assert.calledWith(
      yargs.usage,
      'Usage: test-cat [options]',
      {
        'dry-run': {
          alias: 'd',
          default: false,
          description: 'Performs a dry run; does not output file',
          nargs: 0,
          required: false
        },
        framework: {
          alias: 'f',
          default: 'mocha',
          description: 'Testing framework to search for',
          nargs: 1,
          required: true
        },
        output: { alias: 'o', description: 'Output file', nargs: 1, required: true },
        quiet: {
          alias: 'q',
          default: false,
          description: 'Does not output any text',
          nargs: 0,
          required: false
        },
        randomize: {
          alias: 'r',
          default: false,
          description: 'Randomize test files',
          nargs: 0,
          required: false
        },
        'root-dir': {
          alias: 'k',
          description: 'sub directory to use as root dir in output',
          nargs: 1,
          required: false
        },
        sort: {
          alias: 's',
          default: true,
          description: 'Sort test files',
          nargs: 0,
          required: false
        },
        'test-dir': {
          alias: 't',
          default: 'test',
          description: 'Directory to search',
          nargs: 1,
          required: true
        }
      }
    );
  }
);

test(
  'returns arguments correctly',
  () => {
    facilitator.prepare();
    yargs(
      [
        '--output', 'specsFile.js'
      ]
    );
    facilitator.facilitate();
  }
);
