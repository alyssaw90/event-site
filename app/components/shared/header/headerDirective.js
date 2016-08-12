'use strict';
import * as customFunctions from './../../../es6/common-functions.build.js';
const jQuery = require('jquery');

const headerDirective = (app) => {
	app.directive('headerDirective', ['$timeout', function($timeout) {
			const headerDirectiveDefinitionObject = {
				restrict: 'A',
				scope: true,
				link: function postLink(scope, element, attrs) {
				 	const $homeMenuButton = jQuery('.home-menu-button');
				 	const $upcominEventsBlock = jQuery('.upcominEventsBlock');
				 	const $latestNewsMenuBlock = jQuery('.latest-news-menu-block');
				 	const $meetTheTeamMenuBlock = jQuery('.meet-the-team-menu-block');
				 	const $pastEventsHeaderMenuBlock = jQuery('.past-events-header-menu-block');
				 	const $menuBlock = jQuery('.menu-block');
				 	const $carouselContainer = jQuery('.carousel-container');
				 	let pathname = window.location.pathname;

				 	//hide the slider/carousel
				 	$carouselContainer.show();

		 			//highlight currently selected menu item
					if (pathname === '/') {
						$carouselContainer.show();
						$homeMenuButton.addClass('current-page');
					}
					if (pathname === '/future-events') {
						$upcominEventsBlock.addClass('current-page');
						$carouselContainer.hide();
					}
					if (pathname === '/latest-news') {
						$latestNewsMenuBlock.addClass('current-page');
						$carouselContainer.hide();
					}
					if (pathname === '/meet-the-team') {
						$meetTheTeamMenuBlock.addClass('current-page');
						$carouselContainer.hide();
					}
					if (pathname === '/past-events') {
						$pastEventsHeaderMenuBlock.addClass('current-page');
						$carouselContainer.hide();
					}

					scope.$on('$locationChangeSuccess', function(event) {
						pathname = window.location.pathname;

				    $menuBlock.removeClass('current-page');
						//highlight currently selected menu item
						if (pathname === '/') {
							$homeMenuButton.addClass('current-page');
							$carouselContainer.show();
						}
						if (pathname === '/future-events') {
							$upcominEventsBlock.addClass('current-page');
							$carouselContainer.hide();
						}
						if (pathname === '/latest-news') {
							$latestNewsMenuBlock.addClass('current-page');
							$carouselContainer.hide();
						}
						if (pathname === '/meet-the-team') {
							$meetTheTeamMenuBlock.addClass('current-page');
							$carouselContainer.hide();
						}
						if (pathname === '/past-events') {
							$pastEventsHeaderMenuBlock.addClass('current-page');
							$carouselContainer.hide();
						}
					});
				}
			};
	  	return headerDirectiveDefinitionObject
		}])
};

module.exports = headerDirective;;