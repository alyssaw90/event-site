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
    	       .then(function successCallback (data) {
                callback(null, data);
    	       }, function errorCallback(data){
							 callback(data);
						 })
    	       
    	     },
	   
    	     logout: (callback) => {
             $http.get('/auth/logout')
             .then(function successCallback(data){
							 callback(null, data)
						 }, function errorCallback(data){
							 callback(data)
						 })
           }
    	   };
		}


	}])
}

module.exports = userLoggingRESTResources;