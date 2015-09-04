var tempus = tempus || {};

tempus.DdFormView = Backbone.View.extend({
    el: '#dd-action-form',

    events: {
        'submit #dd-select-form': 'runDdAnalysis'
    },

    initialize: function() {
        this.render();
    },

    runDdAnalysis: function(event) {
        event.preventDefault();
        if (!_.isUndefined(this.ddAnalysisView)) {
            this.ddAnalysisView.remove();
            this.ddAnalysisView = undefined;
        }

        // @todo this will need to mimic runTsAnalysis in terms of removal
        // @todo need to start doing validation on all of these forms
        this.ddAnalysisView = new tempus.DdAnalysisView({
            model: new tempus.DdAnalysisModel({
                targetLocation: $('#dd-select-location > option:selected').val(),
                comparisonLocations: $('#dd-select-compare-location').val(),
                eventDate: new Date($('#dd-action-form input[name="daterangepicker"]').val())
            })
        });
    },

    render: function() {
        $('#dd-action-form input[name="daterangepicker"]').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true
        });
    }
});
