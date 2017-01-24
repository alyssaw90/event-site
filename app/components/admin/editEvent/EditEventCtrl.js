'use strict';

const jQuery = require('jquery');
const swal = require('sweetalert');

const EditEventCtrl = (app) => {

	app.controller('EditEventCtrl', ['$scope', '$rootScope', 'Upload', 'editEventRESTResource', '$sce', '$filter', 'createEventRESTResource', `$window`, `$location`, ($scope, $rootScope, Upload, resource, $sce, $filter, createEventRESTResource, $window, $location) => {
		$scope.errors = [];
    $scope.tester = [];
    $scope.compareArr = [];
    $scope.unusedSpeakers = [];
    $scope.usedTabNames = [];
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
        for (let i = 0, j = data.data.length; i < j; i++) {
          $scope.tester.push(data.data[i].id);
          if ($scope.compareArr.indexOf(data.data[i].id) < 0) {
            data.data[i].headShot = '/uploads/' + data.data[i].headShot;
            data.data[i].speakerDescription = $sce.trustAsHtml(data.data[i].speakerDescription);
            $scope.unusedSpeakers.push(data.data[i]);
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
        $scope.editedEvent = data.data;
        $scope.headerImage = 'uploads/' + $scope.editedEvent.eventHeaderImage;
        $scope.venueImage = 'uploads/' + $scope.editedEvent.eventVenueImg;
        
        //loop over html string for tabs and tell angular to trust it as html
        for (let i = 0, len = $scope.editedEvent.tabs.length; i < len; i++) {
          $scope.editedEvent.tabs[i].tabContent = $sce.trustAsHtml($scope.editedEvent.tabs[i].tabContent);
          $scope.usedTabNames.push($scope.editedEvent.tabs[i].tabTitle);
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
        $scope.editedEvent.event.editedEventContinent = data.data.event.eventContinent;
        $scope.editedEvent.event.eventAboutTabText = data.data.event.eventAboutTabText;
        $scope.startDate = $filter('date')($scope.editedEvent.event.eventStartDate, 'yyyy-MM-dd');
        $scope.endDate = $filter('date')($scope.editedEvent.event.eventEndDate, 'yyyy-MM-dd');
        $scope.editedEvent.event.eventStartDate = new Date( $scope.editedEvent.event.eventStartDate );
        $scope.editedEvent.event.eventEndDate = new Date($scope.editedEvent.event.eventEndDate);
        //assign id to use in associating new tabs
        $scope.newTab.eventId =  $scope.editedEvent.event.id;
        $scope.currentEventUrl = data.data.event.eventUrl;
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

    $scope.editEvent = (newEventData, publishStatus) => {
      $scope.$broadcast(`autofill:update`);
      if ($rootScope.eventHeaderImage) {
        newEventData.event.eventHeaderImage = $rootScope.eventHeaderImage.name ? $rootScope.eventHeaderImage.size + '-' + $rootScope.eventHeaderImage.name : '';
      }
      if ($rootScope.eventVenueImg) {
        newEventData.event.eventVenueImg = $rootScope.eventVenueImg.name ? $rootScope.eventVenueImg.size + '-' + $rootScope.eventVenueImg.name : '';
      }
      newEventData.event.isPublished = publishStatus;
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
            title: 'Event Published',
            type: 'success',
            customClass: 'sweet-alert-hide-input'
          });
          $scope.getSingleEvent(data, '#edit-event-section, #edit-menu-options', '.edit-section');
        }
      });
    };

    $scope.deleteEvent = (eventToDelete) => {
      swal({
        title: `Delete "${eventToDelete.eventName}" event?`,
        type: 'input',
        text: `This CANNOT be undone \n Note: you can unpublish the event if you don't want it to display`,
        showCancelButton: true,
        closeOnConfirm: false,
        inputPlaceholder: `Type "YES" to delete event`
      },
      (inputVal) => {
        if (inputVal === 'YES') {
          EditEventData.deleteEvent(eventToDelete.id, (err, data) => {
            if (err) {
              swal({
                title: `could not delete event "${eventToDelete.eventName}"`,
                customClass: 'sweet-alert-hide-input',
                type: 'error'
              })
            }
            swal({
              title: `"${eventToDelete.eventName}" event has been deleted`,
              customClass: 'sweet-alert-hide-input',
              type: 'success'
            },
            function() {
              $rootScope.getEvents();
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

    $scope.editTab = (editedTabData, publishStatus) => {
      editedTabData.isPublished = publishStatus;
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
            title: 'Tab Published',
            type: 'success',
            customClass: 'sweet-alert-hide-input'
          });

          $scope.tabToEdit = data;
        }
      })
    };

    $scope.editSpeakers = () => {
      EditEventData.editSpeakers($scope.editedEvent, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save speaker'});
        }
        swal({
          title: 'New speakers list Published',
          type: 'success',
          customClass: 'sweet-alert-hide-input'
        });
      })
    };

    $scope.addTab = (newTabData, publishStatus) => {
      newTabData.isPublished = publishStatus;
      EditEventData.addTab(newTabData, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save tab'});
        }
        swal({
          title: 'New Tab Published',
          type: 'success',
          customClass: 'sweet-alert-hide-input'
        });
        $scope.newTab = {};
        // $scope.showElem('#main-edit-section', '.edit-section');
        $scope.getSingleEvent($scope.currentEventUrl, '#edit-menu-options', '.edit-section')
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

    $scope.newTabOrder = (tableId) => {
      let jQRows = jQuery(`#${tableId}`).find('tr.tab-row');
      let newOrder = [];
      jQRows.each( function(i, elem) {
        newOrder.push(jQuery(this).attr(`data-tabId`));
      });
      EditEventData.newTabOrder(newOrder, (err, data) => {
        if (!err) {
          swal({
            type: `success`,
            title: `Published`,
            customClass: `sweet-alert-hide-input`
          }) 
        } else {
            swal({
              type: `error`,
              title: `There was a problem saving the new order`,
              customClass: `sweet-alert-hide-input`
            });
          }
      })
    };

	}]);
};

module.exports = EditEventCtrl;