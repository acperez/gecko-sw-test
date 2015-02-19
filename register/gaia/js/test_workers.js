
'use strict';

function debug(str) {
  console.log(' -*- ServiceWorkers -*-: ' + str + '\n');
}

const UI = (function() {

  if ('serviceWorker' in navigator) {
    debug('ServiceWorker found in navigator');
    debug('Controller found: ' + navigator.serviceWorker.controller);

    navigator.serviceWorker.register('service-worker.js', {scope: './'}).then(function(registration) {
      debug('Service-worker registered');

      var serviceWorker;
      if (registration.installing) {
        serviceWorker = registration.installing;
        debug('registration -> installing');
      } else if (registration.waiting) {
        serviceWorker = registration.waiting;
        debug('registration -> waitting');
      } else if (registration.active) {
        serviceWorker = registration.active;
        debug('registration -> active');
      }

//        if (serviceWorker) {
//          logState(serviceWorker.state);
//          serviceWorker.addEventListener('statechange', function(e) {
//            logState(e.target.state);
//          });
//      }
    }).catch(function(error) {
      debug('Error during registration: ' + error);
    });
  } else {
    debug('ServiceWotker NOT found in navigator');
  }

}());
