'use strict';

let jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

(function($) {
	$(function() {

 		let $latestNewsLink = $('#latestNewsLink');
 		let $newsTabsList = $('.newsTabsList');

 		$latestNewsLink.click(function(e) {
 			e.preventDefault();
 			let tabId = $(this).data('tabid');
 			$newsTabsList.children().each(function(i, elem) {
 					console.log(elem);
 				if ($(this).attr('id') === tabId) {
 					$(this).children().trigger('click');
 					$('html, body').animate({scrollTop: 0}, 'fast');
 				}
 			})
 		})
	});
})(jQuery);
