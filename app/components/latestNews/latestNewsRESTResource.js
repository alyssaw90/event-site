'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const latestNewsRESTResource = (app) => {

	app.factory('latestNewsRESTResource', ['$http', function($http) {

		return function(callback) {
			return {
				getBlogPosts: function(callback) {
					// $http.jsonp('http://sxp.microsoft.com/feeds/3.0/msdntn/MSDNOpenSpecificationFeeds/json?callback=JSON_CALLBACK')
					$http.jsonp('http://sxp.microsoft.com/feeds/3.0/msdntn/MSDNOpenSpecificationFeeds/?JSONP=JSON_CALLBACK')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				}
			}
			
		}

	}])
}

module.exports = latestNewsRESTResource;