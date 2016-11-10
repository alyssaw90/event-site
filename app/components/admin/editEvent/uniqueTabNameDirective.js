'use strict';

const jQuery = require('jquery');
import * as customFunctions from '../../shared/methods/common-functions.js';

const uniqueTabNameDirective = (app) => {
	app.directive('uniqueTabNameDirective', [ () => {
		const uniqueTabNameDirectiveObj = {
			restrict: 'A',
			require: 'ngModel',
			scope: true,
			link: ($scope, $elem, attrs, ngModel) => {
                console.log('ngModel :: ', ngModel);
				const $form = jQuery($elem[0].form);
				//remove current event's URL from duplicate list
				/*function removeCurrentUrl(val) {
					return val !== $scope.$parent.currentEventUrl;
				}
				let usedUrls = $scope.$parent.eventUrls;

				$scope.$watch('editedEvent.event', () => {
					$scope.$parent.getEvents();
					usedUrls = $scope.$parent.eventUrls.filter(removeCurrentUrl);
				});*/
				//$watch the value of the form input and add an error if it's already used
				$scope.$watch(
					() => {
						return $elem[0].value
					}, 
					(newVal, oldVal) => {
						let index = $scope.usedTabNames.indexOf(newVal);
						if (index > -1) {
							ngModel.$setValidity('uniqueTabName', false);
							$elem.addClass('win-color-border-color-alert');
						} else {
							ngModel.$setValidity('uniqueTabName', true);						
							ngModel.$invalid = true;
							$elem.removeClass('win-color-border-color-alert');
						}
					}
				);

				//bind url check to form submission and prevent submission and focus on elem if it alread exists in URL array
		    $form.bind('submit', function(e) {
		    	let index = $scope.usedTabNames.indexOf(newVal);
		    	if (index > -1 && $elem[0].value !==  $scope.$parent.currentEventUrl) {
		    		e.preventDefault();
		    		ngModel.$setValidity('uniqueTabName', false);
		    		jQuery($elem[0]).addClass('win-color-border-color-alert').focus();
		    	}
		    });
			}
			
		}

		return uniqueTabNameDirectiveObj;
	}])
}

module.exports = uniqueTabNameDirective;;