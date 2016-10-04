'use strict';
import * as customFunctions from '../../shared/methods/common-functions.js';
// require('tinymce');
const AdminCreateEventCtrl = (app) => {
  app.controller('AdminCreateEventCtrl', ['$rootScope', '$scope', '$http', 'Upload', '$window', 'createEventRESTResource', ($rootScope, $scope, $http, Upload, $window, resource) => {
    require('angular-ui-tinymce');
		$scope.errors = [];
		$scope.theEvents = [];
		$scope.theSpeakers = [];
		$scope.newEvent = {};
		$scope.hideModal = true;
    $scope.hideVenueModal = true;
    $scope.hideEventPreview = true;
    $scope.hideImageModal = true;
    $scope.speakersAdded = 0;
    $scope.displaySpeakerDivStyle = false;
    $scope.previewSpeakers = [];

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
      if ($rootScope.eventHeaderImg.name) {
        newEventData.newEventHeaderImage = $rootScope.eventHeaderImg.name ? $rootScope.eventHeaderImg.size + '-' + $rootScope.eventHeaderImg.name : '';
      }
      if ($rootScope.eventVenueImg.name) {
        newEventData.newEventVenueImg = $rootScope.eventVenueImg.name ? $rootScope.eventVenueImg.size + '-' + $rootScope.eventVenueImg.name : '';
      }

      DataForEditingEvents.createEvent(newEventData, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save newEvent: ' + $scope.newEvent.eventName});
        }
        if (!err) {

          $scope.newEvent = {};
          $rootScope.eventHeaderImg = undefined;
          $rootScope.eventVenueImg = undefined;

          $window.location.reload();
          alert('Event Saved');
        }
      });
    };

    $scope.closeModalWindow = () => {
      $scope.hideModal = !$scope.hideModal;
    };
    $scope.closeVenueModal = () => {
      $scope.hideVenueModal = !$scope.hideVenueModal;
    };
    $scope.toggleImageModal = () => {
      $scope.hideImageModal = !$scope.hideImageModal;
    };

    $scope.toggleEventPreview = () => {
      $scope.hideEventPreview = !$scope.hideEventPreview;
    };

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

    $scope.tinymceModel = 'Initial content';

    $scope.getContent = function() {
      console.log('Editor content:', $scope.tinymceModel);
    };
  
    $scope.setContent = function() {
      $scope.tinymceModel = 'Time: ' + (new Date());
    };

    /*tinymce.activeEditor.uploadImages(function(success) {
      $.post('/multer', tinymce.activeEditor.getContent()).done(function() {
        console.log("Uploaded images and posted content as an ajax request.");
      });
    });*/

    function openFile(event) {
      // let input = event.target;

      let reader = new FileReader();
      reader.onload = function(){
        let dataURL = reader.result;
        console.log('reader:   ', dataURL);
        /*let output = document.getElementById(field_name);
        output.src = dataURL;*/
      };
      // reader.readAsDataURL(input.files[0]);
    };
  
    $scope.tinymceOptions = { 
      selector: 'textarea',
      height: 500,
      theme: 'modern',
      automatic_uploads: true,
      images_upload_url: '/multer',
      file_picker_types: 'file image media',
      file_browser_callback : function(fieldName, url, type, win) {
        // console.log('tinymce upload      ', url);
        
        // win.document.getElementById(fieldName).value = url;

        // win.document.getElementById(fieldName).value = 'Hello World';
        tinymce.activeEditor.windowManager.open({
          title: 'Browse Image',
          // file: '/api/showimages',
          width: 450,
          height: 305,
          html: `<input id="tinymceImageInsertCreateEvent" name="newImage" type='file' accept='image/*' onchange='function() {alert('hola')}><br>`,
          // html: `<a class="button" name="venuePhoto" type="file" ngf-select="uploadFiles($file, $invalidFiles, 'eventVenueImg')">Select Venue Image</a>`,
          resizable : "no",
          inline : "yes",
          close_previous : "no",
          buttons: [{
            text: 'Insert',
            classes: 'widget btn primary first abs-layout-item',
            disabled: false,
            onclick: function(url) {
              let filePath = document.getElementById('tinymceImageInsertCreateEvent').value;
              console.log('djdkj', win.document.getElementById('tinymceImageInsertCreateEvent').value);
              let input = {filename: filePath}
              $http.post('/api/tinymceUpload', input)
              /*.success(customFunctions.handleSuccess(callback))
              .error(customFunctions.handleError(callback));*/

              win.document.getElementById(fieldName).value = filePath;
              tinymce.activeEditor.windowManager.close();
            },
            oninsert: function(url) {
              console.log('derp:   ', url);
            }
          }, 
          {
            text: 'Close',
            onclick: 'close',
            window : win,
            input : fieldName
          }]
        });

        // if (type === 'image') {
        // }
        return false;
      },
      plugins: [
      'advlist autolink lists link image charmap print preview hr anchor pagebreak spellchecker',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime media nonbreaking save table contextmenu directionality',
      'emoticons template paste textcolor colorpicker textpattern imagetools',
      'textcolor colorpicker'
      ],
      paste_data_images: true,
      inline: false,
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | link image | spellchecker',
      image_list: '/api/showimages',
      image_advtab: true,
      content_css: [
        '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
        '//www.tinymce.com/css/codepen.min.css'
      ]
    };

	}])
}

module.exports = AdminCreateEventCtrl;