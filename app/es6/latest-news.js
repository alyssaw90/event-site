'use strict';

const jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

(function($) {

	//accessibility
	// $('.timeline-Tweet-text').attr('tabindex', 0);
	window.onload = function() {$('.timeline-Widget').find('.timeline-Tweet-text').attr('tabindex', 0);};
	
})(jQuery);
