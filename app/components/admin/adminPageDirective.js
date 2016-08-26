'use strict';
import * as customFunctions from '../shared/methods/common-functions.js';
const jQuery = require('jquery');

const adminPageDirective = (app) => {
	app.directive('adminPageDirective', ['$parse', function($parse) {
		const adminPageDirectiveObj = {
			restrict: 'A',
			scope: true,
			link: function postLink(scope, elem, attrs) {
       /* var model = $parse(attrs.adminPageDirective);
        var modelSetter = model.assign;
       	console.log('elem[0]    ', elem[0].childNodes[1].childNodes[1]);
        elem.bind('change', function(){
            scope.$apply(function(){
       	console.log('elem[0]    ', elem[0].childNodes[1].childNodes[1].childNodes[3].childNodes[8].files);
                // modelSetter(scope, elem[0].childNodes[1].childNodes[1].childNodes[3].childNodes[8].files);
            });
        });*/
			}
		}
		return adminPageDirectiveObj;
	}])
};

module.exports = adminPageDirective;