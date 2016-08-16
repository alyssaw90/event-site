'use strict';
import * as customFunctions from './../../es6/common-functions.build.js';
const jQuery = require('jquery');

const eventsDirective = (app) => {
	app.directive('eventsDirective', ['$timeout', function($timeout) {
		const eventsDirectiveObj = {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				
			}
			
		}

		return eventsDirectiveObj;
	}])
}

module.exports = eventsDirective;