'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const createEventRESTResource = (app) => {

	app.factory('createEventRESTResource', ['$http', function($http) {

		return function(resourceName, callback) {
			return {
				getAllEvents: function(callback) {
					$http.get('/api/allevents')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				},
				getAllSpeakers: function(callback) {
					$http.get('/api/contacts')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				},
				createEvent: function(resourceData, callback) {
				/*let file = $scope.newEvent;
        let uploadUrl = '/api/createevent';
        let fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl,fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })*/
          $http.post('/api/createevent', resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        }
			}
			
		}

	}])
}

module.exports = createEventRESTResource;