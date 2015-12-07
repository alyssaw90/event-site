'use strict';

$(document).ready(function () {
	var $eventBlock = $('.event_block');
	//make block slide up effect for upcoming event blocks
	$eventBlock.hover(
		function () {
		$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
		},
		function () {
			$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200);
		});

	$eventBlock.hover(
		function () {
			var theCss = $(this).css();
			$(this).css('background-color', 'red').css('z-index', 1001);
			$(this).html('')
		},
		function () {
			var theHtml = $(this).html();
			console.log(theHtml);
			// $(this).html(theHtml).css(theCss);

		})

})