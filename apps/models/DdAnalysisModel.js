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
    },

    getEventDateAsStr: function() {
        return this.get('eventDate').getUTCFullYear() + '-' +
            ('0' + (this.get('eventDate').getUTCMonth()+1)).slice(-2) + '-' +
            ('0' + this.get('eventDate').getUTCDate()).slice(-2)
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
            success: function(data) {
                _this.set('ddData', {
                    stats: data.diff_in_diff,
                    data: data.data,
                    comparison: data.comparison,
                    target: data.target
                });
            }
        });
    }
});
