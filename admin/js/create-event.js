'use strict';

$(document).ready(function () {
	var $addEventSection = $('#addEventSection');
	var $adminHeader = $('#admin-header');
	var $addEventMenuTab = $('#add-event-menu-tab');
	var $createEventForm = $('#createEventForm');
	var $editPageMenu = $('#editPageMenu');

	$addEventMenuTab.click(function () {
		$('#mainAdmin').children().hide();
		$adminHeader.html('<h1>Create Your Event</h1>');
		$addEventSection.show();
	});

	$createEventForm.submit(function (event) {
		event.preventDefault();
		console.log('hello');
		var $form = $(this);
		var $formData = $form.serialize();
		var $url = $form.attr('action');

		$.post($url, $formData)
		.done(function (data) {
			$editPageMenu.show();
			$adminHeader.html('<h1>What would you like to do?</h1>');
			$('#mainAdmin').children().hide();
		});
	});
});