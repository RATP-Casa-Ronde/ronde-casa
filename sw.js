const cacheName = 'ronde-casa-v1';
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

// Installation : Mise en cache des fichiers
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

// Interception des requêtes : Si pas de réseau, on utilise le cache
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
