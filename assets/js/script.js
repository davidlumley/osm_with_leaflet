var map;
var brisbane = new L.LatLng(-27.46758, 153.027892);

function initmap() {
	map = new L.Map('map');
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © openstreetmap contributors';
	var osm = new L.TileLayer(osmUrl,{minZoom:1, maxZoom:15, attribution: osmAttrib});

	map.setView(brisbane,8);
	map.addLayer(osm);
}
initmap();