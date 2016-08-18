'use strict';
import * as customFunctions from '../methods/common-functions.js';
const jQuery = require('jquery');

const adminHeaderDirective = (app) => {
	app.directive('adminHeaderDirective', ['$timeout', function($timeout) {
			const adminHeaderDirectiveDefinitionObject = {
				restrict: 'A',
				scope: true,
				link: function postLink(scope, element, attrs) {

					$timeout(function() {
						let path = window.location.pathname;
						let $currentAdminLi = jQuery(`#admin-menu-ul > a[href="${path}"]`).parent('li');
						let $allAdminLi = jQuery('#admin-menu-ul').find('li');

						$allAdminLi.removeClass('current');
						if (path === '/admin') {
							jQuery('#admin-menu-ul').children('li')[0].addClass('current');
						} else {
							$currentAdminLi.addClass('current');
						}

					}, 500);

					scope.$on('$locationChangeSuccess', function(event) {
						$timeout(function() {
						let path = window.location.pathname;
						let $currentAdminLi = jQuery(`#admin-menu-ul > a[href="${path}"]`).parent('li');
						let $allAdminLi = jQuery('#admin-menu-ul').find('li');
							

						$allAdminLi.removeClass('current');
						if (path === '/admin') {
							jQuery('#admin-menu-ul').children('li')[0].addClass('current');
						} else {
							$currentAdminLi.addClass('current');
						}

					
						}, 500);
					});
				}
			};
	  	return adminHeaderDirectiveDefinitionObject
		}])
};

module.exports = adminHeaderDirective;