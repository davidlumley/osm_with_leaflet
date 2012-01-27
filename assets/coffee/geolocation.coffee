class Geolocation
	
	constructor: ->
		@accuracy	=	30
			
		@options =
			enableHighAccuracy:		true
			timeout:				30000
			maximumAge:				60000
		
		@current_position	=	false
	
	
	position:	->
		unless @current_position
			get_position
		@current_position
	
	get_position:	(callback)		->
		@callback = callback
		navigator.geolocation.getCurrentPosition (position) =>
			@check_position(position)
			@callback(position)
		, (error) =>
			@display_error(error)
		,	@options
		
	
	check_position:	(position) ->
		@current_position	=	position
		
	display_error:	(error)	->
		@current_position	=	false
		errors =
			1:	'Permission denied'
			2:	'Position unavailable'
			3:	'Request timeout'
		
		alert("Error: " + errors[error.code])