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
	// $('.menu-overlay li').hover(function () {
	// 	$(this).toggleClass('menu-overlay-hover');
	// });

	//make block slide up effect for upcoming event blocks
	$('.event_block').hover(
		function () {
		$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
		},
		function () {
			$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200)
		});

	function changeSize (div) {
		// var $eventBlock = $('.event_block');
		var tallestBlock = 0;
		div.each(function () {
			if ($(this).height() > tallestBlock) {
				tallestBlock = $(this).height();
			}
		})

		div.each(function () {
			$(this).height(tallestBlock);
		})
	}

	$(window).resize(changeSize($('.event_block')));
	$(window).load(changeSize($('.event_block')));
	$(window).resize(changeSize($('.past_events')));
	$(window).load(changeSize($('.past_events')));


	//make mobile menu slide down when it's pressed

	$('.hamburger-menu').click(function () {
		// $('.mobile-menu:first').toggleClass('add-space');
  	if ($('.hidden-div').is(':hidden')) {
  	  $('.hidden-div').slideDown('slow');
  	  $('.menu-overlay').css('height', '100%');
  	} else {
  	  $('.hidden-div').slideUp('slow');
  	  $('.menu-overlay').css('height', '65px');
  	}
	});

	//make past events buttons and homepage content full width on mobile

	// function fullWidthMobile(div) {
	// 	if ($(window).width() < 768) {
	// 		div.addClass('flex');
	// 	}
	// 	if ($(window).width() > 768) {
	// 		div.removeClass('flex');
	// 	}
		
	// }

	// $(window).resize(fullWidthMobile($('.past-events-menu')));
	// $(window).load(fullWidthMobile($('.past-events-menu')));
	// $(window).resize(fullWidthMobile($('.main-page-content')));
	// $(window).load(fullWidthMobile($('.main-page-content')));

	//make footer stick to bottom of content or page, whichever is taller

	function stickyFooter(foot) {
	  var footerHeight = foot.height();
	  var heightDiff = $(window).height() - $('body').height() + footerHeight;
	  if ($(window).height() > $('body').outerHeight(true) + footerHeight + 20) {
	    foot.addClass('stick-footer');
	    $('body').css('margin-bottom', footerHeight);
	  }

	  if ($(window).height() <= $('body').outerHeight(true) + footerHeight + 20) {
	  	foot.removeClass('stick-footer');
	  	$('body').css('margin-bottom', 0);
	  }
	}

	$(window).load(stickyFooter($('.footer-at-bottom')));

	$(window).resize(stickyFooter($('.footer-at-bottom')));

	//hide slider on phones

	function hidePhone(div) {
		if ($(window).width() < 768) {
			div.css('display', 'none');
		}
		if ($(window).width() > 768) {
			div.css('display', 'inline');
		}
		
	}

	$(window).load(hidePhone($('.slider')));
	$(window).resize(hidePhone($('.slider')));

	//make bottom button scroll to top
	$(".scroll-button .fa-chevron-up").click( function() {
   $(window).scrollTop(0);
 	});

})
