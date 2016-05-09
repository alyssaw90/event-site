'use strict';

let jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

(function($) {
	// $(function() {

 // 		let $latestNewsLink = $('#latestNewsLink');
 // 		let $newsTabsList = $('.newsTabsList');

 // 		$('.tabLink').click(function(e) {
 // 			e.preventDefault();
 // 			let tabId = $(this).data('tabid');
 // 			tabId = '#' + tabId;
 // 			console.log(tabId);
 // 			$(tabId).trigger('click');
 // 			/*$newsTabsList.children().each(function(i, elem) {
 // 					console.log(elem);
 // 				if ($(this).attr('id') === tabId) {
 // 					$(this).children().trigger('click');
 // 					$('html, body').animate({scrollTop: 0}, 'fast');
 // 				}
 // 			})*/
 // 		})
	// });

/*	$('.tabLink').click(function(e) {
	e.preventDefault();
	let tabId = $(this).data("tabid");
	let tabIDName = "#" + tabId;
	let divWithTabId = "div" + tabIDName.slice(0, -4);
	$('ul.tabs').children('li').each(function(i, elem) {
		if ($(this).attr('id') === tabId) {
			let wantedTab = $(this);
			let tabs = $(this).parents("ul.tabs").find("li");
			let tab_next = tabs.filter(".current").find("a").attr("href");
			let tab_current = tabs.filter(tabIDName).find("a").attr("href");
			$(tab_current).hide();
			tabs.removeClass("current");
			$(this).addClass("current");
			$(tab_next).show();
			$(this).parent().parent().children("div").hide();
			$(this).parent().parent().children(divWithTabId).show();
			return false;
		}
	});
});*/
	
})(jQuery);
