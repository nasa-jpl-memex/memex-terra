var terra = terra || {};

terra.DdAnalysisModel = terra.AnalysisModel.extend({
    initialize: function(options) {
        if (!_.has(options, 'targetLocation') ||
            !_.has(options, 'comparisonLocations') ||
            !_.has(options, 'eventDate')) {
            throw "Dd Analysis must have target loc, comp locs, and date.";
        } else if (!_.isArray(options.comparisonLocations)) {
            throw "comparisonLocations must be an array.";
        } else if (!_.isDate(options.eventDate)) {
            throw "eventDate must be of type Date";
        }

        // Load locations as models
        this.set('targetLocation', terra.msaCollection.get(this.get('targetLocation')));
        this.set('comparisonLocations', _.map(this.get('comparisonLocations'),
                                              terra.msaCollection.get,
                                              terra.msaCollection));

        // @todo lazy load this instead?
        this.fetchDiffInDiffData();

        this.set('ddDisplayData', _.cloneDeep(this.get('ddData')));
    },

    _setData: function(data) {
        // Filter dates with 0 as their data points, and
        // convert all date strings to date objects
        this.set('ddData', {
            stats: data.diff_in_diff,
            data: _.map(_.filter(data.data, function(datum) {
                return !(datum.comparison === 0 &&
                         datum.target === 0);
            }), function(datum) {
                datum.date = new Date(datum.date);
                // Lowercase key names
                datum.comparison = datum.Comparison;
                delete datum.Comparison;

                datum.target = datum.Target;
                delete datum.Target;

                return datum;
            })
        });
    },

    getEventDateAsStr: function() {
        return this.get('eventDate').getUTCFullYear() + '-' +
            ('0' + (this.get('eventDate').getUTCMonth()+1)).slice(-2) + '-' +
            ('0' + this.get('eventDate').getUTCDate()).slice(-2);
    },

    groupedBy: function(type, data) {
        var grouper = this._grouper(type);
        data = data || _.cloneDeep(this.get('ddData'));

        data.data = _.map(d3.nest()
                          .key(grouper.keyFunc)
                          .rollup(function(d) {
                              return {
                                  comparison: d3.sum(d, function(g) {
                                      return g.comparison;
                                  }),
                                  target: d3.sum(d, function(g) {
                                      return g.target;
                                  })
                              };
                          })
                          .entries(data.data), function(datum) {
                              return {
                                  date: grouper.dateToKeyFunc(datum.key),
                                  target: datum.values.target,
                                  comparison: datum.values.comparison
                              };
                          });

        this.set('ddDisplayData', data);
    },

    fetchDiffInDiffData: function() {
        var _this = this;

        terra.ajax({
            url: 'https://tempus-demo.ngrok.com/api/diffindiff',
            data: {
                target: _this.get('targetLocation').id + " MSA",
                comparisons: _.map(_.pluck(_this.get('comparisonLocations'), 'id'),
                                   function(locationName) {
                                       return locationName + " MSA";
                                   }).join('|'),
                date: _this.getEventDateAsStr()
            },
            async: false,
            dataType: 'json',
            success: _.bind(_this._setData, _this)
        });
    }
});
