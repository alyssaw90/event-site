'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const pastEventsRESTResource = (app) => {

	app.factory('pastEventsRESTResource', ['$http', function($http) {

		return function(callback) {
			return {
				getPastEvents: (callback) => {
					$http.get('/api/published-past-events')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				}
			}
			
		}

	}])
}

module.exports = pastEventsRESTResource;