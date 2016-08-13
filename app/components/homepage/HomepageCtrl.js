'use strict';

const HomepageCtrl = (app) => {
	app.controller('HomepageCtrl', ['$scope', '$location', function($scope, $location) {
		$scope.hideSlider = false;
		$scope.isCurrentPage = (pageUrl) => {
	   return pageUrl === $location.path();
		}

	}])
}

module.exports = HomepageCtrl;