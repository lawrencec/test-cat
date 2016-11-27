const hugs = require('hugs');
const test = hugs(require('mocha'));
const assert = test.assert;
const stub = test.stub;
const fs = require('fs');
const writer = require('../../lib/writer');
const logger = require('../../lib/logger');

test(
  'writes file correctly',
  () => {
    stub(logger, 'info');
    stub(fs, 'writeFileSync');

    writer.write(
      'specs.js',
      'someoutput'
    );
    assert.calledWith(logger.info, 'Writing to specs.js');
    assert.calledWith(fs.writeFileSync, 'specs.js', 'someoutput');
  }
);
