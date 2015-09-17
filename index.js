var chalk = require('chalk'),
  logger = require('./lib/logger'),
  DEFAULT_HELP_TEXT = 'Display this help text.';

module.exports = function (gulp) {

  function help(done) {
    logTasks(gulp);
    done();
  }

  help.description = DEFAULT_HELP_TEXT;

  gulp.task('help', help);

  // do not add default task if one already exists
  if (gulp.registry()._tasks['default'] === undefined) {
    gulp.task('default', gulp.series('help'));
  }

  return gulp;
};

function logTasks(localGulp) {
  var tasks = localGulp.registry()._tasks,
    margin = Object.keys(tasks).reduce(function (m, taskName) {
      if (m > taskName.length) {
        return m;
      }
      return taskName.length;
    }, 0);

  logger('\n' + chalk.underline('Available tasks'));

  Object.keys(tasks).forEach(function (taskName) {

    var description = tasks[taskName].description || '';
    var args = [' ', chalk.cyan(taskName)];

    args.push(new Array(margin - taskName.length).join(' '));
    args.push(description);

    logger.apply(console, args);
  });

  logger('');
}
