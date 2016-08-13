'use strict';

import * as customFunctions from './../../es6/common-functions.build.js';

const adminRESTResource = (app) => {

	app.factory('adminRESTResource', ['$http', function($http) {

		return function(resourceName, callback) {
			return {
				getAllEvents: function(callback) {
					$http.get('/allevents')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				},
				getAllSpeakers: function(callback) {
					$http.get('/contacts')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				}
			}
			
		}

	}])
}

module.exports = adminRESTResource;