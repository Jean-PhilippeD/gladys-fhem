var Promise = require('bluebird');
var async = require('async');

var type = require('./type.js');

module.exports = {
  parseDevices: function(data) {
    var arrays = [];
    var lastHeader;
    var allLines = data.toString().split("\n");

    var selLines =[];
    var ln = 0;
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

    allLines.forEach(function (line)
    {
      var array = [];
      line = line.trim().split(' ');
      if (line.length > 1)
      {
        if (line.length === 6)
        {
          array[0] = {device: line[3], value: line[4]};
          array[1] = {device: line[5], value: line[6]};
        }
        if (line.length === 3)
        {
          array[0] = {device: line[1], value: line[2]};
        }
      }
      async.map(array, function store(item) {
        type.get(item.device)
        .then(function(type) {
           return gladys.deviceState.createByIdentifier(item.device, 'fhem', type, item.value);
        })
        .catch(function(err) {
          sails.log.warn(err);
        });
      });
    });
  }
};
