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
 	var $header = $('header');
 	var $menuBlock = $('.menu-block');
 	var $hiddenDiv = $('.hidden-div');
 	var feedbackArr = [{quote: 'I loved it!', author: 'John Doe'}, {quote: 'I adored it!', author: 'Jane Doe'}, {quote: 'I like it!', author: 'John Doe Jr.'}, {quote: 'I\'m hungry', author: 'Me'}];
 	var pathname = window.location.pathname;

 	var menu = '<nav class="grid flex desktop-menu gray-menu">\
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
		<div class="menu-overlay" id="feedbackBlockWrapper" style="height:100px; color: #fff; padding-top: 15px;"><div id="feedbackBlock" style=""></div></div>\
		<section id="headerImage">\
			<img style="width:100%; margin: 0 0 0 0; padding: 0 0 0 0;" src="../img/jinghui-zhang-slider.png" />\
		</section>\
		<!-- Begin upper purple menu -->\
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
		<!-- begin Gray Desktop Main menu -->';

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
					upcomingPurpleMenu += '<a href="/' + elem.eventUrl + '">' + elem.eventLocation + '&nbsp-&nbsp<span class="purpleSubMenu">' + months[startDate.getMonth()] + ',&nbsp' + startDate.getFullYear() + '</span></a>| ';
				}
				if (i >= data.length - 1) {
					upcomingPurpleMenu += '<a href="/' + elem.eventUrl + '">' + elem.eventLocation + '&nbsp-&nbsp<span class="purpleSubMenu">' + months[startDate.getMonth()] + ',&nbsp' + startDate.getFullYear() + '</span></a>';

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
			});
			/*setInterval(function () { 
				var randomNum = Math.floor(Math.random() * feedbackArr.length);
				var outputQuote = '<h4 class="float-left" style="padding-left: 30%;">' + feedbackArr[randomNum].quote + '</h4><p class="float-left" style="padding-left: 3%;">' + feedbackArr[randomNum].author + '</p>';
				console.log($('#feedbackBlock').html());
				$('#feedbackBlock').html(outputQuote); 
				$('#feedbackBlock').fadeIn('slow');
			}, 3000);*/
			/*setInterval(function () {
				$('#feedbackBlock').fadeIn('slow', function () {
					$('#feedbackBlock').fadeOut('slow');
				})
			}, 2000)*/
			/*$('#feedbackBlock').effect('fade', {}, 1000, function () {
      	setTimeout(function() {
        	$('#feedbackBlock').removeAttr( "style" ).hide().fadeIn();
    		}, 1000 );
    	});*/
			/*setInterval(function () {
				$('#feedbackBlock').toggleClass('.invisibleDiv');
			}, 2000);*/
console.log(pathname);
			if (pathname === '/') {
				var randomNum = Math.floor(Math.random() * feedbackArr.length);
				var outputQuote = '<h4>' + feedbackArr[randomNum].quote + '</h4><p>' + feedbackArr[randomNum].author + '</p>';
				setInterval(function () { 
					var randomNum = Math.floor(Math.random() * feedbackArr.length);
					var outputQuote = '<h4 class="float-left" style="padding-left: 40%;">' + feedbackArr[randomNum].quote + '</h4><p class="float-left" style="padding-left: 3%;">' + feedbackArr[randomNum].author + '</p>';
					$('#feedbackBlock').html(outputQuote); 
					// $('#feedbackBlock').fadeIn('slow');
				}, 3000);
			}
			(function swoop(element) {
        element
            .animate({'padding-top':'-20px'}, 1000)
            .animate({'padding-top':'15px'}, 1000, function(){
                setTimeout(function(){
                    swoop(element);
                }, 3000);
            });
    		})($('#feedbackBlock'));
			if (pathname !== '/') {
				$('#feedbackBlockWrapper').hide();
				$('#headerImage').hide();

			}
		});		
 });
