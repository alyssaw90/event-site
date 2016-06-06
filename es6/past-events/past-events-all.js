'use strict';
/*global $ */
/*global document */
/*global window */
/*global changeHeight */
/*global homepageStickyFooter */

let jQuery = require('jquery');
import * as customFunctions from '../common-functions.build.js';

(function($) {

	$(function() {
		var $pastEvents = $('.past_events');
		$pastEvents.on('click keydown', function() {
			let keyCode = customFunctions.getKeyCode(e);
			if (keyCode === 1 || 9 || 13) {
				customFunctions.changeHeight('.past_events');
				customFunctions.homepageStickyFooter();
				// customFunctions.pastEventBackgroundSwitch();
				
			}
		});
	});

	$(window).load(function() {
		customFunctions.changeHeight('.past_events');
		customFunctions.homepageStickyFooter();
	});

	$(window).resize(function(){
		customFunctions.changeHeight('.past_events');
		customFunctions.homepageStickyFooter();
	});

})(jQuery);