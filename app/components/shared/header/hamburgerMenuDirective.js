'use strict';
import * as customFunctions from '../methods/common-functions.js';
const jQuery = require('jquery');

const hamburgerMenuDirective = (app) => {
	app.directive('hamburgerMenuDirective', ['$timeout', ($timeout) => {
			const hamburgerMenuDirectiveDefinitionObject = {
				restrict: 'A',
				scope: true,
				link: ($scope, $element, $attrs) => {

					$timeout( () => {
					 	let $hamburgerIcon = jQuery('.hamburger-icon');
					 	let $mobileWrapper = jQuery('.mobileWrapper');
					 	let $hiddenDiv = jQuery('.hidden-div');

						$element.click( (e) => {
							$hiddenDiv.animate({width: 'toggle'});
							$mobileWrapper.toggleClass('grayedOut');
							$hamburgerIcon.toggleClass('rotate-90');
							$mobileWrapper.find('*').css('pointer-events', 'none');
						});

						$mobileWrapper.click( (e) => {

							if ($hiddenDiv.is(':visible') && e.target !== $hiddenDiv) {
								$hiddenDiv.animate({width: 'toggle'});
								$mobileWrapper.toggleClass('grayedOut');
								$hamburgerIcon.toggleClass('rotate-90');
								$mobileWrapper.find('*').css('pointer-events', 'auto');
								return false;
							}
						});
						
					});

				}
			};
	  	return hamburgerMenuDirectiveDefinitionObject
		}])
};

module.exports = hamburgerMenuDirective;;