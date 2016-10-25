'use strict';

const jQuery = require('jquery');
import * as customFunctions from '../../shared/methods/common-functions.js';

const uniqueUrlDirective = (app) => {
	app.directive('uniqueUrlDirective', [ () => {
		const uniqueUrlDirectiveObj = {
			restrict: 'A',
			require: 'ngModel',
			link: ($scope, $elem, attrs, ngModel) => {
				const $createEventForm = jQuery($elem[0].form);
				//function to check for unique URL
				function uniqueUrl() {
					if ($scope.$parent.eventUrls.indexOf($elem[0].value) > 0) {
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
		    $createEventForm.bind('submit', function(e) {
		    	if ($scope.$parent.eventUrls.indexOf(e.currentTarget[1].value) > 0) {
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

module.exports = uniqueUrlDirective;