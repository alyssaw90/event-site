'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const editSlideshowRESTResource = (app) => {

	app.factory('editSlideshowRESTResource', ['$http', ($http) => {

		return (callback) => {
			return {
				getAllSlideshows: (slideshowName, callback) => {
					$http.get('/api/slideshow/' + slideshowName)
					.success(customFunctions.handleSuccess(callback))
					.error(customFunctions.handleError(callback));
				}
			}
				
			}

	}])
};

module.exports = editSlideshowRESTResource;