const CACHE_NAME='sparfuchs-mobil-v1.2';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sparfuchs-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const url=new URL(e.request.url);if(url.origin!==self.location.origin)return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html')));return}e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)))});
