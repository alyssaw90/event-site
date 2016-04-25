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


