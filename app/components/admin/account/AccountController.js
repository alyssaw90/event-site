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
    $scope.msUser = {
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
          $scope.allUsers = data.data;
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
            title: `New user published`,
            customClass: `sweet-alert-hide-input`
          });
          $scope.newUser = {
            isAdmin: `false`
          };
           $scope.getAllUsers();
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
          $scope.getAllUsers();
          swal({
            type: `success`,
            title: `New info published`,
            customClass: `sweet-alert-hide-input`
          });
        }
      })
    };

    $scope.deleteUser = (userToDelete) => {
      swal({
        title: `Delete "${userToDelete.userName}"'s Account?`,
        type: 'input',
        text: `Users can be re-added later`,
        showCancelButton: true,
        closeOnConfirm: false,
        inputPlaceholder: `Type "YES" to delete`
      },
      (inputVal) => {
        if (inputVal === 'YES') {
          resource.deleteUser(userToDelete.id, (err, data) => {
            if (err) {
              swal({
                title: `could not delete "${userToDelete.userName}"`,
                customClass: 'sweet-alert-hide-input',
                type: 'error'
              })
            }
            swal({
              title: `"${userToDelete.userName}" has been deleted`,
              customClass: 'sweet-alert-hide-input',
              type: 'success'
            });
            $scope.getAllUsers();
          });
          
        } else {
          swal({
            title: `Please enter "YES" with all capitol letters`,
            text: `You entered "${inputVal}"`,
            customClass: 'sweet-alert-hide-input',
            type: 'error'
          });
        }
      })
    };

    $scope.updateMsUser = (msUserData) => {
      resource.updateMsUser(msUserData, (err, data) => {
        if (err) {
          swal({
            type: `error`,
            title: `There was a problem saving your information`,
            customClass: `sweet-alert-hide-input`
          });
        } else if (!err) {
          $scope.getAllUsers();
          swal({
            type: `success`,
            title: `New info published`,
            customClass: `sweet-alert-hide-input`
          });
        }
      });
    };

    $scope.addMsUser = (newMsUserData) => {
      resource.addMsUser(newMsUserData, (err, data) => {
        if (err) {
          swal({
            type: `error`,
            title: `There was a problem saving the user`,
            customClass: `sweet-alert-hide-input`
          });
        } else if (!err) {
          $scope.getAllUsers();
          $scope.msUser = {
            isAdmin: `false`
          };
          swal({
            type: `success`,
            title: `New info published`,
            customClass: `sweet-alert-hide-input`
          });
        }
      });
    };

    $scope.deleteMsUser = (msUserToDelete) => {
      swal({
        title: `Delete "${msUserToDelete.email}"'s Account?`,
        type: 'input',
        text: `Users can be re-added later`,
        showCancelButton: true,
        closeOnConfirm: false,
        inputPlaceholder: `Type "YES" to delete`
      },
      (inputVal) => {
        if (inputVal === 'YES') {
          resource.deleteMsUser(msUserToDelete.id, (err, data) => {
            if (err) {
              swal({
                title: `could not delete "${msUserToDelete.email}"`,
                customClass: 'sweet-alert-hide-input',
                type: 'error'
              })
            }
            swal({
              title: `"${msUserToDelete.email}" has been deleted`,
              customClass: 'sweet-alert-hide-input',
              type: 'success'
            });
            $scope.getAllUsers();
          });
          
        } else {
          swal({
            title: `Please enter "YES" with all capitol letters`,
            text: `You entered "${inputVal}"`,
            customClass: 'sweet-alert-hide-input',
            type: 'error'
          });
        }
      })
    };

    $scope.userFilter = (theUser) => {
      if (theUser.strategy === `basic` && theUser.id !== $scope.user.id && theUser.userName !== `root`) {
        return theUser;
      } else if (theUser.userName !== `root` && theUser.id !== $scope.user.id) {
        return theUser;
      }
    }

    $scope.cancelUserUpdate = () => {
      $scope.getUser();
      $scope.getAllUsers();
       $scope.newUser = {
        isAdmin: `false`
      };
      $scope.msUser = {
        isAdmin: `false`
      };
    };

  }]);
};

module.exports = AccountController;