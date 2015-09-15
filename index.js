var objectAssign = require('object-assign'),
  chalk = require('chalk'),
  DEFAULT_OPTIONS = {};

module.exports = function (gulp, options) {
  var originalTaskFn = gulp.task;

  options = objectAssign({}, DEFAULT_OPTIONS, options);

  gulp.task = function (name, description, fn) {

  };

  return gulp;
};
