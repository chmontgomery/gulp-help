// mix in gulp-help to plain gulp4
var gulp = require('../../index.js')(require('gulp'));

// --------------------------------------------------------------------------------------
// tasks
// --------------------------------------------------------------------------------------

function clean(done) {
  console.log('cleaning...');
  done();
}
clean.description = 'Delete dist folder';
clean.aliases = ['c'];
gulp.task('clean', clean);

function format(done) {
  console.log('format...');
  done();
}
format.description = 'Format css & js according to best practices';
format.flags = {
  'css': 'css only',
  'js': 'javascript only'
};
gulp.task('format', format);

function lint(done) {
  console.log('lint...');
  done();
}
lint.description = 'Lint JavaScript code using JSHint';
gulp.task('lint', lint);

function scripts(done) {
  console.log('scripts...');
  done();
}
scripts.description = 'Copies and builds all js files to /dist/scripts';
gulp.task('scripts', scripts);

function styles(done) {
  console.log('styles...');
  done();
}
styles.description = 'Compiles all less files to /dist/styles';
gulp.task('styles', styles);

function test(done) {
  console.log('test...');
  done();
}
test.description = 'Run all tests';
test.flags = {
  'skip-lint': 'skip linting'
};
gulp.task('test', test);

function watch(done) {
  console.log('watch...');
  done();
}
watch.description = 'Watch files and build on change';
watch.aliases = ['w'];
watch.flags = {
  'livereload': 'start livereload server'
};
gulp.task('watch', watch);

var build = gulp.series('clean', gulp.parallel('scripts', 'styles'));
build.description = 'Build all the things';
build.aliases = ['b'];
build.flags = {
  'dev': 'un-minified',
  'production': 'compressed into single bundle'
};
gulp.task('build', build);
