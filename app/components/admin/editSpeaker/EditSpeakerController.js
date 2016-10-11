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
    })

    $scope.getSpeaker = (speaker) => {
      $scope.speakerToEdit = speaker;
      jQuery('#edit-speakers-section').show();
      jQuery('#edit-speakers-list').hide();
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

    $scope.tinymceEditSpeakerOptions = { 
      height: 300,
      theme: 'modern',
      automatic_uploads: true,
      plugins: [
      'advlist autolink lists link image charmap print preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime media nonbreaking save table contextmenu directionality',
      'emoticons template paste textcolor colorpicker textpattern imagetools',
      'textcolor colorpicker'
      ],
      paste_data_images: true,
      inline: false,
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | link image',
      image_list: '/api/showimages',
      image_advtab: true,
      content_css: [
        '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
        '//www.tinymce.com/css/codepen.min.css'
      ]
    };


  }]);
};

module.exports = EditSpeakerController;