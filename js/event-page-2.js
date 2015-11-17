'use strict';

$(document).ready(function () {

	$.get('/events', function (events) {
		var pathname = window.location.pathname.slice(7);
		var eventsObj = {};
		var $eventHeader = $('#eventHeader');
		var $eventTabs = $('#eventTabs');
		var $eventTabLinks = $('#eventTabLinks');
		var $eventOverviewTabLink = $('#eventOverviewTabLink');
		var $eventSpeakersTabLink = $('#eventSpeakersTabLink');
		var $travelTabLink = $('#travelTabLink');
		var $venueTabLink = $('#venueTabLink');
		var $eventOverview = $('#event-overview');
		var $eventSpeakers = $('#eventSpeakers');
		var $travelTab = $('#travelTab');
		var $venueTab = $('#venue-tab');
		var $travelUlLinks = $('#travelUlLinks');

		//create object containing all current events
		for (var i = 0, j = events.length; i < j; i++) {
			eventsObj[events[i].id] = {};
			eventsObj[events[i].id]['eventName'] = events[i]['eventName'];
			eventsObj[events[i].id]['eventRegistrationLink'] = events[i]['eventRegistrationLink'];
			eventsObj[events[i].id]['eventUrl'] = events[i].eventUrl;
			eventsObj[events[i].id]['eventLocation'] = events[i]['eventLocation'];
			eventsObj[events[i].id]['eventStartDate'] = events[i]['eventStartDate'];
			eventsObj[events[i].id]['eventEndDate'] = events[i]['eventEndDate'];
			eventsObj[events[i].id]['eventHeaderImage'] = events[i]['eventHeaderImage'];
			eventsObj[events[i].id]['eventSponsorsTab'] = events[i]['eventSponsorsTab'];
			eventsObj[events[i].id]['eventOverviewTab'] = events[i]['eventOverviewTab'];
			// eventsObj[events[i].id]['travelTabMap'] = events[i]['travelTabMap'];
			eventsObj[events[i].id]['travelTravelTab'] = events[i]['travelTravelTab'];
			eventsObj[events[i].id]['travelVenueTab'] = events[i]['travelVenueTab'];
			eventsObj[events[i].id]['travelAccomodationsTab'] = events[i]['travelAccomodationsTab'];
			eventsObj[events[i].id]['travelTipsTab'] = events[i]['travelTipsTab'];
			eventsObj[events[i].id]['travelEatDrinkTab'] = events[i]['travelEatDrinkTab'];
			eventsObj[events[i].id]['eventMediaTab'] = events[i]['eventMediaTab'];
			eventsObj[events[i].id]['scheduleDays'] = [];
			eventsObj[events[i].id]['scheduleInfo'] = [];
			eventsObj[events[i].id]['speakers'] = [];
			eventsObj[events[i].id]['attendees'] = [];
			eventsObj[events[i].id]['speakersHtml'] = '';
		}	
		//get scheduled items and add them to event
		$.get('/eventschedules', function (schedules) {
			for (var i = 0, j = schedules.length; i < j; i++) {
				eventsObj[schedules[i].eventId]['scheduleInfo'].push(schedules[i]);
				if (eventsObj[schedules[i].eventId]['scheduleDays'].indexOf(schedules[i].scheduleDay) === -1) {
					eventsObj[schedules[i].eventId]['scheduleDays'].push(schedules[i].scheduleDay);
				}
			}
			//find all contacts
			$.get('/contacts', function (contacts) {
				//sort contacts by if they're attending and what their role is
				$.get('/attendees', function (attendees) {
					for (var i = 0, j = attendees.length; i < j; i++) {
						if (attendees[i].eventAttendeeRole === 'speaker') {
							for (var ii = 0, jj = contacts.length; ii < jj; ii++) {
								if (contacts[ii].id === attendees[i].contactId) {
									eventsObj[attendees[i].eventId].speakers.push(contacts[ii]);
								}
							}
						}
						if (attendees[i].eventAttendeeRole === 'attendee') {
							for (var iii = 0, jjj = contacts.length; iii < jjj; iii++) {
								if (contacts[iii].id === attendees[i].contactId) {
									eventsObj[attendees[i].eventId].attendees.push(contacts[iii]);
								}
							}
						}
					}


					//if the pathname matches the URL of the eventObj, add its elements to the dom
					for (var key in eventsObj) {
						//loop over the speakers array and create html for speakers tab
						for (var i = 0, j = eventsObj[key].speakers.length; i < j; i++) {
							eventsObj[key].speakersHtml += '<h4>' + eventsObj[key].speakers[i].firstName + ' ' + eventsObj[key].speakers[i].lastName + '</h4>';
							if (eventsObj[key].speakers[i].msTeamTitle) {
								eventsObj[key].speakersHtml += '<h5>' + eventsObj[key].speakers[i].msTeamTitle + '</h5><p>';
							}
							if (eventsObj[key].speakers[i].headShot) {
								eventsObj[key].speakersHtml += '<img class="pull-left" height="165" width="165" src="../uploads/' + eventsObj[key].speakers[i].headShot + '" />';
							}
							if (eventsObj[key].speakers[i].contactDescription) {
						 		eventsObj[key].speakersHtml += eventsObj[key].speakers[i].contactDescription + '</p>';
							}
							eventsObj[key].speakersHtml += '<hr class="alt1" />'
						}

						if (pathname === eventsObj[key].eventUrl) {
							var firstTabDivSet = false;
							var travelTabDivSet = false;
							document.title = eventsObj[key].eventName;
							$eventTabs.children().hide();

							if (eventsObj[key].eventOverviewTab) {
								$eventTabLinks.show();
								$eventOverviewTabLink.show();
								$eventOverview.html(eventsObj[key].eventOverviewTab);
							}

							if (eventsObj[key].speakers.length > 0) {
								$eventTabLinks.show();
								$eventSpeakersTabLink.show();
								$eventSpeakers.html(eventsObj[key].speakersHtml);
							}

							if (eventsObj[key].eventHeaderImage) {
								$eventHeader.html('<img src="../uploads/' + eventsObj[key].eventHeaderImage + '" />');
							}

							if (eventsObj[key].travelVenueTab || eventsObj[key].travelTravelTab || eventsObj[key].travelAccomodationsTab || eventsObj[key].travelTipsTab || eventsObj[key].travelEatDrinkTab) {
								$travelTabLink.show()
								$travelTab.prepend('<h2>' + eventsObj[key].eventLocation + '</h2>');
							}

							if (eventsObj[key].travelVenueTab) {
								console.log(eventsObj[key].travelVenueTab);
								$travelUlLinks.show();
								$venueTabLink.show();
								$venueTab.html(eventsObj[key].travelVenueTab);
							}

							$eventTabLinks.children().each(function (i) {
								// console.log(firstTabDivSet);
								// console.log(firstTabDivSet == false, firstTabDivSet === false)
								if ($(this).is(':visible') && firstTabDivSet === false) {
									firstTabDivSet = true;
									$(this).siblings().removeClass('current');
									$(this).addClass('first current');
									$($('a', this).attr('href')).show();
								}
							})

							$travelUlLinks.children().each(function (i) {
								// console.log(firstTabDivSet);
								// console.log(firstTabDivSet == false, firstTabDivSet === false)
								if ($(this).is(':visible') && travelTabDivSet === false) {
									travelTabDivSet = true;
									$(this).siblings().removeClass('current');
									$(this).addClass('first current');
									$($('a', this).attr('href')).show();
								}
							})

						}
					}

					console.log(eventsObj);
				});
			});
		});
	});
});