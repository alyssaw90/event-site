// 'use strict';
// /*global $ */
// /*global document */
// /*global window */
// /*global changeHeight */

// const jQuery = require('jquery');
// require('dotenv').load();
// import * as customFunctions from './common-functions.build.js';

// (function($) {

// 	$(document).ready(function () {
// 		let $eventBlock = $('.event_block');
// 		//make block slide up effect for upcoming event blocks
// 		$eventBlock.hover(
// 			function () {
// 				let $theHtml = $(this).html();
				
// 				$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
// 				$(this).find('h1').animate({opacity: 0}, 0);
// 				$(this).find('h3').animate({opacity: 0}, 0);
// 				$(this).find('p').show();
// 				$(this).find('p').animate({opacity: 1}, 200);
// 			},
// 			function () {
// 				$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200);
// 				$(this).find('h1').animate({opacity: 1}, 0);
// 				$(this).find('h3').animate({opacity: 1}, 0);
// 				$(this).find('p').hide();
// 				$(this).find('p').animate({opacity: 0}, 0);
// 			});	

// 		$eventBlock.focusin(function(e) {
// 			console.log('this    ', $(this));
// 			$(this).css('border', '3px solid #50B1FE');
// 		});

// 		$eventBlock.focusout(function(e) {
// 			$(this).css('border', '');
// 		});

// 		//convert rbg colors to hex
// 		function rgb2hex(rgb) {
//    		if (  rgb.search('rgb') === -1 ) {
//   	      return rgb;
//    		} else {
//  	     		rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
//  	     		function hex(x) {
//         		return ('0' + parseInt(x).toString(16)).slice(-2);
//  	     }
//  	     return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
//      	}
// 		}
		
// 		//get color contrast
// 		function invertColor(hexColor) {
// 	    let color = hexColor;
// 	    color = color.substring(1);           // remove #
// 	    color = parseInt(color, 16);          // convert to integer
// 	    color = 0xFFFFFF ^ color;             // invert three bytes
// 	    color = color.toString(16);           // convert to hex
// 	    color = ('000000' + color).slice(-6); // pad with leading zeros
// 	    color = '#' + color;                  // prepend #
// 	    return color;
// 		}
// 		//get color contrast value and return black or white depending how dark the background color is
// 		function getContrastYIQ(hexcolor){
// 			let rgb = hexcolor.slice(4, -1).split(',');
// 			let r = rgb[0];
// 			let g = rgb[1];
// 			let b = rgb[2];
// 			let yiq = ((r*299)+(g*587)+(b*114))/1000;
// 			return (yiq >= 128) ? '#000' : '#FFF';
// 		}
// 		//for Accessibility

// 		$('map area').attr('tabindex', '-1');

// 		$eventBlock.each(function(index, el) {
// 			let $this =  $(this);
// 			let bgColor = $this.css('background-color');
// 			let hxC =  rgb2hex(bgColor);
// 			let textColor = getContrastYIQ(bgColor);
// 			$this.find('h1, p, li').css('color', textColor);
// 		});
// 	});

// 	//make block slide up effect for upcoming event blocks -- moved to future-events.js
// 	$('.event_block').hover(
// 		function () {
// 		$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
// 		},
// 		function () {
// 			$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200);
// 	});

// 	$(window).load(function() {
// 	  customFunctions.changeHeight('.event_block');
// 	});


// 	$(window).resize(function(){
// 	  customFunctions.changeHeight('.event_block');
// 	});


// })(jQuery);
