'use strict';

module.exports = function (task, msg, taskOptions) {
  if (!task) {
    return;
  }

  if (msg === false) {
    delete task.help;
    return;
  }

  msg = (typeof msg === 'string') ? msg : '';
  if (taskOptions.aliases && taskOptions.aliases.length > 0) {
    if (msg.length > 0) {
      msg += ' ';
    }
    msg += 'Aliases: ' + taskOptions.aliases.join(', ');
  }

  var depsMessage = '';
  if(typeof task.dep === 'object' && task.dep.length > 0) {
    depsMessage = '[' + task.dep.join(', ') + ']';
  }

  task.help = {
    message: msg,
    depsMessage: depsMessage,
    options: taskOptions.options || {}
  };
};
