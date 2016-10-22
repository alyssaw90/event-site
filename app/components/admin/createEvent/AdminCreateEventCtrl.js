'use strict';
import * as customFunctions from '../../shared/methods/common-functions.js';
// require('tinymce');
const AdminCreateEventCtrl = (app) => {
  app.controller('AdminCreateEventCtrl', ['$rootScope', '$scope', '$http', 'Upload', '$window', 'createEventRESTResource', ($rootScope, $scope, $http, Upload, $window, resource) => {
    // require('angular-ui-tinymce');
		$scope.errors = [];
		$scope.theEvents = [];
		$scope.theSpeakers = [];
    $scope.newSpeakers = [];
		$scope.newEvent = {};
    $scope.newEvent.speakers = [];
    $scope.hideEventPreview = true;
    $scope.speakersAdded = 0;
    $scope.displaySpeakerDivStyle = false;
    $scope.previewSpeakers = [];
    $scope.newEventSortSpeakerOptions = {
      placeholder: 'newEventSpeaker',
      connectWith: '.new-event-speaker-table-container'
    };

    let createEventsREST = resource();

    if ($scope.newEvent.newEventName && $scope.newEvent.eventAboutTabText) {
      $scope.displaySpeakerDivStyle = false;

    }

    $scope.getEvents = () => {

      createEventsREST.getAllEvents( (err, data) => {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve events'});
        };
        
        $scope.theEvents = data;
      })
      
    
    };

    $scope.getAllSpeakers = () => {

      createEventsREST.getAllSpeakers( (err, speakers) => {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve speakers'});
        }

        for (let i = 0, len = speakers.length; i < len; i++) {
          $scope.theSpeakers.push(speakers[i]);
        }

      })
    };

    $scope.createNewEvent = (newEventData) => {
      if ($rootScope.eventHeaderImg) {
        newEventData.newEventHeaderImage = $rootScope.eventHeaderImg.name ? $rootScope.eventHeaderImg.size + '-' + $rootScope.eventHeaderImg.name : '';
      }
      if ($rootScope.eventVenueImg) {
        newEventData.newEventVenueImg = $rootScope.eventVenueImg.name ? $rootScope.eventVenueImg.size + '-' + $rootScope.eventVenueImg.name : '';
      }

      createEventsREST.createEvent(newEventData, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save newEvent: ' + $scope.newEvent.eventName});
        }
        if (!err) {

          $scope.newEvent = {};
          $rootScope.eventHeaderImg = undefined;
          $rootScope.eventVenueImg = undefined;

          // $window.location.reload();
          alert('Event Saved');
        }
      });
    };

    $scope.cancelVenue = () => {
      $scope.newEvent.newEventVenueName = null;
      $scope.newEvent.newVenduAddressLine1 = null;
      $scope.newEvent.newVenueAddressLine2 = null;
      $scope.newEvent.newVenueParkingInfo = null;
      $scope.newEvent.eventVenueImg = null;
    }

    $scope.getPreviewSpeakers = (theSpeakers) => {
      if ($scope.newEvent.speakers) {
        $scope.displaySpeakerDivStyle = true;
        let keysArr = Object.keys($scope.newEvent.speakers);
        return $scope.theSpeakers.filter( (speaker) => {
          $scope.speakersAdded++;
          return keysArr.indexOf(speaker.id.toString()) !== -1 && $scope.newEvent.speakers[speaker.id] !== null;
        });
        
      }
    }


	}])
}

module.exports = AdminCreateEventCtrl;