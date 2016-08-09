'use strict';

import * as customFunctions from './../../../es6/common-functions.build.js';

const headerRESTResource = (app) => {

	app.factory('headerRESTResource', ['$http', function($http) {

		return function(callback) {
			return {
				getSiteStyle: function(callback) {
					$http.get('/sitestyle')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				}
			}
			
		}

	}])
}

module.exports = headerRESTResource;