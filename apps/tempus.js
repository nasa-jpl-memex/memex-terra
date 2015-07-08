// Tempus Application
var tempus = {};

tempus.useCache = true;

tempus.map = null;
$( window ).resize(function() {
    tempus.resize();
});

tempus.map = geo.map({
    node: '#map',
    center: {
        x: -98.0,
        y: 39.5
    },
    zoom: 2,
    autoResize: false
});
tempus.map.createLayer(
    'osm',
    {
        baseUrl: 'http://otile1.mqcdn.com/tiles/1.0.0/map/'
    }
);

tempus.resize = function() {
    var height = $(window).height(),
        width  = $("#map").width();
    tempus.map.resize(0, 0, width, height);
};
tempus.resize();

tempus.ajax = function(options, useCache) {
    // this assumes options.url and options.data exist
    var cachedRequest = localStorage.getItem(options.url + JSON.stringify(options.data));

    if (useCache && cachedRequest && options.hasOwnProperty('success')) {
        options.success(JSON.parse(cachedRequest));
    } else {
        if (options.hasOwnProperty('success')) {
            var successCallback = options.success;
        }

        options.success = function(data) {
            localStorage.setItem(options.url + JSON.stringify(options.data), JSON.stringify(data));

            if (successCallback) {
                successCallback(data);
            }
        };

        // Perform ajax call with caching wrapped around success callback
        $.ajax(options);
    }
};

//--------------------------------------------------------------------------
tempus.getTimeSeries = function(targetLocation, covars, callback) {
    var args = {
        table: "escort_ads",
        sort: 1,
        response_col: "price_per_hour",
        group_col: "msaname",
        group: targetLocation
    };

    tempus.ajax({
        url: "http://cors-anywhere.herokuapp.com/http://tempus-demo.ngrok.com/api/series",
        data: args,
        success: function(data) {
            if (covars !== undefined) {
                args.covs = covars;
            }

            tempus.ajax({
                url: "http://cors-anywhere.herokuapp.com/http://tempus-demo.ngrok.com/api/comparison",
                data: args,
                success: function( compData ) {
                    tempus.timeSeries( data, compData );
                    if (callback) {
                        callback();
                    }
                },
                error: function(obj, type) {
                    if (type === 'error') {
                        alert(obj['responseText']);
                    }
                }
            }, tempus.useCache);
        }
    }, tempus.useCache);
};

tempus.getLocations = function(callback) {
    tempus.ajax({
        url: "http://cors-anywhere.herokuapp.com/https://tempus-demo.ngrok.com/api/groups",
        data: {
            table: "escort_ads",
            group_col: "msaname"
        },
        success: function( data ) {
            var locations = data, i = null;
            for (i = 0; i < locations.msaname.length; ++i) {
                $("#gs-select-location").append("<option>" + locations.msaname[i]);
            }

            if (callback) {
                callback();
            }
        }
    }, tempus.useCache);
};

// Create statistical plot
//--------------------------------------------------------------------------
tempus.timeSeries = function(data, compData, clearPrev) {
    // var data = [
    //   {"date": "2012-01-05",  "value": 28},
    //   {"date": "2012-01-10",  "value": 43}
    // ];
    var cleanData = [], i = null;

    // Prepare data
    data = JSON.parse(data);
    for (i = 0; i < data.result.length; ++i) {
        cleanData.push({"date": data.result[i][0], "value": data.result[i][1], "symbol": "raw"});
    }

    data = JSON.parse(compData);
    for (i = 0; i < data.result.length; ++i) {
        cleanData.push({"date": data.result[i][0], "value": data.result[i][1], "symbol": "comp"});
    }

    var spec = {
        "width": $("#statistics").width() * 0.90,
        "height": $("#statistics").height(),
        "padding": {"top": 10, "left": 30, "bottom": 30, "right": 30},
        "data": [
            {
                "name": "table",
                "format": {"type":"json", "parse":{"date":"date", "value":"number"}},
                "values": cleanData
            }
        ],
        "scales": [
            {
                "name": "x",
                "type": "time",
                "range": "width",
                "nice": true,
                "domain": {"data": "table", "field": "data.date"}
            },
            {
                "name": "y",
                "type": "linear",
                "range": "height",
                "nice": true,
                "domain": {"data": "table", "field": "data.value"}
            },
            {
                "name": "color", "type": "ordinal", "range": "category10"
            }
        ],
        "axes": [
            {"type": "x", "scale": "x"},
            {"type": "y", "scale": "y"}
        ],
        "marks": [
            {
                "type": "group",
                "from": {
                    "data": "table",
                    "transform": [{"type": "facet", "keys": ["data.symbol"]}]
                },
                "marks": [
                    {
                        "type": "line",
                        "properties": {
                            "enter": {
                                "interpolate": {"value": "monotone"},
                                "x": {"scale": "x", "field": "data.date"},
                                "y": {"scale": "y", "field": "data.value"},
                                "size": {"value": 50},
                                "stroke": {"scale": "color", "field": "data.symbol"},
                                "strokeWidth": {"value": 2}
                            },
                            "update": {
                                "opacity": {"value": 1}
                            },
                            "hover": {
                                "opacity": {"value": 0.5}
                            }
                        }
                    },
                    {
                        "type": "symbol",
                        "from": {"data": "table"},
                        "properties": {
                            "enter": {
                                "interpolate": {"value": "monotone"},
                                "x": {"scale": "x", "field": "data.date"},
                                "y": {"scale": "y", "field": "data.value"},
                                "size": {"value": 50},
                                "fill": {
                                    "scale": "color", "field": "data.symbol"
                                },
                                "strokeWidth": {"value": 2}
                            },
                            "update": {
                                "opacity": {"value": 1}
                            },
                            "hover": {
                                "opacity": {"value": 0.5}
                            }
                        }
                    },
                    {
                        "type": "text",
                        "from": {
                            "transform": [{"type": "filter", "test": "index==data.length-1"}]
                        },
                        "properties": {
                            "enter": {
                                "x": {"scale": "x", "field": "data.date", "offset": 40},
                                "y": {"scale": "y", "field": "data.value"},
                                "fill": {"scale": "color", "field": "data.symbol"},
                                "text": {"field": "data.symbol"},
                                "baseline": {"value": "middle"}
                            }
                        }
                    }
                ]
            }
        ]
    };

    if (clearPrev) {
        $("#statistics").empty();
    }

    try {
        vg.parse.spec(spec, function(chart) {
            var view = chart({el:"#statistics"})
                    .update();
        });
    } catch(err) {
    }
};

