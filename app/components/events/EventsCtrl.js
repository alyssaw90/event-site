'use strict';
import * as customFunctions from './../../es6/common-functions.build.js';
const jQuery = require('jquery');

const EventsCtrl = (app) => {
	app.controller('EventsCtrl', ['$scope', '$http', '$sce', 'eventsRESTResource', function($scope, $http, $sce, resource) {
		$scope.errors = [];
		$scope.events;

		let Events = resource();

		$scope.getEvents = () => {
			let path = window.location.pathname.slice(1);

			Events.getEvents(path, function (err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve header events'});
        };
        
        $scope.events = data;
        //loop over html string for tabs and tell angular to trust it as html
				for (let i = 0, len = $scope.events.tabs.length; i < len; i++) {
					$scope.events.tabs[i].tabContent = $sce.trustAsHtml($scope.events.tabs[i].tabContent);

				}
      })
			
		
		};


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

	}])

}

module.exports = EventsCtrl;