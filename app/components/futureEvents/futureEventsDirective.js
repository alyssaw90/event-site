'use strict';
import * as customFunctions from './../../es6/common-functions.build.js';
const jQuery = require('jquery');

const futureEventsDirective = (app) => {
	app.directive('futureEventsDirective', function($timeout) {
		const futureEventsDirectiveDefinitionObject = {
			restrict: 'A',
			scope: true,
			link: function postLink(scope, element, attrs, $timeout) {
				//set heights of .event_block divs to match
				$timeout(function() {
				 	customFunctions.changeHeight('.event_block');
				}, 500);
				//change the heigts if the page starts on a different path
				/*scope.$on('$locationChangeStart', function(event) {
					console.log('hola');
					$timeout(function() {
				 		customFunctions.changeHeight('.event_block');
					}, 500);
				})*/
			}
		};
  	return futureEventsDirectiveDefinitionObject
	})
};

module.exports = futureEventsDirective;