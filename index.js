'use strict';

var gutil = require('gulp-util'),
  _ = require('lodash');

var gulpHelp = module.exports = function (gulp, options) {
  var originalTaskFn = gulp.task,
    ignoredTasks = [];

  options = _.extend({
    aliases: [],
    description: 'Display this help text.'
  }, options);



  gulp.task = function (name, help, dep, fn, options) {
    var task;

    options = _.extend({
      aliases: []
    }, options);

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

    if (options.aliases.length > 0) {
      options.aliases.forEach(function(alias) {
        gulp.task(alias, false, [ name ], gulpHelp.noop);
      });

      help = help + " Aliases: " + options.aliases.join(", ");
    }

    if (task) {
      task.help = help;
    }
  };

  gulp.task('help', options.description, [], function () {
    var tasks  = Object.keys(gulp.tasks).sort();
    var margin = tasks.reduce(function(m, taskName) {
      return (m > taskName.length) ? m : taskName.length;
    }, 0);

    console.log('');
    console.log(gutil.colors.underline('Usage:'));
    console.log('  gulp [task]');
    console.log('');
    console.log(gutil.colors.underline('Available tasks:'));
    tasks.forEach(function (name) {
      if (!_.contains(ignoredTasks, name)) {
        var helpText = gulp.tasks[name].help || '';
        var args     = [' ', gutil.colors.cyan(name)];

        args.push(new Array(margin - name.length + 1).join(" "));
        args.push(helpText);

        console.log.apply(console, args);
      }
    });
    console.log('');
  }, options);

  gulp.task('default', false, ['help']);
};

gulpHelp.noop = function(){};
