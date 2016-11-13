'use strict';
import * as customFunctions from '../../shared/methods/common-functions.js';

function accountRESTResource(app) {
  app.factory(`accountRESTResource`, [`$http`, ($http) => {
    return (resourceName, callback) => {
      return {
        getUser: (callback) => {
          $http.get(`/auth/getuser`)
          .success(customFunctions.handleSuccess(callback))
          .error(customFunctions.handleError(callback));
        }
      }
    };
  }]);
}

module.exports = accountRESTResource;