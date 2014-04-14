'use strict';

var gulpHelp = require('../index.js'),
/* jshint unused: true */
  should = require('should'),
/* jshint unused: false */
  sinon = require('sinon');

/* jshint expr: true */
describe('help', function () {

  var gulp, originalTaskFn;

  function noop() {
  }

  beforeEach(function () {
    gulp = null;
    originalTaskFn = null;
  });

  it('should have help task with help text', function () {
    gulp = sinon.stub({task: noop, tasks: { help: {} }});
    originalTaskFn = gulp.task;
    gulpHelp(gulp);
    should(originalTaskFn.calledOnce).ok;
    should(gulp.tasks.help.help).eql('Display this help text');
  });

  describe('should support old task definitions', function () {

    beforeEach(function () {
      gulp = sinon.stub({task: noop, tasks: { help: {}, oldStyle: {} }});
      originalTaskFn = gulp.task;
      gulpHelp(gulp);
      should(originalTaskFn.calledOnce).ok;
    });

    it('with no help text and no deps', function () {
      gulp.task('oldStyle', noop);
      should(originalTaskFn.calledTwice).ok;
      should(originalTaskFn.calledWith('oldStyle', noop)).ok;
      should(gulp.tasks.oldStyle.help).eql(undefined);
    });

    it('with no help text and deps', function () {
      gulp.task('oldStyle', ['dep'], noop);
      should(originalTaskFn.calledTwice).ok;
      should(originalTaskFn.calledWith('oldStyle', ['dep'], noop)).ok;
      should(gulp.tasks.oldStyle.help).eql(undefined);
    });

  });

  describe('should support new task definitions', function () {

    beforeEach(function () {
      gulp = sinon.stub({task: noop, tasks: { help: {}, newStyle: {} }});
      originalTaskFn = gulp.task;
      gulpHelp(gulp);
      should(originalTaskFn.calledOnce).ok;
    });

    it('with help text and no deps', function () {
      gulp.task('newStyle', 'help text here', noop);
      should(originalTaskFn.calledTwice).ok;
      should(originalTaskFn.calledWith('newStyle', noop)).ok;
      should(gulp.tasks.newStyle.help).eql('help text here');
    });

    it('with help text and deps', function () {
      gulp.task('newStyle', 'help text here', ['dep'], noop);
      should(originalTaskFn.calledTwice).ok;
      should(originalTaskFn.calledWith('newStyle', ['dep'], noop)).ok;
      should(gulp.tasks.newStyle.help).eql('help text here');
    });

  });

  describe('should fall through on error cases', function () {

    beforeEach(function () {
      gulp = sinon.stub({task: noop, tasks: { help: {}, aTask: {} }});
      originalTaskFn = gulp.task;
      gulpHelp(gulp);
      should(originalTaskFn.calledOnce).ok;
    });

    it('with no args given', function() {
      gulp.task();
      should(originalTaskFn.calledTwice).ok;
      should(originalTaskFn.calledWith()).ok;
    });

    it('with null as second arg', function() {
      gulp.task('aTask', null);
      should(originalTaskFn.calledTwice).ok;
      should(originalTaskFn.calledWith('aTask', null)).ok;
    });

    it('with null deps', function() {
      gulp.task('aTask', null, null, noop);
      should(originalTaskFn.calledTwice).ok;
      should(originalTaskFn.calledWith('aTask', null, null, noop)).ok;
    });

    it('with null fn', function() {
      gulp.task('aTask', ['dep'], null);
      should(originalTaskFn.calledTwice).ok;
      should(originalTaskFn.calledWith('aTask', ['dep'], null)).ok;
    });

    it('with help text but null fn', function() {
      gulp.task('aTask', 'help text', null);
      should(originalTaskFn.calledTwice).ok;
      should(originalTaskFn.calledWith('aTask', 'help text', null)).ok;
    });

  });

});