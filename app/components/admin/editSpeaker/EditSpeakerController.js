'use strict';

const jQuery = require('jquery');
const swal = require(`sweetalert`);

const EditSpeakerController = (app) => {

	app.controller('EditSpeakerController', ['$scope', '$rootScope', 'editSpeakerRESTResource', ($scope, $rootScope, resource) => {
    $scope.errors = [];
    $scope.speakerToEdit = {};

    const EditSpeakerResource = resource();

    $rootScope.$watch('editedSpeakerImg', (newVal, oldVal) => {
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

    $scope.saveNewSpeaker = (speaker, publishStatus) => {
      speaker.isPublished = publishStatus;

      if ($rootScope.editedSpeakerImg) {
         speaker.headshot = $rootScope.editedSpeakerImg.size + '-' + $rootScope.editedSpeakerImg.name;
      }
      EditSpeakerResource.createSpeaker(speaker, (err, data) => {
        // console.log(` DATA :: `, data);
        if (err) {
          return $scope.errors.push({msg: 'could not save speaker'});
        }
        swal({
          title: `Published`,
          type: `success`,
          customClass: `sweet-alert-hide-input`
        });
        $scope.getSpeaker(data);
      })
    }

    $scope.deleteSpeaker = (speakerToDelete) => {
      swal({
        title: `Delete "${speakerToDelete.fullName}"?`,
        type: 'input',
        text: `This CANNOT be undone \n Note: you can unpublish the speaker if you don't want them to display`,
        showCancelButton: true,
        closeOnConfirm: false,
        inputPlaceholder: `Type "YES" to delete speaker`
      },
      (inputVal) => {
        if (inputVal === 'YES') {
          EditSpeakerResource.deleteSpeaker(speakerToDelete.id, (err, data) => {
            if (err) {
              swal({
                title: `could not delete speaker "${speakerToDelete.fullName}"`,
                customClass: 'sweet-alert-hide-input',
                type: 'error'
              })
            }
            swal({
              title: `"${speakerToDelete.fullName}" speaker has been deleted`,
              customClass: 'sweet-alert-hide-input',
              type: 'success'
            },
            function() {
              $rootScope.theSpeakers = [];
              $rootScope.getAllSpeakers();
            });
            
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


  }]);
};

module.exports = EditSpeakerController;