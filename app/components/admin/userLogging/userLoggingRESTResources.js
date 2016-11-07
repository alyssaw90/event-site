'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const userLoggingRESTResources = (app) => {

	app.factory('userLoggingRESTResources', ['$http', '$base64', '$cookies', '$window', ($http, $base64, $cookies, $window) => {
		return (user, callback) => {
		  return {
    	     signIn: (user, callback) => {
    	       var encoded = $base64.encode(user.username + ':' + user.password);
    	       $http.get('/auth/login', {
    	         headers: {'Authorization': 'Basic ' + encoded}
    	       })
    	       .success( (data) => {
                //set expiration to one day from login
                let today = new Date();
                let expireDate = new Date(today);
                expireDate.setDate(today.getDate() + 1); //Set expireDate date to tomorrow
                $cookies.put('interopAdmin', data.admin, {'expires': expireDate, 'path': '/'});
                callback(null);
    	       })
    	       .error( (data) => {
                callback(data);
    	       })
    	     },
	   
    	     logout: (callback) => {
             $http.get('/auth/logout')
             .success(customFunctions.handleSuccess(callback))
             .error(customFunctions.handleError(callback));
           }
    	   };
		}


	}])
}

module.exports = userLoggingRESTResources;