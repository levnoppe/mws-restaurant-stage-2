
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  'js/main.js',
  //'js/sw2.js',
  'js/restaurant_info.js',
  'js/dbhelper.js',
  'idb.js',
  'js/idb2.js',
  'css/styles.css',
  'img/1-small.jpg',
  'img/2-small.jpg',
  'img/3-small.jpg',
  'img/4-small.jpg',
  'img/5-small.jpg',
  'img/6-small.jpg',
  'img/7-small.jpg',
  'img/8-small.jpg',
  'img/9-small.jpg',
  'img/10-small.jpg',
  'img/1-medium.jpg',
  'img/2-medium.jpg',
  'img/3-medium.jpg',
  'img/4-medium.jpg',
  'img/5-medium.jpg',
  'img/6-medium.jpg',
  'img/7-medium.jpg',
  'img/8-medium.jpg',
  'img/9-medium.jpg',
  'img/10-medium.jpg',
  'img/1-large.jpg',
  'img/2-large.jpg',
  'img/3-large.jpg',
  'img/4-large.jpg',
  'img/5-large.jpg',
  'img/6-large.jpg',
  'img/7-large.jpg',
  'img/8-large.jpg',
  'img/9-large.jpg',
  'img/10-large.jpg',
  //'data/restaurants.json',
  'http://localhost:1337/restaurants/',
  'restaurant.html?id=1',
  'restaurant.html?id=2',
  'restaurant.html?id=3',
  'restaurant.html?id=4',
  'restaurant.html?id=5',
  'restaurant.html?id=6',
  'restaurant.html?id=7',
  'restaurant.html?id=8',
  'restaurant.html?id=9',
  'restaurant.html?id=10',
  //'//normalize-css.googlecode.com/svn/trunk/normalize.css',
  'index.html',
  'restaurant.html'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
        console.log(cache);
      })
  );
});


// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         console.log(response);
//         // Cache hit - return response
//         if (response) {
//           return response;

//         }
//         return fetch(event.request);
//       }
//     )
//   );
// });

self.addEventListener('fetch', function (event) {
//   const url = new URL(event.request.url);
// console.log(url);
//   if (url.pathname.startsWith('/restaurant.html')) {
//     event.respondWith(
//       caches.match('restaurant.html')
//         .then(response => response || fetch(event.request))
//     );
//     return;
//   };



  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        };

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
