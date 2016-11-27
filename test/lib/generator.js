const hugs = require('hugs');
const test = hugs(require('mocha'));
const assert = test.assert;
const stub = test.stub;
const generator = require('../../lib/generator');
const logger = require('../../lib/logger');

test(
  'generates js file contents correctly',
  () => {
    stub(logger, 'info');
    const fileContents = generator.generate(
      [
        'test/lib/generator.js',
        'test/lib/processor.js'
      ]
    );
    assert.equal(
      fileContents,
      '\'use strict\';\n\ndefine\n  (\n    [\n      "test/lib/generator.js",\n      "test/lib/processor.js"\n    ]\n  );'
    );
  }
);

test(
  'logs output correctly',
  () => {
    stub(logger, 'info');
    generator.generate(
      [
        'test/lib/generator.js',
        'test/lib/processor.js'
      ]
    );
    assert.equal(logger.info.getCall(0).args[0], 'Generating file...');
    assert.equal(logger.info.getCall(1).args[0], 'Here\'s the generated file contents...');
    assert.equal(logger.info.getCall(2).args[0], '=====');
    assert.equal(logger.info.getCall(3).args[0], '\u001b[90m1: \u001b[92m\'use strict\'\u001b[39m\u001b[90m;\u001b[39m\n\u001b[90m2: \n\u001b[90m3: \u001b[37mdefine\u001b[39m\n\u001b[90m4:   \u001b[90m(\u001b[39m\n\u001b[90m5:     \u001b[33m[\u001b[39m\n\u001b[90m6:       \u001b[92m"test/lib/generator.js"\u001b[39m\u001b[32m,\u001b[39m\n\u001b[90m7:       \u001b[92m"test/lib/processor.js"\u001b[39m\n\u001b[90m8:     \u001b[33m]\u001b[39m\n\u001b[90m9:   \u001b[90m)\u001b[39m\u001b[90m;\u001b[39m');
    assert.equal(logger.info.getCall(4).args[0], '=====');
  }
);
