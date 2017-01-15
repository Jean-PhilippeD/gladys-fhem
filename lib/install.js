
module.exports = function() {

  return gladys.param.setValue({name: 'FHEM_HOST', value: 'localhost'})
  .then(gladys.param.setValue({name: 'FHEM_PORT', value: 7072}))
  .then(function() {
    sails.log.info("FHEM module installed successfully");
  })
  .catch(function(e) {
    sails.log.error("Failed to install FHEM module");
  });
}

