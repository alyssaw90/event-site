'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

let jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

(function($) {

	 $(document).ready(function () {

				function changeWidth () {
				let widestBlock = 0;
				$('.menu-block').each(function () {
					if ($(this).width() > widestBlock) {
						widestBlock = $(this).width();
					}
				});
				
				$('.menu-block').each(function () {
					$(this).width(widestBlock);
					$(this).css('background-color', 'red');
				});
			}

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
	 			<nav class="grid flex desktop-menu gray-menu">
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
				<nav class="menu-overlay desktop-menu flex">
					<div class="col_12 purpleEventMenu"></div>
				</nav>
				<!-- End Purple desktop menu -->`;
				let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	 			let pathname = window.location.pathname;
	 			let $grayMenu = $('#grayMenu');
	 			let $purpleMenuDiv = $('#purpleMenu');
				//if the next upcoming event starts after today assign it to be the homepage header, otherwise assign it to the next event
				let currentHeader;
				let todaysDate = new Date();				
				if (new Date(data[0].eventStartDate) >= todaysDate) {
					currentHeader = data[0];
				} else {
					currentHeader = data[1];
				}
				let headerBackgroundColor = `<nav class="menu-overlay desktop-menu flex" style="background-color:${currentHeader.eventHighlightColor};">`
				let hamburgerMenu = `<div class="menu-overlay hamburger-menu social-icons" style="background-color:${currentHeader.eventHighlightColor};">`
				let theHomepageSlider = `<ul class="slideshow">`;
				let theHiddenDiv = `<div class="hidden-div" style="display: none; background-color: ${currentHeader.eventHighlightColor}">`
				let upcomingPurpleMenu = '<div class="col_12 purpleEventMenu">';
			 	/*let $header = $('header');
				let headerImage = '<a href="/' + currentHeader.eventUrl + '"><section id="headerImage" class="mobileWrapper"><img style="width:100%; margin: 0 0 0 0; padding: 0 0 0 0;" src="../uploads/' + currentHeader.eventHomepageImage + '" /></section></a>';
				let startDate = new Date(data[0].eventStartDate);
				let endDate = new Date(data[0].eventEndDate);
				let headerImage = '<a href="/' + data[0].eventUrl + '"><section class="headerImageTitleBox" style="background-color:' + data[0].eventHighlightColor + '; opacity: .8;">' + '<h1>' + data[0].eventName + '</h1><h1>' + months[startDate.getMonth()] + ' ' + startDate.getDate() + ' - ' + endDate.getDate() + ', ' + endDate.getFullYear() + '</h1></section></a><section id="headerImage" class="mobileWrapper"><img style="width:100%; margin: 0 0 0 0; padding: 0 0 0 0;" src="../uploads/' + data[0].eventHomepageImage + '" /></section>'; //section commmented out to remove db rendered title box*/

				$(data).each(function (i, elem) {
					let startDate = new Date(elem.eventStartDate);
					let cityArr = elem.eventLocation.split('_');
					for (let i = 0, j = cityArr.length; i < j; i++) {
						cityArr[i] = cityArr[i].charAt(0).toUpperCase() + cityArr[i].slice(1);
					}

			 		let city = cityArr.join(' ');
					if (i < data.length - 1) {
						upcomingPurpleMenu += '<a href="/' + elem.eventUrl + '">' + city + '&nbsp-&nbsp<span class="purpleSubMenu">' + months[startDate.getMonth()] + ',&nbsp' + startDate.getFullYear() + '</span></a>| ';
					}
					if (i >= data.length - 1) {
						upcomingPurpleMenu += '<a href="/' + elem.eventUrl + '">' + city + '&nbsp-&nbsp<span class="purpleSubMenu">' + months[startDate.getMonth()] + ',&nbsp' + startDate.getFullYear() + '</span></a>';

					}

				});
				upcomingPurpleMenu += '</div>';

				purpleMenu = purpleMenu.replace('<nav class="menu-overlay desktop-menu flex">', headerBackgroundColor).replace('<div class="col_12 purpleEventMenu"></div>', upcomingPurpleMenu);
				upperGrayMenu = upperGrayMenu.replace('<div class="menu-overlay hamburger-menu social-icons">', hamburgerMenu).replace('<div class="hidden-div" style="display: none">', theHiddenDiv);
				// let headerMenu = $.parseHTML(menu);
				// $header.prepend(headerMenu);
				let purpleMenuHtml = $.parseHTML(purpleMenu);
				let upperGrayMenuHtml = $.parseHTML(upperGrayMenu);
				$grayMenu.html(upperGrayMenuHtml);
				$purpleMenuDiv.html(purpleMenuHtml);
				$.get('/events', function(data) {
					for (let i = 0, j = data.length; i < j; i++) {
						theHomepageSlider += `<li><a href="${data[i].eventUrl}"><img src="uploads/${data[i].eventHomepageImage}" /></a></li>`;
						
					}
					theHomepageSlider += '</ul><script type="text/javascript" src="../lib/kickstart.js"></script><script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5660d6c488a1a100" async="async"></script>';
					$('#homepageSliderSection').html(theHomepageSlider);

				});

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
	 });
})(jQuery);

