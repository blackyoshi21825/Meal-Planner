const CACHE_NAME = 'cora-app-v1';
const ASSETS_TO_CACHE = [
    '/',
    'index.html',
    'assistant.html',
    'saved-meals.html',
    'styles.css',
    'meals.js',
    'assistant.js',
    'meal-filter.js',
    'page-loader.js',
    'manifest.json',
    'logo.jpeg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    // Network-first for HTML, cache-first for assets
    const request = event.request;
    if (request.method !== 'GET') return;

    if (request.destination === 'document' || request.mode === 'navigate') {
        event.respondWith(
            fetch(request).then(resp => {
                const copy = resp.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
                return resp;
            }).catch(() => caches.match(request).then(r => r || caches.match('index.html')))
        );
    } else {
        event.respondWith(
            caches.match(request).then(cached => cached || fetch(request).then(resp => {
                const copy = resp.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
                return resp;
            })).catch(() => {
                // fallback to cached index.html for navigation-like requests
                return caches.match('index.html');
            })
        );
    }
});
