var mapDiv = document.createElement('div');
var map = new google.maps.Map(mapDiv);

module.exports = new google.maps.places.PlacesService(map);