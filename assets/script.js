
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

let parksAPI = 'Quk7HRe6sAdTvcwxZOA6wxEoqK4orHEXoYBKts9n';
let parksQueryURL = 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=' + parksAPI;

$.ajax({
    url: parksQueryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(parksQueryURL);
    //each new search will clear the previous
    $("#current").empty();
  
});