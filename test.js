'use strict';

function debug(str) {
  dump(' -*- ServiceWorkers -*-: ' + str + '\n');
}

function debug_separator() {
  debug('');
  dump(' -*- ServiceWorkers -*-: ----------------------------\n');
}

(function() {

  // Check service workers availability
  if (!('serviceWorker' in navigator)) {
    debug('ServiceWorker NOT found in navigator');
  }

  // Check ServiceWorkerContainer
  var register_btn = document.querySelector('#check_container_btn');
  register_btn.addEventListener('click', function(e) {
    debug_separator();
    var worker = navigator.serviceWorker.controller;
    debug('ServiceWorker (controller): ' + worker);
    for (var i in worker) {
      debug('  ' + i + ' - ' + worker[i]);
    }

    navigator.serviceWorker.ready.then(function(registration) {
      debug('Registration ready: ' + registration);
      for (var i in registration) {
        debug('  ' + i + ' - ' + registration[i]);
      }
    });
  });

  // Register action
  var register_btn = document.querySelector('#register_btn');
  register_btn.addEventListener('click', function(e) {
    debug_separator();
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

  // Get registrations action
  var get_registrations_btn = document.querySelector('#get_registrations_btn');
  get_registrations_btn.addEventListener('click', function(e) {
    debug_separator();
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      debug(registrations.length + ' registration/s found');
      registrations.forEach(function (registration) {
        debug('');
        debug('Scope: ' + registration.scope);
        var sw = registration.installing || registration.waiting || registration.active;
        if (sw) {
          debug('Script URL: ' + sw.scriptURL);
        }
      });
    });
  });

  // Get registration action
  var get_registration_btn = document.querySelector('#get_registration_btn');
  get_registration_btn.addEventListener('click', function(e) {
    var clientUrl = document.querySelector('#getRegClientURL').value;
    debug_separator();
    navigator.serviceWorker.getRegistration(clientUrl).then(function(registration) {
      debug(registration);
      debug('');
      debug('Scope: ' + registration.scope);
      var sw = registration.installing || registration.waiting || registration.active;
      if (sw) {
        debug('Script URL: ' + sw.scriptURL);
      }
    });
  });

  // Unregister one action
  var unregister_btn = document.querySelector('#unregister_one_btn');
  unregister_btn.addEventListener('click', function(e) {
    var clientUrl = document.querySelector('#clientURL');
    debug_separator();
    navigator.serviceWorker.getRegistration(clientUrl).then(function(registration) {
      registration.unregister();
      debug('Unregister done');
    });
  });

  // Unregister all action
  var unregister_all_btn = document.querySelector('#unregister_all_btn');
  unregister_all_btn.addEventListener('click', function(e) {
    debug_separator();
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      registrations.forEach(function (registration) {
        registration.unregister();
        debug('Unregister done');
      });
    });
  });
}());
