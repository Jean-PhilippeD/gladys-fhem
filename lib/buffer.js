var Promise = require('bluebird');
var async = require('async');

var type = require('./type.js');
var state = require('./state.js');

module.exports = {
  parseDevices: function(data) {
    var arrays = [];
    var lastHeader;
    var allLines = data.toString().split("\n");

    allLines.forEach(function (line)
      {
        line = line.trim();
        // ignore empty lines
        if (line == '') {
          return;
        };
        // ignore headers
        if (line.substr(line.length - 1) == ':')
        {
          lastHeader = line.substr(0, line.length - 1);
          return;
        };
        // ignore telnet infos
        if (line.indexOf('telnet') >= 0) {
          return;
        };
        // ignore autocreate infos
        if (line.indexOf('autocreate') >= 0) {
          return;
        };
        // ignore WebFhem infos
        if (line.indexOf('WEB') >= 0) {
          return;
        };
        // ignore LogFile infos
        if ((line.substr(0, 7) == 'FileLog') || (line.indexOf('Logfile') >= 0)) {
          return;
        };
        // ignore SVG infos
        if (line.substr(0, 3) == 'SVG') {
          return;
        };
        // ignore TCM infos
        if (line.substr(0, 3) == 'TCM') {
          return;
        };
        // ignore unpeered values
        if (line.indexOf('unpeered') >= 0) {
          return;
        };
       // ignore global values
        if (line.indexOf('global') >= 0) {
          return;
        };
       // ignore eventTypes values
        if (line.indexOf('eventTypes') >= 0) {
          return;
        };
        // ignore initialUsbCheck values
        if (line.indexOf('initialUsbCheck') >= 0) {
          return;
        };
        // ignore generic information lines infos
        if ((line.indexOf('Bye...') >= 0) || (line.indexOf('Type list') >= 0) || (line.indexOf('Connection closed by') >= 0))  {
          return;
        };
        var parts = line.split(/(\(|\))/g);

        // Get array name and array protocol
        arrays.push({id: parts[0].trim(), protocol: lastHeader, value: parts[2].trim()});
        sails.log.info('Found new FHEM device: ' + parts[0].trim());
      }
    );
	
    return new Promise(function(resolve, reject){
      resolve(arrays);
    });
  },

  receivedValue: function(allLines) {
    var index = 0; // Index for number of lines
    allLines.forEach(function (line)
    {
      var array = [];
      var val = false;

      line = line.trim().split(' ');
      if (line.length > 1)
      {
        if ((line.indexOf('humidity:') > -1) || (line.indexOf('temperature:') > -1) || (line.indexOf('brightness:') > -1) || (line.indexOf('motion:') > -1)) {
          val = {protocol: line[0], id: line[1], value: line[3], type: type[line[2].replace(':','')].type};
        }
        if (((line.indexOf('channel1:') > -1) || (line.indexOf('channel0:') > -1)) && index >0) {
          val = {protocol: line[0], id: line[1], value: line[3], type: type.actuator.type};
        }

        if ((line.indexOf('closed') > -1) || (line.indexOf('open') > -1)) {
          val = {protocol: line[0], id: line[1], value: line[2], type: type.contact.type};
        }

        if (((line.length === 3) && ((line.indexOf('AI') > -1) || (line.indexOf('A0') > -1) || (line.indexOf('B0') > -1) || (line.indexOf('BI') > -1))) && index > 0) {
          val = {protocol: line[0], id: line[1], value: line[2], type: type.switchs.type};
        }

        if (((array.length == 0) || (array.indexOf(val <=0))) && val) {
          array.push(val);
        }
        index += 1;

      }
      async.map(array, function store(item) {
        state.sanitize(item.value)
        .then(function(val) {
          item.value = val;
         // return type.get(item)
       // })
      //  .then(function(devicetype) {
           return gladys.deviceState.createByIdentifier(item.id, 'fhem', item.type, {value:item.value});
        })
        .catch(function(err) {
          sails.log.warn(err);
          return Promise.reject(err);
        });
      });
    });
  },
};
