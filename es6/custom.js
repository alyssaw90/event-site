'use strict';
/*global $ */
/*global document */
/*global window */

/*Global Functions*/


let jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

(function($) {
	$(function () {
		let $body = $('body');
		let $footer = $('.foot');
		let $backToTopButton = $('.scroll-button .fa-chevron-up');
		let $travelUlLinks = $('.travelUlLinks');
		let $pastEvents = $('.past_events');

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
		console.log('tabId', $(this).data('tabid'));
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

})(jQuery);


