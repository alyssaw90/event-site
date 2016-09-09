'use strict';
const jQuery = require('jquery');

const AdminHeaderCtrl = (app) => {

	app.controller('AdminHeaderCtrl', ['$scope', '$log', '$cookies', '$window', '$location', ($scope, $log, $cookies, $window, $location) => {

/*  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));*/

  $scope.goToPage = (link) => {
    $location.path(link);
  }

  $scope.logout = () => {
    let currentPath = $location.path();
    console.log('current path', currentPath);
    $cookies.remove('token', {'path': '/'});
    $cookies.remove('interopAdmin', {'path': '/'});
    $cookies.remove('username', {'path': '/'});
    $cookies.remove('useremail', {'path': '/'});
    $window.sessionStorage.token = '';
    $window.location.reload();
    // $location.path(currentPath);
  }

  }]);
};

module.exports = AdminHeaderCtrl;;