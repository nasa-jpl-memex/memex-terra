var terra = terra || {};

terra.MsaView = Backbone.View.extend({
    initialize: function(options) {
        if (_.isEmpty(options.model.get('shape'))) {
            console.log('Skipping rendering of ' + options.model.get('name')  + ' due to missing shapefile.');
        } else {
            this.render(options);
        }
    },

    render: function(options) {
        var shape = this.model.get('shape');

        // Create an msa feature layer if one doesn't already exist on the map
        if (!_.has(terra.mapView, 'msaFeatureLayer')) {
            terra.mapView.msaFeatureLayer = terra.map.createLayer('feature');
        }
        // Let the user override any properties on the shape, useful for styling
        if (options.shapeFilter) {
            shape = options.shapeFilter(shape);
        }

        geo.createFileReader('jsonReader', {
            layer: terra.mapView.msaFeatureLayer
        }).read(JSON.stringify(shape), function() {
            terra.map.draw();
        });
    }
});
