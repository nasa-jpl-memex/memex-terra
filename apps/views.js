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

        if (_.isEmpty(covars)) {
            tempus.error('No covariables selected.');
            return;
        }

        tempus.mapView.clearMsaFeatureLayer();

        this.createMsaView($('#gs-select-location option:selected').text(),
                           function(shape) {
                               shape.features[0].properties.strokeColor = '#d62728';
                               shape.features[0].properties.strokeWidth = 3;
                               return shape;
                           });

        this.dd = new tempus.DiffAndDiffView({
            location: location,
            covars: this.covars.join('|'),
            grouper: $('#gs-select-grouper').val()
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

tempus.DiffAndDiffView = Backbone.View.extend({
    initialize: function(options) {
        var grouper;

        // Since it's always the same div, we only need to make it draggable on init
        $('#diff-and-diff-overlay').draggable();

        this.similaritiesSummaryTemplate = _.template($('#similarities-summary-template').html());

        // @todo this needs to be simplified, refactor it to use all of d3s time handling
        // since stdlib doesn't support weeks out of the box
        if (options.grouper === 'monthly') {
            grouper = this._groupBy.bind(this,
                                         function(d) {
                                             return new Date(d.date.getFullYear(), d.date.getMonth());
                                         },
                                         function(d) {
                                            return new Date(d);
                                         });
        } else if (options.grouper === 'weekly') {
            grouper = this._groupBy.bind(this,
                                         function(d) {
                                             return [d.date.getFullYear(), d3.time.format("%U")(d.date)];
                                         },
                                         function(d) {
                                             // d3 can not parse the week number without the day of week,
                                             // so we always pass 0 as the day of week.
                                             // see https://github.com/mbostock/d3/issues/1914
                                             d += ",0";
                                             return d3.time.format("%Y,%U,%w").parse(d);
                                         });
        } else if (options.grouper === 'daily') {
            grouper = this._groupBy.bind(this,
                                         function(d) {
                                             return new Date(d.date.getFullYear(), d.date.getMonth(), d.date.getDate());
                                         },
                                         function(d) {
                                            return new Date(d);
                                         });
        }

        this.render(options.location, options.covars, grouper);
    },

    _groupBy: function(keyFunc, keyToDateFunc, data) {
        data = d3.nest()
            .key(keyFunc)
            .rollup(function(d) {
                return d3.sum(d, function(g) {
                    return g.value;
                });
            }).entries(data);

        return _.map(data, function(datum) {
            return {
                date: keyToDateFunc(datum.key),
                value: datum.values
            };
        });
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
            dataType: 'json',
            success: function(data) {
                _this.tsData = data;

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
                    dataType: 'json',
                    success: function(compData) {
                        compData.groups = _.map(compData.groups, function(s) {
                            return s.replace(/ MSA$/, '');
                        });

                        // Update summary div
                        var newSimilarityHtml = _this.similaritiesSummaryTemplate({
                            'msa': location,
                            'similarMsas': compData.groups
                        });

                        $('#similarities-summary').html(newSimilarityHtml);

                        _this.tsCompData = compData;
                    }
                });
            }
        });
    },

    focus: function (msaModel, similarModels) {
        var X_SHIFT = function(xCoord) {
            return xCoord - 3;
        };
        var minsMaxes = tempus.msaCollection.aggregateBoundingBox([msaModel].concat(similarModels));

        tempus.map.bounds({
            lowerLeft: [X_SHIFT(minsMaxes[0][0]), minsMaxes[1][0]],
            upperRight: [X_SHIFT(minsMaxes[0][1]), minsMaxes[1][1]]
        });
    },

    render: function(location, covars, grouper, callback) {
        var msaModel = tempus.msaCollection.get(location),
            similarModels = [];

        // @todo setup a series model?
        this.fetchTimeSeriesData(location, covars);

        similarModels = _.map(this.tsCompData.groups, function(group) {
            return tempus.msaCollection.get(group);
        });

        // Remove all models we don't have a shape for
        _.remove(similarModels, function(model) {
            if (_.isEmpty(model.get('shape'))) {
                console.log('MSA ' + model.get('name')  + ' has no shape, skipping.');
                return true;
            }

            return false;
        });

        // render similar models boundaries
        _.each(similarModels, function(model) {
            tempus.formView.createMsaView(model.get('name'),
                                          function(shape) {
                                              shape.features[0].properties.strokeColor = '#ff7f0e';
                                              shape.features[0].properties.strokeWidth = 3;
                                              return shape;
                                          });
        });

        this.focus(msaModel, similarModels);

        // Cleanup data
        var dateParser = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
        this.tsData.result = _.map(this.tsData.result, function(datum) {
            datum[0] = dateParser(datum[0]);

            return {
                date: datum[0],
                value: datum[1]
            };
        });
        this.tsCompData.result = _.map(this.tsCompData.result, function(datum) {
            datum[0] = dateParser(datum[0]);

            return {
                date: datum[0],
                value: datum[1]
            };
        });

        // Do grouping
        var tsData = this.tsData.result,
            tsCompData = this.tsCompData.result;

        if (_.isFunction(grouper)) {
            tsData = grouper(this.tsData.result);
            tsCompData = grouper(this.tsCompData.result);
        }

        if (!(_.isEmpty(tsData) && _.isEmpty(tsCompData))) {
            this.d3ts = tempus.d3TimeSeries({
                selector: '#diff-and-diff-overlay',
                x: 'date',
                y: 'value',
                datasets: [
                    {
                        label: 'raw',
                        data: tsData
                    },
                    {
                        label: 'comp',
                        data: tsCompData
                    }
                ]
            });

            $('#diff-and-diff-overlay').css('display', 'block');
        } else {
            // Potentially hide it from previous analyses if this one has no results
            $('#diff-and-diff-overlay').css('display', 'none');
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
