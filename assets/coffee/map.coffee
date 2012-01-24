class Map
	
	constructor: (el)->
		@map			=	new L.Map(el)
		
		@base_map		=	global.slippy_map
		
		@add_tile_layer(@base_map.url, @base_map.options)
		min_lat = -90
		max_lat = 90
		min_lon = -180
		max_lon = 180
		
		@map.setView(@base_map.view,8)
	
	add_tile_layer: (url, options) ->
		layer = new L.TileLayer(url, options)
		@map.addLayer(layer)
	
	add_marker: (latitude, longitude) ->
		location = new L.LatLng(latitude, longitude)
		marker = new L.Marker(location)
		@map.addLayer(marker)
		
	add_texture: (texture) ->
		lower_bounds = new L.LatLng(-90, -180)
		upper_bounds = new L.LatLng(-90, -180)
		
		bounds = new L.LatLngBounds(lower_bounds,upper_bounds)
		image = new L.ImageOverlay(texture, bounds)
		
		@map.addLayer(image)
