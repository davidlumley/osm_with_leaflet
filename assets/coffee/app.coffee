global = exports ? this

#@codekit-prepend "map.coffee"

global.slippy_map_url		=	"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
global.slippy_map_options	=
	minZoom:		1
	maxZoom:		15
	attribution:	'Map data © openstreetmap contributors'
	
global.slippy_map =
	url:	"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
	options:
		minZoom:		1
		maxZoom:		15
		attribution:	'Map data © openstreetmap contributors'
	view:	new L.LatLng(-27.46758, 153.027892);

new Map('map')