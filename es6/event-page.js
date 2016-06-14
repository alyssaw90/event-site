 'use strict';
 /* jshint shadow:true */
 /*global $ */
 /*global document */
 /*global $ */
 /*global stickyFooter */
 /*global window */
 /*global MutationObserver */
 /* jshint loopfunc:true */


let jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

(function() {
	$(function($) {
		
		const $presentationButtons = $('a.button');

		$presentationButtons.each(function(index, el) {
			let $this = $(this);
			let presentTime = $this.attr('data-presentationTime');


			if (typeof presentTime !== typeof undefined && presentTime !== false) {
				
				if (new Date(presentTime) > new Date()) {
					$this.hide();

				} else {
					$this.show();
				}

			}
		});

	});
})(jQuery);