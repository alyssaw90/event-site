'use strict';
/*global $ */
/*global document */
/*global window */

/*Global Functions*/

	//make footer stick to bottom of content or page, whichever is taller.

function stickyFooter () {
	var $body = $('body');
	var $window = $(window);
	var $document = $(document);
	var $footer = $('.foot');
	var $backToTopButton = $('.scroll-button .fa-chevron-up');
	// alert('fucking footers');
  if ($window.height() >= $document.height()) {
    $backToTopButton.hide();
    $footer.css('position', 'absolute').css('bottom', 0);
  }

  if ($window.height() < $document.height()) {
  	$backToTopButton.show();
  	$footer.css('position', 'relative');
  }
}

//function to set divs with equal height
function changeHeight (div) {
	// var $eventBlock = $('.event_block');
	var tallestBlock = 0;
	div.each(function () {
		if ($(this).height() > tallestBlock) {
			tallestBlock = $(this).height();
		}
	});

	div.each(function () {
		$(this).height(tallestBlock);
	});
}

// function to set divs with equal width
function changeWidth (div) {
	var widestBlock = 0;
	div.each(function () {
		if ($(this).width() > widestBlock) {
			widestBlock = $(this).width();
		}
	});

	div.each(function () {
		$(this).width(widestBlock);
	});
}


$(document).ready(function () {
	var $body = $('body');
	var $footer = $('.foot');
	var $backToTopButton = $('.scroll-button .fa-chevron-up');
	var $travelUlLinks = $('.travelUlLinks');
	var $pastEvents = $('.past_events');
//make block slide up effect for upcoming event blocks -- moved to future-events.js
	$('.event_block').hover(
		function () {
		$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
		},
		function () {
			$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200);
		});


	//apply flip animation to social icons
/*	$('.social img').hover(function () {
		$(this).toggleClass('animated bounce');
	});*/

	/*$(window).load(changeWidth($('.menu-block')));
	$(window).resize(changeWidth($('.menu-block')));*/

	/*$('.expanding-menu').hover(function () {
		var $menuHeight = $(this).parent().height();
 		var $menuWidth  = $('.upcoming-menu').width();
 		// $('.upcoming-sub-menu:first').css('margin-top', $menuHeight);
 		$('.expanding-menu').css({'height': $menuHeight, 'width': $menuWidth});
 		$('.expanding-menu').height($menuHeight);
 		$('.expanding-menu').width($menuWidth);
 		$('.upcoming-sub-menu').slideDown('fast');
		$('.upcoming-sub-menu').css('display', 'inline');
		},
		function () {
			$('.upcoming-sub-menu').slideUp('fast');
		}
	);
*/
	$(window).resize(changeHeight($('.event_block')));
	$(window).load(changeHeight($('.event_block')));
	$(window).resize(changeHeight($('.past_events')));
	$(window).load(changeHeight($('.past_events')));

	//make individual-homepage-expert divs wait for entire page to load before firing
	$(window).bind('load', function(){
		$(window).resize(changeHeight($('.individual-homepage-expert')));
		$(window).load(changeHeight($('.individual-homepage-expert')));
		$(window).load(stickyFooter());
	
	});

	// 100% image width for homepage team members if parent is more than 165px wide

	//make mobile menu slide up and down when it's pressed

	/*$('.hamburger-menu').click(function () {
		alert('hello')
		// $('.mobile-menu:first').toggleClass('add-space');
  	if ($('.hidden-div').is(':hidden')) {
  	  $('.hidden-div').slideDown('slow');
  	  $('.menu-overlay').css('height', '100%');
  	} else {
  	  $('.hidden-div').slideUp('slow');
  	  $('.menu-overlay').css('height', '');
  	}
	});*/

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

		// if ($(window).height() < $(document).height()) {
		// 	$backToTopButton.hide();
		// 	// $footer.addClass('stick-footer');
		// }

	//function to add and remove CSS properties depending on screen size

	function addCSS(changeWidth, div, cssPropKey, smallScreenVal, largeScreenVal) {
		if ($(window).width() < changeWidth) {
			div.css(cssPropKey, smallScreenVal);
		}
		if ($(window).width() > changeWidth) {
			div.css(cssPropKey, largeScreenVal);
		}

	}

	//hide slider on screens larger than 768px
	$(window).load(addCSS(768, $('.slider'), 'display', 'none', 'inline'));
	$(window).resize(addCSS(768, $('.slider'), 'display', 'none', 'inline'));

	//make bottom button scroll to top
	$backToTopButton.click( function() {
   $('html, body').animate({ scrollTop: 0 }, 'fast');
 	});

 		// make return to previous page button
	$('.previous-page-button').click(function () {
		var oldURL = document.referrer;
		window.location = oldURL;
	});


 	//position tooltips on map

 	var locateTip = function (e) {
 		// console.log('X posion : ', e.pageX, 'Y position : ', e.pageY);
		$('#tiptip_holder').css('margin-top', (e.pageY - 100));
  	$('#tiptip_holder').css('margin-left', (e.pageX - 100));
  	$('#tiptip_holder').css('max-width', '100%');
  	$('#tiptip_arrow').css('display', 'none');
 	};

 	$('.pointer').hover(locateTip);

 	// find users using IE
 	(function () {
	 	var ms_ie = false;
	  var ua = window.navigator.userAgent;
	  var old_ie = ua.indexOf('MSIE ');
	  var new_ie = ua.indexOf('Trident/');
	  var openDiv = $.parseHTML('<div>');
	  var closeDiv = $.parseHTML('</div>');

	  if (old_ie > -1 || new_ie > -1) {
      ms_ie = true;
	  }

	  if (ms_ie) {
	      //IE specific code goes here
	      // $('main').removeClass('grid main-page-content');
	      // $('main').wrapInner('<div class="grid main-page-content"></div>')
	      // $('main').wrap('<div></div>');
	      // $('main').append(closeDiv);
	      // console.log('body width : ', $('body').width(), new_ie, 'test width: ', $('.test').width(), 'Footer width : ', $('footer').width(), 'header width : ', $('header').width());
	  }
 		
 	}());
 	
});
