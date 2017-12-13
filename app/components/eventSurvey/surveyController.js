'use strict';

const swal = require('sweetalert');
const surveyController = (app) => {
    app.controller('surveyController', ['$scope', '$http','surveyRESTResource', '$location', '$window', '$anchorScroll', ($scope, $http, resource, $location, $anchorScroll)=> {
        
        $scope.newSurvey = {};
        $scope.hide=true
        $scope.hide = function(){
            $scope.hide=false
        }

        $scope.thankYouHide = false;
        $scope.thankYouShow = function(){
            $scope.thankYouHide = true;
        }
        
        $scope.createSurvey = (newSurveyData) => {
            $http({
                method:'POST',
                url: '/api/survey',
                data: newSurveyData
            }).then(function (response){
                    // alert('submitted')
                    // $scope.newSurvey={}
                // console.log(response.status)
                // console.log(response.data)
            }, function(err){
                console.log(err)
            })
        }

        $scope.goToTop = () => {
            $location.hash('top');
            $anchorScroll();
        }
    }])
}

module.exports = surveyController;