'use strict';
import * as customFunctions from '../../shared/methods/common-functions.js';

function accountRESTResource(app) {
  app.factory(`accountRESTResource`, [`$http`, ($http) => {
    return (resourceName, callback) => {
      return {
        getUser: (callback) => {
          $http.get(`/auth/user`)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },
        getAllUsers: (callback) => {
          $http.get(`/auth/allusers`)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },
        createUser: (resourceData, callback) => {
          $http.post(`/auth/user`, resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },
        updateUser: (resourceData, callback) => {
          $http.patch(`/auth/user`, resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },
        deleteUser: (resourceData, callback) => {				
          $http.delete(`/auth/user/${resourceData}`)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },
         updateMsUser: (resourceData, callback) => {
          $http.patch(`/auth/msusers`, resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },
        addMsUser: (resourceData, callback) => {
          $http.post(`/auth/msusers`, resourceData)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        },
        deleteMsUser: (resourceData, callback) => {				
          $http.delete(`/auth/msusers/${resourceData}`)
          .then(function successCallback(data){
            callback(null, data)
          }, function errorCallback(data){
            callback(data)
          })
        }
      }
    };
  }]);
}

module.exports = accountRESTResource;