'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const editEventRESTResource = (app) => {

	app.factory('editEventRESTResource', ['$http', ($http) => {

		return function(resourceName, callback) {
			return {
				getSingleEvent: (resourceName, callback) => {
					$http.get('/api/fulllist/' + resourceName)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
				},

				editEvent: (resourceData, callback) => {
				
          $http.post('/api/editevent', resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },
        deleteEvent: (resourceData, callback) => {				
          $http.delete(`/api/deleteevent/${resourceData}`)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },
        editTab: (resourceData, callback) => {
				
          $http.post('/api/edittab', resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },

        editSpeakers: (resourceData, callback) => {
				
          $http.post('/api/editeventspeakers', resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },

        addTab: (resourceData, callback) => {
				
          $http.post('/api/addtab', resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },

        deleteTab: (resourceData, callback) => {
				
          $http.delete('/api/deletetab/' + resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },

        newTabOrder: (resourceData, callback) => {
          $http.post('/api/newtaborder', resourceData)
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

module.exports = editEventRESTResource;