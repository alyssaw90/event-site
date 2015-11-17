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
		var $travelTravelTabLink = $('#travelTravelTabLink');
		var $travelTravelTab = $('#travel-tab');
		var $travelAccommodationsTabLink = $('#travelAccommodationsTabLink');
		var $accommodationsTab = $('#accomodations-tab');
		var $travelTipsTabLink = $('#travelTipsTabLink');
		var $travelTipsTab = $('#tips-tab');
		var $travelEatTabLink = $('#travelEatTabLink');
		var $travelEatTab = $('#eat-drink');
		var $sponsorsTabLink = $('#sponsorsTabLink');
		var $spondsorTabDiv = $('#eventSponsors');
		var $registerButton = $('#registerButton');

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
			eventsObj[events[i].id]['travelTabHeaderImage'] = events[i]['travelTabHeaderImage'];
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

						//if the pathname matches the eventObj URL, render the elements to the dom
						if (pathname === eventsObj[key].eventUrl) {
							var firstTabDivSet = false;
							var travelTabDivSet = false;
							document.title = eventsObj[key].eventName;
							$eventTabs.children().hide();

							if (eventsObj[key].eventOverviewTab) {
								$eventTabLinks.show();
								$eventOverviewTabLink.show();
								$eventOverview.html(eventsObj[key].eventOverviewTab);
							} else if (!eventsObj[key].eventOverviewTab) {
								$eventOverviewTabLink.remove();
								$eventOverview.remove();
							}

							if (eventsObj[key].eventRegistrationLink) {
								$eventTabLinks.show();
								$registerButton.show();
								$registerButton.attr('href', eventsObj[key].eventRegistrationLink);
							} else if (!eventsObj[key].eventRegistrationLink) {
								$registerButton.remove();
							}

							if (eventsObj[key].speakers.length > 0) {
								$eventTabLinks.show();
								$eventSpeakersTabLink.show();
								$eventSpeakers.html(eventsObj[key].speakersHtml);
							} else if (eventsObj[key].speakers.length <= 0) {
								$eventSpeakersTabLink.remove();
								$eventSpeakers.remove();
							}

							if (eventsObj[key].eventMediaTab) {
								$eventTabLinks.show();
								$sponsorsTabLink.show();
								$spondsorTabDiv.html(eventsObj[key].eventMediaTab);
							} else if (!eventsObj[key].eventMediaTab) {
								$sponsorsTabLink.remove();
								$spondsorTabDiv.remove();
							}

							if (eventsObj[key].eventHeaderImage) {
								$eventHeader.html('<img src="../uploads/' + eventsObj[key].eventHeaderImage + '" />');
							} else if (!eventsObj[key].eventHeaderImage) {
								$eventHeader.remove();
							}

							if (eventsObj[key].travelTabHeaderImage) {
								$travelTabLink.show();
								$travelTab.prepend('<img style="width: 90%; padding-left: 10%;" src="../uploads/' + eventsObj[key].travelTabHeaderImage + '" />');
							}

							if (eventsObj[key].travelVenueTab || eventsObj[key].travelTravelTab || eventsObj[key].travelAccomodationsTab || eventsObj[key].travelTipsTab || eventsObj[key].travelEatDrinkTab) {
								$travelTabLink.show();
								$travelTab.prepend('<h2>' + eventsObj[key].eventLocation + '</h2>');
							} else {
								$travelTabLink.remove();
								$travelTab.remove();
							}

							if (eventsObj[key].travelVenueTab) {
								$travelUlLinks.show();
								$venueTabLink.show();
								$venueTab.html(eventsObj[key].travelVenueTab);
							} else if (!eventsObj[key].travelVenueTab) {
								$venueTabLink.remove();
								$venueTab.remove();
							}

							if (eventsObj[key].travelTravelTab) {
								$travelUlLinks.show();
								$travelTravelTabLink.show();
								$travelTravelTab.html(eventsObj[key].travelTravelTab)
							} else if (!eventsObj[key].travelTravelTab) {
								$travelTravelTabLink.remove();
								$travelTravelTab.remove();
							}

							if (eventsObj[key].travelAccomodationsTab) {
								$travelUlLinks.show();
								$travelAccommodationsTabLink.show();
								$accommodationsTab.html(eventsObj[key].travelAccomodationsTab);
							} else if (!eventsObj[key].travelAccomodationsTab) {
								$travelAccommodationsTabLink.remove();
								$accommodationsTab.remove();
							}

							if (eventsObj[key].travelTravelTab) {
								$travelUlLinks.show();
								$travelTipsTabLink.show();
								$travelTipsTab.html(eventsObj[key].travelTravelTab);
							} else if (!eventsObj[key].travelTravelTab) {
								$travelTipsTabLink.remove();
								$travelTipsTab.remove();
							}

							if (eventsObj[key].travelEatDrinkTab) {
								$travelUlLinks.show();
								$travelEatTabLink.show();
								$travelEatTab.html(eventsObj[key].travelEatDrinkTab);
							} else if (!eventsObj[key].travelEatDrinkTab) {
								$travelEatTabLink.remove();
								$travelEatTab.remove();
							}

							//assign first and current classes to first tab li(s) so they display correctly
							$('.tabs').children().each(function (i) {
								if ($(this).is(':first-child')) {
									firstTabDivSet = true;
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