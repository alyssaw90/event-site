'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const adminPageRESTResource = (app) => {

	app.factory('adminPageRESTResource', ['$http', ($http) => {

		return function(resourceName, callback) {
			return {

				addTinymceFile: (resourceData, callback) => {
          $http.post('/api/tinymceUpload', resourceData)
		  .then(function successCallback(data){
			  callback(null, data)
		  }, function errorCallback(data){
			  callback(data)
		  })
        },

        getCityNames: (searchQuery, bingKey, callback) => {
        	$http.jsonp(`//dev.virtualearth.net/REST/v1/Locations?jsonp=JSON_CALLBACK&key=${bingKey}&q&q=${searchQuery}`)
			.then(function successCallback(data){
			  callback(null, data)
		  	}, function errorCallback(data){
			  callback(data)
		  	})
        },

        getBingKey: (callback) => {
        	$http.get('/api/bingmapkey')
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

module.exports = adminPageRESTResource;