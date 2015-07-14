var tempus = tempus || {};

tempus.spec = {
    "width": -1,
    "height": -1,
    "padding": {"top": 10, "left": 30, "bottom": 30, "right": 30},
    "data": [
        {
            "name": "table",
            "format": {"type":"json", "parse":{"date":"date", "value":"number"}},
            "values": []
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
