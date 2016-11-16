'use strict';
import * as customFunctions from '../../shared/methods/common-functions.js';

function accountRESTResource(app) {
  app.factory(`accountRESTResource`, [`$http`, ($http) => {
    return (resourceName, callback) => {
      return {
        getUser: (callback) => {
          $http.get(`/auth/user`)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },
        getAllUsers: (callback) => {
          $http.get(`/auth/allusers`)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },
        createUser: (resourceData, callback) => {
          $http.post(`/auth/user`, resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },
        updateUser: (resourceData, callback) => {
          $http.patch(`/auth/user`, resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },
        deleteUser: (resourceData, callback) => {				
          $http.delete(`/auth/user/${resourceData}`)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },
         updateMsUser: (resourceData, callback) => {
          $http.patch(`/auth/msusers`, resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },
        addMsUser: (resourceData, callback) => {
          $http.post(`/auth/msusers`, resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        },
        deleteMsUser: (resourceData, callback) => {				
          $http.delete(`/auth/msusers/${resourceData}`)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        }
      }
    };
  }]);
}

module.exports = accountRESTResource;