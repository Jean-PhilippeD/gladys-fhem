var Promise = require('bluebird');

var temperature = {
  name: 'Température',
  type: 'temperature',
  sensor: true,
  tag: 'temperature',
  unit: '°C',
  min: -20,
  max: 60
}

var humidity = {
  name: 'Humidité',
  type: 'humidity',
  sensor: true,
  tag: 'humidity',
  unit: '%',
  min: 0,
  max: 100
}

var brightness = {
  name: 'Luminosité',
  type: 'brightness',
  sensor: true,
  tag: 'brightness',
  unit: 'Lux',
  min: 0,
  max: 2048
}

var motion = {
  name: 'Mouvement',
  type: 'motion',
  sensor: true,
  tag: 'motion',
  unit: '',
  min: 0,
  max: 1
}

var contact = {
  name: 'Porte',
  type: 'contact',
  sensor: true,
  tag: 'contact',
  unit: '',
  min: 0,
  max: 1
}

var actuator = {
  name: 'Interrupteur',
  type: 'binary',
  sensor: false,
  tag: 'actuator',
  unit: '',
  min: 0,
  max: 1
}

var switchs = {
  name: 'Switch',
  type: 'switch',
  sensor: false,
  tag: 'switch',
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
      names.push(contact.name);
    } 
    if(device.id.indexOf('motion') > -1) {
      types.push(motion);
      names.push(motion.name);
    }
    if(device.id.indexOf('brightness') > -1) {
      types.push(brightness);
      names.push(brightness.name);
    }
    if(device.id.indexOf('humidity') > -1) {
      types.push(humidity);
      names.push(humidity.name);
    }
    if(device.id.indexOf('temperature') > -1) {
      types.push(temperature);
      names.push(temperature.name);
    }
    if(device.id.indexOf('switch') > -1) {
      types.push(switchs);
      names.push(switchs.name);
    }
    if(device.id.indexOf('actuator') > -1) {
      types.push(actuator);
      names.push(actuator.name);
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
    if (types.length > 0) {
      return Promise.resolve(type); 
    } else {
     return Promise.reject(new Error('Unknown Fhem Device Type'));
    }
  },

  temperature: temperature,
  humidity: humidity,
  brightness: brightness,
  contact: contact,
  actuator: actuator,
  switchs: switchs,
  motion: motion
  
}
