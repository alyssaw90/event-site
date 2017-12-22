'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const createSpeakerRESTResource = (app) => {

	app.factory('createSpeakerRESTResource', ['$http', ($http) => {

		return function(resourceName, callback) {
			return {

				createSpeaker: function(resourceData, callback) {
				
          $http.post('/admin/addspeakers', resourceData)
			.then(function successCallback(data){
				callback(data)
			}, function errorCallback(data){
				callback(data)
			})	
        	}
			}
			
		}

	}])
}

module.exports = createSpeakerRESTResource;