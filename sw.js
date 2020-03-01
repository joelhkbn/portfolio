// Service worker for' Progressive Web App

const cacheName = 'porto-v1';
const staticAssets = [
    './',
    './index.html',
    './css/style.css',
    './js/index.js',
    './manifest.json',
    './img',
    '/dev-joel-01.jpg',
    '/dev-joel-02.jpg',
    '/devjoel.png',
    '/icon_192.png',
    '/icon_512.png',
    '/portfolio-01.jpg',
    '/portfolio-02.jpg',
    '/portfolio-03.jpg',
    '/portfolio-04.jpg',
    '/portfolio-05.jpg',
    '/portfolio-06.jpg',
    '/portfolio-07.jpg',
    '/portfolio-08.jpg',
    '/portfolio-09.jpg',
    '/portfolio-10.jpg',
    '/services-bg.jpg',
];



self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.add(staticAssets);
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