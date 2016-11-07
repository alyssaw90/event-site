'use strict';

const jQuery = require('jquery');
const swal = require('sweetalert');

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
    $scope.buttonStyle = { 'width': 'auto' };
    $scope.currentEventUrl;

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
        $scope.currentEventUrl = data.event.eventUrl;
        getUnusedSpeakers();
      })
    };

    $scope.cancelEditing = () => {
      $scope.editedEvent = {};
      $scope.tabToEdit = {};
      $scope.newTab = {};
    }

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
      EditEventData.editEvent(newEventData, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save newEvent: ' + $scope.newEvent.eventName});
          swal({
            title: 'Error',
            text: 'There was a problem saving your event',
            type: 'error',
            customClass: 'sweet-alert-hide-input'
          });
        }
        if (!err) {

          $scope.editedEvent = {};
          $rootScope.eventHeaderImage = undefined;
          $rootScope.eventVenueImg = undefined;
          swal({
            title: 'Event Saved',
            type: 'success',
            customClass: 'sweet-alert-hide-input'
          });

          $window.location.reload();
        }
      });
    };

    $scope.editTab = (editedTabData) => {
      EditEventData.editTab(editedTabData, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save tab'});
          swal({
            title: 'could not save tab',
            type: 'error',
            customClass: 'sweet-alert-hide-input'
          });
        }
        if (!err) {
          swal({
            title: 'Tab Saved',
            type: 'success',
            customClass: 'sweet-alert-hide-input'
          });

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
        swal({
          title: 'New speakers list saved',
          type: 'success',
          customClass: 'sweet-alert-hide-input'
        });
      })
    };

    $scope.addTab = (newTabData) => {
      EditEventData.addTab(newTabData, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save tab'});
        }
        swal({
          title: 'New Tab Saved',
          type: 'success',
          customClass: 'sweet-alert-hide-input'
        });
        $scope.newTab = {};
        $scope.showElem('#main-edit-section', '.edit-section');
      });
    };

    $scope.deleteTab = (tabToDelete) => {
      swal({
        title: `Delete "${tabToDelete.tabTitle}" Tab?`,
        type: 'input',
        text: `This CANNOT be undone \n Note: you can unpublish the tab if you don't want it to display`,
        showCancelButton: true,
        closeOnConfirm: false,
        inputPlaceholder: `Type "YES" to delete tab`
      },
      (inputVal) => {
        if (inputVal === 'YES') {
          EditEventData.deleteTab(tabToDelete.id, (err, data) => {
            if (err) {
              swal({
                title: `could not delete tab "${tabToDelete.tabTitle}"`,
                customClass: 'sweet-alert-hide-input',
                type: 'error'
              })
            }
            swal({
              title: `"${tabToDelete.tabTitle}" tab has been deleted`,
              customClass: 'sweet-alert-hide-input',
              type: 'success'
            });
            $scope.showElem('#main-edit-section', '.edit-section');
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

module.exports = EditEventCtrl;