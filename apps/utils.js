var tempus = tempus || {};

tempus.ajax = function(options, useCache) {
    // this assumes options.url and options.data exist
    var cachedRequest = localStorage.getItem(options.url + JSON.stringify(options.data));

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
