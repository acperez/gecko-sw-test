'use strict';

function debug(str) {
  dump(' -*- ServiceWorkers - Worker -*-: ' + str + '\n');
}

self.addEventListener('install', function(e) {
  debug('Install event');
});

self.addEventListener('activate', function(e) {
  debug('Activate event');
});

self.addEventListener('fetch', function(e) {
  debug('Fetch event');
});
