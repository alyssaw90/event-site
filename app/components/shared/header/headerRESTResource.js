// calls REST API for slidesow data

'use strict';

import * as customFunctions from '../methods/common-functions.js';

const headerRESTResource = (app) => {

	app.factory('headerRESTResource', ['$http', function($http) {

		return function(slideshowName, callback) {
			return {
				getSlides: function(slideshowName, callback) {
					$http.get('/api/slideshow/' + slideshowName)
					.then(function successCallback(data){
						return callback(null, data);
					}, function errorCallback(data){
						return callback(data);
					})
				}
			}
			
		}

	}])
}

module.exports = headerRESTResource;