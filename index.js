'use strict';

var gutil = require('gulp-util'),
  _ = require('lodash');

module.exports = function (gulp, options) {
  var originalTaskFn = gulp.task,
    ignoredTasks = [];

  options = _.extend({
    aliases: [],
    description: 'Display this help text.',
    afterPrintCallback: gutil.noop
  }, options);

  /**
   * gulp.task(name[, help, deps, fn, taskOptions])
   *
   * Adds `help` and `taskOptions` to the typical gulp task definition:
   * https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname-deps-fn
   * @param {string} name
   * @param {boolean} [help]
   * @param {Array} [deps]
   * @param {function} [fn]
   * @param {object} [taskOptions]
   */
  gulp.task = function (name, help, deps, fn, taskOptions) {
    var task;

    if (_.contains(ignoredTasks, name)) {
      // previously ignored. Unignore and re-run logic below
      _.remove(ignoredTasks, function (taskName) {
        return name === taskName;
      });
    }

    /* jshint noempty: false */
    if (help === false) {
      // .task('test', false, ...)
      ignoredTasks.push(name);
      if (typeof deps === 'function') {
        // .task('test', false, function(){}, {})
        taskOptions = fn;
        fn = deps;
        deps = undefined;
      } else {
        // .task('test', false, ['dep'], function(){}, {})
        // nothing needs to be re-assigned
      }
    } else if (typeof help === 'function') {
      // .task('test', function(){})
      taskOptions = deps;
      fn = undefined;
      deps = help;
      help = undefined;
    } else if (Array.isArray(help) && typeof deps === 'function') {
      // .task('test', ['dep'], function(){}, {})
      taskOptions = fn;
      fn = deps;
      deps = help;
      help = undefined;
    } else if (typeof deps === 'function') {
      // .task('test', '...', function, {})
      taskOptions = fn;
      fn = deps;
      deps = undefined;
    } else if (Array.isArray(deps)) {
      // .task('test', '...', ['dep'], function, {})
      // nothing needs to be re-assigned
    } else {
      throw new gutil.PluginError('gulp-help', 'Unexpected arg types. Should be in the form: `gulp.task(name[, help, deps, fn, taskOptions])`');
    }

    if (!deps) {
      originalTaskFn.call(gulp, name, fn);
    } else {
      originalTaskFn.call(gulp, name, deps, fn);
    }

    task = gulp.tasks[name];

    taskOptions = _.extend({
      aliases: []
    }, taskOptions);


    taskOptions.aliases.forEach(function (alias) {
      gulp.task(alias, false, [ name ], gutil.noop);
    });

    if (task && help !== false) {
      if (taskOptions.aliases.length > 0) {
        help = (help ? help + ' ' : '') + 'Aliases: ' + taskOptions.aliases.join(', ');
      }
      task.help = help;
    }

  };

  gulp.task('help', options.description, function () {
    var tasks = Object.keys(gulp.tasks).sort();
    var margin = tasks.reduce(function (m, taskName) {
      if (_.contains(ignoredTasks, taskName) || (m > taskName.length)) {
        return m;
      } else {
        return taskName.length;
      }
    }, 0);

    console.log('');
    console.log(gutil.colors.underline('Usage'));
    console.log('  gulp [task]');
    console.log('');
    console.log(gutil.colors.underline('Available tasks'));
    tasks.forEach(function (name) {
      if (!_.contains(ignoredTasks, name)) {
        var helpText = gulp.tasks[name].help || '';
        var args = [' ', gutil.colors.cyan(name)];

        args.push(new Array(margin - name.length + 1).join(" "));
        args.push(helpText);

        console.log.apply(console, args);
      }
    });
    console.log('');
    if (options.afterPrintCallback) {
      options.afterPrintCallback(gulp.tasks);
    }
  }, options);

  gulp.task('default', false, ['help']);
};