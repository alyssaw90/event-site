// 'use strict';

// /* jshint shadow:true */
// /*global $ */
// /*global document */
// /*global $ */
// /*global stickyFooter */
// /*global window */
// /*global MutationObserver */
// /* jshint loopfunc:true */
// /*global homepageStickyFooter*/
// /*global logout*/

// let jQuery = require('jquery');
// import * as customFunctions from './common-functions.js';

// (function($) {
// 	$(function () {
// 		let $curriculumLogoutButton = $('#curriculumLogoutButton');
// 		let $taipei1016Eng = $('.taipei1016-eng');
// 		let $taipei2016Cn = $('.taipei2016-cn');
// 		let $taipei2016ChineseCurriculum = $('#taipei2016-chinese-curriculum');
// 		let $taipei2016EnglishCurriculum = $('#taipei2016-english-curriculum');
// 		let $welcomeTab = $('.welcomeTab');
// 		let $curriculumList = $('.curriculumList');
// 		let languageSection = window.location.href.slice(-3);
// 		function checkFooter() {
// 			setTimeout(function() {
// 				if ($('html').height() > $(window).height()) {
// 					customFunctions.homepageStickyFooter();
// 				}
// 				if ($('html').height() <= $(window).height()) {
// 					customFunctions.stickyFooter();
// 				}
				
// 			}, 500);
// 		}

// 		// checkFooter();

// 		if (languageSection === '-en') {
// 			$taipei2016EnglishCurriculum.show();
// 			$taipei2016ChineseCurriculum.hide();
// 		} else {
// 			$taipei2016EnglishCurriculum.hide();
// 			$taipei2016ChineseCurriculum.show();	
// 		}


// 	 	$curriculumLogoutButton.click(customFunctions.logout);
		
// 	 	$taipei2016Cn.click(function(e) {
// 	 		e.preventDefault();
// 	 		$taipei2016ChineseCurriculum.show();
// 	 		$taipei2016EnglishCurriculum.hide();
		
// 	 	});
// 	 	$taipei1016Eng.click(function(e) {
// 	 		e.preventDefault();
// 	 		$taipei2016EnglishCurriculum.show();
// 	 		$taipei2016ChineseCurriculum.hide();
// 	 	});
		
// 	 	$welcomeTab.click(function(e) {
// 	 		e.preventDefault();
// 	 		let tabid = $(this).data('tabid');
// 	 		$curriculumList.each(function(i, elem) {
// 	 			let that = $(this);
// 	 			that.children().each(function(index, element) {
// 	 				if ($(this).attr('id') === tabid) {
// 	 					$(this).children().trigger('click');
// 	 					$('html, body').animate({ scrollTop: 0 }, 'fast');
// 	 				}
// 	 			});
// 	 		});
// 	 	});

// 	 	$('a').click(function() {
// 	 		customFunctions.stickyFooter();
// 	 		checkFooter();
// 	 	});
	 	
// 	});

// })(jQuery);
