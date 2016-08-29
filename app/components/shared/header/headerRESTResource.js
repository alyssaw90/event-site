'use strict';

import * as customFunctions from '../methods/common-functions.js';

const headerRESTResource = (app) => {

	app.factory('headerRESTResource', ['$http', function($http) {

		return function(callback) {
			return {
				getSiteStyle: function(callback) {
					$http.get('/api/sitestyle')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				}
			}
			
		}

	}])
}

module.exports = headerRESTResource;