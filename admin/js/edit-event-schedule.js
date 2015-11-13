'use strict';

$(document).ready(function () {
	var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var oneDay = 24 * 60 * 60 * 1000;
	var $adminHeader = $('#admin-header');
	var $editPageMenu = $('#editPageMenu');
	var $editScheduleButton = $('#editScheduleButton');
	var $deleteScheduleForm = $('#deleteScheduleForm');
	var $eventNames = $('#eventNames');
	var $scheduleForm = $('#scheduleForm');
	var $currentSchedule = $('#currentSchedule');

function loadScheduleForm () {
	event.preventDefault();
	var $theEventId = $eventNames.val();
	var $form = $(this);
	var $formData = $form.serialize();
	var $url = $form.attr('action');
	$.post($url, $formData)
	.done(function (data) {
	 	$scheduleForm[0].reset();
		$.get('/eventschedules', function (eventschedules) {
			var scheduleHtml = '<table cellspacing="0" cellpadding="0"><thead><tr><th>Day</th><th>Time</th><th>Description</th></tr></thead><tbody>';
			for (var i = 0, j = eventschedules.length; i < j; i++) {
				if (eventschedules[i].eventId == $theEventId) {
					scheduleHtml += '<tr><td><input type="checkbox" name="scheduleId" value="' + eventschedules[i].id + '" />&nbsp;</td><td>' + eventschedules[i].scheduleDay + '</td><td>' + eventschedules[i].scheduleTime + '</td><td>' + eventschedules[i].description + '</td></tr>';
				}
			}
			scheduleHtml += '</tbody></table><button class="medium" id="deleteScheduleItem" type="submit">Delete</button>';
			$deleteScheduleForm.empty().append(scheduleHtml);
		})
	})
}


	$.get('/events', function (eventsData) {

		$editScheduleButton.click(function (e) {
			var $theEventId = $eventNames.val();
			var $dailySchedule = $('#dailySchedule');
			var dayOptions = '';
			var testDate = new Date();
			var numDays = 0;
			$dailySchedule.show();
			$editPageMenu.show();
			$dailySchedule.siblings().hide();
  		e.preventDefault();

			$('#description').append('<input class="col_8" id="eventId" name="eventId" type="text submit" value="' + $theEventId + '" />');

  		for (var i = 0, j = eventsData.length; i < j; i++) {
  			if (eventsData[i].id == $theEventId) {
	  			var startDate = new Date(eventsData[i].eventStartDate);
	  			var endDate = new Date(eventsData[i].eventEndDate);
	  			var formDays = '';
  				$adminHeader.html('<h1>' + eventsData[i].eventName + '</h1>');
  				numDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay));
  				for (var i = 0; i <= numDays; i++) {
  					if (startDate.getDay() + i <= 6) {
  						dayOptions += '<option value="' + daysOfWeek[startDate.getDay() + i] + '">' + daysOfWeek[startDate.getDay() + i] + '</option>';
  					}
  					if (startDate.getDay() + i > 6) {
  						var multiplier = 7 * Math.ceil(i / 7);
  						dayOptions += '<option value="' + daysOfWeek[startDate.getDay() + i - multiplier] + '">' + daysOfWeek[startDate.getDay() + i - multiplier] + '</option>';
  					}
  				}

  				$('#scheduleDay').append(dayOptions);
  			}

  		}

  		$.get('/eventschedules', function (eventschedules) {

  			var scheduleHtml = '<form action="/deleteschedule" id="deleteScheduleForm" method="POST"><table cellspacing="0" cellpadding="0"><thead><tr><th>Day</th><th>Time</th><th>Description</th></tr></thead><tbody>';
  			for (var i = 0, j = eventschedules.length; i < j; i++) {
  				if (eventschedules[i].eventId == $theEventId) {
  					scheduleHtml += '<tr><td><input type="checkbox" name="scheduleId" value="' + eventschedules[i].id + '" />&nbsp;</td><td>' + eventschedules[i].scheduleDay + '</td><td>' + eventschedules[i].scheduleTime + '</td><td>' + eventschedules[i].description + '</td></tr>';
  				}
  			}
  			scheduleHtml += '</tbody></table><button class="medium" id="deleteScheduleItem" type="submit">Delete</button></form>';
  			$deleteScheduleForm.append(scheduleHtml);
  		})

  		 $scheduleForm.submit(loadScheduleForm);

			$deleteScheduleForm.submit(loadScheduleForm);

  	})

	})

})
