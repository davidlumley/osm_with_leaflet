class Map
	
	constructor: (el)->
		@map			=	new L.Map(el)
		
		@config			=	global.slippy_map
		
		@add_tile_layer(@config.url, @config.options)
		
		@map.setView(@config.view,1)
	
	#	z/x/y format
	#	http://{s}.somedomain.com/folder/{z}/{x}/{y}.png
	add_tile_layer: (url, options) ->
		layer = new L.TileLayer(url, options)
		@map.addLayer(layer)
	
		
	add_wms_layer:	(url, options) ->
		layer = new L.TileLayer.WMS(url, options)
		@map.addLayer(layer)
	
	
	add_marker: (latitude, longitude) ->
		location = new L.LatLng(latitude, longitude)
		marker = new L.Marker(location)
		@map.addLayer(marker)
	
		
	add_texture: (texture) ->
		@map.addLayer(image)
	
	set_view: (latitude, longitude) ->
		view = new L.LatLng(latitude, longitude)
		@map.setView(view,10)
