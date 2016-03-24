'use strict';

/* jshint shadow:true */
/*global $ */
/*global document */
/*global $ */
/*global stickyFooter */
/*global window */
/*global MutationObserver */
/* jshint loopfunc:true */
/*global homepageStickyFooter*/
/*global logout*/

$(function () {
	var $curriculumLogoutButton = $('#curriculumLogoutButton');
	var $taipei1016Eng = $('.taipei1016-eng');
	var $taipei2016Cn = $('.taipei2016-cn');
	var $taipei2016ChineseCurriculum = $('#taipei2016-chinese-curriculum');
	var $taipei2016EnglishCurriculum = $('#taipei2016-english-curriculum');
	var $welcomeTab = $('.welcomeTab');
	var $curriculumList = $('.curriculumList');
	var languageSection = window.location.href.slice(-3);
	function checkFooter() {
		setTimeout(function() {
			if ($('html').height() > $(window).height()) {
				homepageStickyFooter();
			}
			if ($('html').height() <= $(window).height()) {
				stickyFooter();
			}
			
		}, 500);
	}

	// checkFooter();

	if (languageSection === '-en') {
		$taipei2016EnglishCurriculum.show();
		$taipei2016ChineseCurriculum.hide();
	} else {
		$taipei2016EnglishCurriculum.hide();
		$taipei2016ChineseCurriculum.show();	
	}


 	$curriculumLogoutButton.click(logout);
	
 	$taipei2016Cn.click(function(e) {
 		e.preventDefault();
 		$taipei2016ChineseCurriculum.show();
 		$taipei2016EnglishCurriculum.hide();
	
 	});
 	$taipei1016Eng.click(function(e) {
 		e.preventDefault();
 		$taipei2016EnglishCurriculum.show();
 		$taipei2016ChineseCurriculum.hide();
 	});
	
 	$welcomeTab.click(function(e) {
 		e.preventDefault();
 		var tabid = $(this).data('tabid');
 		$curriculumList.each(function(i, elem) {
 			var that = $(this);
 			that.children().each(function(index, element) {
 				if ($(this).attr('id') === tabid) {
 					$(this).children().trigger('click');
 					$('html, body').animate({ scrollTop: 0 }, 'fast');
 				}
 			});
 		});
 	});

 	$('a').click(function() {
 		stickyFooter();
 		checkFooter();
 		console.log($(window).innerHeight(), '    :::::::     ', $('html').height());
 	});
 	
});