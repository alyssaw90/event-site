'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const editSpeakerRESTResource = (app) => {

	app.factory('editSpeakerRESTResource', ['$http', ($http) => {

		return function(resourceName, callback) {
			return {

				createSpeaker: function(resourceData, callback) {
				
          $http.post('/api/editspeaker', resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
          // .success(customFunctions.handleSuccess(callback))
          // .error(customFunctions.handleError(callback));
        },
				deleteSpeaker: (resourceData, callback) => {				
          $http.delete(`/api/deletespeaker/${resourceData}`)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
          // .success(customFunctions.handleSuccess(callback))
          // .error(customFunctions.handleError(callback));
        },
			}
			
		}

	}])
}

module.exports = editSpeakerRESTResource;