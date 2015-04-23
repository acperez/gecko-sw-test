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

var cli;

self.addEventListener('fetch', function(e) {
  debug('Fetch event');
  var clients = this.clients;
  cli = clients;

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
      debug("Client url: " + clients[i].url);
      debug("Client frameType: " + clients[i].frameType);
      debug("Client postmessafe: " + clients[i].postMessage);
      client[i].postMessage('hola');
    }
  }).catch(function (error) {
    debug('Error calling matchAll');
  });
});

function testOpenWindow() {
//  clients.openWindow('about:blank').then(function(result) {
  clients.openWindow('/open_window.htmll').then(function(result) {
//  clients.openWindow('http://www.google.com').then(function(result) {
    debug("testOpenWindow: " + result);
    for (var a in result) {
      debug('-->' + a + ' - ' + result[a]);
    }

    setTimeout(function(){ debug("Hello " + result.url); }, 1000);
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

function testClient() {
  debug(cli);
  cli.matchAll().then(function (clients) {
    debug('Clients found: ' + clients.length);
    for (var i = 0; i < clients.length; i++) {
      debug("Client Id: " + clients[i].id);
      debug("Client url: " + clients[i].url);
      debug("Client frameType: " + clients[i].frameType);
      debug('Client visibilityState: ' + clients[i].visibilityState);
      debug('Client focused: ' + clients[i].focused);
      if(!clients[i].focus) {
        clients[i].focus();
      }
      clients[i].postMessage('I am a service worker!');
    }
  }).catch(function (error) {
    debug('Error calling matchAll');
  });
}

self.onmessage = function(e) {
  debug('Message received 4 testing : ' + e.data);
  switch (e.data) {
    case 'openWindow':
      testOpenWindow();
      break;
    case 'client':
      testClient();
      break;
    default:
      debug('Received unknown message');
  }
}
