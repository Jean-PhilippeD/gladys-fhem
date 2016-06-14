var search = require('./search.js');
var Promise = require('bluebird');

module.exports = function() {
	// we search on fhem for all devices
	return search()
	.then(function(){
		return
	})
	.catch(function() {
		sails.log.warn('error');
	});
};
