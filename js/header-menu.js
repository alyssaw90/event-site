'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

 $(document).ready(function () {
 	
 	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 	var $header = $('header');
 	var $menuBlock = $('.menu-block');
 	var $hiddenDiv = $('.hidden-div');
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
		<!-- Begin purple desktop menu -->\
		<nav class="menu-overlay desktop-menu flex"">\
			<div class="col_12 purpleEventMenu"></div>\
		</nav>\
		<!-- End Purple desktop menu -->\
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
		<!-- End gray desktop menu -->';

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
			console.log(widestBlock);
		}


		$.get('/events', function (data) {
			// var upcomingMenu = '<div class="col_2 center-block menu-block upcoming-menu"><a href="/future-events"><h2>Find an Event</h2></a></div>';
			var upcomingPurpleMenu = '<div class="col_12 purpleEventMenu">';
			$(data).each(function (i, elem) {
				var startDate = new Date(elem.eventStartDate);
				// console.log(new Date(elem.eventStartDate).getDate());
				// upcomingMenu += '<div class="col_2 center-block menu-block upcoming-menu upcoming-sub-menu"><a href="/event/' + elem.eventUrl + '"><h2>' + elem.eventName + '</h2></a></div>';
				if (i < data.length - 1) {
					upcomingPurpleMenu += '<a href="/event/' + elem.eventUrl + '">' + elem.eventLocation + '&nbsp-&nbsp<span class="purpleSubMenu">' + months[startDate.getMonth()] + '&nbsp' + startDate.getDate() + ',&nbsp' + startDate.getFullYear() + '</span></a>| ';
				}
				if (i >= data.length - 1) {
					upcomingPurpleMenu += '<a href="/event/' + elem.eventUrl + '">' + elem.eventLocation + '&nbsp-&nbsp<span class="purpleSubMenu">' + months[startDate.getMonth()] + '&nbsp' + startDate.getDate() + ',&nbsp' + startDate.getFullYear() + '</span></a>';

				}
			})
			upcomingPurpleMenu += '</div>';
			menu = menu.replace('<div class="col_12 purpleEventMenu"></div>', upcomingPurpleMenu)/*.replace('<div class="col_2 center-block menu-block upcoming-menu"><a href="/future-events"><h2>Find an Event</h2></a></div>', upcomingMenu)*/;
			var headerMenu = $.parseHTML(menu);
			$header.prepend(headerMenu);
			//make future events tab expand when hovered
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
			);*/
			// $(window).load(function () 
				/*var socialIconWidth = 0;
				var margin = ($(window).width() - $('.purpleEventMenu').width()) / ($('.purpleEventMenu').length * 6);
				$('.social-icons').children().each(function (i) {
					socialIconWidth += Math.abs($(this).width())
				})*/
				// $('.purpleEventMenu').css('left', margin * -1);
				// $('.purpleEventMenuWrapper').css('text-align', 'center');
			// })
			// $(window).load(changeWidth($('.menu-block')));
			// $(window).load(changeWidth());
			// $(window).resize = changeWidth;
			/*$(document).ready(function(){
    		$(window).resize(function() {
    			console.log('resize reached');
      	changeWidth();
    		})
  		});*/
			/*$(window).resize(function () {
				changeWidth();
				alert('resized');
			});*/
			/*var $window = $(window);
			var width = $window.width();
  		var height = $window.height();
			setInterval(function () {
        if ((width != $window.width()) || (height != $window.height())) {
            width = $window.width();
            height = $window.height();

            // alert('resized!');
            changeWidth();
        }
    	}, 300)*/
			//highlight currently selected menu item
			if (window.location.pathname === '/') {
				$('.home-menu-button').addClass('current-page');
			}
			if (window.location.pathname === '/future-events') {
				$('.upcominEventsBlock').addClass('current-page');
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
			//make mobile menu slide in from side when it's pressed and back when anywhere else is pressed
			$('.hamburger-menu').click(function () {
				$('.hidden-div').animate({width: 'toggle'});
				// $('.hamburger-icon').toggleClass('rotate-180');
				$('.hamburger-icon').css({

        //for firefox
        '-moz-animation-name':'rotatebox',
        '-moz-animation-duration':'0.8s',
        '-moz-animation-iteration-count':'1',
        '-moz-animation-fill-mode':'forwards',

        //for safari & chrome
        '-webkit-animation-name':'rotatebox',
        '-webkit-animation-duration':'0.8s',
        '-webkit-animation-iteration-count':'1',
        '-webkit-animation-fill-mode' : 'forwards',

        });
				$('main').toggleClass('grayedOut').toggleClass('grid').toggleClass('flex');
			});
			$('main').click(function (e) {
				if ($('.hidden-div').is(':visible') && e.target !== $('.hidden-div')) {
					console.log(e.target);
					$('.hidden-div').animate({width: 'toggle'});
					$('main').toggleClass('grayedOut');
				}
			})
		});		
 });
