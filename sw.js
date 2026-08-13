const CACHE_NAME = 'financas-pro-v1';
const ASSETS_TO_CACHE = [
'./',
'./index.html',
'./manifest.json',
'./logo.png'
];

// Instalação do Service Worker e salvamento de arquivos no cache
self.addEventListener('install', (e) => {
e.waitUntil(
caches.open(CACHE_NAME).then((cache) => {
return cache.addAll(ASSETS_TO_CACHE);
})
);
self.skipWaiting();
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (e) => {
e.waitUntil(
caches.keys().then((keyList) => {
return Promise.all(
keyList.map((key) => {
if (key !== CACHE_NAME) {
return caches.delete(key);
}
})
);
})
);
self.clients.claim();
});

// Interceptação de requisições para responder offline via cache
self.addEventListener('fetch', (e) => {
e.respondWith(
caches.match(e.request).then((response) => {
return response || fetch(e.request);
})
);
});
