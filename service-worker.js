'use strict';

var version = 39;

function debug(str) {
  dump(' -*- ServiceWorkers - Worker -*-: ' + str + '\n');
  console.log(' -*- ServiceWorkers - Worker -*-: ' + str + '\n');
}

self.addEventListener('install', function(e) {
  debug('Install event');
  debug('Install version ' + version);
});

self.addEventListener('activate', function(e) {
  debug('Activate event');
});

var cli;

self.addEventListener('fetch', function(e) {
  debug("Fetch event for asdasdasd");
  debug('Fetch event for: ' + e.request.url);
  debug("Fetch event for asdasdasd");
//  event.respondWith(new Response("Hello world!"));


  debug("Fetch event for asdasdasd 1,5 " + document);
  debug("Fetch event for asdasdasd 1,5 " + document.implementation);
  var xmlDoc  = document.implementation.createDocument(null, null, null);
  debug("Fetch event for asdasdasd 2");
  debug(xmlDoc);
  var result = xmlDoc.load('test.xml');
//  var result = xmlDoc.load('http://www.w3schools.com/xml/note.xml');
  debug("xmlDoc.load result sw: " + result);



});

function testOpenWindow() {
//  clients.openWindow('about:blank').then(function(result) {
  clients.openWindow('/open_window.html').then(function(result) {
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

function testMatchAll() {
  clients.matchAll({includeUncontrolled: true, type: 'all'}).then(function (result) {
    debug('Clients found: ' + result.length);
    for (var i = 0; i < result.length; i++) {
      debug("Client Id: " + result[i].id);
      debug("Client url: " + result[i].url);
      debug("Client frameType: " + result[i].frameType);
    }
  }).catch(function (error) {
    debug('Error calling matchAll');
  });
}

self.onmessage = function(e) {
  debug('Message received ' + version + ': ' + e.data);
  switch (e.data) {
    case 'openWindow':
      testOpenWindow();
      break;
    case 'client':
      testClient();
      break;
    case 'matchAll':
      testMatchAll();
      break;
    default:
      debug('Received unknown message');
  }
}
