'use strict';
/*global $ */
/*global document */
/*global window */
/*global changeHeight */

let jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

(function($) {

	$(document).ready(function () {
		let $eventBlock = $('.event_block');
		//make block slide up effect for upcoming event blocks
		$eventBlock.hover(
			function () {
				let $theHtml = $(this).html();
				
				$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
				$(this).find('h1').animate({opacity: 0}, 0);
				$(this).find('h3').animate({opacity: 0}, 0);
				$(this).find('p').show();
				$(this).find('p').animate({opacity: 1}, 200);
			},
			function () {
				$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200);
				$(this).find('h1').animate({opacity: 1}, 0);
				$(this).find('h3').animate({opacity: 1}, 0);
				$(this).find('p').hide();
				$(this).find('p').animate({opacity: 0}, 0);
			});
	});

	$(window).load(function() {
	  customFunctions.changeHeight('.event_block');
	});


	$(window).resize(function(){
	  customFunctions.changeHeight('.event_block');
	});

	//for Accessibility
	$('map area').attr('tabindex', '-1');

})(jQuery);
