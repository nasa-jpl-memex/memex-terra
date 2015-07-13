var tempus = tempus || {};

// @todo all ajax calls need error: and nice alerts

tempus.useCache = true;
tempus.defaultCenter = [-98.0, 39.5];

$(function () {
    'use strict';

    tempus.formView = new tempus.FormView();
    tempus.mapView = new tempus.MapView();
    tempus.msaCollection = new tempus.MsaCollection();
});
