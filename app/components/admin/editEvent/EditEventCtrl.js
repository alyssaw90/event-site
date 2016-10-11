'use strict';

const jQuery = require('jquery');

const EditEventCtrl = (app) => {

	app.controller('EditEventCtrl', ['$scope', '$rootScope', 'Upload', 'editEventRESTResource', '$sce', '$filter', 'createEventRESTResource', ($scope, $rootScope, Upload, resource, $sce, $filter, createEventRESTResource) => {
		$scope.errors = [];
    $scope.tester = [];
    $scope.compareArr = [];
    $scope.unusedSpeakers = [];
    $scope.editedEvent = {};
    $scope.tabToEdit = {};
    $scope.newTab = {};
    $scope.headerImage = $rootScope.eventHeaderImage ? 'uploads/' + $rootScope.eventHeaderImage.size + '-' + $rootScope.eventHeaderImage.name : '';
    $scope.venueImage = $rootScope.eventVenueImg ? 'uploads/' + $rootScope.eventVenueImg.size + '-' + $rootScope.eventVenueImg.name : '';

		let EditEventData = resource();
    let CreateEventData = createEventRESTResource();

    function getUnusedSpeakers() {
      CreateEventData.getAllSpeakers( (err, data) => {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve speakers'});
        }
        for (let i = 0, j = data.length; i < j; i++) {
          $scope.tester.push(data[i].id);
          if ($scope.compareArr.indexOf(data[i].id) < 0) {
            data[i].headShot = '/uploads/' + data[i].headShot;
            data[i].speakerDescription = $sce.trustAsHtml(data[i].speakerDescription);
            $scope.unusedSpeakers.push(data[i]);
          }
        }
        /*for (let i = 0, len = $scope.slides.length; i < len; i++) {
          $scope.slides[i].imgSrcUrl = '/uploads/' + $scope.slides[i].imgSrcUrl;
        }
        for (let i = 0, len = $scope.completeListOfSlides.length; i < len; i++) {
          if ($scope.completeListOfSlides[i].imgSrcUrl.substr(0, 9) !== '/uploads/') {
            $scope.completeListOfSlides[i].imgSrcUrl = '/uploads/' + $scope.completeListOfSlides[i].imgSrcUrl;            
          }
        }*/

      })
    }

    $scope.sortableOptions = {
      placeholder: 'editedEventSpeaker',
      connectWith: '.edited-speaker-table-container'
    };

    $rootScope.$watch('eventHeaderImage', (oldVal, newVal) => {
      $scope.headerImage = $rootScope.eventHeaderImage ? 'uploads/' + $rootScope.eventHeaderImage.size + '-' + $rootScope.eventHeaderImage.name : '';
    });
    $rootScope.$watch('eventVenueImg', (oldVal, newVal) => {
      $scope.venueImage = $rootScope.eventVenueImg ? 'uploads/' + $rootScope.eventVenueImg.size + '-' + $rootScope.eventVenueImg.name : '';
    });

    $scope.showElem = (elemToShow, elemsToHide) => {
      jQuery(elemToShow).show();
      jQuery(elemsToHide).not(elemToShow).hide();
    };

		$scope.getSingleEvent = (eventUrl, elemToShow, elemsToHide) => {
      jQuery(elemToShow).show();
      jQuery(elemsToHide).not(elemToShow).hide();

      EditEventData.getSingleEvent(eventUrl, function (err, data) {
        if (err) {
          return $scope.errors.push({msg: 'no event found'});
        };
        $scope.headerImage = 'uploads/' + data.event.eventHeaderImage;
        $scope.venueImage = 'uploads/' + data.event.eventVenueImg;
        $scope.editedEvent = data;
        //loop over html string for tabs and tell angular to trust it as html
        for (let i = 0, len = $scope.editedEvent.tabs.length; i < len; i++) {
          $scope.editedEvent.tabs[i].tabContent = $sce.trustAsHtml($scope.editedEvent.tabs[i].tabContent);
        }
        //add folder path to image names
        for (let i = 0, len = $scope.editedEvent.speakers.length; i < len; i++) {
           $scope.editedEvent.speakers[i].headShot = '/uploads/' + $scope.editedEvent.speakers[i].headShot;
           $scope.editedEvent.speakers[i].speakerDescription = $sce.trustAsHtml($scope.editedEvent.speakers[i].speakerDescription);
           $scope.compareArr.push($scope.editedEvent.speakers[i].id);
        }
        for (let i = 0, len = $scope.editedEvent.length; i < len; i++) {
          $scope.editedEvent[i].eventAboutTabText = $sce.trustAsHtml($scope.eventToEdit[i].eventAboutTabText);
        }
        $scope.editedEvent.event.editedEventContinent = data.event.eventContinent;
        $scope.editedEvent.event.eventAboutTabText = data.event.eventAboutTabText;
        $scope.startDate = $filter('date')($scope.editedEvent.event.eventStartDate, 'yyyy-MM-dd');
        $scope.endDate = $filter('date')($scope.editedEvent.event.eventEndDate, 'yyyy-MM-dd');
        $scope.editedEvent.event.eventStartDate = new Date( $scope.editedEvent.event.eventStartDate );
        $scope.editedEvent.event.eventEndDate = new Date($scope.editedEvent.event.eventEndDate);
        //assign id to use in associating new tabs
        $scope.newTab.eventId =  $scope.editedEvent.event.id;
        getUnusedSpeakers();
      })
    };

    $scope.getTab = (tab) => {
      $scope.tabToEdit = tab;
    };

    $scope.editEvent = (newEventData) => {
      if ($rootScope.eventHeaderImage) {
        newEventData.event.eventHeaderImage = $rootScope.eventHeaderImage.name ? $rootScope.eventHeaderImage.size + '-' + $rootScope.eventHeaderImage.name : '';
      }
      if ($rootScope.eventVenueImg) {
        newEventData.event.eventVenueImg = $rootScope.eventVenueImg.name ? $rootScope.eventVenueImg.size + '-' + $rootScope.eventVenueImg.name : '';
      }
      console.log('new event  :   ', newEventData);
      EditEventData.editEvent(newEventData, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save newEvent: ' + $scope.newEvent.eventName});
        }
        if (!err) {

          $scope.editedEvent = {};
          $rootScope.eventHeaderImage = undefined;
          $rootScope.eventVenueImg = undefined;

          $window.location.reload();
          alert('Event Saved');
        }
      });
    };

    $scope.editTab = (editedTabData) => {
      EditEventData.editTab(editedTabData, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save tab'});
        }
        if (!err) {
          alert('Tab Saved');
          $scope.tabToEdit = {};
          $scope.showElem('#main-edit-section', '.edit-section');

        }
      })
    };

    $scope.editSpeakers = () => {
      console.log('edited speaker:  ', $scope.editedEvent);
      EditEventData.editSpeakers($scope.editedEvent, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save speaker'});
        }
        
        alert('New speakers list saved');
      })
    };

    $scope.addTab = (newTabData) => {
      EditEventData.addTab(newTabData, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save tab'});
        }
        alert('New Tab Saved');
        $scope.newTab = {};
        $scope.showElem('#main-edit-section', '.edit-section');
      });
    };

    $scope.deleteTab = (tabToDelete) => {
      let testQuestion = prompt(`Type "YES" if you want to delete: ${tabToDelete.tabTitle}\n This CANNOT be undone \n note, you can unpublish the tab if you don't want it to display`);
      if (testQuestion === 'YES') {
        EditEventData.deleteTab(tabToDelete.id, (err, data) => {
          if (err) {
            $scope.errors.push({msg: 'could not delete tab'});
          }
          alert(`${tabToDelete.tabTitle} has been deleted`);
          $scope.showElem('#main-edit-section', '.edit-section');
        });
        
      };
    };

    $scope.tinymceEditOptions = { 
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

	}]);
};

module.exports = EditEventCtrl;