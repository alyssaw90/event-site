'use strict';
import * as customFunctions from './../../es6/common-functions.build.js';
const jQuery = require('jquery');

const futureEventsDirective = (app) => {
	app.directive('futureEventsDirective', function() {
		const futureEventsDirectiveDefinitionObject = {
			restrict: 'A',
			scope: true,
			link: function postLink(scope, element, attrs, $timeout) {
				//set heights of .event_block divs to match
				setTimeout(function() {
				 	customFunctions.changeHeight('.event_block');
				}, 500)
			}
		};
  	return futureEventsDirectiveDefinitionObject
	})
};

module.exports = futureEventsDirective;