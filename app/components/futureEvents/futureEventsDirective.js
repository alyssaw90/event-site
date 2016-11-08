'use strict';
import * as customFunctions from '../shared/methods/common-functions.js';
const jQuery = require('jquery');

const futureEventsDirective = (app) => {
	app.directive('futureEventsDirective', ['$timeout', '$rootScope', '$location', function($timeout, $rootScope, $location) {
		const futureEventsDirectiveDefinitionObject = {
			restrict: 'A',
			scope: true,
			link: function postLink(scope, element, attrs) {
				//set heights of .event_block divs to match
				$timeout(function() {
				 	customFunctions.changeHeight('.event_block');
				}, 500);
				//change heights on window resize

				jQuery(window).resize(function(){
				  customFunctions.changeHeight('.event_block');
				  // customFunctions.homepageStickyFooter();
				});
				//change the heigts if the page starts on a different path
				scope.$on('$locationChangeSuccess', function(event) {
					
					$timeout(function() {
				 		customFunctions.changeHeight('.event_block');
					}, 500);
				});

				$rootScope.$on('$viewContentLoaded', function () {
					// $timeout(function() {
						if (!$location.hash()) {
							jQuery('#screenreader-summary').trigger('focus');
						}
						
					// });
	
				});

			}
		};
  	return futureEventsDirectiveDefinitionObject
	}])
};

module.exports = futureEventsDirective;