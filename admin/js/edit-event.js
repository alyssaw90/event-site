'use strict';

$(document).ready(function () {
	var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var oneDay = 24 * 60 * 60 * 1000;
	var $adminHeader = $('#admin-header');
	var $chooseEventToEdit = $('#chooseEventToEdit');
	var $editPageMenu = $('#editPageMenu');
	var $homeButton = $('#admin-home-menu-tab');
	/*$('#add-event-menu').children().click(function () {
		$(this).toggle();
	})*/
	$('.menu').children().click(function () {
		$('.menu').children().removeClass('current');
		$(this).addClass('current');
	});

	$homeButton.click(function () {
		location.reload();
	});

	$('#edit-event-menu-tab').click(function () {
		$editPageMenu.show();
		$adminHeader.html('<h1>What would you like to edit?</h1>');
		$('#mainAdmin').children().hide();
	});

	$('#editSchedule').click(function () {
		$chooseEventToEdit.siblings().hide();
		$chooseEventToEdit.show();
		$adminHeader.html('<h1>Pick an Event</h1>');
	});


	$.get('/events', function (eventsData) {
		//add current events to form 
		var theOptions = '';
		for (var i = 0, j = eventsData.length; i < j; i++) {
			theOptions += '<option value="' + eventsData[i].id + '" data-eventName="' +  eventsData[i].eventName + '">' + eventsData[i].eventName + '</option>';
		}
		$('#eventNames').append(theOptions);

		$('#chooseEventButton').click(function (event) {
			var $theEventId = $('#eventNames').val();
			var $dailySchedule = $('#dailySchedule');
			var dayOptions = '';
			var testDate = new Date();
			var numDays = 0;
			$dailySchedule.show();
			$editPageMenu.show();
			$dailySchedule.siblings().hide();
  		event.preventDefault();
			var theOptions = '';
			for (var i = 0, j = eventsData.length; i < j; i++) {
				theOptions += '<option value="' + eventsData[i].id + '" data-eventName="' +  eventsData[i].eventName + '">' + eventsData[i].eventName + '</option>';
			}

			$('#description').append('<input class="col_8" id="eventId" name="eventId" type="text submit" value="' + $theEventId + '" />')

			$('#eventNames').append(theOptions);
  		for (var i = 0, j = eventsData.length; i < j; i++) {
  			if (eventsData[i].id == $theEventId) {
	  			var startDate = new Date(eventsData[i].eventStartDate);
	  			var endDate = new Date(eventsData[i].eventEndDate);
	  			var formDays = '';
  				$adminHeader.html('<h1>' + eventsData[i].eventName + '</h1>');
  				numDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay));
  				for (var i = 0; i < numDays; i++) {
  					if (startDate.getDay() + i <= 6) {
  						dayOptions += '<option value="' + daysOfWeek[startDate.getDay() + i] + '">' + daysOfWeek[startDate.getDay() + i] + '</option>';
  					}
  					if (startDate.getDay() + i > 6) {
  						var multiplier = 7 * Math.ceil(i / 7);
  						dayOptions += '<option value="' + daysOfWeek[startDate.getDay() + i - multiplier] + '">' + daysOfWeek[startDate.getDay() + i - multiplier] + '</option>';
  					}
  				}
  				console.log(dayOptions);
  				$('#scheduleDay').append(dayOptions);
  			}

  		}

  		$.get('/eventschedules', function (eventschedules) {
  			console.log($theEventId);
  			var scheduleHtml = '<form action="/deleteschedule" id="deleteScheduleForm" method="POST"><table cellspacing="0" cellpadding="0"><thead><tr><th>Day</th><th>Time</th><th>Description</th></tr></thead><tbody>';
  			for (var i = 0, j = eventschedules.length; i < j; i++) {
  				if (eventschedules[i].eventId == $theEventId) {
  					scheduleHtml += '<tr><td><input type="checkbox" name="scheduleId" value="' + eventschedules[i].id + '" />&nbsp;</td><td>' + eventschedules[i].scheduleDay + '</td><td>' + eventschedules[i].scheduleTime + '</td><td>' + eventschedules[i].description + '</td></tr>';
  				}
  			}
  			scheduleHtml += '</tbody></table><button class="medium" id="deleteScheduleItem" type="submit">Delete</button></form>';
  			$('#currentSchedule').append(scheduleHtml);
  		})

  	})
		console.log(eventsData, eventsData.length);
	})

})
