var Promise = require('bluebird');

var temperature = {
  type: 'temperature',
  sensor: true,
  tag: 'temperature',
  unit: '°C',
  min: -20,
  max: 60
}

var humidity = {
  type: 'humidity',
  sensor: true,
  tag: 'humidity',
  unit: '%',
  min: 0,
  max: 100
}

var brightness = {
  type: 'brightness',
  sensor: true,
  tag: 'brightness',
  unit: 'Lux',
  min: 0,
  max: 2048
}

var motion = {
  type: 'binary',
  sensor: true,
  tag: 'motion',
  unit: '',
  min: 0,
  max: 1
}

var contact = {
  type: 'binary',
  sensor: true,
  tag: 'contact',
  unit: '',
  min: 0,
  max: 1
}

var actuator = {
  type: 'binary',
  sensor: false,
  tag: 'actuator',
  unit: '',
  min: 0,
  max: 1
}

var switchs = {
  type: 'switchs',
  sensor: false,
  tag: 'switchs',
  unit: '',
  min: 1,
  max: 4
}




module.exports = {
  get: function(device) {

    var type = false;
    var types = [];
    var names = [];
  
    if(device.id.indexOf('contact') > -1) {
      types.push(contact);
      names.push('Ouverture de porte');
    } 
    if(device.id.indexOf('motion') > -1) {
      types.push(motion);
      names.push('Mouvement');
    }
    if(device.id.indexOf('brightness') > -1) {
      types.push(brightness);
      names.push('Luminosité');
    }
    if(device.id.indexOf('humidity') > -1) {
      types.push(humidity);
      names.push('Humidité');
    }
    if(device.id.indexOf('temperature') > -1) {
      types.push(temperature);
      names.push('Température');
    }
    if(device.id.indexOf('switchs') > -1) {
      types.push(switchs);
      names.push('Switch');
    }
    if(device.id.indexOf('actuator') > -1) {
      types.push(actuator);
      names.push('Interrupteur');
    }
  
    // Is device with mnutiple sensors
    if (types.length > 1) {
      var name = names.join(' - ');
    } else {
      var name = names[0];
    }
  
    type =  {
      device: {
        name: name,
        protocol: device.protocol,
        service: 'fhem',
        identifier: device.id
      },
      types: types
    }
    if (type) return Promise.resolve(type); 
    if (!type) return Promise.reject(new Error('Unknown Fhem Device Type'));
  },

  temperature: temperature,
  humidity: humidity,
  brightness: brightness,
  contact: contact,
  actuator: actuator,
  switchs: switchs,
  motion: motion
  
}
