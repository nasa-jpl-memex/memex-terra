var tempus = tempus || {};

tempus.MsaCollection = Backbone.Collection.extend({
    model: tempus.MsaModel,
    url: "groups.json",

    initialize: function() {
        this.fetch();
        this.populateDropdown();
    },

    _sortedModels: function() {
        return this.models.sort(function(a, b) {
            return a.get('name') < b.get('name') ? -1 : 1;
        });
    },

    // @todo shouldn't this be handled in a view?
    populateDropdown: function() {
        _.each(this._sortedModels(), function(model) {
            if (!_.isEmpty(model.get('shape'))) {
                $("#gs-select-location, #dd-select-location").append("<option>" + model.get('name'));
                $('#dd-select-compare-location').append($('<option></option>')
                                                        .attr('value', model.get('name'))
                                                        .text(model.get('name')));
            } else {
                console.log('Skipping MSA ' + model.get('name') + ' (No shape found).');
            }
        });
    },

    aggregateBoundingBox: function(msaModels) {
        /**
         * Gathers the bounding boxes of msaModels and computes
         * a parent bounding box.
         **/
        var boundingBoxes = _.invoke(msaModels, 'getBoundingBox');
        var firstBoundingBox = _.first(boundingBoxes);
        var minX = firstBoundingBox[0][0],
            maxX = firstBoundingBox[0][1],
            minY = firstBoundingBox[1][0],
            maxY = firstBoundingBox[1][1];

        _.each(_.rest(boundingBoxes), function(boundingBox) {
            minX = (minX < boundingBox[0][0]) ? minX : boundingBox[0][0];
            maxX = (maxX > boundingBox[0][1]) ? maxX : boundingBox[0][1];
            minY = (minY < boundingBox[1][0]) ? minY : boundingBox[1][0];
            maxY = (maxY > boundingBox[1][1]) ? maxY : boundingBox[1][1];
        });

        return [
            [minX, maxX],
            [minY, maxY]
        ];
    },

    fetch: function() {
        var _this = this;
        this.msanames = [];
        this.temp = [];

        // These should properly use backbone sync
        // and sync should be rewritten to cache on localstorage
        // There is a contrib localstorage backbone lib
        tempus.ajax({
            url: this.url,
            data: {},
            async: false,
            success: function(data) {
                _this.msanames = data.msaname;
            }
        }, tempus.useCache);

        if (this.msanames === undefined || this.msanames.length === 0) {
            alert('Failed to fetch MSAs');
            return;
        }

        tempus.ajax({
            url: 'msa.geojson',
            data: {},
            async: false,
            dataType: 'json',
            success: function(geojson) {
                _this.temp = _this.msanames.reduce(
                    function(arr, name) {
                        var shape = geojson[name.replace(/ MSA$/, '')] || {};

                        arr[arr.length] = new tempus.MsaModel({
                            name: name,
                            shape: shape
                        });

                        return arr;
                    }, []);
            }
        }, tempus.useCache);

        this.reset(this.temp);
    }
});
