
module.exports = function(sails) {
    
    var shared = require('./lib/shared.js');
  //  var config = require('./lib/config.js');


    gladys.on('ready', function(){
	return gladys.param.getValues(['FHEM_SERVER','FHEM_PORT'])
        .spread(function(host, port){
		shared.getApi(host, port);
	});
    });

    return {
   //   config: config
    };
};
