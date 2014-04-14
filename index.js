var colors = require('colors');

module.exports = function (gulp) {

  var originalTaskFn = gulp.task;

  gulp.task = function(name, help, dep, fn) {

    if (typeof help === 'function') {
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

    originalTaskFn.call(gulp, name, dep, fn);
    // in case of gulp testing. Should always exist in real use-case
    if (gulp.tasks && gulp.tasks[name]) {
      gulp.tasks[name].help = help;
    }
  };

  gulp.task('help', 'Display this help text', function () {
    var tasks = Object.keys(gulp.tasks).sort();

    console.log('');
    console.log('Usage:'.underline);
    console.log('  gulp [task]');
    console.log('');
    console.log('Available tasks:'.underline);
    tasks.forEach(function(name) {
      var helpText = gulp.tasks[name].help || '';
      console.log(' ', name.cyan, helpText);
    });
    console.log('');
  });
};