'use strict';

function debug(str) {
  console.log(' -*- ServiceWorkers - Worker -*-: ' + str + '\n');
}

self.addEventListener('install', function(e) {
  debug('Install event');
});

self.addEventListener('activate', function(e) {
  debug('Activate event');
});

self.addEventListener('fetch', function(e) {
  debug('Fetch event');
  var clients = this.clients;

  clients.claim().then(function(algo1, algo2) {
    debug('algo1: ' + algo1);
    debug('algo2: ' + algo2);
  }).catch(function(error) {
    debug('Error calling claim: ' + error);
  });

  clients.matchAll().then(function (clients) {
    debug('Clients found: ' + clients.length);
    for (var i = 0; i < clients.length; i++) {
      debug("Client Id: " + clients[i].id);
    }
  }).catch(function (error) {
    debug('Error calling matchAll');
  });
});

function testOpenWindow() {
  clients.openWindow('/open_window.html').then(function(result) {
    debug(result);
  }).catch(function (error) {
    debug('Error during openWindow: ' + error);
  });
}

/*
function getNotificationClickAndExecute(callback) {
  var callback_wrapper = function(e) {
    self.removeEventListener('notificationclick', callback_wrapper);
    e.notification.close();
    callback(e);
  }
  self.addEventListener('notificationclick', callback_wrapper);

  self.registration.showNotification('test');
}

function testOpenWindow() {
  getNotificationClickAndExecute(function(e) {
    // This is using waitUntil() to work around a bug that has a fix
    // waiting for review in https://codereview.chromium.org/896043004
    e.waitUntil(clients.getAll().then(function() {
      clients.openWindow('http://www.google.com')
      .then(function(result) {
        console.log(result);
      });
    }));
  });
}
*/

self.onmessage = function(e) {
  debug('Message received: ' + e.data);
  switch (e.data) {
    case 'openWindow':
      testOpenWindow();
      break;
    default:
      debug('Received unknown message');
  }
}
