var terra = terra || {};

terra.error = function(message) {
    if (message !== undefined) {
        console.log(message);
    } else {
        console.log('There was an unexpected error.');
    }
};

terra.ajax = function(options, useCache) {
    var ajaxOptionsDefaults = {
        data: {},
        async: false,
        cache: false,
        timeout: 1500,
        error: _.partial(terra.error, 'An ajax request failed.')
    };

    options = _.merge(options, ajaxOptionsDefaults);

    var cachedRequest = localStorage.getItem(options.url + JSON.stringify(options.data));
    useCache = (useCache === undefined) ? terra.useCache : useCache;

    if (useCache && cachedRequest && options.hasOwnProperty('success')) {
        options.success(JSON.parse(cachedRequest));
    } else {
        // Cache regardless
        var successCallback = options.success;

        options.success = function(data) {
            try {
                localStorage.setItem(options.url + JSON.stringify(options.data), JSON.stringify(data));
            } catch (e) {}

            if (successCallback) {
                successCallback(data);
            }
        };

        // Perform ajax call with caching wrapped around success callback
        $.ajax(options);
    }
};


terra.c3GroupedBar = function(data) {
    var chartSize =  {
        height: 330,
        width: 600
    };

    var chart = c3.generate({
        size: chartSize,
        data: {
            type: 'bar',
            json: data.data,
            keys: {
                x: 'date',
                value: ['Target', 'Comparison']
            },
            colors: {
                Target: '#d62728',
                Comparison: '#ff7f0e'
            }
        },
        axis: {
            x: {
                type: 'categories',
                tick: {
                    culling: {
                        max: 10
                    },
                    rotate: -60,
                    multiline: false,
                    fit: true,
                    format: function(i) {
                        if (data.groupedBy === 'yearly') {
                            return d3.time.format('%Y')(data.data[i].date);
                        } else if (data.groupedBy === 'monthly') {
                            return d3.time.format('%b %Y')(data.data[i].date);
                        } else if (data.groupedBy === 'daily') {
                            return d3.time.format('%d %b %Y')(data.data[i].date);
                        }
                    }
                },
                height: 50
            }
        },
        bar: {
            width: {
                ratio: 0.5
            }
        },
        bindto: '#dd-analysis-overlay > .plot',
        subchart: {
            show: true
        },
        zoom: {
            enabled: true
        },
        legend: {
            show: false
        },
        grid: {
            x: {
                lines: [{
                    value: indexOfFirstDataPointIncludingOrAfterEventDate(),
                    text: 'Event'
                }]
            }
        }
    });

    var svg = d3.select('#dd-analysis-overlay > .plot > svg');

    // Legend
    var legend = svg.selectAll(".legend")
            .data([{variable: 'b',
                    value: data.stats.b[0]},
                   {variable: 'se',
                    value: data.stats.se[0]},
                   {variable: 'p',
                    value: data.stats.p[0]}])
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });


    legend.append("text")
        .attr("x", chartSize.width - 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d.variable + " = " + d.value.toString(); })
        .style("text-anchor", "end");

    // Event indicator
    // @todo This is another consequence of using an ordinal scale, instead
    // of saying "place a line where this date occurs", we have to find the first
    // point that is applicable to drawing a line. Meaning if it's grouped monthly
    // and the event date is Jan 10th.. we need to place the line at the Jan month marker.
    function indexOfFirstDataPointIncludingOrAfterEventDate() {
        var thisDate;
        var eventDate = new Date(data.eventDate);
        var ret = -1;

        _.each(data.data, function(dataPoint, index) {
            thisDate = dataPoint.date;

            if (data.groupedBy === 'daily') {
                if (thisDate.getUTCDate() === eventDate.getUTCDate()) {
                    ret = index;
                    return false;
                }
            } else if (data.groupedBy === 'monthly') {
                // This is a data point in the same month/year
                if ((thisDate.getUTCMonth() == eventDate.getUTCMonth() &&
                     thisDate.getUTCFullYear() == eventDate.getUTCFullYear()) ||
                    // Or we're past it - so start here
                    thisDate > eventDate) {
                    ret = index;
                    return false; // break out of loop
                }
            } else if (data.groupedBy === 'yearly') {
                if ((thisDate.getUTCFullYear() >= eventDate.getUTCFullYear())) {
                    ret = index;
                    return false;
                }
            }
        });

        return ret;
    }
};

terra.d3TimeSeries = function(ts) {
    var data = _.reduce(ts.datasets, function(arr, dataset) {
        return arr.concat(dataset.data);
    }, []);

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 330 - margin.top - margin.bottom;

    var x = d3.time.scale()
            .range([0, width]);

    var y = d3.scale.linear()
            .range([height, 0]);

    var xAxis = d3.svg.axis()
            .scale(x)
            .ticks(8)
            .orient("bottom");

    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

    var line = d3.svg.line()
            .interpolate("monotone")
            .x(function(d) { return x(d[ts.x]); })
            .y(function(d) { return y(d[ts.y]); });

    var svg = d3.select(ts.selector).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function(datum) { return datum[ts.x]; }));
    y.domain([0, d3.max(data, function(datum) { return datum[ts.y]; })]);

    // Draw axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

    function draw(datasets) {
        // Update axes for both new lines
        data = _.reduce(datasets, function(arr, dataset) {
            return arr.concat(dataset.data);
        }, []);

        x.domain(d3.extent(data, function(datum) { return datum[ts.x]; }));
        y.domain([0, d3.max(data, function(datum) { return datum[ts.y]; })]);

        svg.selectAll("g .x.axis")
            .call(xAxis);

        svg.selectAll("g .y.axis")
            .call(yAxis);

        // Remove old lines/points, create new lines/points
        _.each(datasets, function(dataset) {
            svg.selectAll(".line." + dataset.label).remove();
            svg.selectAll(".point." + dataset.label).remove();

            var path = svg.selectAll(".line ." + dataset.label)
                    .data([dataset.data], function(d) { return d; });

            path.enter()
                .append("path")
                .attr("class", "line " + dataset.label)
                .attr("d", line);

            svg.selectAll("point-" + dataset.label)
                .data(dataset.data)
                .enter().append("svg:circle")
                .attr("class", "point " + dataset.label)
                .attr("cx", function(d) { return x(d[ts.x]); })
                .attr("cy", function(d) { return y(d[ts.y]); })
                .attr("r", 3);
        });
    }

    draw(ts.datasets);

    return draw;
};
