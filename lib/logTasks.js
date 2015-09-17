var chalk = require('chalk'),
  logger = require('./logger');

module.exports = function (gulp, options) {
  var tasks = gulp.registry()._tasks,
    margin = Object.keys(tasks).reduce(function (m, taskName) {
      if (m > taskName.length) {
        return m;
      }
      return taskName.length;
    }, 0);

  logger('\n' + chalk.underline(options.availableTasksHeadingText));

  Object.keys(tasks).forEach(function (taskName) {

    if (tasks[taskName].hide) return; // skip displaying this task

    var description = tasks[taskName].description || '';
    var args = [' ', chalk.cyan(taskName)];

    args.push(new Array(margin - taskName.length).join(' '));
    args.push(description);

    if (tasks[taskName].aliases && tasks[taskName].aliases.length > 0) {
      args.push(options.aliasesLabel);
      args.push(tasks[taskName].aliases.join(', '));
    }

    logger.apply(console, args);
  });

  logger('');
};
