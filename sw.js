var CACHE = "le-mie-ore-v3";
var ASSETS = [
  "./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png",
  "./apple-touch-icon.png", "./calendario-condiviso.html", "./manifest-condiviso.json",
  "./firebase-config.js"
];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

// Rete prima, cache come ripiego (offline): gli aggiornamenti dell'app arrivano subito
self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  if(new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request, { cache: "no-cache" }).then(function(resp){
      if(resp && resp.ok){
        var copy = resp.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
      }
      return resp;
    }).catch(function(){
      return caches.match(e.request).then(function(cached){
        return cached || caches.match("./index.html");
      });
    })
  );
});
