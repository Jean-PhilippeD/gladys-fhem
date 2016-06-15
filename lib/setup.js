var search = require('./search.js');
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

  if(device.id.indexOf('sensor') >= 0) {
    var tempSensor =  {
      device: {
        name: 'Température',
        protocol: device.protocol,
        service: 'fhem',
        identifier: device.id
      },
      types: [
        {
          type: 'numeric',
          sensor: true,
          tag: 'temperature',
          unit: '°C'
        }
      ]
    };

    // Create new device
    return gladys.device.createIfNotExist(tempSensor)
    .then(function(deviceCreated) {
      if (!deviceCreated.types[0].id) {
        // we don't get id, it mean device allready exist, do nothing
        sails.log.info('Fhem device ' + device.id + ' allready exist, skipping.');
      } else {
        // else, create value in the same time as we get it from fhem
        var state = {
          value: device.value,
          devicetype: deviceCreated.types[0]
        }
        return gladys.deviceState.create(state)
        .then(function() {
          sails.log.info('Fhem device ' + device.id + ' created.');
        });
      }
    });
  }
  return;

};
