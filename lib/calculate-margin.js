// returns:
//   margin 			int 	length of longest task / options name
//   hasOptions		bool	true if any task has option(s)
module.exports = function (tasksObj, tasksArr) {
	var hasOptions = false;
	var margin = tasksArr.reduce(function (m, taskName) {
	  var optionsMargin = 0, opts;
	  // if exists, iterate options list to calculate margin for options
	  if(tasksObj[taskName].help && tasksObj[taskName].help.options) {
	    opts = Object.keys(tasksObj[taskName].help.options).sort();
	    optionsMargin = opts.reduce(function (m, opt) {
	    	// if, at any time while iterating the tasks array, we also iterate an opts array, set hasOptions flag
	      hasOptions = true;
	      return m > opt.length ? m : opt.length;
	    }, 0);
	  }

	  if (!tasksObj[taskName].help || (m > taskName.length && m > optionsMargin)) {
	    return m;
	  } else if (optionsMargin > taskName.length) {
	    marginSetByOptions = optionsMargin
	    return optionsMargin;
	  } else {
	    return taskName.length;
	  }
	}, 0);
	return {
		margin: margin,
		hasOptions: hasOptions
	}
}

