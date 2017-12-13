'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const editEventRESTResource = (app) => {

	app.factory('editEventRESTResource', ['$http', ($http) => {

		return function(resourceName, callback) {
			return {
				getSingleEvent: (resourceName, callback) => {
					$http.get('/admin/fulllist/' + resourceName)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
				},

				editEvent: (resourceData, callback) => {
				
          $http.post('/admin/editevent', resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },
        deleteEvent: (resourceData, callback) => {				
          $http.delete(`/admin/deleteevent/${resourceData}`)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },
        editTab: (resourceData, callback) => {
				
          $http.post('/admin/edittab', resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },

        editSpeakers: (resourceData, callback) => {
				
          $http.post('/admin/editeventspeakers', resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },

        addTab: (resourceData, callback) => {
				
          $http.post('/admin/addtab', resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },

        deleteTab: (resourceData, callback) => {
				
          $http.delete('/admin/deletetab/' + resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },

        newTabOrder: (resourceData, callback) => {
          $http.post('/admin/newtaborder', resourceData)
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