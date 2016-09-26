var shared = require('./shared.js');

module.exports = function exec(params){
  var newState;
    
    switch(params.deviceType.type){
      case 'binary': 
        if(params.state.value === 1){
          newState = 'on';
        } else {
          newState = 'off';
        } 
      break;
      case 'switch':
        if(params.state.value === 0){
          newState = 'A0';
        } else if (params.state.value === 1) {
          newState = 'AI';
        } else if (params.state.value === 1) {
          newState = 'B0';
        } else {
          newState = 'BI';
        }
      break;
    }
    return shared.getApi()
    .then(function(api){
      return api.command(params.deviceType.identifier, newState); 
    });    
}
