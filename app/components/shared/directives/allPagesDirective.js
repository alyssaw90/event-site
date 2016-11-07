'use strict';
const jQuery = require('jquery');

const allPagesDirective = (app) => {
	app.directive('allPagesDirective', ['$timeout', '$rootScope', '$location', function($timeout, $rootScope, $location) {
		const allPagesDirectiveObj = {
			restrict: 'A',
			scope: true,
			link: function postLink(scope, element, attrs) {

					$rootScope.$on('$viewContentLoaded', function () {
						$timeout(function() {
							// console.log('path     ', !$location.hash());
							if (!$location.hash()) {
								jQuery('#screenreader-summary').trigger('focus');
							}
							
						}, 300);
		
					});

			}
			
		}
		return allPagesDirectiveObj;
	}])
}

module.exports = allPagesDirective;