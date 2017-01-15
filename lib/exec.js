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
        if(params.state.value === 1){
          newState = 'A0';
        } else if (params.state.value === 2) {
          newState = 'AI';
        } else if (params.state.value === 3) {
          newState = 'B0';
        } else if (params.state.value === 4) {
          newState = 'BI';
        }
      break;
    }
    return shared.getApi()
    .then(function(api){
      return api.command(params.deviceType.identifier, newState); 
    });    
}
