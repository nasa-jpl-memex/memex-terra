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

tempus.TsAnalysis = Backbone.Model.extend({
    initialize: function(options) {
        this.set('location', tempus.msaCollection.get(options.location));
        this.set('covars', options.covars); // @todo extraneous?

        this.fetchTimeSeriesData(options.location, options.covars);

        // Maintain a separation of what our data is, and what the
        // displayed data is. This allows for us to change groupings,
        // time ranges, etc while leveraging backbone models on data
        // change -> rerender functionality.
        this.set('tsDisplayData', _.cloneDeep(this.get('tsData')));
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
                _this.set('tsData', [{
                    label: 'raw',
                    data: data.result
                }]);

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
                        var similarModels = [],
                            tsData = _this.get('tsData');

                        compData.groups = _.map(compData.groups, function(s) {
                            return s.replace(/ MSA$/, '');
                        });

                        similarModels = _.map(compData.groups, function(group) {
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

                        tsData.push({
                            label: 'comp',
                            groups: compData.groups,
                            data: compData.result
                        });

                        _this.set('tsData', tsData);
                        _this.set('similarModels', similarModels);
                    }
                });
            }
        });

        // Postprocess data
        var dateParser = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
        _.each(this.get('tsData'), function(dataset) {
            dataset.data = _.map(dataset.data, function(datum) {
                datum[0] = dateParser(datum[0]);

                return {
                    date: datum[0],
                    value: datum[1]
                };
            });
        });
    },

    _grouper: function(groupBy) {
        var grouper = {
            keyFunc: function(d) {
                return new Date(d.date.getFullYear(), d.date.getMonth());
            },
            dateToKeyFunc: function(d) {
                return new Date(d);
            }
        };

        if (groupBy === 'weekly') {
            grouper.keyFunc = function(d) {
                return [d.date.getFullYear(), d3.time.format("%U")(d.date)];
            };

            grouper.dateToKeyFunc = function(d) {
                // d3 can not parse the week number without the day of week,
                // so we always pass 0 as the day of week.
                // see https://github.com/mbostock/d3/issues/1914
                d += ",0";
                return d3.time.format("%Y,%U,%w").parse(d);
            };
        } else if (groupBy === 'daily') {
            grouper.keyFunc = function(d) {
                return new Date(d.date.getFullYear(), d.date.getMonth(), d.date.getDate());
            };

            grouper.dateToKeyFunc = function(d) {
                return new Date(d);
            };
        }

        return grouper;
    },

    groupedBy: function(type, datasets) {
        var grouper = this._grouper(type);
        datasets = datasets || _.cloneDeep(this.get('tsData'));

        datasets = _.map(datasets, function(dataset) {
            dataset.data = _.map(d3.nest()
                                 .key(grouper.keyFunc)
                                 .rollup(function(d) {
                                     return d3.sum(d, function(g) {
                                         return g.value;
                                     });
                                 }).entries(dataset.data),
                                 function(datum) {
                                     return {
                                         date: grouper.dateToKeyFunc(datum.key),
                                         value: datum.values
                                     };
                                 });
            return dataset;
        });

        this.set('tsDisplayData', datasets);
        this.trigger('change:tsDisplayData');
    },

    // Gets the min/max date from the displayed time series data
    dateExtent: function() {
        var minDate, maxDate;

        _.each(this.get('tsDisplayData'), function(dataset) {
            _.each(dataset.data, function(datum) {
                if (_.isUndefined(minDate) || datum.date < minDate) {
                    minDate = datum.date;
                }

                if (_.isUndefined(maxDate) || datum.date > maxDate) {
                    maxDate = datum.date;
                }
            });
        });

        return [minDate, maxDate];
    },

    // @todo shouldn't groupby be optional?
    spanningDate: function(start, end, groupBy) {
        var datasets = _.cloneDeep(this.get('tsData'));

        datasets = _.map(datasets, function(dataset) {
            dataset.data = _.filter(dataset.data, function(datum) {
                return start.toDate() <= datum.date && datum.date <= end.toDate();
            });

            return dataset;
        });

        // groupedBy takes datasets (or operates on tsData)
        // Since grouping has to happen after filtering by time, pass it our now
        // filtered data
        this.set('tsDisplayData', datasets);
        this.groupedBy(groupBy, datasets);
    }
});
