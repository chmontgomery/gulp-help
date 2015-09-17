// mix in gulp-help to plain gulp4
var gulp = require('../../index.js')(require('gulp'));

// --------------------------------------------------------------------------------------
// tasks
// --------------------------------------------------------------------------------------

function clean(done) {
  console.log('cleaning...');
  done();
}
clean.description = "clean it!!!";

function coffee(done) {
  console.log('coffeeing...');
  done();
}
coffee.description = "This is a super duper long message that probably wraps and i want to see what it looks like when it does";

function uglify(done) {
  console.log('uglifying...');
  done();
}
uglify.description = 'Uglify the things';

function sass(done) {
  console.log('sassing...');
  done();
}

var lint = function (done) {
  console.log('linting...');
  done();
};

var build = gulp.series(
  clean,
  gulp.parallel(sass, gulp.series(coffee, uglify))
);
build.description = "this builds all the things";

gulp.task('build', build);

gulp.task('clean', clean);

gulp.task(coffee);

gulp.task('sassy', sass);

gulp.task(uglify);

gulp.task('lint', lint);
