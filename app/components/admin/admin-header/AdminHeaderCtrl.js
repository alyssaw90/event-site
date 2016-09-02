'use strict';
const jQuery = require('jquery');

const AdminHeaderCtrl = (app) => {

	app.controller('AdminHeaderCtrl', ['$scope', '$log', '$cookies', ($scope, $log, $cookies) => {

  $scope.items = [
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

  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

  $scope.logout = () => {
    $cookies.remove('token');
    alert('hola')
  }

  }]);
};

module.exports = AdminHeaderCtrl;;