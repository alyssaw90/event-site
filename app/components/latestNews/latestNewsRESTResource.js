// calls REST API for new/blog data

'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const latestNewsRESTResource = (app) => {

	app.factory('latestNewsRESTResource', ['$http', function($http) {

		return function(callback) {
			return {
				getBlogPosts: function(callback) {
					$http.get('http://sxp.microsoft.com/feeds/3.0/msdntn/MSDNOpenSpecificationFeeds/json?callback=JSON_CALLBACK')
					// $http.jsonp('//sxp.microsoft.com/feeds/3.0/msdntn/MSDNOpenSpecificationFeeds/?JSONP=JSON_CALLBACK')
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

module.exports = latestNewsRESTResource;