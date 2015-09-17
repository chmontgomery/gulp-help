var gulp = require('../../index.js')(require('gulp'));

function clean(done) {
  //...
  done();
}
clean.description = 'clean all the files';

function coffee(done) {
  //...
  done();
}
coffee.description = 'Compile coffeescript';

var build = gulp.series(clean, coffee);
build.description = 'this builds all the things';

gulp.task('build', build);

gulp.task('clean', clean);

gulp.task(coffee);
