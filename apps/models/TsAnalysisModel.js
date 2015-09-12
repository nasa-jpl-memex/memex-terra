var terra = terra || {};

terra.TsAnalysisModel = terra.AnalysisModel.extend({
    initialize: function(options) {
        this.set('location', terra.msaCollection.get(options.location));
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

        terra.ajax({
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

                terra.ajax({
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
                            return terra.msaCollection.get(group);
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
