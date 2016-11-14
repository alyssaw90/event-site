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
        updateUser: (resourceData, callback) => {
          $http.patch(`/auth/user`, resourceData)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        }
      }
    };
  }]);
}

module.exports = accountRESTResource;