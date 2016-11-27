const hugs = require('hugs');
const test = hugs(require('mocha'));
const assert = test.assert;
const spy = test.spy;
const stub = test.stub;
const TextSearch = require('rx-text-search');
const searcher = require('../../lib/searcher');
const logger = require('../../lib/logger');

test(
  'searches for js files correctly when framework is mocha',
  () => {
    stub(logger, 'info');
    spy(TextSearch, 'findAsPromise');

    return searcher.find(
      'test',
      'mocha'
    ).then(() => {
      assert.calledWith(
        TextSearch.findAsPromise,
        `it\\(`,
        '**/*.js',
        {cwd: 'test', nodir: true}
      );
      assert.calledWith(logger.info, 'Searching...');
    });
  }
);

test(
  'searches for js files correctly when framework is not mocha',
  () => {
    stub(logger, 'info');
    spy(TextSearch, 'findAsPromise');

    return searcher.find(
      'test',
      'ava'
    ).then(() => {
      assert.calledWith(
        TextSearch.findAsPromise,
        `test\\(`,
        '**/*.js',
        {cwd: 'test', nodir: true}
      );
      assert.calledWith(logger.info, 'Searching...');
    });
  }
);
