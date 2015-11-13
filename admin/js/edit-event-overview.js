'use strict';

$(document).ready(function () {
	var $adminHeader = $('#admin-header');
	var $eventNames = $('#eventNames');
	var $editOverviewButton = $('#editOverviewButton');
	var $editPageMenu = $('#editPageMenu');
	var $overviewSection = $('#overviewSection');
	var $submitNewOverviewButton = $('#submitNewOverviewButton');
	var $addOverviewForm = $('#addOverviewForm');
	var $deleteOverviewForm = $('#deleteOverviewForm');
	var $overviewParagraph = $('#overviewParagraph');

	function refreshOverviews () {
		event.preventDefault();
		var $theEventId = $eventNames.val();
		var $form = $(this);
		var $formData = $form.serialize();
		var $url = $form.attr('action');
		$.post($url, $formData)
		.done(function (data) {
			$addOverviewForm[0].reset();

			$.get('/eventoverviews', function (newEventOverviewsData) {
				var newOverviewHtml = '';
				for (var i = 0, j = newEventOverviewsData.length; i < j; i++) {
			
						if (newEventOverviewsData[i].eventId == $theEventId) {
						newOverviewHtml += '<input type="checkbox" style="float:left; margin: 25px 15px 0 0;" id="overviewId' + newEventOverviewsData[i].id + '" name="overviewId" value="' + newEventOverviewsData[i].id + '" /><label for="overviewId' + newEventOverviewsData[i].id + '" class="inline" style="margin-left:50px;"><h4>' + newEventOverviewsData[i].headingText + '</h4><br />' +  newEventOverviewsData[i].paragraphText + '</label> <br /><br />';
					}
				}
				newOverviewHtml += '<button class="medium" id="deleteOverviewItem" type="submit">Delete</button>';
				$deleteOverviewForm.html(newOverviewHtml);
			})
		})
	}


	// $.get('/events', function (eventsData) {

		$editOverviewButton.click(function (e) {
			e.preventDefault();
			var $theEventId = $eventNames.val();
			var overViewsHtml = '';
			$editPageMenu.show();
			$overviewSection.show();
			$overviewSection.siblings().hide();

			$overviewParagraph.append('<input class="col_8" id="eventId" name="eventId" type="text submit" value="' + $theEventId + '" />');

			$.get('/eventoverviews', function (eventOverviewsData) {
				console.log(eventOverviewsData)
				for (var i = 0, j = eventOverviewsData.length; i < j; i++) {
					
					if (eventOverviewsData[i].eventId == $theEventId) {
						overViewsHtml += '<input type="checkbox" style="float:left; margin: 25px 15px 0 0;" id="overviewId' + eventOverviewsData[i].id + '" name="overviewId" value="' + eventOverviewsData[i].id + '" /><label for="overviewId' + eventOverviewsData[i].id + '" class="inline" style="margin-left:50px;"><h4>' + eventOverviewsData[i].headingText + '</h4><br />' +  eventOverviewsData[i].paragraphText + '</label> <br /><br />';
					}
				}	
				overViewsHtml += '<button class="medium" id="deleteOverviewItem" type="submit">Delete</button>';

				$deleteOverviewForm.empty().append(overViewsHtml);

				$addOverviewForm.submit(refreshOverviews);
				$deleteOverviewForm.submit(refreshOverviews);
			})
		})

	// })
})