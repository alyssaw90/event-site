'use strict';
/*global $ */
/*global document */
/*global window */
/*global changeHeight */
/*global homepageStickyFooter */

$(function() {
	var $pastEvents = $('.past_events');
	$pastEvents.click(function() {
		console.log('hello');
		changeHeight('.past_events');
		homepageStickyFooter();
	});
});

$(window).load(function() {
	changeHeight('.past_events');
	homepageStickyFooter();
});

$(window).resize(function(){
	changeHeight('.past_events');
	homepageStickyFooter();
});