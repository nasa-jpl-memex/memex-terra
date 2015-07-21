var tempus = tempus || {};

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
