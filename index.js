'use strict';

var gutil = require('gulp-util'),
  _ = require('lodash');

module.exports = function (gulp) {

  var originalTaskFn = gulp.task,
    ignoredTasks = [];

  gulp.task = function (name, help, dep, fn) {

    var task;

    /* jshint noempty: false */
    if (help === false) {
      // .task('test', false, function(){})
      // nothing needs to be re-assigned
      ignoredTasks.push(name);
      return originalTaskFn.call(gulp, name, dep, fn);
    } else if (typeof help === 'function') {
      // .task('test', function(){})
      fn = undefined;
      dep = help;
      help = undefined;
    } else if (Array.isArray(help) && typeof dep === 'function') {
      // .task('test', ['dep'], function(){})
      fn = dep;
      dep = help;
      help = undefined;
    } else if (typeof dep === 'function') {
      // .task('test', '...', function(){})
      // nothing needs to be re-assigned
    } else if (Array.isArray(dep)) {
      // .task('test', '...', ['dep'], function(){})
      // nothing needs to be re-assigned
    } else {
      // not sure what they passed. Probably malformed. Just send through and let gulp handle it.
      return originalTaskFn.call(gulp, name, help, dep, fn);
    }
    /* jshint noempty: true */

    originalTaskFn.call(gulp, name, dep, fn);
    task = gulp.tasks[name];
    if (task) {
      task.help = help;
    }
  };

  gulp.task('help', 'Display this help text', function () {
    var tasks = Object.keys(gulp.tasks).sort();

    console.log('');
    console.log(gutil.colors.underline('Usage:'));
    console.log('  gulp [task]');
    console.log('');
    console.log(gutil.colors.underline('Available tasks:'));
    tasks.forEach(function (name) {
      if (!_.contains(ignoredTasks, name)) {
        var helpText = gulp.tasks[name].help || '';
        console.log(' ', gutil.colors.cyan(name), helpText);
      }
    });
    console.log('');
  });

  gulp.task('default', false, ['help']);
};