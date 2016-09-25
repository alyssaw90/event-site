'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const bingMapRESTResource = (app) => {

	app.factory('bingMapRESTResource', ['$http', function($http) {

		return function(searchPath, callback) {
			return {
				getBingMapKey: function(callback) {
					$http.get('/api/bingmapkey')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				},
				getMapEvents: function(callback) {
					$http.get('/api/mapevents')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				},
				addPushpins: function(searchPath, callback) {
					$http.jsonp(searchPath)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				}
			}
			
		}

	}])
}

module.exports = bingMapRESTResource;