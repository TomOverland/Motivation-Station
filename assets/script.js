
// -------------------Google Maps------------------
//initialize and add the map
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}

// -------------------National Park Service API ----------------

let parksAPI = Quk7HRe6sAdTvcwxZOA6wxEoqK4orHEXoYBKts9n;
