'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const editEventRESTResource = (app) => {

	app.factory('editEventRESTResource', ['$http', ($http) => {

		return function(resourceName, callback) {
			return {
				getSingleEvent: (resourceName, callback) => {
					$http.get('/api/fulllist/' + resourceName)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				},

				editEvent: (resourceData, callback) => {
				
          $http.post('/api/editevent', resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },
        deleteEvent: (resourceData, callback) => {				
          $http.delete(`/api/deleteevent/${resourceData}`)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },
        editTab: (resourceData, callback) => {
				
          $http.post('/api/edittab', resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },

        editSpeakers: (resourceData, callback) => {
				
          $http.post('/api/editeventspeakers', resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },

        addTab: (resourceData, callback) => {
				
          $http.post('/api/addtab', resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },

        deleteTab: (resourceData, callback) => {
				
          $http.delete('/api/deletetab/' + resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },

        newTabOrder: (resourceData, callback) => {
          $http.post('/api/newtaborder', resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        }

			}
			
		}

	}])
}

module.exports = editEventRESTResource;