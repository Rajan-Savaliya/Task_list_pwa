// TODO: simple pwa with-->no offlice suppoert //
// install service worker
// self.addEventListener('install', evt => {
//     console.log('service work has been installed');
// });

// //activated event
// self.addEventListener('install', evt => {
//     console.log('serive work has been actived');
// });


// //fetch evnt
// self.addEventListener('activate', evt => {
//     // console.log('fetch event', evt);
// });
//TODO:------------------------------------------//







const staticCacheName = 'site-static';
const assets = [
    "/",
    "/index.html",
    "/js/app.js",
    "/js/ui.js",
    "/js/materialize.min.js",
    "/css/materialize.min.css",
    "https://use.fontawesome.com/de712e67b6.js",
    "https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];


// install event
self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
      caches.open(staticCacheName).then((cache) => {
        console.log('caching shell assets');
        cache.addAll(assets);
      })
    );
  });
  
  // activate event
  self.addEventListener('activate', evt => {
    //console.log('service worker activated');
      evt.waitUntil(
          caches.keys().then(keys => {
            //   console.log(keys);
              return Promise.all(keys
                  .filter(key => key !== staticCacheName)
                  .map(key => caches.delete())
              )
          })
      )
  });
  
  // fetch event
  self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request);
      })
    );
  });