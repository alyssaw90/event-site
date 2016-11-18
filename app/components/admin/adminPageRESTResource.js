'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const adminPageRESTResource = (app) => {

	app.factory('adminPageRESTResource', ['$http', ($http) => {

		return function(resourceName, callback) {
			return {

				addTinymceFile: (resourceData, callback) => {
          $http.post('/api/tinymceUpload', resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },

        getCityNames: (searchQuery, bingKey, callback) => {
        	$http.jsonp(`//dev.virtualearth.net/REST/v1/Locations?jsonp=JSON_CALLBACK&key=${bingKey}&q&q=${searchQuery}`)
        	.success(customFunctions.handleSuccess(callback))
        	.error(customFunctions.handleError(callback));
        },

        getBingKey: (callback) => {
        	$http.get('/api/bingmapkey')
        	.success(customFunctions.handleSuccess(callback))
        	.error(customFunctions.handleError(callback));
        }
			}
			
		}

	}])
}

module.exports = adminPageRESTResource;