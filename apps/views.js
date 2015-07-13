var tempus = tempus || {};

tempus.FormView = Backbone.View.extend({
    el: '#action-form',

    events: {
        'change #gs-select-location': 'selectMsa',
        'submit #gs-select-form': 'runDiffAndDiff'
    },

    selectMsa: function(event) {
        this.createMsaView($(event.currentTarget).find('option:selected').text());
    },

    createMsaView: function(msaName) {
        var msaModel = tempus.msaCollection.get(msaName);

        if (msaName && msaModel) {
            var view = new tempus.MsaView({
                model: msaModel
            });
        }
    },

    runDiffAndDiff: function(event) {
        event.preventDefault();
        var _this = this;
        this.covars = [];

        var location = $('#gs-select-location option:selected').text();
        var covars = $('#gs-select-covar option:selected').each(function() {
            var $this = $(this);

            if ($this.length) {
                _this.covars.push($this.text());
            }
        });

        var dd = new tempus.DiffAndDiffView({
            location: location,
            covars: this.covars.join('|')
        });
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(_.template($('#action-form-template').html(), {}));

        $('#datetimepicker1').datetimepicker();
        $('#datetimepicker2').datetimepicker();
        $('.dropdown-toggle').dropdown();

        tempus.ajax({
            url: 'https://tempus-demo.ngrok.com/api',
            async: false,
            data: {},
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
        }, tempus.useCache);

        $("#gs-run-spinner .gs-spinner-icon").hide();
        $("#spinner .gs-spinner-icon").hide();
        $("#spinner .gs-spinner-text").hide();
    }
});

tempus.MapView = Backbone.View.extend({
    el: '#map',

    initialize: function() {
        this.render();
    },

    render: function() {
        tempus.map = geo.map({
            node: this.el,
            center: {
                x: tempus.defaultCenter[0],
                y: tempus.defaultCenter[1]
            },
            zoom: 2,
            autoResize: false
        });

        tempus.map.createLayer('osm', {
            baseUrl: 'http://otile1.mqcdn.com/tiles/1.0.0/map/'
        });

        // should this be moved to initialize?
        tempus.resize = function() {
            var height = $(window).height(),
                width  = $("#map").width();
            tempus.map.resize(0, 0, width, height);
        };
        tempus.resize();
    }
});

tempus.DiffAndDiffView = Backbone.View.extend({
    initialize: function(options) {
        this.render(options.location, options.covars);
    },

    fetchTimeSeriesData: function(location, covars) {
        var _this = this;

        tempus.ajax({
            url: 'https://tempus-demo.ngrok.com/api/series',
            data: {
                table: 'escort_ads',
                sort: 1,
                response_col: 'price_per_hour',
                group_col: 'msaname',
                group: location + ' MSA' // @todo should we ever strip this out?
            },
            async: false,
            success: function(data) {
                _this.tsData = JSON.parse(data); // @Todo get this to be received as json

                if (_this.tsData.hasOwnProperty('error')) {
                    alert('error');
                }

                tempus.ajax({
                    url: 'https://tempus-demo.ngrok.com/api/comparison',
                    data: {
                        table: 'escort_ads',
                        sort: 1,
                        response_col: 'price_per_hour',
                        group_col: 'msaname',
                        group: location + ' MSA', // @todo should we ever strip this out?
                        covs: covars
                    },
                    async: false,
                    success: function(compData) {
                        _this.tsCompData = JSON.parse(compData);
                        if (_this.tsCompData.hasOwnProperty('error')) {
                            alert('error');
                        }
                    },
                    error: function(a, b, c) {
                        alert('error');
                    }
                });
            },
            error: function(a, b, c) {
                alert('error');
            }
        });
    },

    render: function(location, covars) {
        // @todo setup a series model?
        this.fetchTimeSeriesData(location, covars);


        // render similar groups boundaries
        _.each(this.tsCompData.groups, function(group) {
            tempus.formView.createMsaView(group.replace(/ MSA$/, ''));
        });

        var clearPrev = false;

        // @todo move this into a template file

        var cleanData = [], i = null;
        var data = this.tsData;
        var compData = this.tsCompData;




        // Prepare data
        for (i = 0; i < data.result.length; ++i) {
            cleanData.push({"date": data.result[i][0], "value": data.result[i][1], "symbol": "raw"});
        }

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

    }
});

tempus.MsaView = Backbone.View.extend({
    initialize: function(options) {
        this.render(options);
    },

    render: function(options) {
        var clearLayer = options.clearLayer || false;

        if (tempus.featureLayer !== undefined && clearLayer) {
            tempus.featureLayer.clear();
        } else {
            tempus.featureLayer = tempus.map.createLayer('feature');
        }

        tempus.map.draw();

        var reader = geo.createFileReader('jsonReader', {'layer': tempus.featureLayer});
        reader.read(JSON.stringify(this.model.get('shape')), function() {
            tempus.map.draw();
        });
    }
});
