var tempus = tempus || {};

// @todo defaults? async:false ? defualt error handling

tempus.ajax = function(options, useCache) {
    // this assumes options.url and options.data exist
    var cachedRequest = localStorage.getItem(options.url + JSON.stringify(options.data));
    useCache = (useCache === undefined) ? tempus.useCache : false;

    if (useCache && cachedRequest && options.hasOwnProperty('success')) {
        options.success(JSON.parse(cachedRequest));
    } else {
        if (options.hasOwnProperty('success') && useCache) {
            var successCallback = options.success;

            options.success = function(data) {
                try {
                    if (!data.error) {
                        localStorage.setItem(options.url + JSON.stringify(options.data), JSON.stringify(data));
                    }
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
