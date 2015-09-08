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

// This assumes a dataset in the following format:
/**
 comparison: [{counts: monthdate}]
 target: [{counts: monthdate}]
 u'diff_in_diff': {u'b': [-11.0152],
 u'p': [0.0759],
 u'se': [6.0837],
 u't': [-1.8106]}
 'selector': '#some-div'
 **/
terra.d3GroupedBar = function(gb) {
    var groupedCounts = gb.comparison.concat(gb.target);

    var margin = {top: 20, right: 20, bottom: 70, left: 50},
        width = 600 - margin.left - margin.right,
        height = 330 - margin.top - margin.bottom;

    // @todo this should be a time scale, but that makes rangeRoundBands harder to use
    var x0 = d3.scale.ordinal()
            .rangeRoundBands([0, width], 0.1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
            .range([height, 0]);

    var xAxis = d3.svg.axis()
            .scale(x0)
    // This is a hack so it shows proper year/month regardless of location
            .tickFormat(function(d) {
                return d3.time.format("%b %Y")(new Date(d + "1"));
            })
            .orient("bottom");

    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(d3.format("d"));

    var svg = d3.select(gb.selector).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x0.domain(groupedCounts.map(function(d) { return d.monthdate; }));
    x1.domain(['Target', 'Comparison']).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(groupedCounts, function(d) { return d.counts; })]);


    // This is another hack which is the result of using
    // string timestamps as ordinals. @todo
    // Comparison/Target are always the same length, with the same dates, sorted
    function firstDataPointIncludingOrAfterEventDate() {
        var thisDate;
        var eventDate = new Date(gb.eventDate);
        var ret = false;

        _.each(gb.comparison, function(dataPoint) {
            thisDate = new Date(dataPoint.monthdate);

            // This is a data point in the same month/year
            if ((thisDate.getUTCMonth() == eventDate.getUTCMonth() &&
                 thisDate.getUTCFullYear() == eventDate.getUTCFullYear()) ||
                // Or we're past it - so start here
                thisDate > eventDate) {
                ret = dataPoint.monthdate;
                return false; // break out of loop
            }
        });

        return ret;
    }

    // Shaded "after" indicator
    var xAfter = firstDataPointIncludingOrAfterEventDate();
    xAfter = (xAfter) ? x0(xAfter) : false;
    if (xAfter) {
        svg.append("rect")
            .attr("x", xAfter)
            .attr("fill", "#ededed")
            .attr("width", width - xAfter)
            .attr("height", height);
    }

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)" );

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Ads");

    // for each grouped counts (2 bars)
    var counts = svg.selectAll(".counts")
            .data(gb.data)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d) { return "translate(" + x0(d.monthdate) + ",0)"; });

    counts.selectAll("rect")
        .data(function(d) { return [{count: d.Target, type: 'Target'},
                                    {count: d.Comparison, type: 'Comparison'}]; })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.type); })
        .attr("y", function(d) { return y(d.count); })
        .attr("height", function(d) { return height - y(d.count); })
        .style("fill", function(d) { return d.type == 'Target' ? '#d62728' : '#ff7f0e'; });


    var legend = svg.selectAll(".legend")
            .data([{variable: 'b',
                    value: gb.stats.b},
                   {variable: 'se',
                    value: gb.stats.se},
                   {variable: 'p',
                    value: gb.stats.p}])
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });


    legend.append("text")
        .attr("x", width - 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d.variable + " = " + d.value.toString(); });
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
