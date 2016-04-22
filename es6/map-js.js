'use strict'; 
/*global $ */
/*global document */
/*global window */
let jQuery = require('jquery');
let imageMapResize = require('image-map-resizer');
import * as customFunctions from './common-functions.build.js';

(function($) {

	$(function () {
		let $tiptip_holder = $('#tiptip_holder');
		let $tiptip_arrow = $('#tiptip_arrow');
		let $pointer = $('.pointer');

		

	 	// make clickable map have correct coordinates when resized
	 	// $('map').imageMapResize();
	 	imageMapResize();


		 	//position tooltips on map

		 	let locateTip = function (e) {
				$tiptip_holder.css('margin-top', (e.pageY - 100)).css('margin-left', (e.pageX - 100)).css('max-width', '100%');
		  	$tiptip_arrow.css('display', 'none');
		 	};

		 	$pointer.hover(locateTip);


	//make block slide up effect for upcoming event blocks -- moved to future-events.js
		$('.event_block').hover(
			function () {
			$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
			},
			function () {
				$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200);
		});
	 	
	});
	
})(jQuery);
