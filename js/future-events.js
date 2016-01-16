'use strict';
/*global $ */
/*global document */
/*global window */
/*global changeHeight */

$(document).ready(function () {
	var $eventBlock = $('.event_block');
	//make block slide up effect for upcoming event blocks
	$eventBlock.hover(
		function () {
			var $theHtml = $(this).html();
			
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
  changeHeight('.event_block');
});


$(window).resize(function(){
  changeHeight('.event_block');
});
