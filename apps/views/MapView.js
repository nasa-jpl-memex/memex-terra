var terra = terra || {};

terra.MapView = Backbone.View.extend({
    el: '#map',

    initialize: function() {
        this.render();
    },

    clearMsaFeatureLayer: function() {
        if (this.msaFeatureLayer) {
            this.msaFeatureLayer.clear();
        }
    },

    render: function() {
        // @todo terra.map should belong to the mapView
        terra.map = geo.map({
            node: this.el,
            center: {
                x: terra.defaultCenter[0],
                y: terra.defaultCenter[1]
            },
            zoom: 5,
            autoResize: false
        });

        terra.map.createLayer('osm', {
            baseUrl: 'http://otile1.mqcdn.com/tiles/1.0.0/map/'
        });

        // should this be moved to initialize?
        terra.resize = function() {
            var height = $(window).height(),
                width  = $("#map").width();
            terra.map.resize(0, 0, width, height);
        };
        terra.resize();
    }
});
