'use strict';
import * as customFunctions from './../../../es6/common-functions.build.js';
const jQuery = require('jquery');

const sliderSlideDirective = (app) => {
	app.directive('sliderSlideDirective', ['$timeout', function($timeout) {
			const sliderSlideDirectiveDefinitionObject = {
				restrict: 'A',
				scope: true,
				link: function postLink(scope, element, attrs) {
					$timeout(function() {
						//get height of current slide in list and push the height into the height array
						let elemHeight = jQuery(element[0]).height();
						//push that height onto array of heights from parent scope
						scope.$parent.sliderImgsHeights.push(elemHeight);
						//assign the tallest height in array to newHeight variable using es6 spread operator
						let newHeight = Math.max(...scope.$parent.sliderImgsHeights);
						jQuery('#upcoming-events-carousel').height(newHeight);

					});
				}
			};
	  	return sliderSlideDirectiveDefinitionObject
		}])
};

module.exports = sliderSlideDirective;;