'use strict';

const HomepageCtrl = (app) => {
	app.controller('HomepageCtrl', ['$scope', '$location', function($scope, $location) {
		$scope.hideSlider = false;
		$scope.isCurrentPage = (pageUrl) => {
			console.log('pageUrl:              ', $location.path())
	   return pageUrl === $location.path();
		}

	}])
}

module.exports = HomepageCtrl;