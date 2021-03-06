var terra = terra || {};

terra.FormView = Backbone.View.extend({
    el: '#action-form',

    events: {
        'submit #gs-select-form': 'routeToAnalysis'
    },

    createMsaView: function(msaName, shapeFilter) {
        var msaModel = terra.msaCollection.get(msaName);

        if (msaName && msaModel) {
            new terra.MsaView({
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
            terra.error('No location and/or covariables selected.');
            return;
        }

        if (!_.isUndefined(this.tsAnalysisView)) {
            this.tsAnalysisView.remove();
            this.tsAnalysisView = undefined;
        }

        this.tsAnalysisView = new terra.TsAnalysisView({
            model: new terra.TsAnalysisModel({
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

        terra.ajax({
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
        }, terra.useCache);
    }
});
