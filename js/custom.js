'use strict';
/*global $ */
/*global document */
/*global window */
/*global Cookies*/
/*global alert*/

/*Global Functions*/

//Logout function
//Submits an invalid authentication header, causing the user to be 'logged out'
function logout() {
	Cookies.set('token', 'not a token');
  $.ajax({
    type: 'post',
    url: '/auth/login',
    dataType: 'json',
    async: true,
    username: 'not_a_real_username',
    password: 'not_a_real_password',
    data: '{ "comment" }'
  })
	//In our case, we WANT to get access denied, so a success would be a failure.
	.done(function(){
	    alert('Error logging off!');
	})
	//Likewise, a failure *usually* means we succeeded.
	//set window.location to redirect the user to wherever you want them to go
	.fail(function(){
	    window.location = '/thankyou';
	});
}

//Finds y value of given object
function findPos(obj) {
  var curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while (obj == obj.offsetParent);
  return curtop;
  }
}

//make footer stick to bottom of content or page, whichever is taller.
function stickyFooter () {
	var $window = $(window);
	var $document = $(document);
	var $footer = $('.foot');
	var $backToTopButton = $('.scroll-button');
  if ($window.height() <= $document.height()) {
  	$footer.css('position', 'relative');
  }
  if ($window.height() > $document.height()) {
    $footer.css('position', 'absolute').css('bottom', 0);
  }
	if ($window.height() < $document.height() - 200 && $window.width() < 768) {
  	$backToTopButton.show();
  }
  if ($window.height() > $document.height() - 200 || $window.width() >= 768) {
    $backToTopButton.hide();
  }

}

//special sticky footer for homepage that switches equals signs in the if statements
function homepageStickyFooter () {
	var $window = $(window);
	var $document = $(document);
	var $footer = $('.foot');
	var $backToTopButton = $('.scroll-button');

  if ($window.height() < $document.height()) {
  	$footer.css('position', 'relative');
  }
  if ($window.height() >= $document.height()) {
    $footer.css('position', 'absolute').css('bottom', 0);
  }
	if ($window.height() < $document.height() - 200 && $window.width() < 768) {
  	$backToTopButton.show();
  }
  if ($window.height() > $document.height() - 200 || $window.width() >= 768) {
    $backToTopButton.hide();
  }
}

//function to set divs with equal height
function changeHeight (div) {
	$(div).css('height','auto');
	var tallestBlock = 0;
	$(div).each(function () {
		if ($(this).height() > tallestBlock) {
			tallestBlock = $(this).height();
		}
	});

	$(div).each(function () {
		$(this).height(tallestBlock);
	});
}

// function to set divs with equal width
function changeWidth (div) {
	var widestBlock = 0;
	$(div).css('width','auto');
	$(div).each(function () {
		if ($(this).width() > widestBlock) {
			widestBlock = $(this).width();
		}
	});

	$(div).each(function () {
		$(this).width(widestBlock);
	});
}
	//function to add and remove CSS properties depending on screen size

	function addCSS (changeWidth, div, cssPropKey, smallScreenVal, largeScreenVal) {
		if ($(window).width() < changeWidth) {
			div.css(cssPropKey, smallScreenVal);
		}
		if ($(window).width() > changeWidth) {
			div.css(cssPropKey, largeScreenVal);
		}

	}

$(document).ready(function () {
	var $body = $('body');
	var $footer = $('.foot');
	var $backToTopButton = $('.scroll-button .fa-chevron-up');
	var $travelUlLinks = $('.travelUlLinks');
	var $pastEvents = $('.past_events');
	var $tiptip_holder = $('#tiptip_holder');
	var $tiptip_arrow = $('#tiptip_arrow');
	var $pointer = $('.pointer');

//make block slide up effect for upcoming event blocks -- moved to future-events.js
	$('.event_block').hover(
		function () {
		$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
		},
		function () {
			$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200);
		});

	//make external links open in new tabs
	$('a[href^="http"]').attr('target','_blank');

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
		$tiptip_holder.css('margin-top', (e.pageY - 100)).css('margin-left', (e.pageX - 100)).css('max-width', '100%');
  	$tiptip_arrow.css('display', 'none');
 	};

 	$pointer.hover(locateTip);

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

$(window).load(function() {
	changeHeight('.past_events');
	changeHeight('.individual-homepage-expert');
  stickyFooter();
  homepageStickyFooter();
});


$(window).resize(function(){
	changeHeight('.past_events');
	changeHeight('.individual-homepage-expert');
  stickyFooter();
  homepageStickyFooter();
});

