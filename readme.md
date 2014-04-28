# gulp-help [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
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

Usage
  gulp [task]

Available tasks
  help Display this help text.
  lint Lints all server side js

[gulp] Finished 'help' in 607 μs
```

## Hide Tasks

You can optionally hide a target from showing up in the help menu by passing `false` as the help argument, e.g.

```js
gulp.task('task-hidden-from-help', false, function () {
  // ...
});
```

## Aliases

You can optionally add aliases to your targets by supplying an object with an aliases array, e.g.

```js
gulp.task('version', 'prints the version.', [], function() {
  // ...
}, {
  aliases: ['v', 'V']
});
```

which results in

```bash
[gulp] Starting 'help'...

Usage
  gulp [task]

Available tasks
  help     Display this help text.
  version  prints the version. Aliases: v, V

[gulp] Finished 'help' after 928 μs
```

## Override default help message

Lastly, you can even override the built in help message

```js
require('gulp-help')(gulp, { description: 'you are looking at it.', aliases: ['h', '?'] });
```

=>

```bash
node_modules/.bin/gulp
node_modules/.bin/gulp help
node_modules/.bin/gulp h
node_modules/.bin/gulp ?
```

=>

```bash
[gulp] Starting 'help'...

Usage:
  gulp [task]

Available tasks:
  help     you are looking at it. Aliases: h, ?

[gulp] Finished 'help' after 1.05 ms
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Chris Montgomery](http://www.chrismontgomery.info/)

[npm-url]: https://npmjs.org/package/gulp-help
[npm-image]: http://img.shields.io/npm/v/gulp-help.svg
[travis-image]: https://travis-ci.org/chmontgomery/gulp-help.svg?branch=master
[travis-url]: https://travis-ci.org/chmontgomery/gulp-help
