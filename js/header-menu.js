'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

/*function randomQuote (arr) {
	var randomNum = Math.floor(Math.random() * arr.length);
	var outputQuote = '<h4>' + arr[randomNum].quote + '</h4><p>' + arr[randomNum].author + '</p>';
	$('#feedbackBlock').append(outputQuote);
}*/

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
		<nav class="menu-overlay desktop-menu flex"">\
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
			// var upcomingMenu = '<div class="col_2 center-block menu-block upcoming-menu"><a href="/future-events"><h2>Find an Event</h2></a></div>';
			var upcomingPurpleMenu = '<div class="col_12 purpleEventMenu">';
			var headerImage = '<section id="headerImage" class="mobileWrapper"><a href="/' + data[0].eventUrl + '"><img style="width:100%; margin: 0 0 0 0; padding: 0 0 0 0;" src="../uploads/' + data[0].eventHomepageImage + '" /></a></section>';
		 	var $header = $('header');
		 	// var $menuBlock = $('.menu-block');
			$(data).each(function (i, elem) {
				var startDate = new Date(elem.eventStartDate);
				// upcomingMenu += '<div class="col_2 center-block menu-block upcoming-menu upcoming-sub-menu"><a href="/event/' + elem.eventUrl + '"><h2>' + elem.eventName + '</h2></a></div>';
				if (i < data.length - 1) {
					upcomingPurpleMenu += '<a href="/' + elem.eventUrl + '">' + elem.eventLocation + '&nbsp-&nbsp<span class="purpleSubMenu">' + months[startDate.getMonth()] + ',&nbsp' + startDate.getFullYear() + '</span></a>| ';
				}
				if (i >= data.length - 1) {
					upcomingPurpleMenu += '<a href="/' + elem.eventUrl + '">' + elem.eventLocation + '&nbsp-&nbsp<span class="purpleSubMenu">' + months[startDate.getMonth()] + ',&nbsp' + startDate.getFullYear() + '</span></a>';

				}
			})
			upcomingPurpleMenu += '</div>';
			menu = menu.replace('<div class="col_12 purpleEventMenu"></div>', upcomingPurpleMenu).replace('<section id="headerImage" class="mobileWrapper"></section>', headerImage);
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

			}
		});		
 });
