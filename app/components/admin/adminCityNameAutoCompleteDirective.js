'use strict';
import * as customFunctions from '../shared/methods/common-functions.js';
const jQuery = require('jquery');

const adminCityNameAutoCompleteDirective = (app) => {
	app.directive('adminCityNameAutoCompleteDirective', ['$parse', function($parse) {
		const adminCityNameAutoCompleteDirectiveObj = {
			restrict: 'A',
			scope: true,
			link: function postLink(scope, elem, attrs) {
				console.log('elem:: ', elem);
			}
		}
		return adminCityNameAutoCompleteDirectiveObj;
	}])
};

module.exports = adminCityNameAutoCompleteDirective;