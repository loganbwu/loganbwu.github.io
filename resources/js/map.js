var map = L.map('map').setView([-36.8559686, 174.7665161], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

L.marker([-36.8559686, 174.7665161]).addTo(map).bindPopup("The University of Auckland");
L.marker([	-37.814451,144.9702478]).addTo(map).bindPopup("Arup Melbourne");

document.getElementById('mapModal').addEventListener('shown.bs.modal', function (event) {
	map.invalidateSize();
})