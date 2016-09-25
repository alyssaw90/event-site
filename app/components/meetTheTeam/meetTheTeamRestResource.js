'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const meetTheTeamRESTResource = (app) => {

	app.factory('meetTheTeamRESTResource', ['$http', function($http) {

		return function(callback) {
			return {
				getMeetTheTeamSpeakers: function(callback) {
					$http.get('/api/getTeam')
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
				}
			}
			
		}

	}])
}

module.exports = meetTheTeamRESTResource;