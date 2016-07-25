'use strict';
/*global $ */
/*global document */
/*global window */
/*global changeHeight */
/*global homepageStickyFooter */

const jQuery = require('jquery');
const elementResizeEvent = require('element-resize-event');
import * as customFunctions from '../common-functions.build.js';

(function($) {
	const mainElem = document.getElementsByTagName('main');

	$(function() {
		var $pastEvents = $('.past_events');
		$pastEvents.on('click keydown', function(e) {
			let keyCode = customFunctions.getKeyCode(e);
			if (keyCode === 1 || 9 || 13) {
				customFunctions.changeHeight('.past_events');
			}
		});
	});

	for (let i = 0, j = mainElem.length; i < j; i++) {

		elementResizeEvent(mainElem[i], function() {
		  customFunctions.homepageStickyFooter();
		});
	}

})(jQuery);
