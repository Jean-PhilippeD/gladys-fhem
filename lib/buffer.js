var Promise = require('bluebird');

module.exports = {
  parseDevices: function(data) {
    var devices = [];
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

        // Get device name and device protocol
        devices.push({id: parts[0].trim(), protocol: lastHeader, value: parts[2].trim()});
        sails.log.info('Found new FHEM device: ' + parts[0].trim());
      }
    );
	
    return new Promise(function(resolve, reject){
      resolve(devices);
    });
  }    
};
