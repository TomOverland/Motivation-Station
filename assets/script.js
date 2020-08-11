
// ------------------- Google Maps ------------------
//use mapLat & mapLng to define the search locations from the national park response
let mapLat;
let mapLng;

//initialize and add the map
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    //change lat & lng - same note as line 5
    //used placeholder lat lng from yellowstone ntl park
    center: { lat: 44.4280, lng: -110.5885 },
    zoom: 8
  });
}

// ------------------- National Park Service API ----------------
const stateArr = "CA";

const parksAPI = 'Quk7HRe6sAdTvcwxZOA6wxEoqK4orHEXoYBKts9n';
let parksQueryURL = 'https://api.nps.gov/api/v1/parks?stateCode=' + stateArr + '&api_key=' + parksAPI;
// defining stateArr in global scope as an empty string, 
// as it will later be reassigned within the event delegation function
// and used in the .ajax query


//ajax call to obtain national park data
$.ajax({
    url: parksQueryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(parksQueryURL);
    let results = response.list
    //each new search will clear the previous, we will need to assign a current id
    // $("#current").empty();
  
});

//--------------------- event delegation --------------------------
$('search-btn').on('click', function() {
    //stops form from "submitting"
    event.preventDefault();
    stateArr = $('city-search').text.val();
    //test console.log
    console.log(stateArr);
        
})