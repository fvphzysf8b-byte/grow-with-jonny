const C='jonny-v2';
const SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  // App-Seite: zuerst Netz (damit Updates sofort ankommen), offline aus dem Cache
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{const cl=res.clone();caches.open(C).then(c=>c.put('./index.html',cl));return res}).catch(()=>caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(r).then(hit=>{
    const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cl=res.clone();caches.open(C).then(c=>c.put(r,cl))}return res}).catch(()=>hit);
    return hit||net;
  }));
});
