var chalk = require('chalk');

module.exports = {
  styles: {
    taskLinePrefix: null,
    taskName: chalk.green,
    tasksHeading: chalk.underline.white,
    description: chalk.cyan,
    flagName: chalk.yellow,
    flagPrefix: chalk.yellow,
    flagDescription: chalk.yellow,
    aliasesLabel: chalk.red,
    aliasDescription: chalk.red
  }
};
