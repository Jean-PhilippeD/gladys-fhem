module.exports = function() {

  var notificationType = {
    service: 'FhemModule'  
  };

  gladys.notification.install(notificationType)
  .then(function(type){
    // new type created !
  })
  .catch(function(err){
    // something bad happened :/ 
  });


  gladys.param.getValue('FHEM_HOST')
  .then(function() {
    // If exist, do nothing
  })
  .catch(function(){
    // If Host doesnt exist, create default value
    gladys.param.setValue({name: 'FHEM_HOST', value: 'localhost'});
  });
  gladys.param.getValue('FHEM_PORT')
    .then(function() {
    // If exist, do nothing
  })
  .catch(function(){
    // If Port doesnt exist, create default value
    gladys.param.setValue({name: 'FHEM_PORT', value: 7072});
  });

  return;
}

