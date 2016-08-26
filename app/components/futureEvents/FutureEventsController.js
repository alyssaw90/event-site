'use strict';
const jQuery = require('jquery');
import * as customFunctions from '../shared/methods/common-functions.js';

const FutureEventsCtrl = (app) => {
	app.controller('FutureEventsCtrl', ['$scope', '$http', 'futureEventsRESTResource', function($scope, $http, resource/*, $timeout*/) {
		$scope.errors = [];
		$scope.futureEvents = [];
		$scope.slides = [];

		let FutureEvents = resource();

		$scope.getUpcomingEvents = () => {
			let imageCount = 0;

			FutureEvents.getFutureEvents(function (err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve future events'});
        };

        for (let i = 0, len = data.length; i < len; i++) {
					if (data[i].eventHomepageImage) {
						let tmpObj = {};
						tmpObj.eventHomepageImage = data[i].eventHomepageImage;
						tmpObj.eventUrl = data[i].eventUrl;

						imageCount++;

						$scope.slides.push(tmpObj);
					}
				}
        
        $scope.imageCount = imageCount;
        $scope.futureEvents = data;
      })		
		};

		for (let i = 0, len = $scope.futureEvents.length; i < len; i++) {
			if ($scope.futureEvents[i].eventHomepageImage) {
				let tmpObj = {};
				tmpObj.eventHomepageImage = $scope.futureEvents[i].eventHomepageImage;
				tmpObj
				$scope.slides.push($scope.futureEvents[i].eventHomepageImage)
			}
		}

		//make block slide up effect for upcoming event blocks
		$scope.riseText = (e) => {
			let $this = angular.element(e.currentTarget);
			
			$this.find('div').stop(true, true).animate({'bottom': '0'}, 200);
			$this.find('h1').animate({opacity: 0}, 0);
			$this.find('h3').animate({opacity: 0}, 0);
			$this.find('p').show();
			$this.find('p').animate({opacity: 1}, 200);
		};

		$scope.lowerText = (e) => {
			let $this = angular.element(e.currentTarget);
			$this.find('div').stop(true, true).animate({'bottom': '-100%'}, 200);
			$this.find('h1').animate({opacity: 1}, 0);
			$this.find('h3').animate({opacity: 1}, 0);
			$this.find('p').hide();
			$this.find('p').animate({opacity: 0}, 0);
		};

		//add border to show focus
		$scope.showBorder = (e) => {
			let $this = angular.element(e.currentTarget);
			$this.parent().css('border', '3px solid #50B1FE');
		};

		$scope.removeBorder = (e) => {
			let $this = angular.element(e.currentTarget);
			$this.parent().css('border', '');
		};
	

	}])
}

module.exports = FutureEventsCtrl;