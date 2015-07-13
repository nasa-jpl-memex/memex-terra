var tempus = tempus || {};

tempus.MsaCollection = Backbone.Collection.extend({
    model: tempus.Msa,
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

    populateDropdown: function() {
        _.each(this._sortedModels(), function(model) {
            if (!_.isEmpty(model.get('shape'))) {
                $("#gs-select-location").append("<option>" + model.get('name'));
            } else {
                console.log('Skipping MSA ' + model.get('name') + ' (No shape found).');
            }
        });
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

                        arr[arr.length] = new tempus.Msa({
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
