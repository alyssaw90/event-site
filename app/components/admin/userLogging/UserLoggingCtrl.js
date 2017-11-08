'use strict';
const jQuery = require('jquery');

const UserLoggingCtrl = (app) => {

	app.controller('UserLoggingCtrl', ['$scope', '$base64', '$timeout', '$location', '$rootScope', '$window', 'adalAuthenticationService', ($scope, $base64, $timeout, $location, $rootScope, $window, adalAuthenticationService) => {

    $scope.login = function() {
      adalAuthenticationService.login();
      window.location='/admin/edit-event'
    };

    $scope.logout = function() {

      swal({
        title: 'Logout?',
        type: 'warning',
        showCancelButton: true,
        closeOnConfirm: false,
        customClass: 'sweet-alert-hide-input'
      },
      () => {
       
        adalAuthenticationService.logOut();
      });
      
    };

    $scope.isActive = function(viewLocation){
      return viewLocation === $location.path();
    };


		// $scope.user = {};
    // $scope.errors = [];
    // $scope.showSpinner = false;
    // $scope.retryMsg = 'There was a problem with your login, please try again'
        /*$scope.loginForm = {
          username: 'username',
          password: 'password'
        };*/
    

		// let auth = resource();


    // $scope.signIn = (user) => {

  	// 	auth.signIn(user, (err) => {
          
    //       if (err) {
    //         $scope.showSpinner = true;
    //         $timeout( () => {
    //           $scope.showSpinner = false;
    //           $scope.errors.push({msg: 'could not log in user'});
    //           $scope.user = {};
    //           return;
              
    //         }, 2000)
    //       }
    //       if(!err) {
    //         $rootScope.isAuthenticated = true;
    //         $location.path('/admin/edit-event');
    //       }
    //   });      
    
    // };

    // $scope.logout = () => {
    //   swal({
    //     title: 'Logout?',
    //     type: 'warning',
    //     showCancelButton: true,
    //     closeOnConfirm: false,
    //     customClass: 'sweet-alert-hide-input'
    //   },
    //   () => {
    //     let currentPath = $location.path();
    //     $cookies.remove('interopAdmin', {path: '/'});
    //     auth.logout( (err, data) => {
    //       $window.location.reload();
    //     });
     
    //   });
      
    // }


	}]);
};

module.exports = UserLoggingCtrl;