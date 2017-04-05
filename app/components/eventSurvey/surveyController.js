'use strict';

const swal = require('sweetalert');
const surveyController = (app) => {
    app.controller('surveyController', ['$scope', 'surveyRESTResource', '$location', ($scope, resource, $location)=> {
        
        $scope.newSurvey = {};
        let createSurveyREST = resource();
        $scope.checked = true;
        $scope.createSurvey = (newSurveyData) => {
            createSurveyREST.createSurvey(newSurveyData, (err, data) => {
                if(err){
                    console.log(err)
                }
                if(!err){
                    $scope.newSurvey = {};
                }
            })
        }
    }])
}

module.exports = surveyController;