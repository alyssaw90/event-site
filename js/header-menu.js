'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

 $(document).ready(function () {
 	
 	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 	var pathname = window.location.pathname;
 	var feedbackArr = [{quote: 'I loved it!', author: 'John Doe'}, {quote: 'I adored it!', author: 'Jane Doe'}, {quote: 'I like it!', author: 'John Doe Jr.'}, {quote: 'I\'m hungry', author: 'Me'}];

 	var menu = '<!-- Begin upper purple menu -->\
		<div class="menu-overlay hamburger-menu social-icons">\
		<!-- Begin Mobile "Hamburger Menu" -->\
			<div class="float-right mobileHamburgerIcon">\
				<i class="fa fa-bars fa-3x hamburger-icon"></i>\
			</div>\
		</div>\
		<div class="hidden-div" style="display: none">\
			<ul class="hamburger-menu">\
				<li class="mobile-menu"><a href="/"><span class="home">Home</span></a></li>\
				<li class="mobile-menu"><a href="/future-events"><span>Find an Event</a></span></a></li>\
				<li class="mobile-menu"><a href="/latest-news"><span>Get the Latest</span></a></li>\
				<li class="mobile-menu"><a href="/meet-the-team"><span>Meet the Team</a></span></a></li>\
				<li class="mobile-menu"><a href="/past-events"><span>Past Events</span></a></li>\
			</ul>\
		</div>\
		<!-- End "Hamburger" Menu -->\
		<!-- End upper purple upper menu -->\
		<!-- begin Gray Desktop Main menu -->\
 		<nav class="grid flex desktop-menu gray-menu">\
			<div class="col_2 center-block">\
				<div class="col_2 center-block menu-block home-menu-button"><a href="/">Home</a></div>\
			</div>\
				<div class="col_2 center-block">\
					<div class="col_2 center-block menu-block upcominEventsBlock"><a href="/future-events">Find an Event</a></div>\
				</div>\
			<div style="display: none;">\
			</div>\
			<div class="col_2 center-block">\
				<div class="col_2 center-block menu-block latest-news-menu-block"><a href="/latest-news">Get the Latest</a></div>\
			</div>\
			<div class="col_2 center-block">\
				<div class="col_2 center-block menu-block meet-the-team-menu-block"><a href="/meet-the-team">Meet the Team</a></div>\
			</div>\
			<div class="col_2 center-block">\
				<div class="col_2 center-block menu-block past-events-header-menu-block"><a href="/past-events">Past Events</a></div>\
			</div>\
		</nav>\
		<!-- End gray desktop menu -->\
		<section id="headerImage" class="mobileWrapper"></section>\
		<!-- Begin purple desktop menu -->\
		<nav class="menu-overlay desktop-menu flex">\
			<div class="col_12 purpleEventMenu"></div>\
		</nav>\
		<!-- End Purple desktop menu -->';

			function changeWidth () {
			var widestBlock = 0;
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
		// console.log(data[0]);
			var startDate = new Date(data[0].eventStartDate);
			var endDate = new Date(data[0].eventEndDate);
			var upcomingPurpleMenu = '<div class="col_12 purpleEventMenu">';
			// var headerImage = '<a href="/' + data[0].eventUrl + '"><section class="headerImageTitleBox" style="background-color:' + data[0].eventHighlightColor + '; opacity: .8;">' + '<h1>' + data[0].eventName + '</h1><h1>' + months[startDate.getMonth()] + ' ' + startDate.getDate() + ' - ' + endDate.getDate() + ', ' + endDate.getFullYear() + '</h1></section></a><section id="headerImage" class="mobileWrapper"><img style="width:100%; margin: 0 0 0 0; padding: 0 0 0 0;" src="../uploads/' + data[0].eventHomepageImage + '" /></section>'; //section commmented out to remove db rendered title box
			var headerImage = '<a href="/' + data[0].eventUrl + '"><section id="headerImage" class="mobileWrapper"><img style="width:100%; margin: 0 0 0 0; padding: 0 0 0 0;" src="../uploads/' + data[0].eventHomepageImage + '" /></section></a>';
			var headerBackgroundColor = '<nav class="menu-overlay desktop-menu flex" style="background-color:' + data[0].eventHighlightColor + ';">';
			var hamburgerMenu = '<div class="menu-overlay hamburger-menu social-icons" style="background-color:' + data[0].eventHighlightColor + ';">';
		 	var $header = $('header');
			$(data).each(function (i, elem) {
				var startDate = new Date(elem.eventStartDate);
				if (i < data.length - 1) {
					upcomingPurpleMenu += '<a href="/' + elem.eventUrl + '">' + elem.eventLocation + '&nbsp-&nbsp<span class="purpleSubMenu">' + months[startDate.getMonth()] + ',&nbsp' + startDate.getFullYear() + '</span></a>| ';
				}
				if (i >= data.length - 1) {
					upcomingPurpleMenu += '<a href="/' + elem.eventUrl + '">' + elem.eventLocation + '&nbsp-&nbsp<span class="purpleSubMenu">' + months[startDate.getMonth()] + ',&nbsp' + startDate.getFullYear() + '</span></a>';

				}
			});
			upcomingPurpleMenu += '</div>';
			menu = menu.replace('<div class="col_12 purpleEventMenu"></div>', upcomingPurpleMenu).replace('<section id="headerImage" class="mobileWrapper"></section>', headerImage).replace('<nav class="menu-overlay desktop-menu flex">', headerBackgroundColor).replace('<div class="menu-overlay hamburger-menu social-icons">', hamburgerMenu);
			var headerMenu = $.parseHTML(menu);
			$header.prepend(headerMenu);
			//declare jQuery variables after menu has been rendered to the DOM
		 	var $homeMenuButton = $('.home-menu-button');
		 	var $upcominEventsBlock = $('.upcominEventsBlock');
		 	var $latestNewsMenuBlock = $('.latest-news-menu-block');
		 	var $meetTheTeamMenuBlock = $('.meet-the-team-menu-block');
		 	var $pastEventsHeaderMenuBlock = $('.past-events-header-menu-block');
		 	var $hiddenDiv = $('.hidden-div');
		 	var $hamburgerMenu = $('.hamburger-menu');
		 	var $mobileWrapper = $('.mobileWrapper');
		 	var $hamburgerIcon = $('.hamburger-icon');
		 	var $feedbackBlockWrapper = $('#feedbackBlockWrapper');
		 	var $headerImage = $('#headerImage');
		 	var $headerImageTitleBox = $('.headerImageTitleBox');

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
			if (pathname !== '/' && $(window).width() > 768) {
				$feedbackBlockWrapper.hide();
				$headerImage.hide();
				$headerImageTitleBox.hide();
			}
		});		
 });
