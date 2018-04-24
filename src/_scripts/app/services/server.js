"use strict";

angular.module("app.services")

.factory("server", ["$http", "$location", function($http, $location) {

    /**
		API url and keys
     */
    var server = {
		baseUrl	:	"http://api.weatherunlocked.com/api/",
		appID	:	"930fc96a",
		apiKey	:	"bd8f96bc469b5f3a186a7b87da0f8ddd"
	}

    return {
        /**
         * @public 
         * @param {string} type: Weather type, can be "current" or "forecast".
         * @param {string} location: Weather location zip code au.####.
         * @returns {Promise} returns HTTP promise.
         */
        get: function(type, location) {
            var url = server.baseUrl+type+"/"+location+"?app_id="+server.appID+"&app_key="+server.apiKey;
            return $http({
                method: "GET",
                url: url,
                headers: { "Content-Type" : "application/json" }
            });
        }
    };

}]);