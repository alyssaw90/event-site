'use strict';

const jQuery = require('jquery');
import * as customFunctions from '../../shared/methods/common-functions.js';

const uniqueUrlDirective = (app) => {
	app.directive('uniqueUrlDirective', [ () => {
		const uniqueUrlDirectiveObj = {
			restrict: 'A',
			require: 'ngModel',
			link: ($scope, $elem, attrs, ngModel) => {
				const $form = jQuery($elem[0].form);
				let usedUrls;
				//remove current event's URL from duplicate list
				function removeCurrentUrl(val) {
					return val !== $scope.$parent.currentEventUrl;
				}
				

					console.log('scope arr :: ', $scope);
				$scope.$watch('editedEvent.event', () => {
					$scope.$parent.getEvents();
					usedUrls = $scope.$parent.eventUrls.filter(removeCurrentUrl);
				})
				//function to check for unique URL
				function uniqueUrl() {
					if (usedUrls.indexOf($elem[0].value) > 0) {
						ngModel.$setValidity('uniqueUrl', false);
						$elem.addClass('win-color-border-color-alert');
					} else {
						ngModel.$setValidity('uniqueUrl', true);						
						ngModel.$invalid = true;
						$elem.removeClass('win-color-border-color-alert');
					}
				};
				//add unique url check to model $parsers
				ngModel.$parsers.push(uniqueUrl);

				//bind url check to form submission and prevent submission and focus on elem if it alread exists in URL array
		    $form.bind('submit', function(e) {
		    	if (usedUrls.indexOf(e.currentTarget[1].value) > 0) {
		    		e.preventDefault();
		    		ngModel.$setValidity('uniqueUrl', false);
		    		jQuery(e.currentTarget[1]).addClass('win-color-border-color-alert').focus();
		    	}
		    });
			}
			
		}

		return uniqueUrlDirectiveObj;
	}])
}

module.exports = uniqueUrlDirective;;