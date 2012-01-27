(function() {
  var Geolocation, Map, callback, eea_city_areas, eea_urban_noise, global, map, nexrad, osm_attrib, osm_url, position;

  Map = (function() {

    function Map(el) {
      this.map = new L.Map(el);
      this.config = global.slippy_map;
      this.add_tile_layer(this.config.url, this.config.options);
      this.map.setView(this.config.view, 1);
    }

    Map.prototype.add_tile_layer = function(url, options) {
      var layer;
      layer = new L.TileLayer(url, options);
      return this.map.addLayer(layer);
    };

    Map.prototype.add_wms_layer = function(url, options) {
      var layer;
      layer = new L.TileLayer.WMS(url, options);
      return this.map.addLayer(layer);
    };

    Map.prototype.add_marker = function(latitude, longitude) {
      var location, marker;
      location = new L.LatLng(latitude, longitude);
      marker = new L.Marker(location);
      return this.map.addLayer(marker);
    };

    Map.prototype.add_texture = function(texture) {
      return this.map.addLayer(image);
    };

    Map.prototype.set_view = function(latitude, longitude) {
      var view;
      view = new L.LatLng(latitude, longitude);
      return this.map.setView(view, 10);
    };

    return Map;

  })();

  /* -------------------------------------------- 
       Begin geolocation.coffee 
  --------------------------------------------
  */

  Geolocation = (function() {

    function Geolocation() {
      this.accuracy = 30;
      this.options = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 60000
      };
      this.current_position = false;
    }

    Geolocation.prototype.position = function() {
      if (!this.current_position) get_position;
      return this.current_position;
    };

    Geolocation.prototype.get_position = function(callback) {
      var _this = this;
      this.callback = callback;
      return navigator.geolocation.getCurrentPosition(function(position) {
        _this.check_position(position);
        return _this.callback(position);
      }, function(error) {
        return _this.display_error(error);
      }, this.options);
    };

    Geolocation.prototype.check_position = function(position) {
      return this.current_position = position;
    };

    Geolocation.prototype.display_error = function(error) {
      var errors;
      this.current_position = false;
      errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
      };
      return alert("Error: " + errors[error.code]);
    };

    return Geolocation;

  })();

  /* -------------------------------------------- 
       Begin app.coffee 
  --------------------------------------------
  */

  global = typeof exports !== "undefined" && exports !== null ? exports : this;

  osm_url = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  osm_attrib = "Map data: <a href=\"http://www.openstreetmap.org/\">openstreetmap contributors.</a>";

  global.slippy_map = {
    url: osm_url,
    options: {
      minZoom: 1,
      maxZoom: 15,
      attribution: osm_attrib
    },
    view: new L.LatLng(-27.46758, 153.027892),
    bounds: {
      lower: new L.LatLng(-90, -180),
      upper: new L.LatLng(90, 180)
    }
  };

  nexrad = {
    url: "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi",
    options: {
      layers: "nexrad-n0r-900913",
      format: "image/png",
      transparent: true
    }
  };

  eea_city_areas = {
    url: "http://discomap.eea.europa.eu/ArcGIS/services/Land/UrbanAtlas_Dyna_WGS84/MapServer/WMSServer",
    options: {
      layers: "2",
      format: "image/png",
      transparent: true
    }
  };

  eea_urban_noise = {
    url: "http://discomap.eea.europa.eu/ArcGIS/services/Noise/UrbanNoise_Dyna_WM/MapServer/WMSServer",
    options: {
      layers: "1",
      format: "image/png",
      transparent: true
    }
  };

  map = new Map('map');

  map.add_wms_layer(nexrad.url, nexrad.options);

  map.add_wms_layer(eea_city_areas.url, eea_city_areas.options);

  map.add_wms_layer(eea_urban_noise.url, eea_urban_noise.options);

  callback = function(position) {
    map.add_marker(position.coords.latitude, position.coords.longitude);
    return map.set_view(position.coords.latitude, position.coords.longitude);
  };

  position = new Geolocation;

  position.get_position(callback);

}).call(this);
