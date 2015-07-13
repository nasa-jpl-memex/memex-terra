var tempus = tempus || {};

tempus.Msa = Backbone.Model.extend({
    initialize: function(options) {
        var name = options.name.replace(/ MSA$/, '');

        this.set('id', name);
        this.set('name', name);
        this.set('shape', options.shape);

        if (options.shape.features && options.shape.features.length) {
            if (options.shape.features.length > 1) {
                console.log('Found multiple featured Shape, unsupported.');
            }

            this.set('geometry', options.shape.features[0].geometry);
            this.set('type', this.get('geometry').type);
        }
    },

    mergedCoordinates: function() {
        return this.get('geometry').coordinates.reduce(function(a, b) {
            return a.concat(b);
        }, []);
    }
});
