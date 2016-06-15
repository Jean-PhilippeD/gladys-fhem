var Promise = require('bluebird');

module.exports = {

  prepare: function(device) {
    var type = false;
    if(device.id.indexOf('sensor') >= 0) {
      var type =  {
        device: {
          name: 'Température',
          protocol: device.protocol,
          service: 'fhem',
          identifier: device.id
        },
        types: [
          {
            type: 'temp_sensor',
            sensor: true,
            tag: 'temperature',
            unit: '°C',
            min: -20,
            max: 60
          }
        ]
      };
      return Promise.resolve(type); 
    }
    return Promise.reject(new Error('Unknown Fhem Device Type'));
  },

  get: function(device) {
    if(device.indexOf('sensor') >= 0) {
      return Promise.resolve('temp_sensor');
    }
    return Promise.reject(new Error('Unknown Fhem Device Type'));
  }
}
