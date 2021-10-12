var map = L.map('map').setView([-36.8559686, 174.7665161], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

/* R code for Google geocoding
Sys.setenv(GMAPS_API_KEY = "...")
mp_geocode(
    addresses = "Datacom Wellington",
    key = Sys.getenv("GMAPS_API_KEY")
) %>%
    mp_get_points()
*/

var markers = {
	"The University of Auckland": [-36.85594, 174.7666],
	"Datacom": [-41.28786,174.7779],
	"Deloitte": [-36.8461,174.7669],
	"Harmonic Analytics": [-36.85343,174.7614],
	"Arup": [-37.82018,144.9512],
	"Victorian Department of Health": [-37.80929,144.9707],
	"Walter and Eliza Hall Institute of Medical Research": [-37.79806,144.956]
}

// Draw geodesics between markers
const options = {
	color: "var(--highlight)"
};
for (i = 0; i < (Object.entries(markers).length - 1); i++) {
	new L.Geodesic([Object.values(markers)[i], Object.values(markers)[i+1]],
		options).addTo(map);
}

// Calculate bounds
var minlat = Infinity
var minlong = Infinity
var maxlat = -Infinity
var maxlong = -Infinity
for (let [name, coords] of Object.entries(markers)) {
	minlat = Math.min(minlat, coords[0]);
	minlong = Math.min(minlong, coords[1]);
	maxlat = Math.max(maxlat, coords[0]);
	maxlong = Math.max(maxlong, coords[1]);
}
var bbox = [[minlat, minlong], [maxlat, maxlong]];

// Add marker cluster
var marker_cluster = L.markerClusterGroup({
	maxClusterRadius: 20
});
for (let [name, coords] of Object.entries(markers)) {
	// add marker to cluster
	marker_cluster.addLayer(L.marker(coords).bindPopup(name));
}
var added_markers = false;

// Recalculate map size when the modal is opened so correct tile areas are loaded
document.getElementById('mapModal').addEventListener('shown.bs.modal', function (event) {
	map.invalidateSize();
	map.fitBounds(bbox, {padding: [50, 50]});
	if (!added_markers) {
		map.addLayer(marker_cluster);
		added_markers = true;
	}
})