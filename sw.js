// Service worker for' Progressive Web App

const cacheName = 'porto-v1';
const staticAssets = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/index.js',
    '/img/dev-joel-01.jpg',
    '/img/dev-joel-02.jpg',
    '/img/devjoel.png',
    '/img/icon_192.png',
    '/img/icon_512.png',
    '/img/portfolio-01.jpg',
    '/img/portfolio-02.jpg',
    '/img/portfolio-03.jpg',
    '/img/portfolio-04.jpg',
    '/img/portfolio-05.jpg',
    '/img/portfolio-06.jpg',
    '/img/portfolio-07.jpg',
    '/img/portfolio-08.jpg',
    '/img/portfolio-09.jpg',
    '/img/portfolio-10.jpg',
    '/img/services-bg.jpg',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.css',
    'https://fonts.googleapis.com/css?family=Lora:400,700|Roboto+Slab:400,700&display=swap'
];

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    console.log('caching assets');
    return self.skipWaiting();
});

self.addEventListener('fetch', async e => {
    const req = e.request;
    const url = new URL(req.url);

    if (url.origin === location.origin){
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req){
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
};

async function networkAndCache(req){
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch (req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e){
        const cached = await cache.match(req);
        return cached;
    }
};
