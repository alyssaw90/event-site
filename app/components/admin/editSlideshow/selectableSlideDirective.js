'use strict';
import * as customFunctions from '../../shared/methods/common-functions.js';
const jQuery = require('jquery');

const selectableSlideDirective = (app) => {
	app.directive('selectableSlideDirective', [ function() {
		let widestBlock = 0;
		
		const selectableSlideDirectiveObj = {
			restrict: 'A',
			scope: true,
			link: ($scope, $elem, attrs) => {

				$scope.$watch(
					() => {
						return $elem.find('input').attr('class')
					}, 
					(newVal, oldVal) => {

						if ($elem.find('input').hasClass('ng-not-empty')) {
							$elem.addClass('win-color-bg-yellow');
						} else {							
							$elem.removeClass('win-color-bg-yellow');
						}
					}
				);

			}
		}
		return selectableSlideDirectiveObj;
	}])
};

module.exports = selectableSlideDirective;