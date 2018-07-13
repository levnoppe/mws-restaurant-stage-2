

function checkIDB(){
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }
  };

  var dbPromise = 
         idb.open('restaurants-db', 1, function(upgradeDb) {           
        if (!upgradeDb.objectStoreNames.contains('restaurants')) {
          var restaurantsOS =  upgradeDb.createObjectStore('restaurants', {keyPath: 'id'});
          restaurantsOS.createIndex('id', 'id', {unique: false});
        }
      });
    
function IDBRestaurants(data) {
  dbPromise.then(function (db) {
    var tx = db.transaction('restaurants', 'readwrite');
    var restaurantsOS = tx.objectStore('restaurants');

    data.forEach(function (entry) {
      
      var restaurant = {
        id: entry.id,
        name: entry.name,
        neighborhood: entry.neighborhood,
        photograph: entry.photograph,
        address: entry.address,
        latlng: {
          lat: entry.latlng.lat,
          lng: entry.latlng.lng
        },
        cuisine_type: entry.cuisine_type,
        operating_hours: {
          'Monday': entry.operating_hours.Monday.hours,
          'Tuesday': entry.operating_hours.Tuesday.hours,
          'Wednesday': entry.operating_hours.Wednesday.hours,
          'Thursday': entry.operating_hours.Thursday.hours,
          'Friday': entry.operating_hours.Friday.hours,
          'Saturday': entry.operating_hours.Saturday.hours,
          'Sunday': entry.operating_hours.Sunday.hours
        },
        reviews: [{
          name: entry.reviews.name,
          date: entry.reviews.date,
          rating: entry.reviews.rating,
          comments: entry.reviews.comments
        }],

      };
      restaurantsOS.add(restaurant);
      return tx.complete;
    }).then(function () {
      console.log('added restaurants to the IDB!');
    });
  })
};
function getIDBRestaurant(){
  dbPromise.then(function (db) {
    var tx = db.transaction('restaurants', 'readonly');
    var store = tx.objectStore('restaurants');    
    return store.getAll();    
  }).then(function(val) {
    //console.log(val);
    return val;
  });
  
}
              
  