'use strict';

var gulpHelp = require('../index.js'),
/* jshint unused: true */
  should = require('should'),
/* jshint unused: false */
  sinon = require('sinon');

/* jshint expr: true */
describe('help', function () {

  var gulp, originalTaskFn;

  beforeEach(function () {
    gulp = null;
    originalTaskFn = null;
  });

  it('should have help task with help text', function () {
    gulp = sinon.stub({task: gulpHelp.noop, tasks: { help: {} }});
    originalTaskFn = gulp.task;
    gulpHelp(gulp);
    should(originalTaskFn.calledTwice).ok;
    should(originalTaskFn.calledWith('default', ['help'])).ok;
    should(gulp.tasks.help.help).eql('Display this help text.');
  });

  it('should have a custom help text if passed', function () {
    gulp = sinon.stub({task: gulpHelp.noop, tasks: { help: {} }});
    gulpHelp(gulp, { description: 'help text.' });
    should(gulp.tasks.help.help).eql('help text.');
  });

  it('should create an alias if passed', function () {
    gulp = sinon.stub({task: gulpHelp.noop, tasks: { help: {} }});
    originalTaskFn = gulp.task;
    gulpHelp(gulp, { aliases: ['h', '?'] });
    should(gulp.tasks.help.help).eql('Display this help text. Aliases: h, ?');
    should(originalTaskFn.calledWith('h', ['help'])).ok;
    should(originalTaskFn.calledWith('?', ['help'])).ok;
  });

  describe('should support old task definitions', function () {

    beforeEach(function () {
      gulp = sinon.stub({task: gulpHelp.noop, tasks: { help: {}, oldStyle: {} }});
      originalTaskFn = gulp.task;
      gulpHelp(gulp);
      should(originalTaskFn.calledTwice).ok;
    });

    it('with no help text and no deps', function () {
      gulp.task('oldStyle', gulpHelp.noop);
      should(originalTaskFn.calledThrice).ok;
      should(originalTaskFn.calledWith('oldStyle', gulpHelp.noop)).ok;
      should(gulp.tasks.oldStyle.help).eql(undefined);
    });

    it('with no help text and deps', function () {
      gulp.task('oldStyle', ['dep'], gulpHelp.noop);
      should(originalTaskFn.calledThrice).ok;
      should(originalTaskFn.calledWith('oldStyle', ['dep'], gulpHelp.noop)).ok;
      should(gulp.tasks.oldStyle.help).eql(undefined);
    });

  });

  describe('should support new task definitions', function () {

    beforeEach(function () {
      gulp = sinon.stub({task: gulpHelp.noop, tasks: { help: {}, newStyle: {} }});
      originalTaskFn = gulp.task;
      gulpHelp(gulp);
      should(originalTaskFn.calledTwice).ok;
    });

    it('with help text and no deps', function () {
      gulp.task('newStyle', 'help text here', gulpHelp.noop);
      should(originalTaskFn.calledThrice).ok;
      should(originalTaskFn.calledWith('newStyle', gulpHelp.noop)).ok;
      should(gulp.tasks.newStyle.help).eql('help text here');
    });

    it('with help text and deps', function () {
      gulp.task('newStyle', 'help text here', ['dep'], gulpHelp.noop);
      should(originalTaskFn.calledThrice).ok;
      should(originalTaskFn.calledWith('newStyle', ['dep'], gulpHelp.noop)).ok;
      should(gulp.tasks.newStyle.help).eql('help text here');
    });

    it('with disabled help text and no deps', function () {
      gulp.task('newStyle', false, gulpHelp.noop);
      should(originalTaskFn.calledThrice).ok;
      should(originalTaskFn.calledWith('newStyle', gulpHelp.noop)).ok;
      should(gulp.tasks.newStyle.help).eql(undefined);
    });

    it('with disabled help text and deps', function () {
      gulp.task('newStyle', false, ['dep'], gulpHelp.noop);
      should(originalTaskFn.calledThrice).ok;
      should(originalTaskFn.calledWith('newStyle', ['dep'], gulpHelp.noop)).ok;
      should(gulp.tasks.newStyle.help).eql(undefined);
    });

    it('with aliases', function () {
      gulp.task('newStyle', 'description.', [], gulpHelp.noop, { aliases: ['new-style', 'nstyle'] });
      should(originalTaskFn.callCount).eql(5);
      should(originalTaskFn.calledWith('newStyle', [], gulpHelp.noop)).ok;
      should(originalTaskFn.calledWith('new-style', ['newStyle'], gulpHelp.noop)).ok;
      should(originalTaskFn.calledWith('nstyle', ['newStyle'], gulpHelp.noop)).ok;
      should(gulp.tasks.newStyle.help).eql('description. Aliases: new-style, nstyle');
    });

    it('with aliases no deps', function () {
      gulp.task('newStyle', 'description.', gulpHelp.noop, { aliases: ['new-style', 'nstyle'] });
      should(originalTaskFn.callCount).eql(5);
      should(originalTaskFn.calledWith('newStyle', gulpHelp.noop)).ok;
      should(originalTaskFn.calledWith('new-style', ['newStyle'], gulpHelp.noop)).ok;
      should(originalTaskFn.calledWith('nstyle', ['newStyle'], gulpHelp.noop)).ok;
      should(gulp.tasks.newStyle.help).eql('description. Aliases: new-style, nstyle');
    });

    it('with aliases no help no deps', function () {
      gulp.task('newStyle', gulpHelp.noop, { aliases: ['new-style', 'nstyle'] });
      should(originalTaskFn.callCount).eql(5);
      should(originalTaskFn.calledWith('newStyle', gulpHelp.noop)).ok;
      should(originalTaskFn.calledWith('new-style', ['newStyle'], gulpHelp.noop)).ok;
      should(originalTaskFn.calledWith('nstyle', ['newStyle'], gulpHelp.noop)).ok;
      should(gulp.tasks.newStyle.help).eql('Aliases: new-style, nstyle');
    });
  });

  describe('should fall through on error cases', function () {

    beforeEach(function () {
      gulp = sinon.stub({task: gulpHelp.noop, tasks: { help: {}, aTask: {} }});
      originalTaskFn = gulp.task;
      gulpHelp(gulp);
      should(originalTaskFn.calledTwice).ok;
    });

    it('with no args given', function() {
      gulp.task();
      should(originalTaskFn.calledThrice).ok;
      should(originalTaskFn.calledWith()).ok;
    });

    it('with null as second arg', function() {
      gulp.task('aTask', null);
      should(originalTaskFn.calledThrice).ok;
      should(originalTaskFn.calledWith('aTask', null)).ok;
    });

    it('with null deps', function() {
      gulp.task('aTask', null, null, gulpHelp.noop);
      should(originalTaskFn.calledThrice).ok;
      should(originalTaskFn.calledWith('aTask', null, null, gulpHelp.noop)).ok;
    });

    it('with null fn', function() {
      gulp.task('aTask', ['dep'], null);
      should(originalTaskFn.calledThrice).ok;
      should(originalTaskFn.calledWith('aTask', ['dep'], null)).ok;
    });

    it('with help text but null fn', function() {
      gulp.task('aTask', 'help text', null);
      should(originalTaskFn.calledThrice).ok;
      should(originalTaskFn.calledWith('aTask', 'help text', null)).ok;
    });

  });

});
