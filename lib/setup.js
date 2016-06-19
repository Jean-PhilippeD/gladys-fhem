var search = require('./search.js');
var type = require('./type.js');
var Promise = require('bluebird');

module.exports = function() {
  // we search on fhem for all devices
  return search()
  .timeout(30000)
  .then(function(devices){
    return Promise.map(devices, function(device) {
      return createDevice(device);
    });
  })
  .catch(Promise.TimeoutError, function(e) {
    sails.log.warn('could not configure Fhem module whithin 30s');
  });
};

function createDevice(device) {

  type.get(device)
  .then(function(type) {  
    // Create new device
    return gladys.device.create(type);
  })
  .then(function(deviceCreated) {
    if (!deviceCreated.types[0].id) {
      // we don't get id, it mean device allready exist, do nothing
      sails.log.info('Fhem device ' + device.id + ' allready exist, skipping.');
      return null;
    } else {
      // else, create value in the same time as we get it from fhem
      state.sanitize(device.value)
      .then(function(value) {
        var state = {
          value: value,
          devicetype: deviceCreated.types[0]
        }
        return gladys.deviceState.create(state)
      })
      .then(function() {
        sails.log.info('Fhem device ' + device.id + ' created.');
	return null;
      })
      .catch(function(err) {
        sails.log.warn(err);
        return null;
      });
    }
  })
  .catch(function(err) {
    sails.log.warn(err);
    return null;
  });
};
