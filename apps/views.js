var tempus = tempus || {};

tempus.FormView = Backbone.View.extend({
    el: '#action-form',

    events: {
        'change #gs-select-location': 'createMsaView'
    },

    createMsaView: function(event) {
        var msaName = $(event.currentTarget).find('option:selected').text();
        var msaModel = tempus.msaCollection.get(msaName);

        if (msaName && msaModel) {
            var view = new tempus.MsaView({
                model: msaModel
            });

            view.render();
        }
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(_.template($('#action-form-template').html(), {}));

        $('#datetimepicker1').datetimepicker();
        $('#datetimepicker2').datetimepicker();
        $('.dropdown-toggle').dropdown();

        tempus.ajax({
            url: "http://cors-anywhere.herokuapp.com/http://tempus-demo.ngrok.com/api",
            async: false,
            data: {},
            dataType: 'json',
            success: function(data) {
                $.each(data.escort_ads.covariates, function(_, covar) {
                    $('#gs-select-covar')
                        .append($("<option></option>")
                                .attr("value", covar)
                                .text(covar));
                });

                $('#gs-select-covar').multiselect();
            }
        }, tempus.useCache);

        $("#gs-run-spinner .gs-spinner-icon").hide();
        $("#spinner .gs-spinner-icon").hide();
        $("#spinner .gs-spinner-text").hide();
    }
});

tempus.MapView = Backbone.View.extend({
    el: '#map',

    initialize: function() {
        this.render();
    },

    render: function() {
        tempus.map = geo.map({
            node: this.el,
            center: {
                x: tempus.defaultCenter[0],
                y: tempus.defaultCenter[1]
            },
            zoom: 2,
            autoResize: false
        });

        tempus.map.createLayer('osm', {
            baseUrl: 'http://otile1.mqcdn.com/tiles/1.0.0/map/'
        });

        // should this be moved to initialize?
        tempus.resize = function() {
            var height = $(window).height(),
                width  = $("#map").width();
            tempus.map.resize(0, 0, width, height);
        };
        tempus.resize();
    }
});

tempus.MsaView = Backbone.View.extend({
    initialize: function() {
        this.render();
    },

    render: function() {
        if (tempus.featureLayer !== undefined) {
            tempus.featureLayer.clear();
        } else {
            tempus.featureLayer = tempus.map.createLayer('feature');
        }

        tempus.map.draw();

        var reader = geo.createFileReader('jsonReader', {'layer': tempus.featureLayer});
        reader.read(JSON.stringify(this.model.get('shape')), function() {
            tempus.map.draw();
        });
    }
});
