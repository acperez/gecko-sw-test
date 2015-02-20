'use strict';

function debug(str) {
  dump(' -*- ServiceWorkers -*-: ' + str + '\n');
}

(function() {

  // Check service workers availability
  if (!('serviceWorker' in navigator)) {
    debug('ServiceWorker NOT found in navigator');
  }

  // Register action
  var register_btn = document.querySelector('#register_btn');
  register_btn.addEventListener('click', function(e) {
    debug('');
    navigator.serviceWorker.register('service-worker.js', {scope: './'}).then(function(registration) {
      debug('Service-worker register success');

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
    }).catch(function(error) {
      debug('Error during registration: ' + error);
    });
  });

  // Unregister action
  var unregister_btn = document.querySelector('#unregister_btn');
  unregister_btn.addEventListener('click', function(e) {
    debug('');
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      registrations.forEach(function (registration) {
        registration.unregister();
        debug('Unregister done');
      });
    });
  });
}());
