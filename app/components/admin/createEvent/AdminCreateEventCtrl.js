'use strict';

const AdminCreateEventCtrl = (app) => {
	app.controller('AdminCreateEventCtrl', ['$rootScope', '$scope', '$http', 'Upload', 'createEventRESTResource', ($rootScope, $scope, $http, Upload, resource) => {
		$scope.errors = [];
		$scope.theEvents = [];
		$scope.theSpeakers = [];
		$scope.newEvent = {};
		$scope.hideModal = true;
    $scope.hideEventPreview = true;
    $scope.speakersAdded = false;
    $scope.displaySpeakerDivStyle = false;


    let DataForEditingEvents = resource();

    if ($scope.newEvent.newEventName && $scope.newEvent.eventAboutTabText) {
      $scope.displaySpeakerDivStyle = false;

    }

    $scope.getEvents = () => {

      DataForEditingEvents.getAllEvents( (err, data) => {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve events'});
        };
        
        $scope.theEvents = data;
      })
      
    
    };

    $scope.getAllSpeakers = () => {

      DataForEditingEvents.getAllSpeakers( (err, speakers) => {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve speakers'});
        }

        $scope.theSpeakers = speakers;
      })
    };

    $scope.createNewEvent = (newEventData) => {
      newEventData.newEventHeaderImage = $rootScope.uploadedFile.name ? $rootScope.uploadedFile.size + '-' + $rootScope.uploadedFile.name : '';

      DataForEditingEvents.createEvent(newEventData, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save newEvent: ' + $scope.newEvent.eventName});
        }
        if (!err) {
          // Reset the form model.
          // vm.project = {};
          // Set back to pristine.
          $scope.addNewEventForm.$setPristine();
          // Since Angular 1.3, set back to untouched state.
          $scope.addNewEventForm.$setUntouched();
          alert('Saved');
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
      if ($scope.newEvent.speakers) {
        $scope.speakersAdded = true;
        if (!$scope.newEvent.newEventName && !$scope.newEvent.eventAboutTabText && $scope.speakersAdded) {

          $scope.displaySpeakerDivStyle = true;
        }
        let keysArr = Object.keys($scope.newEvent.speakers);
        return $scope.theSpeakers.filter(function (speaker) {
          return keysArr.indexOf(speaker.id.toString()) !== -1;
        });
        
      }
    }

	}])
}

module.exports = AdminCreateEventCtrl;