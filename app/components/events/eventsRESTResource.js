'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const eventsRESTResource = (app) => {

	app.factory('eventsRESTResource', ['$http', function($http) {

		return function(resourceName, callback) {
			return {
				getEvents: function(resourceName, callback) {
					$http.get('/api/' + resourceName)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				}
			}
			
		}

	}])
}

module.exports = eventsRESTResource;