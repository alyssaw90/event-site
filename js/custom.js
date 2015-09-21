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

	//make mobile menu appear when it's pressed
	$('.hamburger-menu').click(function () {
		$('.mobile-menu').toggleClass('hidden-menu add-padding');
		$('.mobile-menu:first').toggleClass('add-space');
	});

	//make past events buttons full width on mobile
	$(window).load(function () {
		if ($(window).width() < 768) {
			$('.past-events-menu').addClass('.flex');
		}
		if ($(window).width() > 768) {
			$('.past-events-menu').removeClass('.flex');
		}
		
	});

	$(window).resize(function () {
		if ($(window).width() < 768) {
			$('.past-events-menu').addClass('.flex');
		}
		if ($(window).width() > 768) {
			$('.past-events-menu').removeClass('.flex');
		}
		
	});


	//make footer stick to bottom of content or page, whichever is taller
	$(window).load(function () {
	  var footerHeight = $('footer').height();
	  var heightDiff = $(window).height() - $('body').height() + footerHeight;
	  if ($(window).height() > $('body').outerHeight(true) + footerHeight + 20) {
	    $('footer').addClass('stick-footer');
	    $('body').css('margin-bottom', footerHeight);
	  }

	  if ($(window).height() <= $('body').outerHeight(true) + footerHeight + 20) {
	  	$('footer').removeClass('stick-footer');
	  	$('body').css('margin-bottom', 0);
	  }
	});

	$(window).resize(function () {

    var footerHeight = $('footer').height();
    var heightDiff = $(window).height() - $('body').height() + footerHeight;
    if ($(window).height() > $('body').outerHeight(true) + footerHeight + 20) {
      $('footer').addClass('stick-footer');
      $('body').css('margin-bottom', footerHeight);
    }

    if ($(window).height() <= $('body').outerHeight(true) + footerHeight + 20) {
    	$('footer').removeClass('stick-footer');
    	$('body').css('margin-bottom', 0);
    }
	});

})