tempus.toggleQueryIndicator = function(showSpinner) {
    if (showSpinner) {
        $("#gs-run-spinner .gs-spinner-icon").show();
        $("#gs-run-spinner .gs-spinner-text").hide();
    } else {
        $("#gs-run-spinner .gs-spinner-icon").hide();
        $("#gs-run-spinner .gs-spinner-text").show();
    }
};

tempus.findFeature = function(msaArea) {
    for (var i = 0; i < tempus.msa.features.length; i++) {
        if (tempus.msa.features[i].properties.NAME == msaArea) {
            return {
                type: 'FeatureCollection',
                features: [tempus.msa.features[i]]
            };
        }
    }

    return {};
};

tempus.drawMsaBoundary = function() {
    var msaArea = $('#gs-select-location option:selected').text().replace(/ MSA$/, '');

    // Load MSA Boundaries
    tempus.ajax({
        url: 'data.json',
        data: {},
        async: false,
        success: function(data) {
            tempus.msa = data;
        }
    }, true);

    // Clear existing boundaries
    if (tempus.featureLayer !== undefined) {
        tempus.featureLayer.clear();
    } else {
        tempus.featureLayer = tempus.map.createLayer('feature');
    }

    tempus.map.draw();

    var reader = geo.createFileReader('jsonReader', {'layer': tempus.featureLayer});

    if (tempus.msa === undefined) {
        alert('MSA not found');
    }

    var feature = tempus.findFeature(msaArea);

    reader.read(JSON.stringify(feature), function() {
        tempus.map.draw();
    });
};

//--------------------------------------------------------------------------
$(function () {
    'use strict';

    tempus.getLocations(function() {
        tempus.getTimeSeries($("#gs-select-location").text());
    });

    $('#gs-select-location').change(tempus.drawMsaBoundary);

    $('#datetimepicker1').datetimepicker();

    $('#datetimepicker2').datetimepicker();

    $('.dropdown-toggle').dropdown();

    $('#gs-select-covar').multiselect();

    $("#gs-run-spinner .gs-spinner-icon").hide();
    $("#spinner .gs-spinner-icon").hide();
    $("#spinner .gs-spinner-text").hide();

    // Event handlers
    $( "#gs-select-form" ).submit(function( event ) {
        tempus.toggleQueryIndicator(true);
        tempus.getTimeSeries($("#gs-select-location").text(), $("#gs-select-covar").text(), function() {
            tempus.toggleQueryIndicator(false);
        });

        return false;
    });

    // Now draw the map
    tempus.map = geo.map({
        node: '#map',
        center: {
            x: -98.0,
            y: 39.5
        },
        zoom: 2,
        autoResize: false
    });
    tempus.map.createLayer(
        'osm',
        {
            baseUrl: 'http://otile1.mqcdn.com/tiles/1.0.0/map/'
        }
    );

    tempus.resize = function() {
        var height = $(window).height(),
            width  = $("#map").width();
        tempus.map.resize(0, 0, width, height);
    };
    tempus.resize();
});
