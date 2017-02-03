// calls REST API for team/speaker information

'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const meetTheTeamRESTResource = (app) => {

	app.factory('meetTheTeamRESTResource', ['$http', function($http) {

		return function(callback) {
			return {
				getMeetTheTeamSpeakers: function(callback) {
					$http.get('/api/getTeam')
					.then(function successCallback(data){
						return callback(null, data)
					}, function errorCallback(data){
						return callback(data)
					})
				}
			}
			
		}

	}])
}

module.exports = meetTheTeamRESTResource;