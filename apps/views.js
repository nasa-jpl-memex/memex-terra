var tempus = tempus || {};

tempus.FormView = Backbone.View.extend({
    el: '#action-form',

    events: {
        'submit #gs-select-form': 'runDiffAndDiff'
    },

    createMsaView: function(msaName, shapeFilter) {
        var msaModel = tempus.msaCollection.get(msaName);

        if (msaName && msaModel) {
            new tempus.MsaView({
                model: msaModel,
                shapeFilter: shapeFilter
            });
        }
    },

    runDiffAndDiff: function(event) {
        event.preventDefault();
        var _this = this;
        this.covars = [];

        var location = $('#gs-select-location option:selected').text();
        var covars = $('#gs-select-covar option:selected').each(function() {
            var $this = $(this);

            if ($this.length) {
                _this.covars.push($this.text());
            }
        });

        tempus.mapView.clearFeatureLayers();

        this.createMsaView($('#gs-select-location option:selected').text());

        var dd = new tempus.DiffAndDiffView({
            location: location,
            covars: this.covars.join('|')
        });
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
            url: 'https://tempus-demo.ngrok.com/api',
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
    featureLayers: [],

    initialize: function() {
        this.render();
    },

    clearFeatureLayers: function() {
        _.each(this.featureLayers, function(layer) {
            layer.clear();
        });
    },

    render: function() {
        // @todo tempus.map should belong to the mapView
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

tempus.DiffAndDiffView = Backbone.View.extend({
    initialize: function(options) {
        this.render(options.location, options.covars);
    },

    fetchTimeSeriesData: function(location, covars) {
        var _this = this;

        tempus.ajax({
            url: 'https://tempus-demo.ngrok.com/api/series',
            data: {
                table: 'escort_ads',
                sort: 1,
                response_col: 'price_per_hour',
                group_col: 'msaname',
                group: location + ' MSA' // @todo should we ever strip this out?
            },
            async: false,
            success: function(data) {
                _this.tsData = JSON.parse(data); // @Todo get this to be received as json

                if (_this.tsData.hasOwnProperty('error')) {
                    alert('error');
                }

                tempus.ajax({
                    url: 'https://tempus-demo.ngrok.com/api/comparison',
                    data: {
                        table: 'escort_ads',
                        sort: 1,
                        response_col: 'price_per_hour',
                        group_col: 'msaname',
                        group: location + ' MSA', // @todo should we ever strip this out?
                        covs: covars
                    },
                    async: false,
                    success: function(compData) {
                        _this.tsCompData = JSON.parse(compData);
                        if (_this.tsCompData.hasOwnProperty('error')) {
                            alert('error');
                        }
                    },
                    error: function(a, b, c) {
                        alert('error');
                    }
                });
            },
            error: function(a, b, c) {
                alert('error');
            }
        });
    },

    render: function(location, covars) {
        // @todo setup a series model?
        this.fetchTimeSeriesData(location, covars);

        // render similar groups boundaries
        _.each(this.tsCompData.groups, function(group) {
            tempus.formView.createMsaView(group.replace(/ MSA$/, ''),
                                          function(shape) {
                                              shape.features[0].properties.strokeColor = '#666666';
                                              return shape;
                                          });
        });

        var clearPrev = false;
        var cleanData = [];

        _.each(this.tsData.result, function(datum) {
            cleanData.push({
                date: datum[0],
                value: datum[1],
                symbol: 'raw'
            });
        });

        _.each(this.tsCompData.result, function(datum) {
            cleanData.push({
                date: datum[0],
                value: datum[1],
                symbol: 'comp'
            });
        });

        tempus.spec.width = $("#statistics").width() * 0.90;
        tempus.spec.height = $("#statistics").height();
        tempus.spec.data[0].values = cleanData;

        if (clearPrev) {
            $("#statistics").empty();
        }

        vg.parse.spec(tempus.spec, function(chart) {
            chart({
                el:"#statistics"
            }).update();
        });
    }
});

tempus.MsaView = Backbone.View.extend({
    initialize: function(options) {
        this.render(options);
    },

    render: function(options) {
        var layerIdx = tempus.mapView.featureLayers.push(tempus.map.createLayer('feature'));
        var layer = tempus.mapView.featureLayers[layerIdx - 1];
        var shape = this.model.get('shape');

        // Let the user override certain properties.
        // Specifically for styling of individual MSAs on individual analyses
        if (options.shapeFilter) {
            shape = options.shapeFilter(shape);
        }

        tempus.map.draw();

        var reader = geo.createFileReader('jsonReader', {'layer': layer});
        reader.read(JSON.stringify(shape), function() {
            tempus.map.draw();
        });
    }
});
