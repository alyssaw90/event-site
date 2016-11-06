'use strict';
const swal = require('sweetalert');

const AdminHeaderCtrl = (app) => {

	app.controller('AdminHeaderCtrl', ['$scope', '$log', '$cookies', '$window', '$location', ($scope, $log, $cookies, $window, $location) => {

  $scope.logout = () => {
    swal({
      title: 'Logout?',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: false,
      customClass: 'sweet-alert-hide-input'
    },
    () => {
      let currentPath = $location.path();
      $cookies.remove('interopAdmin', {'path': '/'});
      $window.location.reload(); 
    });
    
  }

  }]);
};

module.exports = AdminHeaderCtrl;;