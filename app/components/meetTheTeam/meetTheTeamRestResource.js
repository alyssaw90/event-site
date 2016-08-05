'use strict';

import * as customFunctions from './../../es6/common-functions.build.js';

const meetTheTeamRESTResource = (app) => {

	app.factory('meetTheTeamRESTResource', ['$http', function($http) {

		return function(callback) {
			return {
				getMeetTheTeamSpeakers: function(callback) {
					$http.get('/getTeam')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				}
			}
			
		}

	}])
}

module.exports = meetTheTeamRESTResource;