'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const eventsRESTResource = (app) => {

	app.factory('eventsRESTResource', ['$http', function($http) {

		return function(resourceName, callback) {
			return {
				getEvents: function(resourceName, callback) {
					$http.get('/api/' + resourceName)
					.then(function successCallback(data){
						return callback(null, data);
					}, function errorCallback(data){
						callback(data);
					})
        //   .success(customFunctions.handleSuccess(callback))
        //   .error(customFunctions.handleError(callback));
				}
			}
			
		}

	}])
}

module.exports = eventsRESTResource;