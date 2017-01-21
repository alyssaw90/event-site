'use strict';
const swal = require(`sweetalert`);

const CreateSpeakerCtrl = (app) => {

	app.controller('CreateSpeakerCtrl', ['$scope', '$rootScope', 'Upload', 'createSpeakerRESTResource', `$location`, ($scope, $rootScope, Upload, resource, $location) => {
		$scope.newSpeaker = {};

		let CreateSpeakerData = resource();

    $scope.tinymceCreateSpeakerOptions = $rootScope.tinymceOptions;

    $scope.cancelNewSpeaker = () => {
      $scope.newSpeaker = {};
      $location.url(`/admin/edit-speaker`);
    }

		$scope.createNewSpeaker = (newSpeaker, publishStatus) => {
      newSpeaker.publishStatus = publishStatus;
      newSpeaker.headshot = $rootScope.newSpeakerImg.name ? $rootScope.newSpeakerImg.size + '-' + $rootScope.newSpeakerImg.name : 'placeholder-headshot.jpg';
      // console.log(newSpeaker)
      CreateSpeakerData.createSpeaker(newSpeaker, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save speaker: ' + $scope.newSpeaker.newFirstName + ' ' + $scope.newSpeaker.newLastName});
        }
        if (!err) {

          $scope.newSpeaker = {};
          $rootScope.newSpeakerImg = undefined;
          $location.url(`/admin/edit-speaker`);
          swal({
            title: `Speaker published`,
            type: `success`,
            customClass: `sweet-alert-hide-input`
          })
        }

      });
    };

	}]);
};

module.exports = CreateSpeakerCtrl;