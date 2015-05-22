var eaApp = {};

//--------------------------------------------------------------------------
eaApp.getTimeSeries = function() {
  // Hard-coded for now
  $.ajax({
    url: "http://cors-anywhere.herokuapp.com/http://tempus-demo.ngrok.com/api/series?table=escort_ads&sort=1&response_col=price_per_hour&group_col=msaname&group=Memphis,%20TN-AR-MS%20MSA",
    // Work with the response
    success: function( data ) {
        $.ajax({
            url: "http://cors-anywhere.herokuapp.com/http://tempus-demo.ngrok.com/api/comparison?table=escort_ads&sort=1&response_col=price_per_hour&group_col=msaname&group=Bakersfield,%20CA%20MSA&covs=population%7Cviolent",
            success: function( compData ) {
                eaApp.timeSeries( data, compData );
            }
        })
    }
  });
}

// Create statistical plot
//--------------------------------------------------------------------------
eaApp.timeSeries = function(data, compData, clearPrev) {
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

  console.log(cleanData);

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
                    "r": {"value": 255},
                    "g": {"value": 100},
                    "b": {"value": 100}
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
  }

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
}

//--------------------------------------------------------------------------
$(function () {
  'use strict';

  eaApp.getTimeSeries();
});