(function() {
  var Map, global, map, oms_attrib, oms_url;

  Map = (function() {

    function Map(el) {
      var max_lat, max_lon, min_lat, min_lon;
      this.map = new L.Map(el);
      this.base_map = global.slippy_map;
      this.add_tile_layer(this.base_map.url, this.base_map.options);
      min_lat = -90;
      max_lat = 90;
      min_lon = -180;
      max_lon = 180;
      this.map.setView(this.base_map.view, 8);
    }

    Map.prototype.add_tile_layer = function(url, options) {
      var layer;
      layer = new L.TileLayer(url, options);
      return this.map.addLayer(layer);
    };

    Map.prototype.add_marker = function(latitude, longitude) {
      var location, marker;
      location = new L.LatLng(latitude, longitude);
      marker = new L.Marker(location);
      return this.map.addLayer(marker);
    };

    Map.prototype.add_texture = function(texture) {
      var bounds, image, lower_bounds, upper_bounds;
      lower_bounds = new L.LatLng(-90, -180);
      upper_bounds = new L.LatLng(-90, -180);
      bounds = new L.LatLngBounds(lower_bounds, upper_bounds);
      image = new L.ImageOverlay(texture, bounds);
      return this.map.addLayer(image);
    };

    return Map;

  })();

  /* -------------------------------------------- 
       Begin app.coffee 
  --------------------------------------------
  */

  global = typeof exports !== "undefined" && exports !== null ? exports : this;

  oms_url = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  oms_attrib = "Map data © openstreetmap contributors";

  global.slippy_map_url = oms_url;

  global.slippy_map_options = {
    minZoom: 1,
    maxZoom: 15,
    attribution: oms_attrib
  };

  global.slippy_map = {
    url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    options: {
      minZoom: 1,
      maxZoom: 15,
      attribution: 'Map data © openstreetmap contributors'
    },
    view: new L.LatLng(-27.46758, 153.027892)
  };

  map = new Map('map');

  map.add_marker(-27.46758, 153.027892);

}).call(this);
