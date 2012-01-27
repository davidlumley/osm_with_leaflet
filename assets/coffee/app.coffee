global = exports ? this

#@codekit-prepend "map.coffee"
#@codekit-prepend "geolocation.coffee"

osm_url		=	"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
osm_attrib	=	"Map data: <a href=\"http://www.openstreetmap.org/\">openstreetmap contributors.</a>"
	
global.slippy_map =
	url:	osm_url
	options:
		minZoom:		1
		maxZoom:		15
		attribution:	osm_attrib
	view:	new L.LatLng(-27.46758, 153.027892)
	bounds:
		lower:	new L.LatLng(-90, -180)
		upper:	new L.LatLng(90, 180)

nexrad =
	url:	"http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi"
	options:
		layers:			"nexrad-n0r-900913"
		format:			"image/png"
		transparent:	true

eea_city_areas =
	url:	"http://discomap.eea.europa.eu/ArcGIS/services/Land/UrbanAtlas_Dyna_WGS84/MapServer/WMSServer"
	options:
		layers:			"2"
		format:			"image/png"
		transparent:	true
#		attribution:	"Overlays: <a href=\"http://www.eea.europa.eu/code/gis\">European Environment Agency</a>"

eea_urban_noise =
	url:	"http://discomap.eea.europa.eu/ArcGIS/services/Noise/UrbanNoise_Dyna_WM/MapServer/WMSServer"
	options:
		layers:			"1"
		format:			"image/png"
		transparent:	true
#		attribution:	"Overlays: <a href=\"http://www.eea.europa.eu/code/gis\">European Environment Agency</a>"


map = new Map('map')
map.add_wms_layer(nexrad.url, nexrad.options)
map.add_wms_layer(eea_city_areas.url, eea_city_areas.options)
map.add_wms_layer(eea_urban_noise.url, eea_urban_noise.options)

callback = (position) ->
	map.add_marker(position.coords.latitude, position.coords.longitude)
	map.set_view(position.coords.latitude, position.coords.longitude)
	
position = new Geolocation
position.get_position(callback)