'use strict';

const hugs = require('hugs');
const test = hugs(require('mocha'));
const assert = test.assert;
const stub = test.stub;
const spy = test.spy;
const match = test.match;
const facilitator = require('../lib/facilitator');
const logger = require('../lib/logger');
const searcher = require('../lib/searcher');
const generator = require('../lib/generator');
const processor = require('../lib/processor');
const writer = require('../lib/writer');
const path = require('path');
const testCatModulePath = path.resolve(__dirname, '../index.js');

test.beforeEach(() => {
  delete require.cache[testCatModulePath];
});

test(
  'finds relevant files and outputs to file correctly',
  () => {
    stub(facilitator, 'facilitate').returns({
      testDir: 'test/fixtures',
      output: 'specsFile.js',
      framework: 'mocha',
      quiet: false,
      randomize: false,
      sort: true,
      dryRun: false
    });
    stub(logger, 'info');
    stub(generator, 'generate').returns('someoutput');
    spy(processor, 'process');
    stub(writer, 'write');
    spy(searcher, 'find');

    const testCat = require('../index');

    return testCat.finally(
      () => {
        assert.calledWith(searcher.find, 'test/fixtures', 'mocha');
        assert.calledWith(generator.generate, ['test/fixtures/subdir/nestedTest/nestedTest', 'test/fixtures/test']);
        assert.calledWithExactly(
          processor.process,
          'test/fixtures',
          match.array,
          'test/fixtures',
          false,
          true
        );
        assert.calledWith(writer.write, 'specsFile.js', 'someoutput');
      }
    );
  }
);

test(
  'when dryrun specified does not output to file',
  () => {
    stub(facilitator, 'facilitate').returns({
      testDir: 'test/fixtures',
      output: 'specsFile.js',
      framework: 'mocha',
      quiet: false,
      randomize: false,
      sort: true,
      dryRun: true
    });
    stub(logger, 'info');
    stub(logger, 'warn');
    stub(generator, 'generate').returns('someoutput');
    spy(processor, 'process');
    stub(writer, 'write');
    spy(searcher, 'find');

    const testCat = require('../index');

    return testCat.finally(
      () => {
        assert.calledWith(searcher.find, 'test/fixtures', 'mocha');
        assert.calledWith(generator.generate, ['test/fixtures/subdir/nestedTest/nestedTest', 'test/fixtures/test']);
        assert.calledWithExactly(
          processor.process,
          'test/fixtures',
          match.array,
          'test/fixtures',
          false,
          true
        );
        assert.callCount(writer.write, 0);
        assert.calledWith(logger.warn, 'In dry run mode; file is *not* saved.');
      }
    );
  }
);

test(
  'should log error when there is one',
  () => {
    stub(facilitator, 'facilitate').returns({
      testDir: 'test/fixtures',
      output: 'specsFile.js',
      framework: 'mocha',
      quiet: false,
      randomize: false,
      sort: false,
      dryRun: true,
      rootDir: 'test/fixtures'
    });
    stub(logger, 'info');
    stub(logger, 'error');
    stub(generator, 'generate').throws(new Error('error output'));
    spy(processor, 'process');
    stub(writer, 'write');
    spy(searcher, 'find');

    const testCat = require('../index');

    return testCat.finally(
      () => {
        assert.calledWith(searcher.find, 'test/fixtures', 'mocha');
        assert.calledWith(generator.generate, ['test/fixtures/subdir/nestedTest/nestedTest', 'test/fixtures/test']);
        assert.calledWithExactly(
          processor.process,
          'test/fixtures',
          match.array,
          'test/fixtures',
          false,
          false
        );
        assert.callCount(writer.write, 0);
        assert.calledWithExactly(logger.error, match('ARGH! TestCat encountered an error and could not continue.'));
        assert.calledWith(logger.error, new Error('error output'));
      }
    );
  }
);

test(
  'enable quiet mode',
  () => {
    stub(facilitator, 'facilitate').returns({
      quiet: true
    });
    require('../index');
    assert.callCount(facilitator.facilitate, 1);
    assert.equal(logger.quiet, true);
  }
);
