# gulp-help [![Build Status](https://travis-ci.org/chmontgomery/gulp-help.svg?branch=master)](https://travis-ci.org/chmontgomery/gulp-help)
> Adds help task to [gulp](https://github.com/gulpjs/gulp) and the ability to provide help text to your custom gulp tasks

## Install

```bash
$ npm install --save-dev gulp-help
```

## Usage

Before defining any tasks, add `gulp help` to the gulp instance

```js
// gulpfile.js
require('gulp-help')(gulp);
```

Next, define help text for each task

```js
// gulpfile.js
gulp.task('lint', 'Lints all server side js', function () {
    gulp.src('./lib/**/*.js')
      .pipe(jshint(jshintrcPath))
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('fail'));
});
```

Now show that help via `gulp help`

```bash
$ gulp help
[gulp] Running 'help'...

Usage:
  gulp [task]

Available tasks:
  help Display this help text
  lint Lints all server side js

[gulp] Finished 'help' in 607 μs
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Chris Montgomery](http://www.chrismontgomery.info/)