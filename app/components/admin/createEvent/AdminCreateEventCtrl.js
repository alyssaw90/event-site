'use strict';

const AdminCreateEventCtrl = (app) => {
	app.controller('AdminCreateEventCtrl', ['$rootScope', '$scope', '$http', 'Upload', 'createEventRESTResource', function($rootScope, $scope, $http, Upload, resource) {
		$scope.errors = [];
		$scope.theEvents = [];
		$scope.theSpeakers = [];
		$scope.newEvent = {};
		$scope.hideModal = true;
    $scope.hideEventPreview = true;

		let DataForEditingEvents = resource();

		$scope.getEvents = () => {

			DataForEditingEvents.getAllEvents(function (err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve events'});
        };
        
        $scope.theEvents = data;
      })
			
		
		};

		$scope.getAllSpeakers = () => {

			DataForEditingEvents.getAllSpeakers(function(err, speakers) {
				if (err) {
					return $scope.errors.push({msg: 'could not retrieve speakers'});
				}

				$scope.theSpeakers = speakers;
			})
		};

		$scope.createNewEvent = (newEvent) => {
      newEvent.newEventHeaderImage = $rootScope.uploadedFile.name ? $rootScope.uploadedFile.size + '-' + $rootScope.uploadedFile.name : '';

      DataForEditingEvents.createEvent(newEvent, function (err, data) {
        if (err) {
          $scope.errors.push({msg: 'could not save newEvent: ' + $scope.newEvent.eventName});
        }
      });
    };

    $scope.closeModalWindow = () => {
    	$scope.hideModal = !$scope.hideModal;
    };

    $scope.toggleEventPreview = () => {
      $scope.hideEventPreview = !$scope.hideEventPreview;
    };

    $scope.getPreviewSpeakers = (theSpeakers) => {
      let keysArr = Object.keys(newEvent.speakers);
      // $scope.test = keysArr.indexOf(speakerId) > -1;
      console.log('array :::   ', keysArr, '   obj   ' , speakersObj);
      // return keysArr.indexOf(speakerId) > -1;
      return $scope.theSpeakers.filter(function (speaker) {
        return $scope.keysArr.indexOf(speaker.id) !== -1;
      });
    }

	}])
}

module.exports = AdminCreateEventCtrl;