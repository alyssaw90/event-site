'use strict';

const jQuery =  require('jquery');
const $ = jQuery;
//Logout function
//Submits an invalid authentication header, causing the user to be 'logged out'
export let logout = function() {
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
	    alert('Error logging off!')
	})
	//Likewise, a failure *usually* means we succeeded.
	//set window.location to redirect the user to wherever you want them to go
	.fail(function(){
	    window.location = '/thankyou';
	});
}

//Finds y value of given object
export let findPos = function(obj) {
  var curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while (obj == obj.offsetParent);
  return curtop;
  }
}

//make footer stick to bottom of content or page, whichever is taller.
export let stickyFooter = function() {
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
export let homepageStickyFooter = function() {
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
export let changeHeight = function(div) {
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
export let changeWidth = function(div) {
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

	export let addCSS = function(changeWidth, div, cssPropKey, smallScreenVal, largeScreenVal) {
		if ($(window).width() < changeWidth) {
			div.css(cssPropKey, smallScreenVal);
		}
		if ($(window).width() > changeWidth) {
			div.css(cssPropKey, largeScreenVal);
		}

	}

//function to show and hide past event tables on past events page
export let showCalendarOfPastEvents = function(calendarHtml, divClicked, calendarDiv) {
    if (divClicked.hasClass('selected-year')) {
      calendarDiv.empty();
    } else {
      calendarDiv.empty();
      calendarDiv.append(calendarHtml);
    }
    divClicked.siblings().removeClass('selected-year');
  	divClicked.toggleClass('selected-year');
}

//function to get key code
export let getKeyCode = function(e) {
	let keyCode;
	//get key code
	if (e.keyCode) {
		keyCode = e.keyCode;
	} else {
		keyCode = e.which;
	}
	return keyCode;
}		
