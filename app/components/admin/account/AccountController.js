`use strict`;
const swal = require(`sweetalert`);

const AccountController = (app) => {
  app.controller(`AccountController`, [`$scope`, `$cookies`, `accountRESTResource`, ($scope, $cookies, accountRESTResource) => {
    const resource = accountRESTResource();
    $scope.user;
    $scope.allUsers;
    $scope.newUser = {
      isAdmin: `false`
    };
    $scope.isAdmin;
    $scope.basicStrat;

    $scope.getUser = () => {
      resource.getUser( (err, user) => {
        if (err) {
          swal({
            type: `error`,
            title: `There was a problem retrieving your account`,
            text: err,
            customClass: `sweet-alert-hide-input`
          });
        }
        $scope.user = user;
        $scope.interopAdmin = user.interopAdmin;
        $scope.basicStrat = user.strategy === `basic`;
      });
    };

    $scope.getAllUsers = () => {
      resource.getAllUsers( (err, data) => {
        if (err) {
          swal({
            type: `error`,
            title: `There was a problem retrieving the list of user accounts`,
            text: err,
            customClass: `sweet-alert-hide-input`
          });
        } else if (!err) {
          $scope.allUsers = data;
        }
      })
    }

    $scope.createUser = (newUserData) => {
      resource.createUser(newUserData, (err, data) => {
        if (err) {
          swal({
            type: `error`,
            title: `There was a problem creating the account`,
            test: err,
            customClass: `sweet-alert-hide-input`
          });
        } else if (!err) {
          swal({
            type: `success`,
            title: `New user saved`,
            customClass: `sweet-alert-hide-input`
          });
          $scope.newUser = {
            isAdmin: `false`
          };
        }
      })
    }

    $scope.updateUser = (userData) => {
      resource.updateUser(userData, (err, data) => {
        if (err) {
          swal({
            type: `error`,
            title: `There was a problem saving your new account information`,
            customClass: `sweet-alert-hide-input`
          });
        } else if (!err) {
          $scope.getUser();
          swal({
            type: `success`,
            title: `New info saved`,
            customClass: `sweet-alert-hide-input`
          });
        }
      })
    };

    $scope.cancelUserUpdate = () => {
      $scope.getUser();
       $scope.newUser = {
        isAdmin: `false`
      };
    };

  }]);
};

module.exports = AccountController;