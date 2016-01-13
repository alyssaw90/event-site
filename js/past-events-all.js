'use strict';

$(window).load(function() {
	changeHeight('.past_events');
	homepageStickyFooter();
});

$(window).resize(function(){
	changeHeight('.past_events');
	homepageStickyFooter();
});