'use strict';

$(document).ready(function () {
	//make block slide up effect for upcoming event blocks
	$('.event_block').hover(
		function () {
		$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
		},
		function () {
			$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200);
		});

})