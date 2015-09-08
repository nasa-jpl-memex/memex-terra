var terra = terra || {};

// @todo all ajax calls need error: and nice alerts

terra.useCache = true;
terra.defaultCenter = [-98.0, 39.5];

$(function () {
    'use strict';

    terra.AppRouter = Backbone.Router.extend({
        routes: {
            ':msa/:covars': 'index'
        },

        index: function(msa, covars) {
            $('#gs-select-location option:contains(' + msa + ')').attr('selected', true);

            _.each(covars.split('|'), function(covar) {
                $('#gs-select-covar option[value="' + covar + '"]').attr('selected', true);
                $('#gs-select-covar').multiselect('refresh');
            });

            terra.formView.runTsAnalysis(msa, covars);
        }
    });

    terra.appRouter = new terra.AppRouter();
    terra.formView = new terra.FormView();
    terra.ddFormView = new terra.DdFormView();
    terra.mapView = new terra.MapView();
    terra.msaCollection = new terra.MsaCollection();

    Backbone.history.start();

    $('#analyses-tabs').tabs();
});
