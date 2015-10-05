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

	//function to set divs with equal height
	function changeHeight (div) {
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

	// function to set divs with equal width
	function changeWidth (div) {
		var widestBlock = 0;
		div.each(function () {
			if ($(this).width() > widestBlock) {
				widestBlock = $(this).width();
			}
		})

		div.each(function () {
			$(this).width(widestBlock);
		})
	}

	$(window).load(changeWidth($('.menu-block')));
	$(window).resize(changeWidth($('.menu-block')));

	$('.expanding-menu').hover(function () {
		var $menuHeight = $(this).parent().height();
 		var $menuWidth  = $('.upcoming-menu').width();
 		// $('.upcoming-sub-menu:first').css('margin-top', $menuHeight);
 		$('.expanding-menu').css({'height': $menuHeight, 'width': $menuWidth})
 		$('.expanding-menu').height($menuHeight);
 		$('.expanding-menu').width($menuWidth);
 		$('.upcoming-sub-menu').slideDown('fast');
		$('.upcoming-sub-menu').css('display', 'inline');
		},
		function () {
			$('.upcoming-sub-menu').slideUp('fast');
		}
	);

	$(window).resize(changeHeight($('.event_block')));
	$(window).load(changeHeight($('.event_block')));
	$(window).resize(changeHeight($('.past_events')));
	$(window).load(changeHeight($('.past_events')));

	//make individual-homepage-expert divs wait for entire page to load before firing
	$(window).bind('load', function(){
	$(window).resize(changeHeight($('.individual-homepage-expert')));
	$(window).load(changeHeight($('.individual-homepage-expert')));
	
	})
	//make mobile menu slide up and down when it's pressed

	$('.hamburger-menu').click(function () {
		// $('.mobile-menu:first').toggleClass('add-space');
  	if ($('.hidden-div').is(':hidden')) {
  	  $('.hidden-div').slideDown('slow');
  	  $('.menu-overlay').css('height', '100%');
  	} else {
  	  $('.hidden-div').slideUp('slow');
  	  $('.menu-overlay').css('height', '');
  	}
	});

	//make past events buttons and homepage content full width on mobile

	function fullWidthMobile(div) {
		if ($(window).width() < 768) {
			div.addClass('flex');
		}
		if ($(window).width() > 768) {
			div.removeClass('flex');
		}
		
	}

	$(window).resize(fullWidthMobile($('.past-events-menu')));
	$(window).load(fullWidthMobile($('.past-events-menu')));
	$(window).resize(fullWidthMobile($('.main-page-content')));
	$(window).load(fullWidthMobile($('.main-page-content')));

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

	//function to add and remove CSS properties depending on screen size

	function addCSS(changeWidth, div, cssProp, smallScreenVal, largeScreenVal) {
		if ($(window).width() < changeWidth) {
			div.css(cssProp, smallScreenVal);
		}
		if ($(window).width() > changeWidth) {
			div.css(cssProp, largeScreenVal);
		}
		
	}

	//hide slider on screens larger than 768px
	$(window).load(addCSS(768, $('.slider'), 'display', 'none', 'inline'));
	$(window).resize(addCSS(768, $('.slider'), 'display', 'none', 'inline'));

	//make bottom button scroll to top
	$('.scroll-button .fa-chevron-up').click( function() {
   $('html, body').animate({ scrollTop: 0 }, 'fast');
 	});

 	// make clickable map have correct coordinates when resized

 	$('img[usemap]').rwdImageMaps();

 	//position tooltips on map

 	var locateTip = function (e) {
 		console.log('X posion : ', e.pageX, 'Y position : ', e.pageY);
		$('#tiptip_holder').css('margin-top', (e.pageY - 100));
  	$('#tiptip_holder').css('margin-left', (e.pageX - 100));
  	$('#tiptip_holder').css('max-width', '100%');
  	$('#tiptip_arrow').css('display', 'none');
 	}

 	$('.pointer').hover(locateTip);
 	
})
