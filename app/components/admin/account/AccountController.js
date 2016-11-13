`use strict`;
const swal = require(`sweetalert`);

const AccountController = (app) => {
  app.controller(`AccountController`, [`$scope`, `$cookies`, `accountRESTResource`, ($scope, $cookies, accountRESTResource) => {
    const resource = accountRESTResource();
    $scope.user;
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
      });
    };

  }]);
};

module.exports = AccountController;