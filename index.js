'use strict';

var gutil = require('gulp-util'),
  _ = require('lodash'),
  attachHelp = require('./lib/attach-help.js'),
  DEFAULT_OPTIONS = {
    aliases: [],
    description: 'Display this help text.',
    afterPrintCallback: gutil.noop
  };

module.exports = function (gulp, options) {
  var originalTaskFn = gulp.task;

  options = _.defaults({}, options, DEFAULT_OPTIONS);

  /**
   * gulp.task(name[, help, deps, fn, taskOptions])
   *
   * Adds `help` and `taskOptions` to the typical gulp task definition:
   * https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname-deps-fn
   * @param {string} name
   * @param {string | boolean} [help]
   * @param {Array} [deps]
   * @param {function} [fn]
   * @param {object} [taskOptions]
   */
  gulp.task = function (name, help, deps, fn, taskOptions) {
    var task;

    /* jshint noempty: false */
    if (name && (help === null || help === undefined)) {
      // just a name. do nothing.
    } else if (help === false) {
      // .task('test', false, ...)
      //ignoredTasks.push(name);
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
    } else if (Array.isArray(help)) {
      // .task('test', ['dep'], ...)
      taskOptions = fn;
      fn = deps;
      deps = help;
      help = undefined;
    } else if (name && !deps) {
      // .task('test', '...')
      // help text with no func and no deps
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

    attachHelp(task, help, taskOptions.aliases);
  };

  gulp.task('help', options.description, function () {
    var tasks = Object.keys(gulp.tasks).sort();
    var margin = tasks.reduce(function (m, taskName) {
      if (!gulp.tasks[taskName].help || (m > taskName.length)) {
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
      if (gulp.tasks[name].help) {
        var helpText = gulp.tasks[name].help.message || '';
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