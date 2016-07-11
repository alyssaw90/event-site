'use strict';
/*global $ */
/*global document */
/*global window */

/*Global Functions*/


const jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

//FrameKiller
if (self === top) {
	document.documentElement.style.display = 'block';
} else {
	top.location = self.location;
}

(function($) {
	$(function () {
		const $body = $('body');
		const $footer = $('.foot');
		const $backToTopButton = $('.scroll-button .fa-chevron-up');
		const $travelUlLinks = $('.travelUlLinks');
		const $pastEvents = $('.past_events');
		const $headers = $(':header');

		//make external links open in new tabs
		$('a[href^="http"]').attr('target','_blank');

		//hide slider on screens larger than 768px
		$(window).load(customFunctions.addCSS(768, $('.slider'), 'display', 'none', 'inline'));
		$(window).resize(customFunctions.addCSS(768, $('.slider'), 'display', 'none', 'inline'));

		//make bottom button scroll to top
		$backToTopButton.click( function() {
	   $('html, body').animate({ scrollTop: 0 }, 'fast');
	 	});

	 		// make return to previous page button
		$('.previous-page-button').click(function () {
			let oldURL = document.referrer;
			window.location = oldURL;
		});

	 	// find users using IE
	 	(function () {
		 	let ms_ie = false;
		  let ua = window.navigator.userAgent;
		  let old_ie = ua.indexOf('MSIE ');
		  let new_ie = ua.indexOf('Trident/');
		  let openDiv = $.parseHTML('<div>');
		  let closeDiv = $.parseHTML('</div>');

		  if (old_ie > -1 || new_ie > -1) {
	      ms_ie = true;
		  }

		  if (ms_ie) {
		      //IE specific code goes here
		      // $('main').removeClass('grid main-page-content');
		      // $('main').wrapInner('<div class="grid main-page-content"></div>')
		      // $('main').wrap('<div></div>');
		      // $('main').append(closeDiv);
		      // console.log('body width : ', $('body').width(), new_ie, 'test width: ', $('.test').width(), 'Footer width : ', $('footer').width(), 'header width : ', $('header').width());
		  }
	 		
	 	}());
	 	
	});

	$('.tabLink').click(function(e) {
		if ($(this).data('tabid') !== 'undefined') {
			e.preventDefault();
			let tabId = $(this).data('tabid');
			let tabIDName = '#' + tabId;
			let divWithTabId = 'div' + tabIDName.slice(0, -4);
			$('ul.tabs').children('li').each(function(i, elem) {
				if ($(this).attr('id') === tabId) {
					let wantedTab = $(this);
					let tabs = $(this).parents('ul.tabs').find('li');
					let tab_next = tabs.filter('.current').find('a').attr('href');
					let tab_current = tabs.filter(tabIDName).find('a').attr('href');
					$(tab_current).hide();
					tabs.removeClass('current');
					$(this).addClass('current');
					$(tab_next).show();
					$(this).parent().parent().children('div').hide();
					$(this).parent().parent().children(divWithTabId).show();
					return false;
				}
			});
			
		}
	});


	$(window).load(function() {
		customFunctions.changeHeight('.past_events');
		customFunctions.changeHeight('.individual-homepage-expert');
	  customFunctions.stickyFooter();
	  customFunctions.homepageStickyFooter();
	});


	$(window).resize(function(){
		customFunctions.changeHeight('.past_events');
		customFunctions.changeHeight('.individual-homepage-expert');
	  customFunctions.stickyFooter();
	  customFunctions.homepageStickyFooter();
	});

	setTimeout(function() {
		customFunctions.stickyFooter();
	  customFunctions.homepageStickyFooter();
	}, 1000);

	/*//////////////////////////////////////////////////////
	/																												/ 
	/																												/ 
	/										Accessibility												/ 
	/																												/ 
	/																												/ 
	//////////////////////////////////////////////////////*/


	let path = window.location.pathname;
	$('li:not(.tabs > li), th, td, .feed_item_description').attr('tabindex', '0');

	//add tabindex="0" to paragraphs on the speakers, about abd faq pages

	if (path === '/meet-the-team' || path === '/about' || path === '/faq' || path === '/latest-news', '/contactus') {
		$('p').attr('tabindex', '0');
	}

	$('td').each(function(index, el) {
		let $this = $(this);
		let $tdContent = $this.html();
		//add html time element to tds with no letters and a dash and colon
		if (!/[a-zA-Z]/.test($tdContent) && /[:\-]/.test($tdContent)) {
			$this.html(`<time>${$tdContent}</time>`);
		}

	});

	//add aria tab to header elements that aren't links
	$(':header').each(function(index, el) {
		let $this = $(this);
		if (!$this.parent().attr('href')) {
			$this.attr('tabindex', '0');
		}
	});

	function fixSocialTabindex() {
		$('.at-share-btn').attr('tabIndex', 0);
		
	}
	
	// window.addEventListener ? window.addEventListener('load',fixSocialTabindex,false) : window.attachEvent && window.attachEvent('onload',fixSocialTabindex);
	setTimeout(fixSocialTabindex, 3000);

})(jQuery);


