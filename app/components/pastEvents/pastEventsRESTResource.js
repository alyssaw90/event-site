// calls REST API for past event data

'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const pastEventsRESTResource = (app) => {

	app.factory('pastEventsRESTResource', ['$http', function($http) {

		return function(callback) {
			return {
				getPastEvents: (callback) => {
					$http.get('/api/published-past-events')
					.then(function successCallback(data){
						return callback(null, data);
					}, function errorCallback(data){
						return callback(data);
					})
				}
			}
			
		}

	}])
}

module.exports = pastEventsRESTResource;