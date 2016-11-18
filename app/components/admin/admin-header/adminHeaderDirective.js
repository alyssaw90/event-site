'use strict';
import * as customFunctions from '../../shared/methods/common-functions.js';
const jQuery = require('jquery');

const adminHeaderDirective = (app) => {
	app.directive('adminHeaderDirective', ['$timeout', '$location', function($timeout, $location) {
			const adminHeaderDirectiveDefinitionObject = {
				restrict: 'A',
				scope: true,
				link: ($scope, $elem, $attrs) => {
					//assign active class to current element in admin header
					$scope.$on('$routeChangeSuccess', (event, current, previous) => {
						let urlPath = $location.path();
						$elem.children().removeClass('active');
						$elem.find(`a[href="${urlPath}"]`).parent('li').addClass('active');
						
					})

				}
			};
	  	return adminHeaderDirectiveDefinitionObject
		}])
};

module.exports = adminHeaderDirective;