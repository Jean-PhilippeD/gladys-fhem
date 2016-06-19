var Promise = require('bluebird');

module.exports = {

  sanitize: function(value) {
    return new Promise(function(resolve, reject){
      var val = value;
      if (value === 'on') val = 1;
      if (value === 'off') val = 0;
      if (value === 'closed') val = 0;
      if (value === 'open') val = 1;
      if (value === 'A0') val = 1;
      if (value === 'AI') val = 2;
      if (value === 'B0') val = 3;
      if (value === 'BI') val = 4;
      return resolve(val);
   });
  },
}
