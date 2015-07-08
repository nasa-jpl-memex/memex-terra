// Tempus Application
var tempus = {};

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

//--------------------------------------------------------------------------
tempus.getTimeSeries = function(targetLocation, covars, callback) {
    console.log(targetLocation);

    // Hard-coded for now
    $.ajax({
        url: "http://cors-anywhere.herokuapp.com/http://tempus-demo.ngrok.com/"+
            "api/series?table=escort_ads&sort=1&response_col=price_per_hour&"+
            "group_col=msaname&group="+targetLocation,
        // Work with the response
        success: function( data ) {
            $.ajax({
                url: "http://cors-anywhere.herokuapp.com/"+
                    "http://tempus-demo.ngrok.com/api/comparison?table="+
                    "escort_ads&sort=1&response_col=price_per_hour&group_col="+
                    "msaname&group="+targetLocation+"&covs="+covars,
                success: function( compData ) {
                    tempus.timeSeries( data, compData );
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    });
};

tempus.getLocations = function(callback) {
    $.ajax({
        url: "http://cors-anywhere.herokuapp.com/https://tempus-demo.ngrok.com/"+
            "api/groups?table=escort_ads&group_col=msaname",
        // Work with the response
        success: function( data ) {
            var locations = data, i = null;
            for (i = 0; i < locations.msaname.length; ++i) {
                $("#gs-select-location").append("<option>" + locations.msaname[i]);
            }

            if (callback) {
                callback();
            }
        }
    });
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

//--------------------------------------------------------------------------
$(function () {
    'use strict';

    // tempus.getLocations(function() {
    //   tempus.getTimeSeries($("#gs-select-location").text());
    // });

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
