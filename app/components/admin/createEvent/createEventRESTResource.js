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