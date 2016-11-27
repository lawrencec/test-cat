const hugs = require('hugs');
const test = hugs(require('mocha'));
const assert = test.assert;
const stub = test.stub;
const logger = require('../../lib/logger');

test.beforeEach(() => {
  logger.quiet = false;
});

test(
  'logs warn messages correctly',
  () => {
    stub(console, 'log');
    logger.warn('message');
    assert.callCount(console.log, 1);
    assert.calledWith(console.log, '\u001b[33mmessage\u001b[39m');
  }
);

test(
  'does not log warn messages when in quiet mode',
  () => {
    logger.quiet = true;
    stub(console, 'log');
    logger.warn('message');
    assert.callCount(console.log, 0);
  }
);

test(
  'logs error messages correctly',
  () => {
    stub(console, 'log');
    logger.error('message');
    assert.callCount(console.log, 1);
    // assert.include(console.log.firstCall.args[0], 'messssage');
    assert.calledWith(console.log, '\u001b[31mmessage\u001b[39m');
  }
);

test(
  'does not log error messages when in quiet mode',
  () => {
    logger.quiet = true;
    stub(console, 'log');
    logger.error('message');
    assert.callCount(console.log, 0);
  }
);

test(
  'logs info messages correctly',
  () => {
    stub(console, 'log');
    logger.info('message');
    assert.callCount(console.log, 1);
    assert.calledWith(console.log, '\u001b[35mmessage\u001b[39m');
  }
);

test(
  'does not log info messages when in quiet mode',
  () => {
    logger.quiet = true;
    stub(console, 'log');
    logger.info('message');
    assert.callCount(console.log, 0);
  }
);

test(
  'logs log messages correctly',
  () => {
    stub(console, 'log');
    logger.log('message');
    assert.callCount(console.log, 1);
    assert.calledWith(console.log, 'message');
  }
);

test(
  'does not log log messages when in quiet mode',
  () => {
    logger.quiet = true;
    stub(console, 'log');
    logger.log('message');
    assert.callCount(console.log, 0);
  }
);
