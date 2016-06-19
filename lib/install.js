var Promise = require('bluebird');
var async = require('async');

module.exports = function() {

  async.parallel([
    function(cb) {
      gladys.param.getValue('FHEM_HOST')
      .then(function() {cb();})// If exist, do nothing})
      .catch(function(){
        // If Host doesnt exist, create default value
        gladys.param.setValue({name: 'FHEM_HOST', value: 'localhost'})
        .then(function() {cb();})
        .catch(function(err) {cb(err);});
      });
    },
    function(cb) {
      gladys.param.getValue('FHEM_PORT')
      .then(function() {cb();})// If exist, do nothing})
      .catch(function(){
        // If Port doesnt e{xist, create default value
        gladys.param.setValue({name: 'FHEM_PORT', value: 7072})
        .then(function() {cb();})
        .catch(function(err) {cb(err);});
      });
    }
  ], function(err) {
    if(err) {
      sails.log.warn(err);
      return Promise.reject(err);
    }
    return Promise.resolve();
  });
}

