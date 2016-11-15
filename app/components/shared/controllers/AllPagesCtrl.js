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
		$scope.showSocialIcons = true;

		$rootScope.$on('$routeChangeSuccess', (e, oldRoute, newRoute) => {
		});

		$scope.isEmptyObj = (obj) => {
			if ( angular.equals({}, obj) ) {
				return true;
			} else {
				return false;
			}
		}

		$scope.$on('$locationChangeSuccess', (event) => {
			let adminPath = new RegExp(`^/admin`);
			$scope.currentPath = $location.path();
			if(adminPath.test($scope.currentPath) || $scope.currentPath == '/') {
				$scope.showSocialIcons = false;
			} else {
				$scope.showSocialIcons = true;
			}
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
			jQuery('html, body').animate({ scrollTop: 0 }, 'fast');
			
		}

		$rootScope.$on('$viewContentLoaded', (next, current) => { 
			$scope.announceOnViewChange = document.title + ', view loaded';
		});
		
		//show element by jQuery selector
		$rootScope.showElem = (jQelem) => {
			jQuery(jQelem).show();
		}

		//hide element by jQuery selector
		$rootScope.hideElem = (jQelem) => {
			jQuery(jQelem).hide();
		}
	
	}]);
};

module.exports = AllPagesCtrl;