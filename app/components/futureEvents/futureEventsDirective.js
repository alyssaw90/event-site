'use strict';
import * as customFunctions from './../../es6/common-functions.build.js';
const jQuery = require('jquery');

const futureEventsDirective = (app) => {
	app.directive('futureEventsDirective', ['$timeout', function($timeout) {
		const futureEventsDirectiveDefinitionObject = {
			restrict: 'A',
			scope: true,
			link: function postLink(scope, element, attrs) {
				//set heights of .event_block divs to match
				$timeout(function() {
				 	customFunctions.changeHeight('.event_block');
				}, 500);
				//change the heigts if the page starts on a different path
				scope.$on('$locationChangeSuccess', function(event) {
					
					$timeout(function() {
				 		customFunctions.changeHeight('.event_block');
					}, 500);
				})
			}
		};
  	return futureEventsDirectiveDefinitionObject
	}])
};

module.exports = futureEventsDirective;