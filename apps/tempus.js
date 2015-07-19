var tempus = tempus || {};

// @todo all ajax calls need error: and nice alerts

tempus.useCache = true;
tempus.defaultCenter = [-98.0, 39.5];

$(function () {
    'use strict';

    tempus.AppRouter = Backbone.Router.extend({
        routes: {
            ':msa/:covars/:groupby': 'index'
        },

        index: function(msa, covars, groupby) {
            $('#gs-select-location option:contains(' + msa + ')').attr('selected', true);
            $('#gs-select-grouper option[value="' + groupby + '"]').attr('selected', true);

            _.each(covars.split('|'), function(covar) {
                $('#gs-select-covar option[value="' + covar + '"]').attr('selected', true);
                $('#gs-select-covar').multiselect('refresh');
            });

            tempus.formView.runDiffAndDiff(msa, covars, groupby);
        }
    });

    tempus.appRouter = new tempus.AppRouter();
    tempus.formView = new tempus.FormView();
    tempus.mapView = new tempus.MapView();
    tempus.msaCollection = new tempus.MsaCollection();

    Backbone.history.start();
});
