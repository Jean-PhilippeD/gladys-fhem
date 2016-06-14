module.exports = function() {
	gladys.param.getValue('FHEM_SERVER')
	// Get FHEM_SERVER
	.then(function() {
sails.log.warn('host ok');
		// If exist, get FHEM_PORT
		return gladys.param.getValue('FHEM_PORT')
		.then(function() {
sails.log.warn('port ok');
			// If exist nothing to do
		})
		// If Port doesn't exit, create default value	
		.catch(function() {
sails.log.warn('port ko');
			gladys.param.setValue({name: 'FHEM_PORT', value: 7072});
		});
	})
        .catch(function(){
sails.log.warn('host ko');
		// If Host doesnt exist, create default value
		gladys.param.setValue({name: 'FHEM_SERVER', value: 'localhost'});
        });
	return;
}

