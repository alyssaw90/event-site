'use strict';

const UserLoggingCtrl = (app) => {

	app.controller('UserLoggingCtrl', ['$scope', '$base64', '$cookies', 'userLoggingRESTResources', ($scope, $base64, $cookies, resource) => {
		$scope.newSpeaker = {};
    $scope.errors = [];

		let auth = resource();


    $scope.signIn = (user) => {

  		auth.signIn(user, (err) => {
        if (err) {
          console.log(err);
          return $scope.errors.push({msg: 'could not create user'});
        }

        // $location.path('/notes');
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