'use strict';

const homepageCtrl = (app) => {
	app.controller('homepageCtrl', ['$scope', '$location', function($scope, $location) {
		$scope.hideSlider = false;
		$scope.someVar = 'taco';
		console.log('hola');
		$scope.isCurrentPage = (pageUrl) => {
			console.log('pageUrl:              ', $location.path())
	   return pageUrl === $location.path();
		}

		$scope.blah = function() {
			console.log('function called');
		}

	}])
}

module.exports = homepageCtrl;