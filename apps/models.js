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

        // @todo a bounding box should probably be calculated on load?
        // benefits would be zooming in on any MSA would be very quick,
        // and calculating a bounding box of many MSAs would have many fewer
        // coordinates to traverse
    },

    mergedCoordinates: function() {
        // Returns all the coordinates of an Msas shape in a single array
        return this.get('geometry').coordinates.reduce(function(a, b) {
            return a.concat(b);
        }, []);
    },

    minAndMaxCoordinates: function() {
        var coords = this.mergedCoordinates();
        var xs = coords.map(function(el) {
            return el[0];
        });
        var ys = coords.map(function(el) {
            return el[1];
        });

        return {
            x: [Math.min.apply(null, xs), Math.max.apply(null, xs)],
            y: [Math.min.apply(null, ys), Math.max.apply(null, ys)]
        };
    },

    // @todo boundingBox is incredibly contrived
    // an msa should have one bounding box, merging bounding boxes
    // should be some sort of utility function
    boundingBox: function() {
        // calculates a bounding box of the msa, optionally taking additional
        // msa models

        var xs = [];
        var ys = [];
        var models = [this].concat(_.toArray(arguments));
        var minsAndMaxes = [];

        minsAndMaxes = models.map(function(model) {
            return model.minAndMaxCoordinates();
        });

        xs = [Math.min.apply(null,
                             minsAndMaxes.map(function(el) {
                                 return el.x[0];
                             })),
              Math.max.apply(null,
                             minsAndMaxes.map(function(el) {
                                 return el.x[1];
                             }))];

        ys = [Math.min.apply(null,
                             minsAndMaxes.map(function(el) {
                                 return el.y[0];
                             })),
              Math.max.apply(null,
                             minsAndMaxes.map(function(el) {
                                 return el.y[1];
                             }))];

        return [xs, ys];


        var boundingBox = [
            [maxX, maxY], // top right
            [minX, maxY], // top left
            [maxX, minY], // bottom right
            [minX, minY] // bottom left
        ];

        var centerPoint = [(minX + maxX) / 2,
                           (minY + maxY) / 2];
    }
});
