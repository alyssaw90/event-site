//REMOVE ENTIRE FILE

// 'use strict';
// import * as customFunctions from '../methods/common-functions.js';
// const jQuery = require('jquery');

// const sliderSlideDirective = (app) => {
// 	app.directive('sliderSlideDirective', ['$timeout', function($timeout) {
// 			const sliderSlideDirectiveDefinitionObject = {
// 				restrict: 'A',
// 				scope: true,
// 				link: function postLink($scope, $elem, attrs) {

// 					const changeHeight = () => {
// 						//emptly the height array
// 						$scope.$parent.sliderImgsHeights.length = 0;
// 						//get height of current slide in list and push the height into the height array
// 						let elemHeight = jQuery($elem[0]).height();
// 						//push that height onto array of heights from parent $scope
// 						$scope.$parent.sliderImgsHeights.push(elemHeight);
// 						//assign the tallest height in array to newHeight variable using es6 spread operator
// 						let newHeight = Math.max(...$scope.$parent.sliderImgsHeights);
// 						jQuery('#upcoming-events-carousel').height(newHeight);

// 					}

// 					$timeout(changeHeight, 1000);

// 					angular.element(window).bind('resize', function () {
//     				$timeout(function() {
//   	  				changeHeight();
//     				})
// 					});
					

// 					$scope.$on('$locationChangeSuccess', function(event) {
// 						changeHeight();
// 					})
// 				}
// 			};
// 	  	return sliderSlideDirectiveDefinitionObject
// 		}])
// };

// module.exports = sliderSlideDirective;;