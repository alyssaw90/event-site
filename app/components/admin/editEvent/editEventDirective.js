'use strict';
import * as customFunctions from '../../shared/methods/common-functions.js';
const jQuery = require('jquery');

const editEventDirective = (app) => {
	app.directive('editEventDirective', ['$parse', function($parse) {
		const editEventDirectiveObj = {
			restrict: 'A',
			scope: {
      	control: '='
    	},
			link: function postLink(scope, element, attrs, controller, transcludeFn) {
       
			}
		}
		return editEventDirectiveObj;
	}])
};

module.exports = editEventDirective;