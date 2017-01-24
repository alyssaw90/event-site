'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const createEventRESTResource = (app) => {

	app.factory('createEventRESTResource', ['$http', ($http) => {

		return (resourceName, callback) => {
			return {
				getAllEvents: (callback) => {
					$http.get('/api/allevents')
					.then(function successCallback(data){
						callback(null, data)
					}, function errorCallback(data){
						callback(data)
					})
				},
				getAllSpeakers: (callback) => {
					$http.get('/api/speakers')
					.then(function successCallback(data){
						callback(null, data)
					}, function errorCallback(data){
						callback(data)
					})
				},
				createEvent: (resourceData, callback) => {
          $http.post('/api/createevent', resourceData)
		  			.then(function successCallback(data){
						callback(null, data)
					}, function errorCallback(data){
						callback(data)
					})

        	}
			}
			
		}

	}])
}

module.exports = createEventRESTResource;