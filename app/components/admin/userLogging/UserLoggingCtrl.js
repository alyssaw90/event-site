'use strict';
const jQuery = require('jquery');

const UserLoggingCtrl = (app) => {

	app.controller('UserLoggingCtrl', ['$scope', '$base64', '$cookies', '$timeout', '$location', '$rootScope', 'userLoggingRESTResources', ($scope, $base64, $cookies, $timeout, $location, $rootScope, resource) => {
		$scope.user = {};
    $scope.errors = [];
    $scope.showSpinner = false;
    $scope.retryMsg = 'There was a problem with your login, please try again'
        /*$scope.loginForm = {
          username: 'username',
          password: 'password'
        };*/
    

		let auth = resource();


    $scope.signIn = (user) => {

  		auth.signIn(user, (err) => {
          
          if (err) {
            $scope.showSpinner = true;
            $timeout( () => {
              $scope.showSpinner = false;
              console.log(err);
              $scope.errors.push({msg: 'could not log in user'});
              $scope.user = {};
              return;
              
            }, 2000)
          }
          if(!err) {
            $rootScope.isAuthenticated = true;
            $location.path('/admin/edit-event');
          }
      });      
    
    };

///////////////////////////////////////////
    // $loginButton.click(function(e) {
    //   e.preventDefault();
    //   var $form = $('#loginForm');
  
    //   $.ajax({
    //     /*afterSend: function (xhr) {
    //       xhr.setRequestHeader('Authorization', ('Basic ' + btoa('xxxx')));
    //       xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    //     },*/
    //     method: 'post',
    //     url: '/auth/login',
    //     dataType: 'json',
    //     async: true,
    //     username: $email.val(),
    //     password: $password.val()
  
    //   })
    //   .done(function(data) {
    //     Cookies.set('token', data.token);
    //     Cookies.set('interopAdmin', data.admin);
    //     if (data.admin === true) {
    //       window.location = '/admin';
    //     } else {
    //       window.location = '/curriculum';
    //     }
    //   })
    //   .error(function(error) {
    //     console.log(error);
    //     // $badLogInDiv.show();
    //     alert('There was a problem with your log in, please try again');
    //   })
    // })
  
    // $('#testButton').click(function(e) {
    //   var ckie = Cookies.get('token');
    // });
  
  
    // $('#logoutButton').click(logout);
    // $adminLogoutButton.click(logout);



    ////////////////////////////////

	}]);
};

module.exports = UserLoggingCtrl;