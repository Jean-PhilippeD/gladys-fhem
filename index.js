
module.exports = function(sails) {
    
    var shared = require('./lib/shared.js');
    var setup = require('./lib/setup.js');
    var install = require('./lib/install.js');
    var exec = require('./lib/exec.js');


    gladys.on('ready', function(){
	return gladys.param.getValues(['FHEM_HOST','FHEM_PORT'])
        .spread(function(host, port){
		shared.getApi(host, port);
	});
    });

    return {
	install: install,
     	setup: setup,
        exec: exec
    };
};
