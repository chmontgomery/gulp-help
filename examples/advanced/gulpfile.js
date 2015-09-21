var gulp = require('../../index.js')(require('gulp'));

// --------------------------------------------------------------------------------------
// tasks
// --------------------------------------------------------------------------------------

function clean(done) {
  console.log('cleaning...');
  done();
}
clean.description = "clean it!!!";
clean.flags = {
  'delux': 'the description of key & val',
  'ultra': 'description of key & val'
};

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

var invisibleTask = function (done) {
  console.log('THIS TASK SHOULD BE INVISIBLE FROM THE HELP MENU!');
  done();
};
invisibleTask.description = 'ERROR: THIS TASK SHOULD BE INVISIBLE FROM THE HELP MENU!';
invisibleTask.hide = true; // allow hiding tasks
invisibleTask.flags = {
  'a-super-long-flag-name-to-test-margins-and-make-sure-it-gets-calculated-with-everything': 'THIS SHOULD NOT BE DISPLAYED'
};

var build = gulp.series(
  clean,
  gulp.parallel(sass, gulp.series(coffee, uglify))
);
build.description = "this builds all the things";
build.aliases = ['b', 'B']; // allow aliasing tasks
build.flags = {
  'e': 'description of env, perhaps with available values',
  'key=val': 'description of key & val',
  'key': 'description of key',
  'k': 'a key'
};

var version = function (done) {
  console.log('showing you my version...');
  done();
};
version.description = "print version.";
version.aliases = ['v', 'V'];

var long = function (done) {
  done();
};

gulp.task('build', build);

gulp.task('clean', clean);

gulp.task(coffee);

gulp.task('sassy', sass);

gulp.task(uglify);

gulp.task('lint', lint);

gulp.task('INVISIBLE', invisibleTask);

gulp.task('version', version);

gulp.task('a-super-long-task-name-to-see-margins', long);

