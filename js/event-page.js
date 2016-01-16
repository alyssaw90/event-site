'use strict';
/* jshint shadow:true */
/*global $ */
/*global document */
/*global $ */
/*global stickyFooter */
/*global window */
/*global MutationObserver */
/* jshint loopfunc:true */

$(document).ready(function () {

	$.get('/events', function (events) {
		var pathname = window.location.pathname.slice(1);
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
		var $eventScheduleTabLink = $('#eventScheduleTabLink');
		var $eventTabDiv = $('#event-schedule');
		//declare native JS variable for #eventTabs
		var eventTabs = document.querySelector('#eventTabs');
		//set MutationObserver to check for changes to child nodes (e.g. they become visible)
		var observer = new MutationObserver(function (mutations) {
    	stickyFooter();
  	});
  	var observerConfig = {
  		attributes: true, 
  		subtree: true
  	};
  	observer.observe(eventTabs, observerConfig);

		//create object containing all current events
		for (var i = 0, j = events.length; i < j; i++) {
			eventsObj[events[i].id] = {};
			eventsObj[events[i].id].eventName = events[i].eventName;
			eventsObj[events[i].id].eventRegistrationLink = events[i].eventRegistrationLink;
			eventsObj[events[i].id].eventUrl = events[i].eventUrl;
			eventsObj[events[i].id].eventLocation = events[i].eventLocation;
			eventsObj[events[i].id].eventStartDate = events[i].eventStartDate;
			eventsObj[events[i].id].eventEndDate = events[i].eventEndDate;
			eventsObj[events[i].id].eventHeaderImage = events[i].eventHeaderImage;
			eventsObj[events[i].id].eventSponsorsTab = events[i].eventSponsorsTab;
			eventsObj[events[i].id].eventOverviewTab = events[i].eventOverviewTab;
			// eventsObj[events[i]..].travelTabMap = events[i].travelTabMap;
			eventsObj[events[i].id].travelTravelTab = events[i].travelTravelTab;
			eventsObj[events[i].id].travelVenueTab = events[i].travelVenueTab;
			eventsObj[events[i].id].travelAccomodationsTab = events[i].travelAccomodationsTab;
			eventsObj[events[i].id].travelTipsTab = events[i].travelTipsTab;
			eventsObj[events[i].id].travelEatDrinkTab = events[i].travelEatDrinkTab;
			eventsObj[events[i].id].eventMediaTab = events[i].eventMediaTab;
			eventsObj[events[i].id].travelTabHeaderImage = events[i].travelTabHeaderImage;
			eventsObj[events[i].id].scheduleDays = [];
			eventsObj[events[i].id].scheduleInfo = [];
			eventsObj[events[i].id].speakers = [];
			eventsObj[events[i].id].attendees = [];
			eventsObj[events[i].id].speakersHtml = '';
			eventsObj[events[i].id].dailyScheduleHtml = '';
			eventsObj[events[i].id].scheduleDaysHtml = '<ul class="tabs center">';
		}	
		//get scheduled items and add them to event
		$.get('/eventschedules', function (schedules) {
			for (var i = 0, j = schedules.length; i < j; i++) {
				if (eventsObj[schedules[i].eventId]) {
					eventsObj[schedules[i].eventId].scheduleInfo.push(schedules[i]);
				}
				if (eventsObj[schedules[i].eventId] && eventsObj[schedules[i].eventId].scheduleDays.indexOf(schedules[i].scheduleDay) === -1) {
					eventsObj[schedules[i].eventId].scheduleDays.push(schedules[i].scheduleDay);
				}
			}
			//find all contacts
			$.get('/contacts', function (contacts) {
				//sort contacts by if they're attending and what their role is
				$.get('/attendees', function (attendees) {
					for (var i = 0, j = attendees.length; i < j; i++) {
						if (attendees[i].eventAttendeeRole === 'speaker') {
							for (var ii = 0, jj = contacts.length; ii < jj; ii++) {
								if (eventsObj[attendees[i].eventId] && contacts[ii].id === attendees[i].contactId) {
									eventsObj[attendees[i].eventId].speakers.push(contacts[ii]);
								}
							}
						}
						if (attendees[i].eventAttendeeRole === 'attendee') {
							for (var iii = 0, jjj = contacts.length; iii < jjj; iii++) {
								if (eventsObj[attendees[i].eventId] && contacts[iii].id === attendees[i].contactId) {
									eventsObj[attendees[i].eventId].attendees.push(contacts[iii]);
								}
							}
						}
					}

					//if the pathname matches the URL of the eventObj, add its elements to the dom
					for (var key in eventsObj) {
						var scheduleInfoObj = {};
						var daysLength = eventsObj[key].scheduleDays.length;

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
							eventsObj[key].speakersHtml += '<hr class="alt1" />';
						}

						//loop over scheduleDays array and add each Day name to the UL for the schedule tab
						for (var i = 0, j = eventsObj[key].scheduleDays.length; i < j; i++) {
							if (i === 0) {
								eventsObj[key].scheduleDaysHtml += '<li class="current"><a href="#tabr' + eventsObj[key].scheduleDays[i] + '"><h5>' + eventsObj[key].scheduleDays[i] + '</h5></a></li>';
							}
							if (i > 0) {
								eventsObj[key].scheduleDaysHtml += '<li><a href="#tabr' + eventsObj[key].scheduleDays[i] + '"><h5>' + eventsObj[key].scheduleDays[i] + '</h5></a></li>';
							}
							if (i >= daysLength -1) {
								eventsObj[key].scheduleDaysHtml += '</ul>';
							}
						}
						//create tab-content div for each day with a placeholder for that days schedule UL
						for (var i = 0, j = eventsObj[key].scheduleDays.length; i < j; i++) {
							if (i === 0) {
								eventsObj[key].dailyScheduleHtml += '<div id="tabr' + eventsObj[key].scheduleDays[i] + '" class="tab-content" style="display:block;"><table cellspacing="0" cellpadding="0" class="striped schedule"><thead><tr><th><h3>' + eventsObj[key].scheduleDays[i] + '</h3></th></tr></thead>' + eventsObj[key].scheduleDays[i] + 'Placeholder</table></div>';
							}
							if (i > 0) {
								eventsObj[key].dailyScheduleHtml += '<div id="tabr' + eventsObj[key].scheduleDays[i] + '" class="tab-content" style="display:none;"><table cellspacing="0" cellpadding="0" class="striped schedule"><thead><tr><th><h3>' + eventsObj[key].scheduleDays[i] + '</h3></th></tr></thead><tbody>' + eventsObj[key].scheduleDays[i] + 'Placeholder</tbody></table></div>';
							}
						}
						//search the dailyScheduleHtml for the placeholder and add an LI with the correct class depending on its postion in the list and insert it into the scheduleInfoObj object declared above
						for (var i = 0, j = eventsObj[key].scheduleInfo.length; i < j; i++) {
							if (!scheduleInfoObj[eventsObj[key].scheduleInfo[i].scheduleDay + 'Placeholder']) {
								scheduleInfoObj[eventsObj[key].scheduleInfo[i].scheduleDay + 'Placeholder'] = '';
							}
							if (i <= 0) {
								scheduleInfoObj[eventsObj[key].scheduleInfo[i].scheduleDay + 'Placeholder'] += '<tr class="first"><td>' + eventsObj[key].scheduleInfo[i].scheduleTime + '</td><td>' +  eventsObj[key].scheduleInfo[i].description + '</td></tr>';
							}
							if (i > 0 && i < j - 1 && i % 2 !== 0) {
								scheduleInfoObj[eventsObj[key].scheduleInfo[i].scheduleDay + 'Placeholder'] += '<tr class="alt"><td>' + eventsObj[key].scheduleInfo[i].scheduleTime + '</td><td>' +  eventsObj[key].scheduleInfo[i].description + '</td></tr>';															
							}
							if (i > 0 && i < j - 1 && i % 2 === 0) {
								scheduleInfoObj[eventsObj[key].scheduleInfo[i].scheduleDay + 'Placeholder'] += '<tr><td>' + eventsObj[key].scheduleInfo[i].scheduleTime + '</td><td>' +  eventsObj[key].scheduleInfo[i].description + '</td></tr>';															
							}
							if (i === j - 1 && i % 2 !== 0) {
								scheduleInfoObj[eventsObj[key].scheduleInfo[i].scheduleDay + 'Placeholder'] += '<tr class="alt last"><td>' + eventsObj[key].scheduleInfo[i].scheduleTime + '</td><td>' +  eventsObj[key].scheduleInfo[i].description + '</td></tr>';
							}
							if (i === j - 1 && i % 2 === 0) {
								scheduleInfoObj[eventsObj[key].scheduleInfo[i].scheduleDay + 'Placeholder'] += '<tr class="last"><td>' + eventsObj[key].scheduleInfo[i].scheduleTime + '</td><td>' +  eventsObj[key].scheduleInfo[i].description + '</td></tr>';
							}
						}
						//loop over the dailyScheduleHtml HTML and replace the placeholder with the content to replace it
						for (var key3 in scheduleInfoObj) {
							eventsObj[key].dailyScheduleHtml = eventsObj[key].dailyScheduleHtml.replace(key3, scheduleInfoObj[key3]);
						}
						//combine schedule header list and schedule body
						eventsObj[key].scheduleDaysHtml += eventsObj[key].dailyScheduleHtml;

						//if the pathname matches the eventObj URL, render the elements to the dom or remove them if they don't exist on the current eventObj
						if (pathname === eventsObj[key].eventUrl) {
							document.title = eventsObj[key].eventName;
							$eventTabs.children().hide();

							if (eventsObj[key].eventHeaderImage) {
								$eventHeader.html('<img src="../uploads/' + eventsObj[key].eventHeaderImage + '" />');
							} else if (!eventsObj[key].eventHeaderImage) {
								$eventHeader.remove();
							}

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

							if (eventsObj[key].scheduleDays.length > 0) {
								$eventTabLinks.show();
								$eventScheduleTabLink.show();
								$eventTabDiv.html(eventsObj[key].scheduleDaysHtml);
							} else if (eventsObj[key].scheduleDays.length <= 0) {
								$eventScheduleTabLink.remove();
								$eventTabDiv.remove();
							}

							if (eventsObj[key].eventMediaTab) {
								$eventTabLinks.show();
								$sponsorsTabLink.show();
								$spondsorTabDiv.html(eventsObj[key].eventMediaTab);
							} else if (!eventsObj[key].eventMediaTab) {
								$sponsorsTabLink.remove();
								$spondsorTabDiv.remove();
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
								$travelTravelTab.html(eventsObj[key].travelTravelTab);
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
									$(this).siblings().removeClass('current');
									$(this).addClass('first current');
									$($('a', this).attr('href')).show();
								}
							});

						}
					}
					$('img').bind('load', function() {
    				stickyFooter();
					});
					/*$(document).ajaxStop(function() {
						alert('hola');
  					stickyFooter();
					});*/
					console.log(eventsObj);
				});
			});
		});
	});
});