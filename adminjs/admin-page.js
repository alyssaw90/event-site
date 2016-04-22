'use strict';

(function($) {
	$(function() {
			var $createEventForm = $('#createEventForm');
			var $newEventSpeakers = $('#newEventSpeakers');
			var $addSpeakersDiv = $('#addSpeakersDiv');
			var $chooseSpeakerCount = $('#chooseSpeakerCount');
			var $addSpeakersForm = $('#addSpeakersForm');
			var $addTabsDiv = $('#addTabsDiv');
			var $addTabsButton = $('#addTabsButton');
			var $addTabsForm = $('#addTabsForm');
      var $imagesDiv = $('#imagesDiv');
      var $addEventTabImage = $('#addEventTabImage');
      var $addImageForm = $('#addImageForm');
      var $refreshEvent = $('#refreshEvent');
      var $editEventSection = $('#editEventSection');
      var $editFormSection = $('#editFormSection');
      var $showAllEvents = $('#showAllEvents');
      var $editEventSection = $('#editEventSection');
      var $chooseTabToEdit = $('#chooseTabToEdit');
      var $editFormSection = $('#editFormSection');
      var $editEventForm = $('#editEventForm');
      var $editEventForm = $('#editEventForm');
      var $addTabImage = $('#addTabImage');
      var $newImagesDiv = $('#newImagesDiv');
      var $addTabImage = $('#addTabImage');
      var $addEditedTabsButton = $('#addEditedTabsButton');
      var $cancelButton = $('#cancelButton');
      var tabCount = 1;
			var newEventId;
      //make footer stick to bottom of content or page, whichever is taller.
      var stickyFooter = function() {
        var $window = $(window);
        var $document = $(document);
        var $footer = $('.foot');
        var $backToTopButton = $('.scroll-button');
        if ($window.height() <= $document.height()) {
          $footer.css('position', 'relative');
        }
        if ($window.height() > $document.height()) {
          $footer.css('position', 'absolute').css('bottom', 0);
        }
        if ($window.height() < $document.height() - 200 && $window.width() < 768) {
          $backToTopButton.show();
        }
        if ($window.height() > $document.height() - 200 || $window.width() >= 768) {
          $backToTopButton.hide();
        }
      
      }
      
      //special sticky footer for homepage that switches equals signs in the if statements
      var homepageStickyFooter = function() {
        var $window = $(window);
        var $document = $(document);
        var $footer = $('.foot');
        var $backToTopButton = $('.scroll-button');
      
        if ($window.height() < $document.height()) {
          $footer.css('position', 'relative');
        }
        if ($window.height() >= $document.height()) {
          $footer.css('position', 'absolute').css('bottom', 0);
        }
        if ($window.height() < $document.height() - 200 && $window.width() < 768) {
          $backToTopButton.show();
        }
        if ($window.height() > $document.height() - 200 || $window.width() >= 768) {
          $backToTopButton.hide();
        }
      }

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

/*      function submitFormWithCallback(formId, submitUrl, callback) {
        var fd = new FormData(document.getElementById(formId));
        fd.append('label', 'WEBUPLOAD');
        $.ajax({
          url: submitUrl,
          type: 'POST',
          data: fd,
          enctype: 'multipart/form-data',
          processData: false,  // tell jQuery not to process the data
          contentType: false,   // tell jQuery not to set contentType
        })
        .done(function(data) {
            // console.log('Node Output:');
          if (callback && typeof callback === 'function') { callback(); }
        })
        .fail(function(error) {
          console.log(error);
        })
      }
*/
      function showImages() {
        $.ajax({
          type: 'GET',
          url: '/showimages',
          success: function(data2) {
            $imagesDiv.html(data2);
          },
          error: function(err) {
            console.log(err);
          }
        })
      }

      function showImages2() {
        $.ajax({
          type: 'GET',
          url: '/showimages',
          success: function(data3) {
            $newImagesDiv.html(data3);
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

      $cancelButton.click(function() {
        location.reload();
      })

      
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
            //do something on success
          }
        });
        showImages();
      });

      $addImageForm.submit(function(e) {
        e.preventDefault();
        submitForm('addImageForm', 'addimage');
        showImages();

      });

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
      });


      //Add current events to Edit Events tab
      $.get('/allevents', function(data) {
        var eventsList = '<ul>';
        for (var i = 0, j = data.length; i < j; i++) {
          eventsList += '<li><button class="editEventButton" id="' + data[i].eventUrl + 'Button" data-eventUrl="' + data[i].eventUrl + '">' + data[i].eventName + ', ' + data[i].eventLocation + ', ' + data[i].eventStartDate + '</button></li>';
        }
        eventsList += '</ul>';
        $editEventSection.append(eventsList);
      })
      .done(function() {
        //find the event the user wants to edit
        $('.editEventButton').click(function(e) {
          e.preventDefault();
          $(this).parent().siblings('li').hide();
          $showAllEvents.show();
          $.ajax({
            url: '/findeventtoedit',
            type: 'post',
            data: {eventUrl: $(this).data('eventurl')}
          })
          .done(function(event) {
            //show the choices for what to edit
            $('#chooseWhatToEdit').show(function() {
              //actions to take depending on what the user wants to edi
              $('.pickWhatToEditButton').click(function(e) {
                var whatToEdit = $(this).data('whattoedit');
                $editFormSection.html(event[whatToEdit])
                .promise()
                .done(function() {
                  $('#editEventForm').submit(function(e) {
                    e.preventDefault();
                    var actionUrl = $('#editEventForm').attr('action');

                    if (actionUrl === '/addimage') {

                      submitFormWithCallback('editEventForm', actionUrl, null);
                    }

                    if (actionUrl === '/editevent') {
                      $.post(actionUrl, $('#editEventForm').serialize(), function(data, textStatus, xhr) {
                        
                      });

                    }

                    $('#editEventForm')[0].reset();
                    $editFormSection.html('<h3>Saved</h3>');

                  });

                  //when the speaker count form is submitted, call the contacts API and create the form with the desired number of speakers
                  $('#editSpeakerCount').submit(function(e) {
                    e.preventDefault();
                    var addSpeakersEventId = $('#eventId').val();
                    var newSpeakerCount = $('#editSpeakerCount').serializeArray();
                    var numSpeakers = newSpeakerCount[0].value;
                    var newSpeakersHtml = '';
                    var newSpeakerMenuInput = '';
                    
                    $.get('/contacts', function(data) {
                      for (var i = 0; i < numSpeakers; i++) {
                        var thisNameDivId = 'speakers' + i;
                        newSpeakerMenuInput = '<select name="' + thisNameDivId + '" id="' + thisNameDivId + '">';
                        for (var ii = 0, jj = data.length; ii < jj; ii++) {
                          newSpeakerMenuInput += '<option value="' + data[ii].id + '">' + data[ii].fullName + '</option>';
                          if (ii === data.length -1) {
                            newSpeakerMenuInput += '</select>';
                            newSpeakersHtml += newSpeakerMenuInput;
                          }
                        }
                      }

                      newSpeakersHtml += '<button class="medium" id="addNewSpeakersButton" type="submit">Add Speakers</button>';
                      $('#editSpeakerCount').hide();
                      $('#newAddSpeakersForm').append(newSpeakersHtml);
                      //when the speakers form is submitted create the string for the speakers and save post it to the addspeakers route
                      $('#newAddSpeakersForm').submit(function(e) {
                        e.preventDefault();
                        var newSpeakersArr = [];
                        var newSpeakersStr = '';
                        $('[id^=speakers]').each(function(i, elem) {
                          newSpeakersArr.push($(this).val());
                        });
                        newSpeakersStr = newSpeakersArr.join(',');
                        $.ajax({
                          type: 'POST',
                          url: 'addspeakers',
                          data: {speakers: newSpeakersStr, eventId: addSpeakersEventId},
                          success: function(data) {
                            //do something on success
                          }
                        });
                        $('#newAddSpeakersForm').hide();
                        $editFormSection.show().html('<h3>Saved</h3>');
                      });

                    })
                  });

                  $('#chooseTabToEditButton').click(function(e) {
                    e.preventDefault();
                    var tabId = $("input[name=chooseEventToEdit]:checked").val();
                    
                    $.post('/eventTabs', {tabId: tabId}, function(data, textStatus, xhr) {
                      console.log(data);
                      $editEventForm.show();
                      $addTabImage.show();

                      // tinyMCE.get('editEventTabTextArea').setContent(data.tabContent);
                      tinymce.init({
                        selector: '#editEventForm',
                        theme: 'modern',
                        plugins: [
                        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                        'searchreplace wordcount visualblocks visualchars code fullscreen',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'emoticons template paste textcolor colorpicker textpattern imagetools',
                        ],
                        paste_data_images: true,
                        inline: true,
                        init_instance_callback : function() {                                                   
                          tinyMCE.activeEditor.setContent(data.tabContent);
                          $('#editTabsSection').show();
                          $('#tabId').val(data.tabId);
                          $('#eventId').val(data.eventId);
                          $('#editedTabName').val(data.tabTitle);
                          $('#editedTabPosition').val(data.tabNumber);
                          showImages2();
                        }
                      });

                    });
                  })
                  // $('#editEventTabs').submit(function(ee) {
                  //   ee.preventDefault();
                  //   $.post('/eventTabs', $("input[name=chooseEventToEdit]:checked").val(), function(data, textStatus, xhr) {
                  //     /*optional stuff to do after success */
                  //   });
                  // });

                })
              });
            });
          })
          .fail(function() {
            console.log('error');
          })
          .always(function() {
            console.log('complete');
          });
          
        });
        
      });
      
      //show all events to edit and hide edit tabs
      $showAllEvents.click(function() {
        $editEventSection.find('li').each(function(i, elem) {
          $(this).show();
        });
        $('#chooseWhatToEdit').hide();
        $chooseTabToEdit.hide();
        $editFormSection.hide();
        $editEventForm.hide();
      });

      //save images added with addTabImage form
      $('#addTabImage').submit(function(e) {
        e.preventDefault();
        submitForm('addTabImage', 'addimage')
        showImages2();

      });

      //save data from edit tabs form
      $addEditedTabsButton.click(function(e) {
        e.preventDefault();
        tinyMCE.triggerSave();
        var newTabHtmlContent = tinyMCE.activeEditor.getContent();
        console.log('newEventId       ', tinyMCE.activeEditor.getContent());
        $.post('/edittab', {
          tabId: $('#tabId').val(),
          tabNumber: $('#newTabPosition').val(),
          tabTitle: $('#editedTabName').val(),
          tabContent: newTabHtmlContent
        })
        .done(function(data) {
          // reset the tab form
         $('#editEventForm')[0].reset();
         $('#newTabInfoForm')[0].reset();
         location.reload();
          // tinymce.get('newEventTabTextArea').setContent(''); 
        })
      })

	});
})(jQuery);