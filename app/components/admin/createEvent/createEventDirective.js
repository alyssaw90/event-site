'use strict';

const jQuery = require('jquery');

const createEventDirective = (app) => {
	app.directive('createEventDirective', ['$timeout', function($timeout) {
		const createEventDirectiveObj = {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				$timeout(function() {

					const $firstTab = jQuery('#previewEventUl').find('li:first-child');
					const $lastTab = jQuery('#previewEventUl').find('li:last-child');
					$firstTab.addClass('first').addClass('current');
					$lastTab.addClass('last');
					
				
				}, 1000);
			}
			
		}

		return createEventDirectiveObj;
	}])
}

module.exports = createEventDirective;