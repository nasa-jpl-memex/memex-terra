var tempus = tempus || {};

tempus.FormView = Backbone.View.extend({
    el: '#action-form',

    events: {
        'submit #gs-select-form': 'routeToAnalysis'
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

    routeToAnalysis: function(event) {
        event.preventDefault();

        window.location.hash = [
            $('#gs-select-location option:selected').text(),
            _.map($('#gs-select-covar option:selected'), $.text).join('|')
        ].join('/');
    },

    runTsAnalysis: function(location, covars) {
        if (_.isEmpty(location) || _.isEmpty(covars)) {
            tempus.error('No location and/or covariables selected.');
            return;
        }

        this.dd = new tempus.TsAnalysisView({
            model: new tempus.TsAnalysis({
                location: location,
                covars: covars
            })
        });
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(_.template($('#action-form-template').html(), {}));

        tempus.ajax({
            url: 'https://tempus-demo.ngrok.com/api',
            async: false,
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
    }
});

tempus.MapView = Backbone.View.extend({
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

tempus.TsAnalysisView = Backbone.View.extend({
    el: '#ts-analysis-overlay',
    events: {
        'change #ts-analysis-grouping': 'changeGrouping'
    },

    initialize: function(options) {
        this.groupedBy = 'monthly';
        this.model.on('change:tsDisplayData', this.render, this);

        $('#ts-analysis-overlay').draggable();

        this.similaritiesSummaryTemplate = _.template($('#similarities-summary-template').html());

        // The data needs to be grouped for the first rendering
        this.model.groupedBy(this.groupedBy);
        this.render();
    },

    // Group each dataset, then set tsDisplayData which will trigger the re-render
    changeGrouping: function(event) {
        var groupedDatasets = this.model.get('tsData');

        this.groupedBy = $(event.currentTarget).find('option:selected').val();
        this.model.groupedBy(this.groupedBy);
    },

    focus: function () {
        var X_SHIFT = function(xCoord) {
            return xCoord - 3;
        };
        var minsMaxes = tempus.msaCollection.aggregateBoundingBox(
            [this.model.get('location')].concat(this.model.get('similarModels')));

        tempus.map.bounds({
            lowerLeft: [X_SHIFT(minsMaxes[0][0]), minsMaxes[1][0]],
            upperRight: [X_SHIFT(minsMaxes[0][1]), minsMaxes[1][1]]
        });
    },

    render: function() {
        var _this = this;

        tempus.mapView.clearMsaFeatureLayer();
        this.$el.html('');

        // Create primary MSA outline
        tempus.formView.createMsaView(this.model.get('location'),
                                      function(shape) {
                                          shape.features[0].properties.strokeColor = '#d62728';
                                          shape.features[0].properties.strokeWidth = 3;
                                          return shape;
                                      });

        // Create similar MSA outlines
        _.each(this.model.get('similarModels'), function(model) {
            tempus.formView.createMsaView(model.get('name'),
                                          function(shape) {
                                              shape.features[0].properties.strokeColor = '#ff7f0e';
                                              shape.features[0].properties.strokeWidth = 3;
                                              return shape;
                                          });
        });

        // Focus on bounding box of MSAs
        this.focus();

        // Draw the time series and save the function for updating
        if (!_.isEmpty(this.model.get('tsDisplayData'))) {
            var dateExtent = this.model.dateExtent();
            var opts = _.merge(
                {
                    // @todo more selector nonsense
                    selector: '#ts-analysis-overlay',
                    x: 'date',
                    y: 'value'},
                {
                    datasets: this.model.get('tsDisplayData')
                });

            this.$el.html(_.template($('#ts-analysis-overlay-template').html())({
                selected: this.groupedBy
            }));

            tempus.d3TimeSeries(opts);

            $('#ts-analysis-overlay input[name="daterangepicker"]').daterangepicker({
                startDate: dateExtent[0],
                endDate: dateExtent[1]
            }, function(start, end) {
                _this.model.spanningDate(start, end, _this.groupedBy);
            });
            // On enter of datepicker, it will re-render this plot.
        }
    }
});

tempus.MsaView = Backbone.View.extend({
    initialize: function(options) {
        this.render(options);
    },

    render: function(options) {
        var shape = this.model.get('shape');

        // Create an msa feature layer if one doesn't already exist on the map
        if (!_.has(tempus.mapView, 'msaFeatureLayer')) {
            tempus.mapView.msaFeatureLayer = tempus.map.createLayer('feature');
        }
        // Let the user override any properties on the shape, useful for styling
        if (options.shapeFilter) {
            shape = options.shapeFilter(shape);
        }

        geo.createFileReader('jsonReader', {
            layer: tempus.mapView.msaFeatureLayer
        }).read(JSON.stringify(shape), function() {
            tempus.map.draw();
        });
    }
});
