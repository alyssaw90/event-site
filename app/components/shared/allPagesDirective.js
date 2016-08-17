'use strict';

import * as customFunctions from '../shared/methods/common-functions.js';
const jQuery = require('jquery');

const allPagesDirective = (app) => {
	app.directive('allPagesDirective', ['$timeout', '$rootScope', '$location', function($timeout, $rootScope, $location) {
		const allPagesDirectiveObj = {
			restrict: 'A',
			scope: true,
			link: function postLink(scope, element, attrs, $timeout) {

					$rootScope.$on('$viewContentLoaded', function () {
						// $timeout(function() {
							// console.log('path     ', !$location.hash());
							if (!$location.hash()) {
								jQuery('#screenreader-summary').trigger('focus');
							}
							
						// });
		
					});


				setTimeout(function() {

						/*---------------------------------
							Tabs
						-----------------------------------*/
						// tab setup
						jQuery('.tab-content').addClass('clearfix').not(':first').hide();
						jQuery('ul.tabs').each(function(){
							let current = jQuery(this).find('li.current');
							if(current.length < 1) { jQuery(this).find('li:first').addClass('current'); }
							current = jQuery(this).find('li.current a').attr('href');
							jQuery(current).show();
						});
					
						// tab click
						jQuery(document).on('click', 'ul.tabs a[href^="#"]', function(e){
							e.preventDefault();
							let tabs = jQuery(this).parents('ul.tabs').find('li');
							let tab_next = jQuery(this).attr('href');
							let tab_current = tabs.filter('.current').find('a').attr('href');
							jQuery(tab_current).hide();
							tabs.removeClass('current');
							jQuery(this).parent().addClass('current');
							jQuery(tab_next).show();
							history.pushState( null, null, window.location.search + jQuery(this).attr('href') );
							return false;
						});
					
						// tab hashtag identification and auto-focus
				  	let wantedTag = window.location.hash;
				  	if (wantedTag != "") {
						// This code can and does fail, hard, killing the entire app.
						// Esp. when used with the jQuery.Address project.
							try {
								let allTabs = jQuery("ul.tabs a[href^=" + wantedTag + "]").parents('ul.tabs').find('li');
								let defaultTab = allTabs.filter('.current').find('a').attr('href');
								jQuery(defaultTab).hide();
								allTabs.removeClass('current');
								jQuery("ul.tabs a[href^=" + wantedTag + "]").parent().addClass('current');
								jQuery("#" + wantedTag.replace('#','')).show();
							} catch(e) {
								// I have no idea what to do here, so I'm leaving this for the maintainer.
							}
				  	}				

					}, 500);
			}
			
		}
		return allPagesDirectiveObj;
	}])
}

module.exports = allPagesDirective;