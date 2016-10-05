'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const editEventRESTResource = (app) => {

	app.factory('editEventRESTResource', ['$http', ($http) => {

		return function(resourceName, callback) {
			return {
				getSingleEvent: function(resourceName, callback) {
					$http.get('/api/' + resourceName)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				},

				editEvent: function(resourceData, callback) {
				
          $http.post('/api/editevent', resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        }

			}
			
		}

	}])
}

module.exports = editEventRESTResource;