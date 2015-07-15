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
        error: _.partial(tempus.error, 'An ajax request failed.')
    };

    options = _.merge(options, ajaxOptionsDefaults);

    var cachedRequest = localStorage.getItem(options.url + JSON.stringify(options.data));
    useCache = (useCache === undefined) ? tempus.useCache : false;

    if (useCache && cachedRequest && options.hasOwnProperty('success')) {
        options.success(JSON.parse(cachedRequest));
    } else {
        if (options.hasOwnProperty('success') && useCache) {
            var successCallback = options.success;

            options.success = function(data) {
                try {
                    localStorage.setItem(options.url + JSON.stringify(options.data), JSON.stringify(data));
                } catch (e) {}

                if (successCallback) {
                    successCallback(data);
                }
            };
        }

        // Perform ajax call with caching wrapped around success callback
        $.ajax(options);
    }
};
