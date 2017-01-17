'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const futureEventsRESTResource = (app) => {

	app.factory('futureEventsRESTResource', ['$http', '$resource', ($http, $resource) => {

		return (callback) => {
			return {
				getFutureEvents: (callback) => {
					$http.get('/api/futureEventsData')
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

module.exports = futureEventsRESTResource;