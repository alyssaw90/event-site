'use strict';

$(document).ready(function () {
	var $addEventSection = $('#addEventSection');
	var $adminHeader = $('#admin-header');
	var $addEventMenuTab = $('#add-event-menu-tab');
	var $createEventForm = $('#createEventForm');
	var $editPageMenu = $('#editPageMenu');
	var $addImageForm = $('#addImageForm');

	function submitForm(formId, submitUrl) {
    var fd = new FormData(document.getElementById(formId));
    fd.append('label', 'WEBUPLOAD');
    $.ajax({
      url: submitUrl,
      type: 'POST',
      data: fd,
      enctype: 'multipart/form-data',
      processData: false,  // tell jQuery not to process the data
      contentType: false   // tell jQuery not to set contentType
    }).done(function( data ) {
        console.log('Node Output:');
        console.log( data );
    });
	}

	$addEventMenuTab.click(function () {
		$('#mainAdmin').children().hide();
		$adminHeader.html('<h1>Create Your Event</h1>');
		$addEventSection.show();
	});

	$createEventForm.submit(function (event) {
		event.preventDefault();
		tinyMCE.triggerSave();
		submitForm('createEventForm', '/createevent');
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


	$addImageForm.submit(function (event) {
		event.preventDefault();
		submitForm('addImageForm', '/addimage');
	})
});