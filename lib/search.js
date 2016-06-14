var shared = require('./shared.js');

module.exports = function() {
	return shared.getApi()
	.then(function(api){
		return api.search(); 
	});
}
