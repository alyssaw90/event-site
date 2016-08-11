'use strict';
import * as customFunctions from './../../../es6/common-functions.build.js';
const jQuery = require('jquery');

const sliderDirective = (app) => {
	app.directive('sliderDirective', function() {
		const sliderDirectiveDefinitionObject = {
			restrict: 'A',
			scope: true,
			link: function postLink(scope, element, attrs, $timeout) {
				
				
				
			}
		};
  	return sliderDirectiveDefinitionObject
	})
};

module.exports = sliderDirective;