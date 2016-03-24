'use strict';

(function($) {
	$(function() {

 		var $latestNewsLink = $('#latestNewsLink');
 		var $newsTabsList = $('.newsTabsList');

 		$latestNewsLink.click(function(e) {
 			e.preventDefault();
 			var tabId = $(this).data('tabid');
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
