'use strict';

const jQuery = require('jquery');

const EditSpeakerController = (app) => {

	app.controller('EditSpeakerController', ['$scope', '$rootScope', 'editSpeakerRESTResource', ($scope, $rootScope, resource) => {
    $scope.errors = [];
    $scope.speakerToEdit = {};

    const EditSpeakerResource = resource();

    $rootScope.$watch('editedSpeakerImg', (newVal, oldVal) => {
      // console.log('old::  ', oldVal, '\n', 'new::  ', newVal.editedSpeakerImg);
      if (newVal) {
        $scope.speakerToEdit.headShot = newVal.size + '-' + newVal.name;
      }
    });

    $scope.tinymceEditSpeakerOptions = $rootScope.tinymceOptions;

    $scope.getSpeaker = (speaker) => {
      $scope.speakerToEdit = speaker;
      jQuery('#edit-speakers-section').show();
      jQuery('#edit-speakers-list').hide();
    }

    $scope.cancelEditingSpeaker = () => {
      $scope.speakerToEdit = {};
      jQuery('#edit-speakers-section').hide();
      jQuery('#edit-speakers-list').show();
    }

    $scope.saveNewSpeaker = (speaker) => {


      if ($rootScope.editedSpeakerImg) {
         speaker.headshot = $rootScope.editedSpeakerImg.size + '-' + $rootScope.editedSpeakerImg.name;
      }
      EditSpeakerResource.createSpeaker(speaker, (err, data) => {
        if (err) {
          return $scope.errors.push({msg: 'could not save speaker'});
        }
        alert('Saved');
        jQuery('#edit-speakers-section').hide();
        jQuery('#edit-speakers-list').show();
        $scope.speakerToEdit = {};
      })
    }


  }]);
};

module.exports = EditSpeakerController;