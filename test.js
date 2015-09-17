var gulpHelp = require('./index.js'),
  should = require('should');

describe('help', function () {

  it('should have help task and default task', function () {
    var gulp = gulpHelp(require('gulp'));
    var tasks = gulp.registry()._tasks;
    var taskNames = Object.keys(tasks);

    taskNames.length.should.eql(2);
    taskNames[0].should.eql('help');
    tasks[taskNames[0]].description.should.eql('Display this help text.');
    taskNames[1].should.eql('default');
    should(tasks[taskNames[1]].description).eql(undefined);

    gulp.tree({deep: true}).should.deepEqual([
      {
        label: 'help', type: 'task', nodes: []
      },
      {
        label: 'default', type: 'task', nodes: [
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

});
