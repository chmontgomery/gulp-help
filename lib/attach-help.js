module.exports = function (task, msg, aliases) {
  if (task && msg !== false) {
    msg = (typeof msg === 'string') ? msg : '';
    if (aliases && aliases.length > 0) {
      if (msg.length > 0) {
        msg += ' ';
      }
      msg += 'Aliases: ' + aliases.join(', ');
    }
    task.help = {
      message: msg
    };
  }
};