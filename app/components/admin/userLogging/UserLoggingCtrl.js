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

    /*$rootScope.logout = () => {
      $cookies.remove('token');
    }
*/

	}]);
};

module.exports = UserLoggingCtrl;