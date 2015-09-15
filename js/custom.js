'use stict';

$(document).ready(function () {
	$('.social img').hover(function () {
		$(this).toggleClass('animated flip');
	});

	// $('.center-block').addClass('animated rotateIn');

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

	$('.event_block').hover(
		function () {
		$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
		},
		function () {
			$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200)
		});

	$('.menu-overlay li').hover(function () {
		// $(this).removeClass('menu-overlay');
		$(this).toggleClass('menu-overlay-hover');
	});

	$(window).resize(function () {
		var tallestMenuBlock = $('.bottom-menu').prop('scrollHeight');
		if ($(window).width() > 780) {
			$('.center-block').height(tallestMenuBlock);
			console.log(tallestMenuBlock);
		} 
		if ($(window).width <= 780) {
			$('.center-block').css('height', '');
		}
		
	});	

})