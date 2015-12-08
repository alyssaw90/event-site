'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

 $(document).ready(function () {
 	
 	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 	var $header = $('header');
 	var $menuBlock = $('.menu-block');
 	var menu = '<!-- Begin upper purple menu -->\
		<nav class="menu-overlay hamburger-menu social-icons clearfix">\
		<!-- Begin Mobile "Hamburger Menu" -->\
			<div class="float-left mobileMsLogo">\
				<img src="data:image;base64,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" />\
			</div>\
			<div class="float-right mobileHamburgerIcon">\
				<i class="fa fa-bars fa-3x hamburger-icon"></i>\
			</div>\
			<div class="hidden-div" style="display: none">\
				<ul class="menu vertical hamburger-menu">\
					<li class="mobile-menu"><a href="/"><span class="home">Home</span></a></li>\
					<li class="mobile-menu"><a href="/future-events"><span>Find an Event</a></span></a></li>\
					<li class="mobile-menu"><a href="/latest-news"><span>Get the Latest</span></a></li>\
					<li class="mobile-menu"><a href="/meet-the-team"><span>Meet the Team</a></span></a></li>\
					<li class="mobile-menu"><a href="/past-events"><span>Past Events</span></a></li>\
				</ul>\
			</div>\
		</nav>\
		<!-- End "Hamburger" Menu -->\
		<!-- Begin purple desktop menu -->\
		<nav class="menu-overlay desktop-menu flex"">\
			<div class="col_4">\
				<img class="ms-logo" src="data:image;base64,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" />\
			</div>\
			<div class="col_6 purpleEventMenu"></div>\
		</nav>\
		<!-- End Purple desktop menu -->\
		<!-- End upper purple upper menu -->\
		<!-- begin Gray Desktop Main menu -->\
		<nav class="grid flex desktop-menu gray-menu">\
			<div class="col_2 center-block">\
				<div class="col_2 center-block menu-block home-menu-button"><a href="/"><h2>Home</h2></a></div>\
			</div>\
				<div class="col_2 center-block">\
					<div class="expanding-menu upcoming-menu">\
						<div class="col_2 center-block menu-block upcoming-menu"><a href="/future-events"><h2>Find an Event</h2></a></div>\
					</div>\
				</div>\
			<div class="col_custom-menu">\
			</div>	\
			<div class="col_2 center-block">\
				<div class="col_2 center-block menu-block latest-news-menu-block"><a href="/latest-news"><h2>Get the Latest</h2></a></div>\
			</div>\
			<div class="col_2 center-block">\
				<div class="col_2 center-block menu-block meet-the-team-menu-block"><a href="/meet-the-team"><h2>Meet the Team</h2></a></div>\
			</div>\
			<div class="col_2 center-block">\
				<div class="col_2 center-block menu-block past-events-header-menu-block"><a href="/past-events"><h2>Past Events</h2></a></div>\
			</div>\
		</nav>\
		<!-- End gray desktop menu -->';

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


		$.get('/events', function (data) {
			var upcomingMenu = '<div class="col_2 center-block menu-block upcoming-menu"><a href="/future-events"><h2>Find an Event</h2></a></div>';
			var upcomingPurpleMenu = '<div class="col_6 purpleEventMenu">';
			$(data).each(function (i, elem) {
				var startDate = new Date(elem.eventStartDate);
				// console.log(new Date(elem.eventStartDate).getDate());
				upcomingMenu += '<div class="col_2 center-block menu-block upcoming-menu upcoming-sub-menu"><a href="/event/' + elem.eventUrl + '"><h2>' + elem.eventName + '</h2></a></div>';
				upcomingPurpleMenu += '<div class="float-left upcomingPurpleMenu"><a href="/event/' + elem.eventUrl + '">' + elem.eventLocation + '<br /><span class="purpleSubMenu">' + months[startDate.getMonth()] + ' ' + startDate.getDate() + ', ' + startDate.getFullYear() + '</span></a></div>';
			})
			upcomingPurpleMenu += '</div>';
			menu = menu.replace('<div class="col_2 center-block menu-block upcoming-menu"><a href="/future-events"><h2>Find an Event</h2></a></div>', upcomingMenu).replace('<div class="col_6 purpleEventMenu"></div>', upcomingPurpleMenu);
			var headerMenu = $.parseHTML(menu);
			$header.prepend(headerMenu);
			//make future events tab expand when hovered
			$('.expanding-menu').hover(function () {
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
			// $(window).load(function () 
				/*var socialIconWidth = 0;
				var margin = ($(window).width() - $('.purpleEventMenu').width()) / ($('.purpleEventMenu').length * 6);
				$('.social-icons').children().each(function (i) {
					socialIconWidth += Math.abs($(this).width())
				})*/
				// $('.purpleEventMenu').css('left', margin * -1);
				// $('.purpleEventMenuWrapper').css('text-align', 'center');
			// })
			$(window).load(changeWidth($('.menu-block')));
			$(window).resize(changeWidth($('.menu-block')));
			//highlight currently selected menu item
			if (window.location.pathname === '/') {
				$('.home-menu-button').addClass('current-page');
			}
			if (window.location.pathname === '/future-events') {
				$('.upcoming-menu').addClass('current-page');
			}
			if (window.location.pathname === '/latest-news') {
				$('.latest-news-menu-block').addClass('current-page');
			}
			if (window.location.pathname === '/meet-the-team') {
				$('.meet-the-team-menu-block').addClass('current-page');
			}
			if (window.location.pathname === '/past-events') {
				$('.past-events-header-menu-block').addClass('current-page');
			}
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
		})



					
 });
