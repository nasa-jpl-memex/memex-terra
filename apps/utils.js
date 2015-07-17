var tempus = tempus || {};

tempus.error = function(message) {
    if (message !== undefined) {
        console.log(message);
    } else {
        console.log('There was an unexpected error.');
    }
};

tempus.ajax = function(options, useCache) {
    var ajaxOptionsDefaults = {
        data: {},
        async: false,
        cache: false,
        timeout: 1500,
        error: _.partial(tempus.error, 'An ajax request failed.')
    };

    options = _.merge(options, ajaxOptionsDefaults);

    var cachedRequest = localStorage.getItem(options.url + JSON.stringify(options.data));
    useCache = (useCache === undefined) ? tempus.useCache : useCache;

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

tempus.d3TimeSeries = function(ts) {
    // Clear any existing plots
    $(ts.selector).html('');

    var data = _.reduce(ts.datasets, function(arr, dataset) {
        return arr.concat(dataset.data);
    }, []);

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 750 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.time.scale()
            .range([0, width]);

    var y = d3.scale.linear()
            .range([height, 0]);

    var xAxis = d3.svg.axis()
            .scale(x)
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


    // Draw lines and points, for each dataset
    _.each(ts.datasets, function(dataset) {
        svg.append("path")
            .datum(dataset.data)
            .attr("class", "line " + dataset.label)
            .attr("d", line);

        svg.selectAll("point-" + dataset.label)
            .data(dataset.data)
            .enter().append("svg:circle")
            .attr("class", "point " + dataset.label)
            .attr("cx", function(d) { return x(d[ts.x]); })
            .attr("cy", function(d) { return y(d[ts.y]); })
            .attr("r", function() { return 3; });
    });
};
