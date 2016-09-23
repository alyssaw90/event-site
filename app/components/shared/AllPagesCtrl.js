'use strict';

const jQuery = require('jquery');

const AllPagesCtrl = (app) => {

	app.controller('AllPagesCtrl', ['$scope', '$location', '$route', '$rootScope', '$cookies', ($scope, $location, $route, $rootScope, $cookies) => {
		$scope.showSlider = false;
		$scope.announceOnViewChange;
		$scope.currentPath = $location.path();
		$scope.isCurrentPage = (pageUrl) => {
	   	return pageUrl === $location.path();
		}

		$scope.isEmptyObj = (obj) => {
			if ( angular.equals({}, obj) ) {
				return true;
			} else {
				return false;
			}
		}

		$scope.isLoggedIn = () => {
	   	// return /\/admin.*$/.test(pageUrl);
	   	// return /\/admin.*$/.test(pageUrl);
			let tokenLength = $cookies.get('token') ? $cookies.get('token').length : 0;
			// let showAdminHeader = theToken.length || false;
	   	return tokenLength > 0;
		}

		$scope.$on('$locationChangeSuccess', (event) => {
			$scope.currentPath = $location.path();
		});
		
		$scope.isFirstEventInLIst = (index) => {
			if (index === 0) {
				return 'eventNavigationMenu';
			} else {
				return '';
			}
		}

		  $scope.goToPage = (link) => {
  		  $location.path(link);
  		}

  		$scope.scrollToTop = () => {
  			alert('hola');
  			jQuery('html, body').animate({ scrollTop: 0 }, 'fast');
  			
  		}

		$rootScope.$on('$viewContentLoaded', (next, current) => { 
			$scope.announceOnViewChange = document.title + ', view loaded';
	 	});
	
	}]);
};

module.exports = AllPagesCtrl;