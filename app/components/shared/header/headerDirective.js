'use strict';
import * as customFunctions from '../methods/common-functions.js';
const jQuery = require('jquery');

const headerDirective = (app) => {
	app.directive('headerDirective', [ function() {
			const headerDirectiveDefinitionObject = {
				restrict: 'A',
				scope: true,
				link: ($scope, $elem, attrs) => {
				 	let pathname = window.location.pathname;
				 	const $carouselContainer = jQuery('.carousel-container');

					if ($elem.find('a').attr('href') === pathname) {
						jQuery('.menu-block').removeClass('current-page');
						$elem.addClass('current-page');
					}
					//hide the slideshow if not on homepage (this would be better with ng-show, but the ng-repeat fails if you leave the homepage and come back or don't start on the homepage)
					if (pathname === '/') {
						$carouselContainer.show();
					} else if (pathname !== '/') {
						$carouselContainer.hide();
					}
					$scope.$on('$locationChangeSuccess', function(e) {
						pathname = window.location.pathname;
						if ($elem.find('a').attr('href') === pathname) {
							jQuery('.menu-block').removeClass('current-page');
							$elem.addClass('current-page');
						}
						//hide the slideshow if not on homepage (this would be better with ng-show, but the ng-repeat fails if you leave the homepage and come back or don't start on the homepage)
						if (pathname === '/') {
							$carouselContainer.show();
						} else if (pathname !== '/') {
							$carouselContainer.hide();
						}
				
					});
				}
			};
	  	return headerDirectiveDefinitionObject
		}])
};

module.exports = headerDirective;;