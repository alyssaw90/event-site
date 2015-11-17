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
	var $eventNames = $('#eventNames');

	// tinymce.init({selector:'textarea'});

	tinymce.init({
    selector: "textarea",
    theme: "modern",
    plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern imagetools"
    ],
    toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    toolbar2: "print preview media | forecolor backcolor emoticons",
    image_advtab: true,
    templates: [
        {title: 'Test template 1', content: 'Test 1'},
        {title: 'Test template 2', content: 'Test 2'}
    ]
	});

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
			$adminHeader.html('<h3>Add Item to schedule or Delete Item Below</h3>');
			$editScheduleTab.parent().addClass('highlight');
			$editScheduleTab.parent().siblings().removeClass('highlight');
			$editScheduleButton.siblings('button').hide()
			$editScheduleButton.show();
		}
		if ($(this).attr('id') === 'editOVerview') {
			$adminHeader.html('<h3>Add Overview Heading or Paragraph</h3>');
			$editOVerviewTab.parent().addClass('highlight');
			$editOVerviewTab.parent().siblings().removeClass('highlight');
			$editOverviewButton.siblings('button').hide();
			$editOverviewButton.show();
		}
	});

	$.get('/events', function (eventsData) {
		//add current events to form 
		var theOptions = '';
		for (var i = 0, j = eventsData.length; i < j; i++) {
			theOptions += '<option value="' + eventsData[i].id + '" data-eventName="' +  eventsData[i].eventName + '">' + eventsData[i].eventName + '</option>';
		}
		$eventNames.append(theOptions);
	})

})

