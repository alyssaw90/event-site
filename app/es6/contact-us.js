'use strict';
/*global $ */

let jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

(function($) {
	$(function () {
		var $emailButton = $('#emailButton');

		$emailButton.click(function () {
			$emailButton.attr('href', 'mailto:plugfests@microsoft.com?subject=' + $('#emailSubject').val() + '&body=' + $('#emailBody').val())
			.then(function(){
				customFunctions.stickyFooter();
			  customFunctions.homepageStickyFooter();
			});
		});
	});

})(jQuery);
