'use strict';

const swal = require('sweetalert');
const surveyController = (app) => {
    app.controller('surveyController', ['$scope', '$http','surveyRESTResource', '$location', '$window', ($scope, $http, resource, $location)=> {
        
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
                    console.log(response.status)
                    console.log(response.data)
                }, function(err){
                    console.log(err)
                })
            // console.log(newSurveyData)
            // createSurveyREST.createSurvey(newSurveyData, (err, data) => {
            //     console.log('this is working!!! :D')
            //     if(err){
            //         // console.log(err)
            //         swal({
            //             title: 'There was a problem submitting your form',
            //             text: err,
            //             type: 'warning',
            //             confirmButtonColor: '#DD6B55',
            //             confirmButtonText: 'Ok',
            //             customClass: 'sweet-alert-hide-input'
            //         });
            //     } 
                
            //     if(data.status=="success") {
            //         swal({
            //             title:'Form submitted',
            //             type: 'success'
            //         })
            //         $location.url('/')
            //     }

                
            // })
        }
    }])
}

module.exports = surveyController;