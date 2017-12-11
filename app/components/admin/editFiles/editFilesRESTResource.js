'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const editFilesRESTResource = (app) => {

	app.factory('editFilesRESTResource', ['$http', ($http) => {

		return (callback) => {
			return {
				getAllFiles: (callback) => {
					$http.get('/admin/files')
					.then(function successCallback(data){
						callback(null, data)
					}, function errorCallback(data){
						callback(data)
					})
				},

				deleteFiles: (files, callback) => {
					$http.post('/api/files', files)
					.then(function successCallback(data){
						callback(null, data)
					}, function errorCallback(data){
						callback(data)
					})
				}

			}
				
		}

	}])
};

module.exports = editFilesRESTResource;