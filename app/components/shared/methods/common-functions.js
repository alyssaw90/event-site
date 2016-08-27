'use strict';

const jQuery =  require('jquery');

//Logout function
//Submits an invalid authentication header, causing the user to be 'logged out'
export let logout = function() {
	Cookies.set('token', 'not a token');
  jQuery.ajax({
    type: 'post',
    url: '../auth/login',
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

//determines if user is in high-contrast mode and set needed css
export let highContrast = () => {

	setTimeout(function() {
		let pathname = window.location.pathname;

		//inject div with background image in to dom to use for high-contrast check
		let hcDetect = jQuery(`<div id="jQHighContrastDetect"></div>`).css('background', 'url(app/uploads/Microsoft-logo_rgb_c-wht-small.png)');
		//get the html tags
		let htmlTag = document.getElementsByTagName('html');
		//append the high-contrast check div to the body
		hcDetect.appendTo(document.body);
		//if the hcDetect element doesn't have a background image (edge, ie, firefox) or there is no 'hc' tag on the 'html' (chrome) append the high-contrast css and fixes
		if (hcDetect.css('background-image') === 'none' || htmlTag[0].getAttribute('hc') !== null) {

			jQuery('head').append('<link rel="stylesheet" href="../css/highcontrast.min.css" type="text/css" media="all">');
				//switch email icon to be visible in high-contrast mode
				jQuery('#emailIcon').attr('src', 'data:image/png;base64,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/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAwBQTFRFtbW1/v7+wcHBCQkJd3d3YmJi/f783d3d+Pn46urq7vDuwMDA3d7c7+/vKysrKioq2NjYKCgobGxsqampbm5uHx8fVVZVvb69VlZWl5eXFxgWBwcHHh4dSkpKa2trcXFxNzc3GBgX0tLRenp6y8vL9PT0TE1KQkNCsrKy9vb2WlpaVVRWm5ya9fX1IiIiWFhYExMTAQEBPj4+s7WyIyMiPz8/NDQ0TE1LpKSkgYGBiIiI6enp8PDws7Sys7OxDw8PAAAA////AAAAvLy8u7u7urq6ubm5uLi4t7e3tra2tbW1tLS0s7OzsrKysbGxsLCwr6+vrq6ura2trKysq6urqqqqqampqKiop6enpqampaWlpKSko6OjoqKioaGhoKCgn5+fnp6enZ2dnJycm5ubmpqamZmZmJiYl5eXlpaWlZWVlJSUk5OTkpKSkZGRkJCQj4+Pjo6OjY2NjIyMi4uLioqKiYmJiIiIh4eHhoaGhYWFhISEg4ODgoKCgYGBgICAf39/fn5+fX19fHx8e3t7enp6eXl5eHh4d3d3dnZ2dXV1dHR0c3NzcnJycXFxcHBwb29vbm5ubW1tbGxsa2trampqaWlpaGhoZ2dnZmZmZWVlZGRkY2NjYmJiYWFhYGBgX19fXl5eXV1dXFxcW1tbWlpaWVlZWFhYV1dXVlZWVVVVVFRUU1NTUlJSUVFRUFBQT09PTk5OTU1NTExMS0tLSkpKSUlJSEhIR0dHRkZGRUVFREREQ0NDQkJCQUFBQEBAPz8/Pj4+PT09PDw8Ozs7Ojo6OTk5ODg4Nzc3NjY2NTU1NDQ0MzMzMjIyMTExMDAwLy8vLi4uLS0tLCwsKysrKioqKSkpKCgoJycnJiYmJSUlJCQkIyMjIiIiISEhICAgHx8fHh4eHR0dHBwcGxsbGhoaGRkZGBgYFxcXFhYWFRUVFBQUExMTEhISEREREBAQDw8PDg4ODQ0NDAwMCwsLCgoKCQkJCAgIBwcHBgYGBQUFBAQEAwMDAgICAQEBAAAAAGbpMAAAAEN0Uk5T////////////////////////////////////////////////////////////////////////////////////////AEFiBO8AAAgwSURBVHgBACAI3/cAQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCAEJAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQgBCQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEIAQkBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBCAEJAQEBBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQEBAQgBCQEBAQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUBAQEIAQkBAQEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFAQEBCAEJAQEBBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQEBAQgBCN0BAQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUBAN0IAQkAvQEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFAL0BCAEJAQCpBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBKkBAQgBCQEBAGEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBGEBAQEIAQkBAQEARGUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUEZEUBAQEBCAEJAQEBAQEA5EEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQRA5QEBAQEBAQgBCK0BAQEBAQDAiQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQSIwQEBAQEBAK0IAQkBAGkBAQEBAIT4BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBAT0hQEBAQEAaQEBCAEJAQEAVQEBAQEBAJwhBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBCCdAQEBAQEAVQEBAQgBCQEBAOyxAQEBAQEA0OkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBOjRAQEBAQEAsO0BAQEIAQkBAQEFBOCZAQEBAQEAEJEFBQUFBQUFBQUFBQUFBQUFBQUEkBEBAQEBAQCY4QUFAQEBCAEJAQEBBQUFBBUBAQEBAQAMLAUFBQUFBQUFBQUFBQUFBQQELA0BAQEBAQAVBQUFBQEBAQgBCQEBAQUFBQUEULkBAQEBAMTUpQUFBQUFBQUFBQUFBQSk1MUBAQEBALhRBQUFBQUBAQEIAQkBAQEFBQUFBQQkOQEBAQEBANgpBQUFBQUFBQUFBQQo2QEBAQEBADglBQUFBQUFAQEBCAEJAQEBBQUFBQUFBDRNAQEBAQEAcBEFBQUFBQUFBQQQcQEBAQEBAEw1BQUFBQUFBQEBAQgBCQEBAQUFBQUFBQUFBKBZAQEBAQEASAkFBQUFBAhJAQEBAQEAWKEFBQUFBQUFBQUBAQEIAQkBAQEFBQUFBQUFBQUFBH0BAQEBAQEAdBzwHHUBAQEBAQEAfQUFBQUFBQUFBQUFAQEBCAEJAQEBBQUFBQUFBQUFBQUEjD0BAQEBAQAM/A0BAQEBAQA8jQUFBQUFBQUFBQUFBQEBAQgBCQEBAQUFBQUFBQUFBQUFBQSUgQEBAQEBAQEBAQEBAQCAlQUFBQUFBQUFBQUFBQUBAQEIAQkBAQEFBQUFBQUFBQUFBQUFBLTMbQEBAQEBAQEBAGzMtQUFBQUFBQUFBQUFBQUFAQEBCAEJAQEBBQUFBQUFBQUFBQUFBQUFBAh4yQEBAQEAyHgJBQUFBQUFBQUFBQUFBQUFBQEBAQgBCQEBAQUFBQUFBQUFBQUFBQUFBQUFBQQAAAAAAQUFBQUFBQUFBQUFBQUFBQUFBQUBAQEIAQkBAQEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFAQEBCAEJAQEBBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQEBAQgBCQEBAQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUBAQEIAQkBAQEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFAQEBCAEJAQEBBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQEBAQgBCQEBAQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUBAQEIAQkBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBCAEJAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQgBCQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEIAQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCAQAA//9sIPH8FOtDcwAAAABJRU5ErkJggg==');
				//highlight currently selected menu item
				// jQuery('.menu-block').removeClass();
				if (pathname === '/') {
					jQuery('.home-menu-button').find('a').css({
						'box-shadow': '0 0 7px #6DB9FF',
						border: '4px dotted #50B1FE'
					});
				}
				if (pathname === '/future-events') {
					jQuery('.upcominEventsBlock').find('a').css({
						'box-shadow': '0 0 7px #6DB9FF',
						border: '4px dotted #50B1FE'
					});
				}
				if (pathname === '/latest-news') {
					jQuery('.latest-news-menu-block').find('a').css({
						'box-shadow': '0 0 7px #6DB9FF',
						border: '4px dotted #50B1FE'
					});
				}
				if (pathname === '/meet-the-team') {
					jQuery('.meet-the-team-menu-block').find('a').css({
						'box-shadow': '0 0 7px #6DB9FF',
						border: '4px dotted #50B1FE'
					});
				}
				if (pathname === '/past-events') {
					jQuery('.past-events-header-menu-block').find('a').css({
						'box-shadow': '0 0 7px #6DB9FF',
						border: '4px dotted #50B1FE'
					});
				}
				
		}
	}, 400)
}

//shuffle function

export const shuffle = (arr) => {
  let currentIndex = arr.length, tempVal, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    tempVal = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = tempVal;
  }

  return arr;
}

//success and error handlers for angular REST resources

export const handleError = (callback) => {
  return function (data) {
    console.log(data);
    callback(data);
  }
};

export const handleSuccess = (callback) => {
  return function (data) {
    callback(null, data);
  }
};

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

//URlify a string

export const urlify = (str) => {
	return str.trim().replace(/\s+/g, '').replace(/[^\w\s]|_/g, '').toLowerCase();
}

//function to set divs with equal height
export const changeHeight = function(div) {
	jQuery(div).css('height','auto');
	var tallestBlock = 0;
	jQuery(div).each(function () {
		if (jQuery(this).height() > tallestBlock) {
			tallestBlock = jQuery(this).height();
		}
	});

	jQuery(div).each(function () {
		jQuery(this).height(tallestBlock);
	});
}

export const parseToHtml = (str) => {
	return jQuery.parseHTML(str);
}

// function to set divs with equal width
export let changeWidth = function(div) {
	var widestBlock = 0;
	jQuery(div).css('width','auto');
	jQuery(div).each(function () {
		if (jQuery(this).width() > widestBlock) {
			widestBlock = jQuery(this).width();
		}
	});

	jQuery(div).each(function () {
		jQuery(this).width(widestBlock);
	});
}
	//function to add and remove CSS properties depending on screen size

	export let addCSS = function(changeWidth, div, cssPropKey, smallScreenVal, largeScreenVal) {
		if (jQuery(window).width() < changeWidth) {
			div.css(cssPropKey, smallScreenVal);
		}
		if (jQuery(window).width() > changeWidth) {
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
