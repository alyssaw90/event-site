//REMOVE ENTIRE FILE

// // calls REST API for bing map

// 'use strict';

// import * as customFunctions from '../shared/methods/common-functions.js';

// const bingMapRESTResource = (app) => {

// 	app.factory('bingMapRESTResource', ['$http', function($http) {

// 		return function(searchPath, callback) {
// 			return {
// 				getBingMapKey: function(callback) {
// 					$http.get('/api/bingmapkey')
// 					.then(function successCallback(data){
// 						return callback(null, data);
// 					}, function errorCallback(data){
// 						return callback(data)
// 					})
// 				},
// 				getMapEvents: function(callback) {
// 					$http.get('/api/mapevents')
// 					.then(function successCallback(data){
// 						return callback(null, data);
// 					}, function errorCallback(data){
// 						return callback(data)
// 					})
// 				},
// 				addPushpins: function(searchPath, callback) {
// 					$http.jsonp(searchPath)
// 					.then(function successCallback(data){
// 						return callback(null, data);
// 					}, function errorCallback(data){
// 						return callback(data)
// 					})
// 				}
// 			}
			
// 		}

// 	}])
// }

// module.exports = bingMapRESTResource;