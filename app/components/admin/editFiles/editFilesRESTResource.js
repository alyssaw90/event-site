'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const editFilesRESTResource = (app) => {

	app.factory('editFilesRESTResource', ['$http', ($http) => {

		return (callback) => {
			return {
				getAllFiles: (callback) => {
					$http.get('/api/files')
					.success(customFunctions.handleSuccess(callback))
					.error(customFunctions.handleError(callback));
				},

				deleteFiles: (files, callback) => {
					$http.post('/api/files', files)
					.success(customFunctions.handleSuccess(callback))
					.error(customFunctions.handleError(callback));
				}

			}
				
		}

	}])
};

module.exports = editFilesRESTResource;