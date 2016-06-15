var net = require('net');
var Promise = require('bluebird');

var buffer = require('./buffer.js');

var reconnectInterval;
var trigger = false;

var Fhem = function(conf) {
	this._conf = conf;
}


module.exports = function (host, port) {
	var conf = {
		host: host,
		port: port
	}
	return new Fhem(conf);
}


Fhem.prototype.connect = function() {
	var self = this;

	trigger = net.connect({port: self._conf.port, host: self._conf.host}, function()
	{
		sails.log.info('Connected to FHEM server.');
		trigger.write('inform on\r\n');
	});

	trigger.on('data', function(data)
	{
	  clearInterval(reconnectInterval);
	  //handleChangedValues(data.toString().split("\n"));
	});

	trigger.on('error', function(error)
	{
		sails.log.warn('Could not connect to FHEM server (host: ' + self._conf.host + ', port: ' + self._conf.port + '), retrying in 10s...');
		reconnectInterval = setTimeout(function ()
		{
			self.connect();
		}, 10000);
	});

	trigger.on('end', function()
	{
		sails.log.warn('Connection lost to FHEM server (host: ' + self._conf.host + ', port: ' + self._conf.port + '), reconnecting in 10s...');
		reconnectInterval = setTimeout(function ()
		{
			self.connect();
		},10000);
	});
	
	return trigger;
}


Fhem.prototype.search = function() {
	var self = this;
	return new Promise(function(resolve, reject){
		if(!trigger) return reject(new Error('no connection active between fhem and gladys'));

		// Open new session to prevent from sending useless data to the trigger session
		// then list devices
		var getDevice = net.connect({port: self._conf.port, host: self._conf.host}, function()
		{		
			sails.log.info('Listing devices on FHEM...');
			getDevice.write('list;exit\r\n');
		});
	
		var answerStr = '';
		getDevice.on('data', function(response)
		{
			answerStr += response.toString();
		});

		// Once session is closed, all devices have been pushed to answerStr
		getDevice.on('end', function()
   		{
			// filter to get devices
      			buffer.parseDevices(answerStr)
			.then(function(devices) {
				// send devices array back to setup function
 				return resolve(devices);
			});
      			getDevice.end();
      			getDevice.destroy();
   		});

  		getDevice.on('error', function()
   		{
			sails.log.warn('Failed to list devices on FHEM ! Retrying in 10s...');
		        setTimeout(function ()
      			{
				self.search();		
     			}, 10000);
   		});
	});
}
