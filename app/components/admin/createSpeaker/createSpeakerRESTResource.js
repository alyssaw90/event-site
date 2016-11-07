'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const createSpeakerRESTResource = (app) => {

	app.factory('createSpeakerRESTResource', ['$http', ($http) => {

		return function(resourceName, callback) {
			return {

				createSpeaker: function(resourceData, callback) {
				
          $http.post('/api/addspeakers', resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        }
			}
			
		}

	}])
}

module.exports = createSpeakerRESTResource;