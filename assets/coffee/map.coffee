class Map
	
	constructor: (el)->
		@map			=	new L.Map(el)
		
		@base_map		=	global.slippy_map
		
		@add_tile_layer(@base_map.url, @base_map.options)
		
		@map.setView(@base_map.view,8);
	
	add_tile_layer: (url, options) ->
		layer = new L.TileLayer(url, options)
		@map.addLayer(layer)
	
