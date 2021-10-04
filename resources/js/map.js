var map = L.map('map').setView([-36.8559686, 174.7665161], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

var markers = {
	"The University of Auckland": [-36.8559686, 174.7665161],
	"Datacom Wellington": [-41.2878575,174.7757546],
	"Arup Melbourne": [-37.8201796,144.9489899],
	"Victorian Department of Health": [-37.8092842,144.9685031],
	"Walter and Eliza Hall Institute of Medical Research": [-37.7980557,144.9538493]
}
var minlat = Infinity
var minlong = Infinity
var maxlat = -Infinity
var maxlong = -Infinity
for (let [name, coords] of Object.entries(markers)) {
	// add markers to map
	L.marker(coords).addTo(map).bindPopup(name);
	// calculate bounds
	minlat = Math.min(minlat, coords[0]);
	minlong = Math.min(minlong, coords[1]);
	maxlat = Math.max(maxlat, coords[0]);
	maxlong = Math.max(maxlong, coords[1]);
}
bbox = [[minlat, minlong], [maxlat, maxlong]];

document.getElementById('mapModal').addEventListener('shown.bs.modal', function (event) {
	map.invalidateSize();
	map.fitBounds(bbox);
})