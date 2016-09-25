'use strict';

import * as customFunctions from '../methods/common-functions.js';

const headerRESTResource = (app) => {

	app.factory('headerRESTResource', ['$http', function($http) {

		return function(slideshowName, callback) {
			return {
				getSlides: function(slideshowName, callback) {
					$http.get('/api/slideshow/' + slideshowName)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				}
			}
			
		}

	}])
}

module.exports = headerRESTResource;