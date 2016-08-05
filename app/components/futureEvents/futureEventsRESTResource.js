'use strict';

import * as customFunctions from './../../es6/common-functions.build.js';

const futureEventsRESTResource = (app) => {

	app.factory('futureEventsRESTResource', ['$http', function($http) {

		return function(callback) {
			return {
				getFutureEvents: function(callback) {
					$http.get('/futureEventsData')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				}
			}
			
		}

	}])
}

module.exports = futureEventsRESTResource;