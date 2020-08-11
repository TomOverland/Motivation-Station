
// -------------------Google Maps------------------
//defining map variable in global scope
var map;
//initialize and add the map
function initMap() {
    //the location we are seeking
    var locationName = {lat: -25.344, lng: 131.036};
    //the map, centered at the location defined in above variable
    map = new google.maps.Map($('#map'), {zoom: 4, center locationName});
    //the marker, positioned at the location defined on line 6
    var marker = new google.maps.Marker({position: locationName, map: map});
}
// -------------------National Park Service API ----------------

