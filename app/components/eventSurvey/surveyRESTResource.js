'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const surveyRESTResource = (app) => {

	app.factory('surveyRESTResource', ['$http', ($http) => {

		return function(resourceName, callback) {
			return {

				createSurvey: function(resourceData, callback) {
				
          $http.post('/api/survey', resourceData)
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

module.exports = surveyRESTResource;