module.exports = function() {
	gladys.param.getValue('FHEM_SERVER')
	// Get FHEM_SERVER
	.then(function() {
		// If exist, get FHEM_PORT
		return gladys.param.getValue('FHEM_PORT');
		.then(function() {
			// If exist nothing to do
		})
		// If Port doesn't exit, create default value	
		.catch(function() {
			gladys.param.setValue({name: 'FHEM_PORT', value: 7072});
        .catch(function(){
		// If Host doesnt exist, create default value
		gladys.param.setValue({name: 'FHEM_SERVER', value: 'localhost'})
        });
	return;
}

