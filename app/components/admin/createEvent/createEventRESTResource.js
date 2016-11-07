'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const createEventRESTResource = (app) => {

	app.factory('createEventRESTResource', ['$http', ($http) => {

		return (resourceName, callback) => {
			return {
				getAllEvents: (callback) => {
					$http.get('/api/allevents')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				},
				getAllSpeakers: (callback) => {
					$http.get('/api/speakers')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				},
				createEvent: (resourceData, callback) => {
          $http.post('/api/createevent', resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        }
			}
			
		}

	}])
}

module.exports = createEventRESTResource;