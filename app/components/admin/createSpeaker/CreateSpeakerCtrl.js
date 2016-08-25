'use strict';

const CreateSpeakerCtrl = (app) => {

	app.controller('CreateSpeakerCtrl', ['$scope', '$rootScope', 'Upload', 'createSpeakerRESTResource', ($scope, $rootScope, Upload, resource) => {
		$scope.newSpeaker = {};

		let CreateSpeakerData = resource();

		$scope.createNewSpeaker = (newSpeaker) => {
      newSpeaker.headshot = $rootScope.uploadedFile.name ? $rootScope.uploadedFile.size + '-' + $rootScope.uploadedFile.name : '';
      console.log('blah blah    ', newSpeaker.headshot);
      CreateSpeakerData.createSpeaker(newSpeaker, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save speaker: ' + $scope.newSpeaker.newFirstName + ' ' + $scope.newSpeaker.newLastName});
        }
      });
    };

	}]);
};

module.exports = CreateSpeakerCtrl;