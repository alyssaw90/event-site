'use strict';
const swal = require(`sweetalert`);

const CreateSpeakerCtrl = (app) => {

	app.controller('CreateSpeakerCtrl', ['$scope', '$rootScope', 'Upload', 'createSpeakerRESTResource', `$location`, '$window', ($scope, $rootScope, Upload, resource, $location, $window) => {
		$scope.newSpeaker = {};

		let CreateSpeakerData = resource();

    // $scope.tinymceCreateSpeakerOptions = $rootScope.tinymceOptions;

    $scope.cancelNewSpeaker = () => {
      $scope.newSpeaker = {};
      $location.url(`/admin/edit-speaker`);
    }

		$scope.createNewSpeaker = (newSpeaker, publishStatus) => {
      newSpeaker.publishStatus = publishStatus;
      if($rootScope.headshot) {
        newSpeaker.headshot = $rootScope.newSpeakerImg.name ? $rootScope.newSpeakerImg.size + '-' + $rootScope.newSpeakerImg.name : 'placeholder-headshot.jpg';
      }
      // console.log(newSpeaker)
      CreateSpeakerData.createSpeaker(newSpeaker, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save speaker: ' + $scope.newSpeaker.newFirstName + ' ' + $scope.newSpeaker.newLastName});
          swal({
            title: `There was a problem submitting your form`,
            text: err,
            type: 'warning',
            confirmButtonColor: `#DD6B55`,
            confirmButtonText: 'Ok',
            customClass: 'sweet-alert-hide-input'
          });
        }
        if (!err) {

          $scope.newSpeaker = {};
          $rootScope.newSpeakerImg = undefined;
          swal({
            title: 'Speaker published',
            type: 'success',
            customClass: 'sweet-alert-hide-input'
          }, function() {
            // $window.location.reload();
            $location.url('/admin/edit-speaker');
          })
        }

      });
    };

	}]);
};

module.exports = CreateSpeakerCtrl;