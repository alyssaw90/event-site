'use strict';

const CreateSpeakerCtrl = (app) => {

	app.controller('CreateSpeakerCtrl', ['$scope', '$rootScope', 'Upload', 'createSpeakerRESTResource', ($scope, $rootScope, Upload, resource) => {
		$scope.newSpeaker = {};

		let CreateSpeakerData = resource();

		$scope.createNewSpeaker = (newSpeaker) => {
      newSpeaker.headshot = $rootScope.newSpeakerImg.name ? $rootScope.newSpeakerImg.size + '-' + $rootScope.newSpeakerImg.name : 'placeholder-headshot.jpg';

      CreateSpeakerData.createSpeaker(newSpeaker, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save speaker: ' + $scope.newSpeaker.newFirstName + ' ' + $scope.newSpeaker.newLastName});
        }
        if (!err) {

          $scope.newSpeaker = {};
          $rootScope.newSpeakerImg = undefined;
          alert('speaker saved');
        }

      });
    };

	}]);
};

module.exports = CreateSpeakerCtrl;