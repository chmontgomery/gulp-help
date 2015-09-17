var objectAssign = require('object-assign'),
  chalk = require('chalk'),
  DEFAULT_HELP_TEXT = 'Display this help text.',
  DEFAULT_OPTIONS = {};

module.exports = function (gulp, options) {
  //var originalTaskFn = gulp.task;

  //options = objectAssign({}, DEFAULT_OPTIONS, options);

  //gulp.task = function (name, description, fn) {
  //
  //};

  function help(done) {
    logTasks(gulp);
    done();
  }
  help.description = DEFAULT_HELP_TEXT;

  gulp.task('help', help);

  // do not add default task if one already exists
  if (gulp._registry._tasks['default'] === undefined) {
    gulp.task('default', gulp.series('help'));
  }

  return gulp;
};

function logTasks(localGulp) {
  var tasks = localGulp._registry._tasks,
    margin = Object.keys(tasks).reduce(function (m, taskName) {
      if (m > taskName.length) {
        return m;
      }
      return taskName.length;
    }, 0);

  console.log('\n' + chalk.underline('Available tasks'));

  Object.keys(tasks).forEach(function (taskName) {

    var description = tasks[taskName].description || '';
    var args = [' ', chalk.cyan(taskName)];

    args.push(new Array(margin - taskName.length).join(' '));
    args.push(description);

    console.log.apply(console, args);
  });

  console.log('');
}
