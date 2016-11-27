const hugs = require('hugs');
const test = hugs(require('mocha'));
const assert = test.assert;
const stub = test.stub;
const spy = test.spy;
const processor = require('../../lib/processor');
const logger = require('../../lib/logger');

test(
  'processes results correctly when test dir and subdir as root are the same',
  () => {
    stub(logger, 'info');
    const results = processor.process(
      'test',
      [
        { file: 'lib/processor.js' },
        { file: 'lib/generator.js' },
        { file: 'tests.js' }
      ],
      'test',
      false,
      false
    );
    assert.deepEqual(
      results,
      [
        'test/lib/processor',
        'test/lib/generator',
        'test/tests'
      ]
    );
    assert.calledWith(logger.info, 'Processing results');
  }
);

test(
  'processes results correctly when test dir and subdir as root are not the same',
  () => {
    stub(logger, 'info');
    const results = processor.process(
      'test',
      [
        { file: 'lib/generator.js' },
        { file: 'lib/processor.js' }
      ],
      'lib',
      false,
      false
    );
    assert.deepEqual(
      results,
      [
        'lib/generator',
        'lib/processor'
      ]
    );
    assert.calledWith(logger.info, 'Processing results');
  }
);

test(
  'processes results correctly when subdir as root so that files not in sub as root are not returned',
  () => {
    stub(logger, 'info');
    const results = processor.process(
      'test',
      [
        { file: 'lib/generator.js' },
        { file: 'lib/processor.js' },
        { file: 'test.js' }
      ],
      'lib',
      false,
      false
    );
    assert.deepEqual(
      results,
      [
        'lib/generator',
        'lib/processor'
      ]
    );
    assert.calledWith(logger.info, 'Processing results');
  }
);

test(
  'should randomize results when specified',
  () => {
    stub(logger, 'info');
    const results = processor.process(
      'test',
      [
        { file: 'lib/generator.js' },
        { file: 'lib/processor.js' },
        { file: 'tests.js' }
      ],
      'test',
      true,
      false
    );
    assert.sameMembers(
      results,
      [
        'test/lib/generator',
        'test/lib/processor',
        'test/tests'
      ]
    );
    assert.calledWith(logger.info, 'Processing results');
    assert.calledWith(logger.info, '    Randomising...');
  }
);

test(
  'should sort results when specified',
  () => {
    stub(logger, 'info');
    spy(Array.prototype, 'sort');
    const results = processor.process(
      'test',
      [
        { file: 'lib/processor.js' },
        { file: 'lib/generator.js' },
        { file: 'tests.js' }
      ],
      'test',
      false,
      true
    );
    assert.deepEqual(
      results,
      [
        'test/lib/generator',
        'test/lib/processor',
        'test/tests'
      ]
    );

    assert.calledWith(logger.info, 'Processing results');
    assert.calledWith(logger.info, '    Sorting...');
  }
);
