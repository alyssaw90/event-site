'use strict';

$(window).load(function() {
	changeHeight('.past_events');
});

$(window).resize(function(){
	changeHeight('.past_events');
});