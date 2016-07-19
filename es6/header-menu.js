'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

let jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

(function($) {

	 $(document).ready(function () {
	 	//extend date object to add days to date
 		Date.prototype.addDays = function(days) {
    	let dat = new Date(this.valueOf());
    	dat.setDate(dat.getDate() + days);
    	return dat;
		}

				function changeWidth () {
				let widestBlock = 0;
				$('.menu-block').each(function () {
					if ($(this).width() > widestBlock) {
						widestBlock = $(this).width();
					}
				});
				
				$('.menu-block').each(function () {
					$(this).width(widestBlock);
				});
			}

			$.get('/sitestyle', function(siteStyle) {

			})
			.then(function(siteStyle) {
				$.get('/events', function (data) {

					let upperGrayMenu = `<!-- Begin upper purple menu -->
					<div class="menu-overlay hamburger-menu social-icons">
					<!-- Begin Mobile "Hamburger Menu" -->
						<div class="float-right mobileHamburgerIcon">
							<i class="fa fa-bars fa-3x hamburger-icon"></i>
						</div>
					</div>
					<div class="hidden-div" style="display: none">
						<ul class="hamburger-menu">
							<li class="mobile-menu"><a href="/"><span class="home">Home</span></a></li>
							<li class="mobile-menu"><a href="/future-events"><span>Find an Event</a></span></a></li>
							<li class="mobile-menu"><a href="/latest-news"><span>Get the Latest</span></a></li>
							<li class="mobile-menu"><a href="/meet-the-team"><span>Meet the Team</a></span></a></li>
							<li class="mobile-menu"><a href="/past-events"><span>Past Events</span></a></li>
						</ul>
					</div>
					<!-- End "Hamburger" Menu -->
					<!-- End upper purple upper menu -->
					<!-- begin Gray Desktop Main menu -->
		 			<nav class="grid flex desktop-menu gray-menu" id="mainNav">
		 				<div><a id="navMenuBeginning" class="skipNavigation" href="#eventNavigationMenu">Skip to Event Menu</a></a></div>
		 				<div><a class="skipNavigation" href="#beginningOfContent">Skip to Main Content</a></a></div>
		 				<div><a class="skipNavigation" href="#footerStartMenuItem">Skip to Footer</a></a></div>
						<div class="col_2 center-block">
							<div class="col_2 center-block menu-block home-menu-button"><a href="/">Home</a></div>
						</div>
							<div class="col_2 center-block">
								<div class="col_2 center-block menu-block upcominEventsBlock"><a href="/future-events">Find an Event</a></div>
							</div>
						<div style="display: none;">
						</div>
						<div class="col_2 center-block">
							<div class="col_2 center-block menu-block latest-news-menu-block"><a href="/latest-news">Get the Latest</a></div>
						</div>
						<div class="col_2 center-block">
							<div class="col_2 center-block menu-block meet-the-team-menu-block"><a href="/meet-the-team">Meet the Team</a></div>
						</div>
						<div class="col_2 center-block">
							<div class="col_2 center-block menu-block past-events-header-menu-block"><a href="/past-events">Past Events</a></div>
						</div>
					</nav>
					<!-- End gray desktop menu -->`;
		
					let purpleMenu = `<section id="headerImage" class="mobileWrapper"></section>
					<!-- Begin purple desktop menu -->
					<nav class="menu-overlay desktop-menu flex clearfix">
						<div class="col_12 purpleEventMenu"></div>
					</nav>
					<!-- End Purple desktop menu -->`;
					let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		 			let pathname = window.location.pathname;
		 			let $grayMenu = $('#grayMenu');
		 			let $purpleMenuDiv = $('#purpleMenu');
		 			let $homepageSliderSection = $('#homepageSliderSection');
					let currentHeader;
					let todaysDate = new Date();				
					let headerBackgroundColor = `<nav class="menu-overlay desktop-menu flex clearfix" style="background-color:#6FB06E;">`;
					let hamburgerMenu = `<div class="menu-overlay hamburger-menu social-icons" style="background-color:#6FB06E;">`;
					let homepageImage = `<ul class="slideshow">`;
					let theHiddenDiv = `<div class="hidden-div" style="display: none; background-color: #6FB06E">`;
					let upcomingPurpleMenu = '<div class="col_12 purpleEventMenu">';
			 		let imageCount = 0;
			 		//add filler text to menu if there are no upcoming events scheduled
			 		if (data.length <= 0) {
			 			upcomingPurpleMenu += 'Welcome to Microsoft Interop Events';
			 		}
			 		//if there is an event returned set the currrent header 
			 		if (data.length > 0) {
						//if the next upcoming event starts after today assign it to be the homepage header, otherwise assign it to the next event
						if ((new Date(data[0].eventStartDate) >= todaysDate || (data[0].eventStartDate === 'TBD' && data.length <= 1)) && data[0].eventHomepageImage) {
							currentHeader = data[0];
						} else if (data[1] && data[1].eventHomepageImage) {
							currentHeader = data[1];
						}
			 			if (currentHeader) {
				 			//set the menu background color
				 			headerBackgroundColor = `<nav class="menu-overlay desktop-menu flex clearfix" style="background-color:${currentHeader.eventHighlightColor};">`;
							hamburgerMenu = `<div class="menu-overlay hamburger-menu social-icons" style="background-color:${currentHeader.eventHighlightColor};">`;
							theHiddenDiv = `<div class="hidden-div" style="display: none; background-color: ${currentHeader.eventHighlightColor}">`;
							
			 				
			 			}
			 			//count the number of homepage images
			 			for (let i = 0, j = data.length; i < j; i++) {
			 				if (data[i].eventHomepageImage) {
			 					imageCount++;
			 				}
			 			}
			 		}
			 		//if there is more than one event returned, create the slider
					if (data.length > 1) {
						data.sort(function (a, b) {
          	  if (a.eventStartDate === 'TBD' || new Date(a.eventStartDate).toString() === new Date(new Date().getFullYear().toString()).addDays(1).toString()) {
          	    let tmpDate = new Date();
          	    tmpDate.setMonth(11, 31);
          	    a = tmpDate;
          	  } else {          	  	
          	  	a = new Date(a.eventStartDate);
          	  }
          	  if (b.eventStartDate === 'TBD' || new Date(b.eventStartDate).toString() === new Date(new Date().getFullYear().toString()).addDays(1).toString()) {
          	    let tmpDate = new Date();
          	    tmpDate.setMonth(11, 31);
          	    b = tmpDate;
          	  } else {
          	  	b = new Date(b.eventStartDate);
          	  }
          	  if (a > b) {
          	    return 1;
          	  }
          	  if (a < b) {
          	    return -1;
          	  }
          	  if (a === b) {
          	    return 0;
          	  }
          	});
						//add the past events header if it's set to true
						if (siteStyle.showPastEventsBanner && siteStyle.showSlider) {
							homepageImage += `<li><a title="past event link" class="homepageHeaderAnchor" tabindex="0" role="navigation" href="/past-events"><section id="headerImage" class="mobileWrapper"><img alt="past events header" style="width:100%; margin: 0 0 0 0; padding: 0 0 0 0;" src="../uploads/past-events-banner.jpg" /></section></a></li>`;
						}

						$(data).each(function (i, elem) {
							let startDate;
							let startYear;
							let startMonth;
					 		let city;
							let cityArr = elem.eventLocation.split('_');
							for (let index = 0, j = cityArr.length; index < j; index++) {
								cityArr[index] = cityArr[index].charAt(0).toUpperCase() + cityArr[index].slice(1);
							}

							city = cityArr.join(' ');

							if (elem.eventStartDate === 'TBD') {
								startYear = 'TBD';
								startMonth = '';
							} else {
								startDate = new Date(elem.eventStartDate);
								startYear = startDate.getFullYear();
								startMonth = months[startDate.getMonth()] + ',';
							}
							//check to see if date is Dec 31, which means no month was included with date, so remove it and increment the year
							if (startDate !== undefined && startDate.getMonth() === 0 && startDate.getDate() === 1) {
								startYear = startDate.getFullYear();
								startMonth = '';
							}
							if (i < data.length - 1) {
								upcomingPurpleMenu += '<a id="eventNavigationMenu" role="navigation" href="/' + elem.eventUrl + '">' + city + '&nbsp-&nbsp<span class="purpleSubMenu">' + startMonth + '&nbsp' + startYear + '</span></a>| ';
							}
							if (i >= data.length - 1) {
								upcomingPurpleMenu += '<a role="navigation" href="/' + elem.eventUrl + '">' + city + '&nbsp-&nbsp<span class="purpleSubMenu">' + startMonth + '&nbsp' + startYear + '</span></a>';

							}
							//if there is a homepage image, add it to the slider
							if (imageCount > 1 && elem.eventHomepageImage && siteStyle.showSlider) {
								homepageImage += `<li><a title="new event link" class="homepageHeaderAnchor" tabindex="0" role="navigation" href="${elem.eventUrl}"><img alt="home page banner" src="uploads/${elem.eventHomepageImage}" /></a></li>`;
							}

						});
						//if there are multiple images, close the slider <ul> and add the necessary js packages from lib
						if (imageCount > 1 || (siteStyle.showPastEventsBanner && imageCount >= 1)) {
							homepageImage += '</ul><script type="text/javascript" src="../lib/kickstart.js"></script><script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5660d6c488a1a100" async="async"></script>';
						}
						
					} 
					//if there is only one event returned, make it a static image on the homepage
					if (imageCount === 1 || data.length <= 1 || siteStyle.showSlider === false) {
						let eventCity;
						let eventCityArr = data[0].eventLocation.split('_');
						let eventStartYear;
						let eventStartMonth;
						let theStartDate;
						if (data[0].eventStartDate === 'TBD') {
								eventStartYear = 'TBD';
								eventStartMonth = '';
							} else {
								theStartDate = new Date(data[0].eventStartDate);
								eventStartYear = theStartDate.getFullYear();
								eventStartMonth = months[theStartDate.getMonth()] + ',';
							}

						for (let i = 0, j = eventCityArr.length; i < j; i++) {
							eventCityArr[i] = eventCityArr[i].charAt(0).toUpperCase() + eventCityArr[0].slice(1);
						}
						eventCity = eventCityArr.join(' ');
						//if there is a hompepage image create the homepage image style
						if (data[0] && data[0].eventHomepageImage) {
							homepageImage = `<a title="new event link" class="homepageHeaderAnchor" tabindex="0" role="navigation" href="/${data[0].eventUrl}"><section id="headerImage" class="mobileWrapper"><img alt="home page banner" style="width:100%; margin: 0 0 0 0; padding: 0 0 0 0;" src="../uploads/${data[0].eventHomepageImage}" /></section></a>`;
						}
						headerBackgroundColor = `<nav class="menu-overlay desktop-menu flex clearfix" style="background-color:${data[0].eventHighlightColor};">`;
						//if there is only one event create the menu
						if (data.length === 1 ) {
							upcomingPurpleMenu += `<a href="/${data[0].eventUrl}">${eventCity}&nbsp-&nbsp<span class="purpleSubMenu">${eventStartMonth}&nbsp${eventStartYear}</span></a>`;
							
						}
					} 
					//if there are no images, use the backup homepage image
					if (!imageCount || (siteStyle.showPastEventsBanner && !siteStyle.showSlider && siteStyle.hideEventBanners)) {
						homepageImage = `<a class="homepageHeaderAnchor" title="past events link" tabindex="0" role="navigation" href="/past-events"><section id="headerImage" class="mobileWrapper"><img alt="past events header" style="width:100%; margin: 0 0 0 0; padding: 0 0 0 0;" src="../uploads/past-events-banner.jpg" /></section></a>`;
					}
					upcomingPurpleMenu += '</div>';

					purpleMenu = purpleMenu.replace('<nav class="menu-overlay desktop-menu flex clearfix">', headerBackgroundColor).replace('<div class="col_12 purpleEventMenu"></div>', upcomingPurpleMenu);
					upperGrayMenu = upperGrayMenu.replace('<div class="menu-overlay hamburger-menu social-icons">', hamburgerMenu).replace('<div class="hidden-div" style="display: none">', theHiddenDiv);
					
					let purpleMenuHtml = $.parseHTML(purpleMenu);
					let upperGrayMenuHtml = $.parseHTML(upperGrayMenu);
					$grayMenu.html(upperGrayMenuHtml);
					$purpleMenuDiv.html(purpleMenuHtml);
					$homepageSliderSection.html(homepageImage);
					
					//declare jQuery variables after menu has been rendered to the DOM
				 	let $homeMenuButton = $('.home-menu-button');
				 	let $upcominEventsBlock = $('.upcominEventsBlock');
				 	let $latestNewsMenuBlock = $('.latest-news-menu-block');
				 	let $meetTheTeamMenuBlock = $('.meet-the-team-menu-block');
				 	let $pastEventsHeaderMenuBlock = $('.past-events-header-menu-block');
				 	let $hiddenDiv = $('.hidden-div');
				 	let $hamburgerMenu = $('.hamburger-menu');
				 	let $mobileWrapper = $('.mobileWrapper');
				 	let $hamburgerIcon = $('.hamburger-icon');
				 	let $feedbackBlockWrapper = $('#feedbackBlockWrapper');
				 	let $headerImage = $('#headerImage');
				 	let $headerImageTitleBox = $('.headerImageTitleBox');
				 	let $skipNavigation = $('.skipNavigation');

				 	//make skip menu parent width 100% on focus
					$skipNavigation.on('focus', function() {
						$(this).parent().css('width', '100%').css('display', 'inline-block');
						$(this).css('margin-left', '45%');
					});
					$skipNavigation.on('blur', function() {
						$(this).parent().css('width', 'auto').css('display', 'inline');
					})

					//highlight currently selected menu item
					if (pathname === '/') {
						$homeMenuButton.addClass('current-page');
					}
					if (pathname === '/future-events') {
						$upcominEventsBlock.addClass('current-page');
					}
					if (pathname === '/latest-news') {
						$latestNewsMenuBlock.addClass('current-page');
					}
					if (pathname === '/meet-the-team') {
						$meetTheTeamMenuBlock.addClass('current-page');
					}
					if (pathname === '/past-events') {
						$pastEventsHeaderMenuBlock.addClass('current-page');
					}

					//make mobile menu slide in from side when it's pressed and back when anywhere else is pressed
					$hamburgerMenu.click(function () {
						$hiddenDiv.animate({width: 'toggle'});
						$mobileWrapper.toggleClass('grayedOut');
						$hamburgerIcon.toggleClass('rotate-90');
					});
					$mobileWrapper.click(function (e) {
						if ($hiddenDiv.is(':visible') && e.target !== $hiddenDiv) {
							$hiddenDiv.animate({width: 'toggle'});
							$mobileWrapper.toggleClass('grayedOut');
							$hamburgerIcon.toggleClass('rotate-90');
						}
					});
					
					//if it isn't the homepage or the window is less than 768px, hide the frontpage image
					if (pathname !== '/') {
						$feedbackBlockWrapper.hide();
						$headerImage.hide();
						$headerImageTitleBox.hide();
					}

				});		
			})

	 });
})(jQuery);
