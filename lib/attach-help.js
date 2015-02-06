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

  task.help = {
    message: msg,
    options: taskOptions.options || {}
  };
};
