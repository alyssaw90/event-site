'use strict';

(function ($) {
  $(function () {
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
    var $addTabToExistingEventButton = $('#addTabToExistingEventButton');
    var $addTabToExistingEventDiv = $('#addTabToExistingEventDiv');
    var $newImagesForEditedTabDiv = $('#newImagesForEditedTabDiv');
    var $editFormImageDiv = $('#editFormImageDiv');
    var $chooseEventToDelete = $('#chooseEventToDelete');
    var $addSpeakerButton = $('#addSpeakerButton');
    var $addNewSpeakerForm = $('#addNewSpeakerForm');
    var $addSpeakerDiv = $('#addSpeakerDiv');
    var tabCount = 1;
    var newEventId;
    var eventToEditId;

    //make footer stick to bottom of content or page, whichever is taller.
    var stickyFooter = function () {
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
    var homepageStickyFooter = function () {
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

    //function to submit form data that includes files
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
      .done(function (data) {
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
    //show images in div passed to function
    function showImages(divId) {
      $.ajax({
        type: 'GET',
        url: '/showimages',
        success: function (data2) {
          divId.html(data2);
        },
        error: function (err) {
          console.log(err);
        }
      })
    }

    //function to check database for changes and refresh  if any have been made

    function checkForChanges() {
      setTimeout(function () {
        var now = new Date();
        var before = new Date(now.getTime() - 2000);
        $.get('/allevents', function (data) {
          for (var i = 0, j = data.length; i < j; i++) {
            var changed = new Date(data[i].updatedAt) > before;
            if (changed) {
              location.reload();
              changed = false;
            }

          }
        });

        $.get('/contacts', function (data2) {
          for (var i = 0, j = data2.length; i < j; i++) {
            var changed2 = new Date(data2[i].updatedAt) > before;
            if (changed2) {
              location.reload();
              changed2 = false;
            }

          }
        });

        $.get('/alltabs', function (data3) {
          for (var i = 0, j = data3.length; i < j; i++) {
            var changed3 = new Date(data3[i].updatedAt) > before;
            if (changed3) {
              location.reload();
              changed3 = false;
            }

          }
        });

      }, 100);
    }



    //use clipboard to enable copying to system clipboard see https://clipboardjs.com/ for details on how it works
    new Clipboard('.imageToInsert');

    //initiate #newEventTabTextArea as a tinymce form see https://www.tinymce.com/ for more details on how it works
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

    tinymce.init({
      selector: '#addTabToExistingEventTextArea',
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

    //set cancel button to reload page
    $cancelButton.click(function () {
      location.reload();
    });

    //submit the create event form and show the speakers div to decide on speaker count, this created the initial event item in the database
    $createEventForm.submit(function (e) {
      e.preventDefault();
      submitForm('createEventForm', 'createevent');
      $addSpeakersDiv.show();
    });

    //once the speaker count has been decided create that number of dropdown forms listing all available speakers
    $chooseSpeakerCount.submit(function (e) {
      e.preventDefault();
      var speakerCount = $chooseSpeakerCount.serializeArray();
      var numSpeakers = speakerCount[0].value;
      var speakersHtml = '';
      var speakerMenuInput = '';

      $.get('/contacts', function (data) {
        for (var i = 0; i < numSpeakers; i++) {
          var thisNameDivId = 'speakers' + i;
          speakerMenuInput = '<select name="' + thisNameDivId + '" id="' + thisNameDivId + '">';
          for (var ii = 0, jj = data.length; ii < jj; ii++) {
            speakerMenuInput += '<option value="' + data[ii].id + '">' + data[ii].fullName + '</option>';
            if (ii === data.length - 1) {
              speakerMenuInput += '</select>';
              speakersHtml += speakerMenuInput;
            }
          }
        }

        speakersHtml += '<button class="medium" id="addEventButton" type="submit">Add Speakers</button>';
        $addSpeakersForm.append(speakersHtml);

      })
    });

    //when the speakers form has been submitted, turn their IDs into a comma deliminated string and add it to the created event
    $('#addSpeakersForm').submit(function (e) {
      e.preventDefault();
      var speakersArr = [];
      var speakersStr = '';
      $addTabsDiv.show();
      $('[id^=speakers]').each(function (i, elem) {
        speakersArr.push($(this).val());
      });
      speakersStr = speakersArr.join(',');
      $.ajax({
        type: 'POST',
        url: 'addeventspeakers',
        data: { speakers: speakersStr, eventId: newEventId },
        success: function (data) {
          //do something on success
        }
      });
      showImages($imagesDiv);
    });

    $addImageForm.submit(function (e) {
      e.preventDefault();
      submitForm('addImageForm', 'addimage');
      showImages($imagesDiv);

    });

    //add tab EventTabs in database and then reset the form
    $addTabsForm.submit(function (e) {
      e.preventDefault();
      tabCount++;
      tinyMCE.triggerSave();
      var tabHtmlContent = tinyMCE.get('newEventTabTextArea').getContent();
      $.post('/addtabs', {
        eventId: newEventId,
        tabNumber: $('#newTabPosition').val(),
        tabTitle: $('#newTabName').val(),
        tabContent: tabHtmlContent
      })
      .done(function (data) {
        // reset the tab form
        $addTabsButton.text('Add tab number ' + tabCount);
        $addTabsForm[0].reset();
        // tinymce.get('newEventTabTextArea').setContent(''); 
      })
    })

    $refreshEvent.click(function (e) {
      e.preventDefault();
      location.reload();
    });


    /*/////////////////////////////////////////////////
    *
    *
    *  This section below is for editing and deleting existing events and their content
    *
    *
    *      
    /////////////////////////////////////////////////*/


    //Add current events to Edit Events tab
    $.get('/allevents', function (data) {
      let eventsList = '<ul>';
      let eventsToDeleteList = '<ul>';
      for (var i = 0, j = data.length; i < j; i++) {
        let currentEventDate = new Date(data[i].eventStartDate).toDateString();
        //buttons to choose event to edit
        eventsList += `<li><button class="editEventButton" id="${data[i].eventUrl}Button" data-eventUrl="${data[i].eventUrl}">${data[i].eventName}, ${data[i].eventLocation}, ${currentEventDate}</button></li>`;
        //button to choose event to delete
        eventsToDeleteList += `<li><button class="deleteEventButton" id="${data[i].eventUrl}DeleteButton" data-eventId="${data[i].id}" data-eventName="${data[i].eventName}">${data[i].eventName}, ${data[i].eventLocation}, ${currentEventDate}</button></li>`;
      }
      eventsList += '</ul>';
      eventsToDeleteList += '</ul>';
      $chooseEventToDelete.append(eventsToDeleteList);
      $editEventSection.append(eventsList);
    })
    .done(function () {
      /*Begin Event Deleting Section*/
      $('.deleteEventButton').click(function (e) {
        e.preventDefault();
        console.log($(this).data());
        let $this = $(this);
        let eventToBeDeleted = $this.data('eventname');
        let eventToBeDeletedId = $this.data('eventid');
        if (window.confirm(`Are you sure you want to delete the "${eventToBeDeleted}" event? WARNING: THIS CANNOT BE UNDONE`)) {
          var eventToDeleteId = $this.data('eventid');
          $.post('/deleteevent', {
            eventToBeDeletedId: eventToBeDeletedId
          }, function (data, textStatus, xhr) {
            alert(`${eventToBeDeleted} has been deleted`);
            location.reload();
          });
        } else {
          checkForChanges();
        }
      });
      /*End Event Deletion Section*/

      /*Begin Event Editing Section*/
      //find the event the user wants to edit
      $('.editEventButton').click(function (e) {
        e.preventDefault();
        $(this).parent().siblings('li').hide();
        $showAllEvents.show();
        $.ajax({
          url: '/findeventtoedit',
          type: 'post',
          data: { eventUrl: $(this).data('eventurl') }
        })
        .done(function (event) {
          eventToEditId = event.eventToEditId
          //show the choices for what to edit
          $('#chooseWhatToEdit').show(function () {
            //actions to take depending on what the user wants to edi
            $('.pickWhatToEditButton').click(function (e) {
              var whatToEdit = $(this).data('whattoedit');
              console.log(whatToEdit);
              if (whatToEdit !== 'addTabToExistingEventButton') {
                // $('#editTabsSection').hide();
                $addTabToExistingEventDiv.hide();
              }
              $('#editEventForm')[0].reset();
              $editFormSection.html(event[whatToEdit])
              .promise()
              .done(function () {
                var actionUrl = $('#editEventForm').attr('action');
                if (actionUrl === 'savenewimage') {
                  showImages($editFormImageDiv);
                }
                $('#editEventForm').submit(function (e) {
                  e.preventDefault();

                  if (actionUrl === 'savenewimage') {
                    submitForm('editEventForm', '/addimage');
                  }

                  if (actionUrl === 'edittheevent') {
                    $.post('/editevent', $('#editEventForm').serialize(), function (data, textStatus, xhr) {

                    });

                  }

                  $('#editEventForm')[0].reset();
                  $editFormSection.html('<h3>Saved</h3>');
                  checkForChanges();
                });

                //when the speaker count form is submitted, call the contacts API and create the form with the desired number of speakers
                $('#editSpeakerCount').submit(function (e) {
                  e.preventDefault();
                  var addSpeakersEventId = $('#eventId').val();
                  var newSpeakerCount = $('#editSpeakerCount').serializeArray();
                  var numSpeakers = newSpeakerCount[0].value;
                  var newSpeakersHtml = '';
                  var newSpeakerMenuInput = '';

                  $.get('/contacts', function (data) {
                    for (var i = 0; i < numSpeakers; i++) {
                      var thisNameDivId = 'speakers' + i;
                      newSpeakerMenuInput = '<select name="' + thisNameDivId + '" id="' + thisNameDivId + '">';
                      for (var ii = 0, jj = data.length; ii < jj; ii++) {
                        newSpeakerMenuInput += '<option value="' + data[ii].id + '">' + data[ii].fullName + '</option>';
                        if (ii === data.length - 1) {
                          newSpeakerMenuInput += '</select>';
                          newSpeakersHtml += newSpeakerMenuInput;
                        }
                      }
                    }

                    newSpeakersHtml += '<button class="medium" id="addNewSpeakersButton" type="submit">Add Speakers</button>';
                    $('#editSpeakerCount').hide();
                    $('#newAddSpeakersForm').append(newSpeakersHtml);
                    //when the speakers form is submitted create the string for the speakers and save post it to the addeventspeakers route
                    $('#newAddSpeakersForm').submit(function (e) {
                      e.preventDefault();
                      var newSpeakersArr = [];
                      var newSpeakersStr = '';
                      $('[id^=speakers]').each(function (i, elem) {
                        newSpeakersArr.push($(this).val());
                      });
                      newSpeakersStr = newSpeakersArr.join(',');
                      $.ajax({
                        type: 'POST',
                        url: 'addeventspeakers',
                        data: { speakers: newSpeakersStr, eventId: addSpeakersEventId },
                        success: function (data) {
                          //do something on success
                        }
                      });
                      $('#newAddSpeakersForm').hide();
                      $editFormSection.show().html('<h3>Saved</h3>');
                      checkForChanges();
                    });

                  })
                });

                $('#chooseTabToDeleteButton').click(function (e) {
                  e.preventDefault();
                  var tabToDeleteParentEvent = $('input[name=chooseEventToEdit]:checked').attr('data-eventname');
                  var tabToDeleteName = $('input[name=chooseEventToEdit]:checked').attr('data-tabname');
                  if (window.confirm(`Are you sure you want to delete the "${tabToDeleteName}" tab frome the "${tabToDeleteParentEvent}" event? WARNING: THIS CANNOT BE UNDONE`)) {
                    var tabToDeleteId = $('input[name=chooseEventToEdit]:checked').val();
                    $.post('/deletetab', {
                      tabToDeleteId: tabToDeleteId
                    }, function (data, textStatus, xhr) {
                      alert(`"${tabToDeleteName}" tab" has been deleted from the ${tabToDeleteParentEvent} event`);
                      location.reload();
                    });
                  } else {
                    checkForChanges();
                  }
                });

                $('#chooseTabToEditButton').click(function (e) {
                  e.preventDefault();
                  var tabId = $("input[name=chooseEventToEdit]:checked").val();
                  //reset tinymce
                  tinymce.remove('#editEventForm');

                  $.post('/eventTabs', { tabId: tabId }, function (data, textStatus, xhr) {
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
                      init_instance_callback: function () {
                        tinyMCE.activeEditor.setContent(data.tabContent);
                        $('#editTabsSection').show();
                        $('#tabId').val(data.tabId);
                        $('#eventId').val(data.eventId);
                        $('#editedTabName').val(data.tabTitle);
                        $('#editedTabPosition').val(data.tabNumber);
                        showImages($newImagesDiv);
                      }
                    });

                  });
                  $('#editEventForm')[0].reset();
                  checkForChanges();
                });

              });
            });
          });
          /*End Event Editing Section*/

        })
        .fail(function () {
          console.log('error');
        })
        .always(function () {
          console.log('complete');
        });

      });

    });

    $('#addTabToExistingEventButton').click(function (e) {
      // e.preventDefault();
      $editFormSection.html('');
      showImages($newImagesForEditedTabDiv);
      $('#addTabToExistingEventDiv').show();

      $('#addNewTabToEventButton').click(function (e) {
        // e.preventDefault();
        // tinyMCE.triggerSave();
        var newTabHtml = tinyMCE.get('addTabToExistingEventTextArea').getContent();
        $.post('/addtabs', {
          eventId: eventToEditId,
          tabNumber: $('#addedTabPosition').val(),
          tabTitle: $('#addedTabName').val(),
          tabContent: newTabHtml
        })
        .done(function (data) {
          checkForChanges();
        })
      });


    });

    //show all events to edit and hide edit tabs
    $showAllEvents.click(function () {
      $editEventSection.find('li').each(function (i, elem) {
        $(this).show();
      });
      $('#chooseWhatToEdit').hide();
      $addTabToExistingEventDiv.hide();
      $chooseTabToEdit.hide();
      $editFormSection.hide();
      $editEventForm.hide();
    });

    //save images added with addTabImage form
    $('#addTabImage').submit(function (e) {
      e.preventDefault();
      submitForm('addTabImage', 'addimage')
      showImages($newImagesDiv);

    });

    //save images added with addNewEventTabImageForm form
    $('#addNewEventTabImageForm').submit(function (e) {
      e.preventDefault();
      submitForm('addNewEventTabImageForm', 'addimage')
      showImages($newImagesForEditedTabDiv);

    });

    //save data from edit tabs form
    $addEditedTabsButton.click(function (e) {
      e.preventDefault();
      tinyMCE.triggerSave();
      var newTabHtmlContent = tinyMCE.activeEditor.getContent();
      $.post('/edittab', {
        tabId: $('#tabId').val(),
        tabNumber: $('#newTabPosition').val(),
        tabTitle: $('#editedTabName').val(),
        tabContent: newTabHtmlContent
      })
      .done(function (data) {
        // reset the tab form
        $('#editEventForm')[0].reset();
        $('#newTabInfoForm')[0].reset();
        location.reload();
        // tinymce.get('newEventTabTextArea').setContent(''); 
      })
    })

    /*//////////////////////////////////////////////////////////////////
  
    The Routes below are for adding, editing and deleting speakers
  
    *//////////////////////////////////////////////////////////////////

    $addSpeakerButton.click(function(e) {
      e.preventDefault();

      submitForm('addNewSpeakerForm', 'addspeakers');
      $addNewSpeakerForm.reset();
      alert('New speaker added');

    });

  });
})(jQuery);