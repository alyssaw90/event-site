'use strict';

$(document).ready(function () {
	var $adminHeader = $('#admin-header');
	var $chooseEventToEdit = $('#chooseEventToEdit');
	var $editPageMenu = $('#editPageMenu');
	var $homeButton = $('#admin-home-menu-tab');
	var $chooseEventButton = $('#chooseEventButton');
	var $editScheduleButton = $('#editScheduleButton');
	var $editOverviewButton = $('#editOverviewButton');
	var $editMenuTab = $('#edit-event-menu-tab');
	var $editScheduleTab = $('#editSchedule');
	var $editOVerviewTab = $('#editOVerview');

	$('.menu').children().click(function () {
		$('.menu').children().removeClass('current');
		$(this).addClass('current');
	});

	$homeButton.click(function () {
		location.reload();
	});

	$editMenuTab.click(function () {
		$editPageMenu.show();
		$adminHeader.html('<h1>What would you like to do?</h1>');
		$('#mainAdmin').children().hide();
	});

	$('#editSchedule, #editOVerview').click(function (e) {

		$chooseEventToEdit.siblings().hide();
		$chooseEventToEdit.show();
		$adminHeader.html('<h1>Pick an Event</h1>');
		if ($(this).attr('id') === 'editSchedule') {
			$editScheduleTab.parent().addClass('highlight');
			$editScheduleTab.parent().siblings().removeClass('highlight');
			$editScheduleButton.siblings('button').hide()
			$editScheduleButton.show();
		}
		if ($(this).attr('id') === 'editOVerview') {
			$editOVerviewTab.parent().addClass('highlight');
			$editOVerviewTab.parent().siblings().removeClass('highlight');
			$editOverviewButton.siblings('button').hide();
			$editOverviewButton.show();
		}
	});
})

