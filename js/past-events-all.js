'use strict';
/*global $ */
/*global document */
/*global window */
/*global changeHeight */
/*global homepageStickyFooter */

$(window).load(function() {
	changeHeight('.past_events');
	homepageStickyFooter();
});

$(window).resize(function(){
	changeHeight('.past_events');
	homepageStickyFooter();
});