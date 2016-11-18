'use strict';

const jQuery = require('jquery');
import * as customFunctions from '../../shared/methods/common-functions.js';

const uniqueUrlDirective = (app) => {
	app.directive('uniqueUrlDirective', [ () => {
		const uniqueUrlDirectiveObj = {
			restrict: 'A',
			require: 'ngModel',
			scope: true,
			link: ($scope, $elem, attrs, ngModel) => {

				const $form = jQuery($elem[0].form);
				//remove current event's URL from duplicate list
				function removeCurrentUrl(val) {
					return val !== $scope.$parent.currentEventUrl;
				}
				let usedUrls = $scope.$parent.eventUrls;

				$scope.$watch('editedEvent.event', () => {
					$scope.$parent.getEvents();
					usedUrls = $scope.$parent.eventUrls.filter(removeCurrentUrl);
				});
				//$watch the value of the form input and add an error if it's already used
				$scope.$watch(
					() => {
						return $elem[0].value
					}, 
					(newVal, oldVal) => {
						let index = usedUrls.length ? usedUrls.indexOf(newVal) : $scope.$parent.eventUrls.indexOf(newVal);
						if (index > -1) {
							ngModel.$setValidity('uniqueUrl', false);
							$elem.addClass('win-color-border-color-alert');
						} else {
							ngModel.$setValidity('uniqueUrl', true);						
							ngModel.$invalid = true;
							$elem.removeClass('win-color-border-color-alert');
						}
					}
				);

				//bind url check to form submission and prevent submission and focus on elem if it alread exists in URL array
		    $form.bind('submit', function(e) {
		    	let index = usedUrls.length ? usedUrls.indexOf(newVal) : $scope.$parent.eventUrls.indexOf(newVal);
		    	if (index > -1 && $elem[0].value !==  $scope.$parent.currentEventUrl) {
		    		e.preventDefault();
		    		ngModel.$setValidity('uniqueUrl', false);
		    		jQuery($elem[0]).addClass('win-color-border-color-alert').focus();
		    	}
		    });
			}
			
		}

		return uniqueUrlDirectiveObj;
	}])
}

module.exports = uniqueUrlDirective;;