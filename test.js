var gulpHelp = require('./index.js'),
  calculateMargin = require('./lib/calculateMargin'),
  should = require('should'),
  sinon = require('sinon');

describe('help', function () {

  it('should have help task and default task', function () {
    var gulp = gulpHelp(require('gulp'));
    var tasks = gulp.registry()._tasks;
    var taskNames = Object.keys(tasks);

    taskNames.length.should.eql(3);
    taskNames[0].should.eql('help');
    gulp.task(taskNames[0]).description.should.eql('Display this help text.');
    taskNames[1].should.eql('h');
    taskNames[2].should.eql('default');
    should(gulp.task(taskNames[1]).description).eql(undefined);

    gulp.tree({deep: true}).nodes.should.deepEqual([
      {
        label: 'help', type: 'task', nodes: []
      },
      {
        label: 'h', type: 'task',
        nodes: [
          {
            "label": "<series>",
            "nodes": [
              {
                "label": "help",
                "nodes": [],
                "type": "task"
              }
            ],
            "type": "function"
          }
        ]
      },
      {
        label: 'default', type: 'task',
        nodes: [
          {
            "label": "<series>",
            "nodes": [
              {
                "label": "help",
                "nodes": [],
                "type": "task"
              }
            ],
            "type": "function"
          }
        ]
      }
    ])
  });

  describe('calculateMargin', function () {

    it('should calculate margin based on longest task name', function () {

      var noop = function() {};
      var getTaskName = sinon.stub();
      getTaskName.onCall(0).returns(noop);
      getTaskName.onCall(1).returns(noop);
      getTaskName.onCall(2).returns(noop);
      var gulpStub = {
        registry: function () {
          return {
            get: getTaskName,
            tasks: sinon.stub().returns({
              '1': noop,
              'my_task': noop,
              'a_task_name_that_is_29_length': noop
            })
          }
        }
      };

      calculateMargin(gulpStub).should.eql(29);

    });

    it('should calculate margin based on longest flag name', function () {

      var noop = function() {};
      var fnWithFlags = function() {};
      fnWithFlags.flags = {
        'env=prod': '...',
        'a_flag_name_that_is_32_in_length': 'description of key & val',
        'key': 'description of key'
      };
      var getTaskName = sinon.stub();
      getTaskName.onCall(0).returns(noop);
      getTaskName.onCall(1).returns(fnWithFlags);
      getTaskName.onCall(2).returns(noop);
      var gulpStub = {
        registry: function () {
          return {
            get: getTaskName,
            tasks: sinon.stub().returns({
              '1': noop,
              'my_task': fnWithFlags,
              'a_task_name_that_is_29_length': noop
            })
          }
        }
      };

      calculateMargin(gulpStub).should.eql(32);

    });

    it('should calculate margin based on longest flag name with prefix', function () {

      var noop = function() {};
      var fnWithFlags = function() {};
      fnWithFlags.flags = {
        'env=prod': '...',
        'a_flag_name_that_is_32_in_length': 'description of key & val',
        'key': 'description of key'
      };
      var getTaskName = sinon.stub();
      getTaskName.onCall(0).returns(noop);
      getTaskName.onCall(1).returns(fnWithFlags);
      getTaskName.onCall(2).returns(noop);
      var gulpStub = {
        registry: function () {
          return {
            get: getTaskName,
            tasks: sinon.stub().returns({
              '1': noop,
              'my_task': fnWithFlags,
              'a_task_name_that_is_29_length': noop
            })
          }
        }
      };

      calculateMargin(gulpStub, {flagPrefix: 'a-prefix-of-21-length'}).should.eql(53);

    });

    it('should calculate margin based on longest flag name with prefix but skip hidden task', function () {

      var noop = function() {};
      var fnWithFlagsAndHidden = function() {};
      fnWithFlagsAndHidden.flags = {
        'env=prod': '...',
        'a_flag_name_that_is_32_in_length': 'description of key & val',
        'key': 'description of key'
      };
      fnWithFlagsAndHidden.hide = true;
      var getTaskName = sinon.stub();
      getTaskName.onCall(0).returns(noop);
      getTaskName.onCall(1).returns(fnWithFlagsAndHidden);
      getTaskName.onCall(2).returns(noop);
      var gulpStub = {
        registry: function () {
          return {
            get: getTaskName,
            tasks: sinon.stub().returns({
              '1': noop,
              'my_task': fnWithFlagsAndHidden,
              'a_task_name_that_is_29_length': noop
            })
          }
        }
      };

      calculateMargin(gulpStub, {flagPrefix: 'a-prefix-of-21-length'}).should.eql(29);

    });

  });

});
