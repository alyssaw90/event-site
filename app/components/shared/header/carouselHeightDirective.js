'use strict';
const jQuery = require('jquery');

const carouselHeightDirective = (app) => {
	app.directive('carouselHeightDirective', ['$timeout', '$window', ($timeout, $window) => {
		const carouselHeightDirectiveObj = {
			restrict: 'A',
			scrope: false,
			// link: ($scope, $elem, attrs) => {
			// 	let carouselHeight = 0;
			// 	// let resizeTimeout;
			// 	function matchHeights(i, el) {
			// 		let imgHeight = jQuery(this).height();
			// 		if (imgHeight > $scope.carouselHeight) {
			// 			$scope.carouselHeight = imgHeight;							
			// 		}
			// 	}
			// 	$scope.$watch( () => {
				
			// 		$elem.find('img').each(function(i, el) {
			// 			let imgHeight = jQuery(this).height();
			// 			if (imgHeight > carouselHeight) {
			// 				carouselHeight = imgHeight;
			// 				// $scope.carouselHeight = imgHeight;							
			// 			}
			// 		});
			// 		$scope.carouselHeight = carouselHeight;

			// 		angular.element($window).on('resize', function (e) {
			// 			$elem.find('img').each(function(i, el) {
			// 				let imgHeight = jQuery(this).height();
			// 				if (imgHeight > carouselHeight) {
			// 					carouselHeight = imgHeight;
			// 					$scope.carouselHeight = imgHeight;							
			// 				}
			// 				$scope.$digest();
			// 			});	
			// 			/*clearTimeout(resizeTimeout);
   //  				resizeTimeout = setTimeout(function() {
  	//   				$elem.find('img').each(function(i, el) {
			// 					let imgHeight = jQuery(this).height();
			// 					if (imgHeight > carouselHeight) {
			// 						carouselHeight = imgHeight;
			// 						$scope.carouselHeight = imgHeight;							
			// 					}
			// 				});
   //  				}, 500);*/
			// 		});

			// 	angular.element($window).on('resize', function (e) {
			// 		console.log('$elem :: ', $elem.find('img').height(), '\nimg height :: ', $scope.carouselHeight);
			// 		$elem.find('img').each(function(i, el) {
			// 			let imgHeight = jQuery(this).height();
			// 			if (imgHeight > carouselHeight) {
			// 				carouselHeight = imgHeight;
			// 			}
			// 			$scope.$digest();
			// 		});
			// 		$scope.carouselHeight = carouselHeight;
			// 	})
			// }
		}
		return carouselHeightDirectiveObj;
	}])
}

module.exports = carouselHeightDirective;