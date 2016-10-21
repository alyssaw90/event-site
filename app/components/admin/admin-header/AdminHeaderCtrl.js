'use strict';
const jQuery = require('jquery');

const AdminHeaderCtrl = (app) => {

	app.controller('AdminHeaderCtrl', ['$scope', '$log', '$cookies', '$window', '$location', ($scope, $log, $cookies, $window, $location) => {

  $scope.logout = () => {
    let confirmationResponse = confirm('Are you sure you want to logout?');

    if (confirmationResponse) {
      let currentPath = $location.path();
      $cookies.remove('token', {'path': '/'});
      $cookies.remove('interopAdmin', {'path': '/'});
      $cookies.remove('username', {'path': '/'});
      $cookies.remove('useremail', {'path': '/'});
      $window.sessionStorage.token = '';
      $window.location.reload();      
    }
  }

  }]);
};

module.exports = AdminHeaderCtrl;;