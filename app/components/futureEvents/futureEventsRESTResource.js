'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const futureEventsRESTResource = (app) => {

	app.factory('futureEventsRESTResource', ['$http', '$resource', ($http, $resource) => {

		return (callback) => {
			return {
				getFutureEvents: (callback) => {
					$http.get('/api/futureEventsData')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				}
			}
			
		}

	}])
}

module.exports = futureEventsRESTResource;