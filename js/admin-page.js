'use strict';

(function($) {
	$(function() {
			var $createEventForm = $('#createEventForm');
			var $newEventSpeakers = $('#newEventSpeakers');
			var $addSpeakersDiv = $('#addSpeakersDiv');
			var $chooseSpeakerCount = $('#chooseSpeakerCount');
			var $addSpeakersForm = $('#addSpeakersForm');
			var $addSpeakersForm = $('#addSpeakersForm');
			var $addTabsDiv = $('#addTabsDiv');
			var $addTabsButton = $('#addTabsButton');
			var $addTabsForm = $('#addTabsForm');
      var $imagesDiv = $('#imagesDiv');
      var $addEventTabImage = $('#addEventTabImage');
      var $addImageForm = $('#addImageForm');
      var $refreshEvent = $('#refreshEvent');
      var tabCount = 1;
			var newEventId;

     /* tinymce.activeEditor.uploadImages(function(success) {
        $.post('/addimage', tinymce.activeEditor.getContent()).done(function() {
          console.log("Uploaded images and posted content as an ajax request.");
        });

        var content = tinymce.activeEditor.getContent();
        console.log(content);
      });
*/
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
        })
        .done(function(data) {
            // console.log('Node Output:');
          newEventId = data;
        });
      }

      function submitFormWithCallback(formId, submitUrl, callback) {
        var fd = new FormData(document.getElementById(formId));
        fd.append('label', 'WEBUPLOAD');
        $.ajax({
          url: submitUrl,
          type: 'POST',
          data: fd,
          enctype: 'multipart/form-data',
          processData: false,  // tell jQuery not to process the data
          contentType: false   // tell jQuery not to set contentType
        })
        .done(function(data) {
            // console.log('Node Output:');
          if (callback && typeof callback === 'function') { callback(); }
        });
      }

      function showImages() {
        $.ajax({
          type: 'GET',
          url: '/showimages',
          success: function(data2) {
            console.log(data2);
            $imagesDiv.html(data2);
          },
          error: function(err) {
            console.log(err);
          }
        })
      }

      new Clipboard('.imageToInsert');

      tinymce.init({
        selector: '#newEventTabTextArea',
        theme: 'modern',
        plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools',
        ],
        paste_data_images: true,
        inline: true
      });

      $createEventForm.submit(function(e) {
        e.preventDefault();
        submitForm('createEventForm', 'createevent');
        $addSpeakersDiv.show();
      });

      $chooseSpeakerCount.submit(function(e) {
        e.preventDefault();
        var speakerCount = $chooseSpeakerCount.serializeArray();
        var numSpeakers = speakerCount[0].value;
        var speakersHtml = '';
        var speakerMenuInput = '';

        $.get('/contacts', function(data) {

          for (var i = 0; i < numSpeakers; i++) {
            var thisNameDivId = 'speakers' + i;
            speakerMenuInput = '<select name="' + thisNameDivId + '" id="' + thisNameDivId + '">';
            for (var ii = 0, jj = data.length; ii < jj; ii++) {
              speakerMenuInput += '<option value="' + data[ii].id + '">' + data[ii].fullName + '</option>';
              if (ii === data.length -1) {
                speakerMenuInput += '</select>';
                speakersHtml += speakerMenuInput;
	  					}
	  				}
	  			}

	  			speakersHtml += '<button class="medium" id="addEventButton" type="submit">Add Speakers</button>';
	  			$addSpeakersForm.append(speakersHtml);

  			})
  		});

  		$('#addSpeakersForm').submit(function(e) {
  			e.preventDefault();
  			var speakersArr = [];
  			var speakersStr = '';
  			$addTabsDiv.show();
  			$('[id^=speakers]').each(function(i, elem) {
  				speakersArr.push($(this).val());
  			});
  			speakersStr = speakersArr.join(',');
  			$.ajax({
  				type: 'POST',
  				url: 'addspeakers',
  				data: {speakers: speakersStr, eventId: newEventId},
  				success: function(data) {
            console.log(data);
          }
        });
        showImages();
      });

      $addImageForm.submit(function(e) {
        e.preventDefault();
        submitFormWithCallback('addImageForm', 'addimage', showImages);

      })

  /*		$.get('/contacts', function(data) {
  			var speakersHtml = '';
  			for (var i = 0, j = data.length; i < j; i++) {
  				// console.log(data[i]);
  				var thisSpeakerName = data[i].firstName + ' ' + data[i].lastName;
  				var thisSpeakerId = data[i].id;
  				var thisInputId = data[i].firstName.toLowerCase() + data[i].lastName.toLowerCase();
  				speakersHtml += '<input type="checkbox" id="speakersInput" name="speakersInput" value="' + thisSpeakerId + '">     </input><input type="text" id="speakersInput" name="speakersInput" placeholder="Order number">     </input><label for"speakersInput" class="inline">' + thisSpeakerName + '</label><br />'
  			}
  			$newEventSpeakers.append(speakersHtml);
  		});*/

  		$addTabsForm.submit(function(e) {
  			e.preventDefault();
        tabCount++;
        tinyMCE.triggerSave();
        var tabHtmlContent = tinyMCE.get('newEventTabTextArea').getContent();
        console.log('newEventId       ', tinyMCE.get('newEventTabTextArea').getContent());
  			$.post('/addtabs', {
  				eventId: newEventId,
  				tabNumber: $('#newTabPosition').val(),
  				tabTitle: $('#newTabName').val(),
  				tabContent: tabHtmlContent
  			})
        .done(function(data) {
          // reset the tab form
          $addTabsButton.text('Add tab number ' + tabCount);
          $addTabsForm[0].reset();
          // tinymce.get('newEventTabTextArea').setContent(''); 
        })
  		})

      $refreshEvent.click(function(e) {
        e.preventDefault();
        location.reload();
      })

	});
})(jQuery);