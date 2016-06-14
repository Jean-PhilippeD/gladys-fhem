var Promise = require('bluebird');
var Fhem = require('./fhem.js');

var api = null;

module.exports = {
  getApi: function(host, port){
	return new Promise(function(resolve, reject){
		if(api) return resolve(api);
		api = new Fhem(host, port);
		api.connect();
		resolve(api);
        });
  }    
};
