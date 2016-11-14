`use strict`;
const swal = require(`sweetalert`);

const AccountController = (app) => {
  app.controller(`AccountController`, [`$scope`, `$cookies`, `accountRESTResource`, ($scope, $cookies, accountRESTResource) => {
    const resource = accountRESTResource();
    $scope.user;
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

    $scope.updateUser = (userData) => {
      resource.updateUser(userData, (err, data) => {
        if (err) {
          alert('Error');
        } else if (!err) {
          alert(`Saved`);
        }
      })
    }

  }]);
};

module.exports = AccountController;