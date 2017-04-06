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
                    // console.log(err)
                    swal({
                        title: 'There was a problem submitting your form',
                        text: err,
                        type: 'warning',
                        confirmButtonColor: '#DD6B55',
                        confirmButtonText: 'Ok',
                        customClass: 'sweet-alert-hide-input'
                    });
                }
                if(!err){
                    $scope.newSurvey = {};
                    swal({
                        title: 'Survey Submitted',
                        type: 'success',
                        customClass: 'sweet-alert-hide-input'
                    },
                    function() {
                        $location.url('/');
                    });
                }
            })
        }
    }])
}

module.exports = surveyController;