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
				},

				getAllSlides: (callback) => {
					$http.get('/api/allslides')
					.success(customFunctions.handleSuccess(callback))
					.error(customFunctions.handleError(callback));
				},

				setNewSlideshowOrder: (slideData, callback) => {
					$http.post('/api/sethomepageslides', slideData)
					.success(customFunctions.handleSuccess(callback))
					.error(customFunctions.handleError(callback));
				},

				addSlide: (newSlideData, callback) => {
					$http.post('/api/addslide', newSlideData)
					.success(customFunctions.handleSuccess(callback))
					.error(customFunctions.handleError(callback));
				},

				deleteSlide: (slideId, callback) => {
					$http.post('/api/deleteslide', slideId)
					.success(customFunctions.handleSuccess(callback))
					.error(customFunctions.handleError(callback));
				}

			}
				
		}

	}])
};

module.exports = editSlideshowRESTResource;