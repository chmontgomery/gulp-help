# New task API [WIP]

### gulp.task([name, description,]fn)

#### [name](https://github.com/gulpjs/gulp/blob/master/docs/API.md#name)

Type: `string`

#### description

Type: `string | boolean | object`

Custom help message as a string.

If you want to hide the task from the help menu, supply `false`

```js
gulp.task('task-hidden-from-help', false, function () {
  // ...
});
```

However, if the `--all` flag is provided, even these tasks will be shown. (i.e. `gulp help --all`)

Also can provide an object to support aliases and task flags

#### description.aliases

Type: `Array`

List of aliases for this task

```js
gulp.task('version', {
  description: 'prints the version.',
  aliases: ['v', 'V']
}, fn);
```

#### description.flags

Type: `Object`

Object documenting flags which can be passed to your task

```js
gulp.task('version', {
  description: 'prints the version.',
  flags: {
    'env=prod': 'description of env, perhaps with available values',
    'key=val': 'description of key & val',
    'key': 'description of key'
  }
}, fn);
```

#### [fn](https://github.com/gulpjs/gulp/blob/master/docs/API.md#fn)

Type: `function`

# Examples

Different possible ways to define a task:

```js
gulp.task(fn);
gulp.task('name', fn);
gulp.task('name', 'description', fn);
gulp.task('name', false, fn);
gulp.task('name', {
  description: 'description',
  aliases: ['v', 'V'],
  flags: {
    'env=prod': 'description of env, perhaps with available values',
    'key=val': 'description of key & val',
    'key': 'description of key'
  }
}, fn);
gulp.task({
  name: 'name',
  description: 'description',
  aliases: ['v', 'V'],
  flags: {
    'env=prod': 'description of env, perhaps with available values',
    'key=val': 'description of key & val',
    'key': 'description of key'
  }
}, fn);
```

gulp4 ways of listing tasks

```
gulp --tasks
gulp --tasks-simple
```

Making the above calls should use `gulp-help`'s provided descriptions to also print nicely 
