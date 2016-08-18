'use strict';

const AllPagesCtrl = (app) => {

	app.controller('AllPagesCtrl', ['$scope', '$location', '$route', '$rootScope', function($scope, $location, $route, $rootScope) {
		$scope.showSlider = false;
		$scope.announceOnViewChange;
		$scope.currentPath = $location.path();
		$scope.isCurrentPage = (pageUrl) => {
		console.log('ladjfaf   ', $location.path(), '      ', /\/admin.*$/.test('/admin'));
	   	return pageUrl === $location.path();
		}

		$scope.isAdminPage = (pageUrl) => {
	   	// return /\/admin.*$/.test(pageUrl);
	   	return pageUrl ==='/admin'
		}
		
		$scope.isFirstEventInLIst = (index) => {
			if (index === 0) {
				return 'eventNavigationMenu';
			} else {
				return '';
			}
		}

		$rootScope.$on('$viewContentLoaded', function(next, current) { 
			$scope.announceOnViewChange = document.title + ', view loaded';
	 	});
	
	}]);
};

module.exports = AllPagesCtrl;