'use stict';

$(document).ready(function () {
	//apply flip animation to social icons
	$('.social img').hover(function () {
		$(this).toggleClass('animated flip');
	});

	//apply hover effect to main menu blocks
	$('.left-block').hover(function () {
		$(this).toggleClass('left-block-hover');
	});
	$('.left-center-block').hover(function () {
		$(this).toggleClass('left-center-block-hover');
	});

	$('.right-center-block').hover(function () {
		$(this).toggleClass('right-center-block-hover');
	});

	$('.right-block').hover(function () {
		$(this).toggleClass('right-block-hover');
	});
	//apply hover effect to top menu
	$('.menu-overlay li').hover(function () {
		$(this).toggleClass('menu-overlay-hover');
	});

	//make block slide up effect for upcoming event blocks
	$('.event_block').hover(
		function () {
		$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
		},
		function () {
			$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200)
		});

	//make main menu dynamically change height
	var originalHeight = $('.bottom-menu').prop('scrollHeight');
	$(window).resize(function () {
		var tallestMenuBlock = $('.bottom-menu').prop('scrollHeight');
		if ($(window).width <= 780) {
			$('.center-block').height(originalHeight);
		}
		if ($(window).width() > 780 && $(window).height()) {
			$('.center-block').height(tallestMenuBlock);
		} 
		if (!$(window).width() > 780 && !$(window).height()) {
			$('.center-block').height(originalHeight);
			$('.bottom-menu').height(originalHeight);
		}
			console.log(tallestMenuBlock, 'GGGG', $(window).width(), 'LLL', originalHeight);
		
	});	

})