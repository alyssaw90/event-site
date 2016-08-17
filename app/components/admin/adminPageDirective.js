'use strict';
import * as customFunctions from './../../es6/common-functions.build.js';
const jQuery = require('jquery');

const adminPageDirective = (app) => {
	app.directive('adminPageDirective', [function() {
		const adminPageDirectiveObj = {
			restrict: 'A',
			scope: true,
			link: function postLink(scope, elem, attrs) {
				// scope.rss1(); 
				// scope.rss2();
				
			}
		}
		return adminPageDirectiveObj;
	}])
};

module.exports = adminPageDirective;