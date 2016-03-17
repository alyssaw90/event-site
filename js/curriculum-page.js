'use strict';

$(function () {
	var $curriculumLogoutButton = $('#curriculumLogoutButton');
	var $taipei1016Eng = $('.taipei1016-eng');
	var $taipei2016Cn = $('.taipei2016-cn');
	var $taipei2016ChineseCurriculum = $('#taipei2016-chinese-curriculum');
	var $taipei2016EnglishCurriculum = $('#taipei2016-english-curriculum');
	$taipei2016EnglishCurriculum.hide();
	$taipei2016ChineseCurriculum.show();

	 $curriculumLogoutButton.click(logout);

	 $taipei1016Eng.click(function(e) {
	 	e.preventDefault();
	 	$taipei2016ChineseCurriculum.show();
	 	$taipei2016EnglishCurriculum.hide();

	 });
	 $taipei1016Eng.click(function(e) {
	 	e.preventDefault();
	 	$taipei2016EnglishCurriculum.show();
	 	$taipei2016ChineseCurriculum.hide();
	 });

})