'use strict';

$(document).ready(function () {
	var $addEventSection = $('#addEventSection');
	var $adminHeader = $('#admin-header');
	var $addEventMenuTab = $('#add-event-menu-tab');
	var $createEventForm = $('#createEventForm');
	var $editPageMenu = $('#editPageMenu');
	var $addImageForm = $('#addImageForm');
	var $newEventImages = $('#newEventImages');
	var $newImagesButton = $('#newImagesButton');
	$newEventImages.hide();

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
        // console.log('Node Output:');
        // console.log( data );
    });
	}

	$newImagesButton.click(function (event) {
		event.preventDefault();
	 	$newEventImages.toggle();
	})

	$.get('/showimages', function (data) {
		var imagesHtml = '';
		for (var i = 0, j = data.length; i < j; i++) {
			imagesHtml += '<div style="float: left; text-align: center; width: 200px; padding: 10px; margin: 10px;"><img src="../uploads/' + data[i].imageLink + '" width="100" /><p>/uploads/' + data[i].imageLink + '</p></div>';
		}
		// console.log(imagesHtml)
		$newEventImages.html(imagesHtml);
	})

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
		$editPageMenu.show();
		$adminHeader.html('<h1>What would you like to do?</h1>');
		$('#mainAdmin').children().hide();
	});


	$addImageForm.submit(function (event) {
		event.preventDefault();
		submitForm('addImageForm', '/addimage');
	})
});