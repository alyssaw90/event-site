'use strict';

$(function () {
	var $emailButton = $('#emailButton');

	$emailButton.click(function () {
		console.log($('#emailBody').val());
		$emailButton.attr('href', 'mailto:plugfests@microsoft.com?subject=' + $('#emailSubject').val() + '&body=' + $('#emailBody').val());
	})
})