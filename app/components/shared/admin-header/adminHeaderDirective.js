'use strict';
import * as customFunctions from '../methods/common-functions.js';
const jQuery = require('jquery');

const adminHeaderDirective = (app) => {
	app.directive('adminHeaderDirective', ['$timeout', function($timeout) {
			const adminHeaderDirectiveDefinitionObject = {
				restrict: 'A',
				scope: true,
				link: function postLink(scope, element, attrs) {/*

					$timeout(function() {
						let path = window.location.pathname;
						let $currentAdminAnchor = jQuery(`a[href="${path}"]`);
						let $allAdminAnchors = jQuery('#admin-menu-ul').find('a');
						$allAdminAnchors.removeClass('inset');
						$currentAdminAnchor.addClass('inset');
					}, 500);

					scope.$on('$locationChangeSuccess', function(event) {
						$timeout(function() {
						let path = window.location.pathname;
						let $currentAdminAnchor = jQuery(`a[href="${path}"]`);
						let $allAdminAnchors = jQuery('#admin-menu-ul').find('a');
						$allAdminAnchors.removeClass('inset');
						$currentAdminAnchor.addClass('inset');

					}, 500);
					});
				*/}
			};
	  	return adminHeaderDirectiveDefinitionObject
		}])
};

module.exports = adminHeaderDirective;