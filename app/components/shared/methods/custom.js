'use strict';
/*global $ */
/*global document */
/*global window */

/*Global Functions*/


const jQuery = require('jquery');
import * as customFunctions from './common-functions.js';

//FrameKiller
if (self === top) {
	document.documentElement.style.display = 'block';
} else {
	top.location = self.location;
}
//create selector for focusable elements
jQuery.extend(jQuery.expr[':'], {
    focusable: function(el, index, selector){
    return jQuery(el).is('a, button, :input, [tabindex]');
    }
});

(function($) {

	//window on ready functions
	$(window).ready(function() {
	  //check for high-contrast mode
	  customFunctions.highContrast();
	});

	//document ready functions
	$(function () {
		const $body = $('body');
		const $footer = $('.foot');
		const $backToTopButton = $('.scroll-button .fa-chevron-up');
		const $travelUlLinks = $('.travelUlLinks');
		const $pastEvents = $('.past_events');
		const $headers = $(':header');
		const $homepageIntroBlocks = $('.homepageIntroBlocks');

		//make external links open in new tabs
		$('a[href^="http"]').attr('target','_blank');

		customFunctions.changeHeight(jQuery('.homepageIntroBlocks'));

		//hide slider on screens larger than 768px
		/*$(window).load(customFunctions.addCSS(768, $('.slider'), 'display', 'none', 'inline'));
		$(window).resize(customFunctions.addCSS(768, $('.slider'), 'display', 'none', 'inline'));*/

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
	 	
		/*$('.tabLink').click(function(e) {
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
		});*/

		$('main').css('position', '');
		//prevent form submission with enter key
		$(document).on('keypress', ':input:not(textarea)',function(e) {
			let keyCode = customFunctions.getKeyCode(e);
			if (keyCode === 13) {
				e.preventDefault();
			}
		});

		$(window).load(function() {
			customFunctions.changeHeight(jQuery('.past_events'));
			customFunctions.changeHeight(jQuery('.individual-homepage-expert'));
		});


		$(window).resize(function(){
			customFunctions.changeHeight(jQuery('.past_events'));
			customFunctions.changeHeight(jQuery('.individual-homepage-expert'));
		});

		/*//////////////////////////////////////////////////////
		/																												/ 
		/																												/ 
		/										Accessibility												/ 
		/																												/ 
		/																												/ 
		//////////////////////////////////////////////////////*/


		let path = window.location.pathname;

		// $('li:not(.tabs > li), th, td, .feed_item_description').attr('tabindex', '0');
		$('.feed_item_description').attr('tabindex', '0');

		$('.clear, hr').attr({'aria-hidden': 'true', 'role': 'presentation'});


		$('td').each(function(index, el) {
			let $this = $(this);
			let $tdContent = $this.html();
			//add html time element to tds with no letters and a dash and colon so they are read correctly by screen readers
			if (!/[a-zA-Z]/.test($tdContent) && /[:\-]/.test($tdContent)) {
				$this.html(`<time>${$tdContent}</time>`);
			}

		});

		//Prevent elements from taking focus when they are clicked
		$('*').click(function(e) {
			let keyCode = customFunctions.getKeyCode(e);
			if (keyCode === 1) {
				jQuery(this).blur();								
			}
		});
		//remove focus from resize sensor div
		$('.resize-sensor').attr('tabindex', '-1');

		$('*').focus(function(e) {
			$('html, body').animate({
		    scrollTop: $(this).offset().top
  		}, 50);
		});
		//show focus on the homepage image
		$('#homepageSliderSection').focusin(function(e) {
			$(this).find('img').css({'padding': '5px', 'background-color': '#50B1FE'});;			
		});
		$('#homepageSliderSection').focusout(function(e) {
			$(this).find('img').css({'padding': '', 'background-color': ''});;			
		});

	});

})(jQuery);


