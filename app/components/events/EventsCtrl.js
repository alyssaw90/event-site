'use strict';
import * as customFunctions from '../shared/methods/common-functions.js';
const jQuery = require('jquery');

const EventsCtrl = (app) => {
	app.controller('EventsCtrl', ['$scope', '$http', '$sce', 'eventsRESTResource', '$rootScope', function($scope, $http, $sce, resource, $rootScope) {
		$scope.errors = [];
		//hide the 404 page when loading the page
		$scope.show404 = false;
		$scope.events;

		let Events = resource();

		$scope.getEvents = () => {
			let path = window.location.pathname.slice(1);

			Events.getEvents(path, function (err, data) {
        if (err) {
          return $scope.errors.push({msg: 'no event found'});
        };
		$scope.events = data.data;
        $rootScope.lang = $scope.events.eventLanguage || 'en';
        $scope.headerImage = 'uploads/' + $scope.events.event.eventHeaderImage;
		// console.log($scope.headerImage);
		// console.log($scope.events.event.eventHeaderImage);
        
        //loop over html string for tabs and tell angular to trust it as html
				for (let i = 0, len = $scope.events.tabs.length; i < len; i++) {
					$scope.events.tabs[i].tabContent = $sce.trustAsHtml($scope.events.tabs[i].tabContent);
				}
				//add folder path to image names
				for (let i = 0, len = $scope.events.speakers.length; i < len; i++) {
					 $scope.events.speakers[i].headShot = 'uploads/' + $scope.events.speakers[i].headShot;
					 $scope.events.speakers[i].speakerDescription = $sce.trustAsHtml($scope.events.speakers[i].speakerDescription);
				}
				for (let i = 0, len = $scope.events.length; i < len; i++) {
					$scope.events[i].eventAboutTabText = $sce.trustAsHtml($scope.events[i].eventAboutTabText);
				}
      })
			
		
		};

		$scope.getReadableDate = (dateObj) => {
			return new Date(dateObj).toDateString();
		}


		$scope.showOnlyFirst = function(index) {
			if (index === 0) {
				return 'block';
			} else {
				return 'none';
			}
		}

		$scope.addMainContentId = (index) => {
			if (index === 0) {
				return 'beginningOfContent';
			} else {
				return '';
			}
		}

		$scope.urlify = customFunctions.urlify;
		//if there is no event found, show the 404 page
		if ($scope.events) {
			$scope.show404 = true;
		}

	}])

}

module.exports = EventsCtrl;