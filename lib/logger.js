'use strict';

const chalk = require('chalk');

function log (message) {
  console.log(message);
}

module.exports = {
  warn (message) {
    if (!this.quiet) {
      log(chalk.yellow(message));
    }
  },

  error (message) {
    if (!this.quiet) {
      log(chalk.red(message));
    }
  },

  info (message) {
    if (!this.quiet) {
      log(chalk.magenta(message));
    }
  },

  log: function (message) {
    if (!this.quiet) {
      log(message);
    }
  }
};
