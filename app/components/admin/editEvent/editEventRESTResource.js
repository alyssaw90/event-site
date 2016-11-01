'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const editEventRESTResource = (app) => {

	app.factory('editEventRESTResource', ['$http', ($http) => {

		return function(resourceName, callback) {
			return {
				getSingleEvent: function(resourceName, callback) {
					$http.get('/api/fulllist/' + resourceName)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				},

				editEvent: function(resourceData, callback) {
				
          $http.post('/api/editevent', resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },

        editTab: function(resourceData, callback) {
				
          $http.post('/api/edittab', resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },

        editSpeakers: function(resourceData, callback) {
				
          $http.post('/api/editeventspeakers', resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },

        addTab: function(resourceData, callback) {
				
          $http.post('/api/addtab', resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },

        deleteTab: function(resourceData, callback) {
				
          $http.delete('/api/deletetab/' + resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        }

			}
			
		}

	}])
}

module.exports = editEventRESTResource;