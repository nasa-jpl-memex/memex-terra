var terra = terra || {};

terra.MsaModel = Backbone.Model.extend({
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

    getBoundingBox: _.memoize(function() {
        var coordinates = this.getMergedCoordinates();
        var minX = _.first(coordinates)[0],
            maxX = minX,
            minY = _.first(coordinates)[1],
            maxY = minY;

        _.each(_.rest(coordinates), function(coordPair) {
            minX = (minX < coordPair[0]) ? minX : coordPair[0];
            maxX = (maxX > coordPair[0]) ? maxX : coordPair[0];
            minY = (minY < coordPair[1]) ? minY : coordPair[1];
            maxY = (maxY > coordPair[1]) ? maxY : coordPair[1];
        });

        return [
            [minX, maxX],
            [minY, maxY]
        ];
    }, function() {
        // Memoize boundingBox by the MSA name
        return this.get('id');
    }),

    // @todo this needs to be simplified and documented
    getMergedCoordinates: function() {
        // Returns all the coordinates of an Msas shape(s) in a single array
        var reduction = this.get('geometry').coordinates;

        if (reduction.length > 1) {
            reduction = _.flatten(reduction);
        }

        return reduction.reduce(function(a, b) {
            return a.concat(b);
        }, []);
    }
});
