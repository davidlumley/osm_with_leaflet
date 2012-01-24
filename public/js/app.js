(function() {
  var Map, global;

  Map = (function() {

    function Map(el) {
      this.map = new L.Map(el);
      this.base_map = global.slippy_map;
      this.add_tile_layer(this.base_map.url, this.base_map.options);
      this.map.setView(this.base_map.view, 8);
    }

    Map.prototype.add_tile_layer = function(url, options) {
      var layer;
      layer = new L.TileLayer(url, options);
      return this.map.addLayer(layer);
    };

    return Map;

  })();

  /* -------------------------------------------- 
       Begin app.coffee 
  --------------------------------------------
  */

  global = typeof exports !== "undefined" && exports !== null ? exports : this;

  global.slippy_map_url = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  global.slippy_map_options = {
    minZoom: 1,
    maxZoom: 15,
    attribution: 'Map data © openstreetmap contributors'
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

  new Map('map');

}).call(this);
