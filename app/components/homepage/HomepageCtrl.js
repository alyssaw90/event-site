'use strict';

const HomepageCtrl = (app) => {
	app.controller('HomepageCtrl', ['$scope', '$location', '$window', function($scope, $location, $window) {
		$scope.hideSlider = false;
		$scope.isCurrentPage = (pageUrl) => {
	   return pageUrl === $location.path();
		}

		 $scope.miniGalleryResponsive = [
			{
				breakpoint: 1046,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 980,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 826,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 650,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
    	];

	}])
}

module.exports = HomepageCtrl;