'use strict';
 $(document).ready(function () {
 	
 	var $header = $('header');
 	var menu = '<!-- Begin upper purple menu -->\
		<nav class="menu-overlay">\
		<!-- Begin Mobile "Hamburger Menu" -->\
			<ul class="menu hamburger-menu">\
				<li class="current" style="float: left;"><a href="/"><img src="./img/Microsoft-logo_rgb_c-wht-small.png" /></a></li>\
				<li style="float: left">\
					<div class="social-icons">\
						<a href="http://www.meetup.com/Shanghai-Interop-Dev-Days-2015/"><img src="./img/meetup-logo.png"></a>\
						<a href="https://twitter.com/OSpecifications"><img src="./img/twitter-icon.png"></a>\
						<a href="http://blogs.msdn.com/b/officeinteroperability/default.aspx?wa=wsignin1.0"><img src="./img/news-feed-icon.png"></a>\
						<a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests"><img src="./img/channel-9-logo.png"></a>\
						<a href="mailto:mailto:plugfests@microsoft.com"><img src="./img/email-icon.png"></i></a>\
					</div>\
				<li><i class="fa fa-bars fa-3x hamburger-icon"></i></li>\
				</li>\
			</ul>\
			<div class="hidden-div" style="display: none">\
				<ul class="menu vertical hamburger-menu">\
					<li class="mobile-menu"><a href="/"><span class="home">Home</span></a></li>\
					<li class="mobile-menu">\
						<div class="register-button"><a href="https://msevents.microsoft.com/CUI/EventDetail.aspx?EventID=103265323&Culture=en-CN&community=1">Register</a>\
						</div>\
					</li>\
					<li class="mobile-menu"><a href="/find-an-event"><span>Find an Event</a></span></a></li>\
					<li class="mobile-menu"><a href="/latest-news"><span>Get the Latest</span></a></li>\
					<li class="mobile-menu"><a href="/meet-the-team"><span>Meet the Team</a></span></a></li>\
					<li class="mobile-menu"><a href="/past-events"><span>Past Events</span></a></li>\
				</ul>\
			</div>\
		</nav>\
		<!-- End "Hamburger" Menu -->\
		<!-- Begin purple desktop menu -->\
		<nav class="menu-overlay desktop-menu">\
			<ul class="menu">\
				<a class="ms-logo" href="/"><img src="./img/Microsoft-logo_rgb_c-wht-small.png" /></a>\
				<li>\
					<div class="social-icons">\
						<a href="http://www.meetup.com/Shanghai-Interop-Dev-Days-2015/"><img src="./img/meetup-logo.png"></a>\
						<a href="https://twitter.com/OSpecifications"><img src="./img/twitter-icon.png"></a>\
						<a href="http://blogs.msdn.com/b/officeinteroperability/default.aspx?wa=wsignin1.0"><img src="./img/news-feed-icon.png"></a>\
						<a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests"><img src="./img/channel-9-logo.png"></a>\
						<a href="mailto:mailto:plugfests@microsoft.com"><img src="./img/email-icon.png"></i></a>\
					</div>\
				</li>\
				<li class="map-menu">\
					<a href="/map">Oceania</a>\
					<a href="/map">Africa</a>\
					<a href="/map">Europe</a>\
					<a href="/map">Asia</a>\
					<a href="/map">Americas</a>\
					<a style="margin-bottom:2%" class="button large blue" href="https://msevents.microsoft.com/CUI/EventDetail.aspx?EventID=103265323&Culture=en-CN&community=1">Register</a>\
				</li>\
			</ul>\
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
						<div class="col_2 center-block menu-block upcoming-menu"><a href="/find-an-event"><h2>Find an Event</h2></a></div>\
						<div class="col_2 center-block menu-block upcoming-sub-menu"><a href="/santa-clara-2015"><h2>SNIA Storage Developer Conference 2015, Santa Clara, CA</h2></a></div>\
						<div class="col_2 center-block menu-block upcoming-sub-menu"><a href="/santa-clara-2015"><h2>Shanghai Interop Dev Days 2015</h2></a></div>\
						<div class="col_2 center-block menu-block upcoming-sub-menu"><a href="/santa-clara-2015"><h2>Europe Protocols Plugfest</h2></a></div>\
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

		var headerMenu = $.parseHTML(menu);
		$header.prepend(headerMenu);
		if (window.location.pathname === '/') {
			$('.home-menu-button').addClass('current-page');
		}
		if (window.location.pathname === '/find-an-event') {
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
 })