var Promise = require('bluebird');
var Fhem = require('./fhem.js');

var api = null;
var host = false;
var port = false;

module.exports = {
  getApi: function(host, port){
	if(!host) host = host;
	if(!port) port = port;
	return new Promise(function(resolve, reject){
		if(api) return resolve(api);
		api = new Fhem(host, '7072');
		api.connect();
		resolve(api);
        });
  }    
};
