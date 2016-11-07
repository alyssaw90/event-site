'use strict';
import * as customFunctions from '../shared/methods/common-functions.js';
const jQuery = require('jquery');

const pastEventsDirective = (app) => {
	app.directive('pastEventsDirective', ['$timeout', function($timeout) {
		const pastEventsDirectiveDefinitionObject = {
			restrict: 'A',
			scope: true,
			link: function postLink(scope, element, attrs) {
				//set heights of .past_events divs to match
				$timeout(function() {
				 	customFunctions.changeHeight(jQuery('.past_events'));
				});
				//change the heights on window resize
				jQuery(window).resize(function(){
				  customFunctions.changeHeight(jQuery('.past_events'));
				  // customFunctions.homepageStickyFooter();
				});
				//change the heigts if the page starts on a different path
				scope.$on('$locationChangeSuccess', function(event) {
					
					$timeout(function() {
				 		customFunctions.changeHeight(jQuery('.past_events'));
					});
				})
			}
		};
  	return pastEventsDirectiveDefinitionObject
	}])
};

module.exports = pastEventsDirective;