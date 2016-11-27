# TestCat [![Build Status](https://travis-ci.org/lawrencec/testCat.svg?branch=master)](https://travis-ci.org/lawrencec/testCat) [![Code Climate](https://img.shields.io/codeclimate/github/lawrencec/testCat.svg)](https://codeclimate.com/github/lawrencec/testCat) [![Test Coverage](https://img.shields.io/codeclimate/coverage/github/lawrencec/testCat.svg)](https://codeclimate.com/github/lawrencec/testCat/coverage) [![Latest Release](https://img.shields.io/github/release/lawrencec/testCat.svg)](https://github.com/lawrencec/testCat/releases)


A simple utility to sniff out files that include js tests and generates a `requirejs` file for use in karma configuration.
Test*Cat* because it hunts and leaves you a little surprise with what if finds.

Given a directory tree like so:

```
  test
    - subdir
      - nestedTest
        - nestedTest.js
      test.js
```

It will generate a file in your chosen location that looks like this:

```
'use strict';
define
  (
    [
      "test/subdir/nestedTest/nestedTest",
      "test/test"
    ]
  );
```
## Usage

```test-cat find --test-dir test --output ./specs.js --framework mocha --dry-run```

```
Usage: test-cat [options]

Options:
  --test-dir, -t   Directory to search              [required] [default: "test"]
  --output, -o     Output file                                        [required]
  --framework, -f  Testing framework to search for [required] [default: "mocha"]
  --root-dir, -k   sub directory to use as root dir in output
  --sort, -s       Sort test files                               [default: true]
  --randomize, -r  Randomize test files                         [default: false]
  --dry-run, -d    Performs a dry run; does not output file     [default: false]
  --quiet, -q      Does not output any text                     [default: false]
  --help, -h       Show help                                           [boolean]
```

