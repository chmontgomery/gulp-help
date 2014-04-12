var colors = require('colors');

module.exports = function (gulp) {

  //todo wrap gulp.task so you can provide help text

  gulp.task('help', function () {
    console.log('Available tasks:');
    console.log(Object.keys(gulp.tasks).sort().join('\n').cyan);
  });
};