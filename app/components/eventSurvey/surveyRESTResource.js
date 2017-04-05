'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';

const surveyRESTResource = (app) => {
    app.factory('surveyRESTResource', ['$http', function($http){
        return (resourceName, callback) => {
            return {
                createSurvey: (resourceData, callback) => {
                    $http.post('/api/survey', resourceData)
                        .then(function successCallback(data){
                            callback(null, data)
                        }, function errorCallback(data){
                            callback(data)
                        })
                }
            }
        }
    }])
}

module.exports = surveyRESTResource;