'use strict';

$(document).ready(function () {
	var $adminHeader = $('#admin-header');
	var $chooseEventToEdit = $('#chooseEventToEdit');
	var $editPageMenu = $('#editPageMenu');
	var $homeButton = $('#admin-home-menu-tab');
	var $chooseEventButton = $('#chooseEventButton');
	var $editScheduleButton = $('#editScheduleButton');
	var $editOverviewButton = $('#editOverviewButton');

	$('.menu').children().click(function () {
		$('.menu').children().removeClass('current');
		$(this).addClass('current');
	});

	$homeButton.click(function () {
		location.reload();
	});

	$('#edit-event-menu-tab').click(function () {
		$editPageMenu.show();
		$adminHeader.html('<h1>What would you like to do?</h1>');
		$('#mainAdmin').children().hide();
	});

	$('#editSchedule, #editOVerview').click(function (e) {
		console.log($(this).attr('id') === 'editSchedule');
		// $(this).append(" Clicked");
		$chooseEventToEdit.siblings().hide();
		$chooseEventToEdit.show();
		$adminHeader.html('<h1>Pick an Event</h1>');
		if ($(this).attr('id') === 'editSchedule') {
			// $chooseEventButton.attr('id', 'editScheduleButton');
			$editScheduleButton.show();
		}
		if ($(this).attr('id') === 'editOVerview') {
			$editOverviewButton.show();
		}
	});
})