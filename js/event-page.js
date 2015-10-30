'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {
	console.log('Start :: ', $.now());
	$.get('/events', function (data) {
		var pathname = window.location.pathname.slice(7);
		var eventsObj = {};
		for (var i = 0, j = data.length; i < j; i++) {
			eventsObj[data[i].id] = {};
			eventsObj[data[i].id]['eventName'] = data[i].eventName;
			eventsObj[data[i].id]['overviewHtml'] = '';
			eventsObj[data[i].id]['scheduleDaysHtml'] = '<ul class="tabs center">';
			eventsObj[data[i].id]['speakersHtml'] = '';
			eventsObj[data[i].id]['dailyScheduleHtml'] = '';
			eventsObj[data[i].id]['eventUrl'] = data[i].eventUrl;
			eventsObj[data[i].id]['eventStartDate'] = data[i].eventStartDate;
			eventsObj[data[i].id]['eventEndDate'] = data[i].eventEndDate;
			eventsObj[data[i].id]['eventHeaderImage'] = data[i].eventHeaderImage;
			eventsObj[data[i].id]['eventBackgroundImage'] = data[i].eventBackgroundImage;
			eventsObj[data[i].id]['eventSlideUpText'] = data[i].eventSlideUpText;
			eventsObj[data[i].id]['overviewParagraphText'] = [];
			eventsObj[data[i].id]['overviewHeadingText'] = [];
			eventsObj[data[i].id]['scheduleDays'] = [];
			eventsObj[data[i].id]['scheduleInfo'] = [];
			eventsObj[data[i].id]['sponsorIntroHeading'] = '';
			eventsObj[data[i].id]['sponsorIntroParagraph'] = '';
			eventsObj[data[i].id]['sponsors'] = [];
			eventsObj[data[i].id]['speakers'] = [];
			eventsObj[data[i].id]['attendees'] = [];
			eventsObj[data[i].id]['aboveMapHeader'] = '';
			eventsObj[data[i].id]['belowMapHeading'] = '';
			eventsObj[data[i].id]['mapDesc'] = '';
			eventsObj[data[i].id]['mapImapHtml'] = '';
			/*eventsObj[data[i].id]['scheduleTimes'] = [];
			eventsObj[data[i].id]['scheduleDescriptions'] = [];*/
		}
		// $(data).each(function (i, elem) {
		// 	eventsObj[elem.id] = {};
		// 	eventsObj[elem.id]['eventName'] = elem.eventName;
		// 	eventsObj[elem.id]['overviewHtml'] = '';
		// 	eventsObj[elem.id]['scheduleDaysHtml'] = '<ul class="tabs center">';
		// 	eventsObj[elem.id]['speakersHtml'] = '';
		// 	eventsObj[elem.id]['dailyScheduleHtml'] = '';
		// 	eventsObj[elem.id]['eventUrl'] = elem.eventUrl;
		// 	eventsObj[elem.id]['eventStartDate'] = elem.eventStartDate;
		// 	eventsObj[elem.id]['eventEndDate'] = elem.eventEndDate;
		// 	eventsObj[elem.id]['eventHeaderImage'] = elem.eventHeaderImage;
		// 	eventsObj[elem.id]['eventBackgroundImage'] = elem.eventBackgroundImage;
		// 	eventsObj[elem.id]['eventSlideUpText'] = elem.eventSlideUpText;
		// 	eventsObj[elem.id]['overviewParagraphText'] = [];
		// 	eventsObj[elem.id]['overviewHeadingText'] = [];
		// 	eventsObj[elem.id]['scheduleDays'] = [];
		// 	eventsObj[elem.id]['scheduleInfo'] = [];
		// 	eventsObj[elem.id]['sponsorIntroHeading'] = '';
		// 	eventsObj[elem.id]['sponsorIntroParagraph'] = '';
		// 	eventsObj[elem.id]['sponsors'] = [];
		// 	eventsObj[elem.id]['speakers'] = [];
		// 	eventsObj[elem.id]['attendees'] = [];
		// 	eventsObj[elem.id]['aboveMapHeader'] = '';
		// 	eventsObj[elem.id]['belowMapHeading'] = '';
		// 	eventsObj[elem.id]['mapDesc'] = '';
		// 	eventsObj[elem.id]['mapImapHtml'] = '';
		// 	// eventsObj[elem.id]['scheduleTimes'] = [];
		// 	// eventsObj[elem.id]['scheduleDescriptions'] = [];
		// })
		$.get('/eventoverviews', function (overviews) {
			for (var i = 0, j = overviews.length; i < j; i++) {
				eventsObj[overviews[i].eventId]['overviewHeadingText'].push(overviews[i].headingText);
				eventsObj[overviews[i].eventId]['overviewParagraphText'].push(overviews[i].paragraphText);
			}
			/*$(overviews).each(function (i, elem) {
				eventsObj[elem.eventId]['overviewHeadingText'].push(elem.headingText);
				eventsObj[elem.eventId]['overviewParagraphText'].push(elem.paragraphText);
			})*/
			$.get('/eventschedules', function (schedules) {
				for (var i = 0, j = schedules.length; i < j; i++) {
					eventsObj[schedules[i].eventId]['scheduleInfo'].push(schedules[i]);
					if (eventsObj[schedules[i].eventId]['scheduleDays'].indexOf(schedules[i].scheduleDay) === -1) {
						eventsObj[schedules[i].eventId]['scheduleDays'].push(schedules[i].scheduleDay);
					}
				}
				/*$(schedules).each(function (i, elem) {
					eventsObj[elem.eventId]['scheduleInfo'].push(elem);
					if (eventsObj[elem.eventId]['scheduleDays'].indexOf(elem.scheduleDay) === -1) {
						eventsObj[elem.eventId]['scheduleDays'].push(elem.scheduleDay);
					}

				}

					)*/
				$.get('/sponsors', function (sponsors) {
					for (var i = 0, j = sponsors.length; i < j; i++) {
						for (var ii = 0, jj = sponsors[i].length; ii < jj; ii++) {
							sponsors[i][ii]
							eventsObj[sponsors[i][ii].eventId]['sponsors'].push(sponsors[i][ii]);
						}
					}
					$.get('/contacts', function (contacts) {
						$.get('/attendees', function (attendees) {
							for (var i = 0, j = attendees.length; i < j; i++) {
								if (attendees[i].eventAttendeeRole === 'speaker') {
									for (var ii = 0, jj = contacts.length; ii < jj; ii++) {
										if (contacts[ii].id === attendees[i].attendeeId) {
											eventsObj[attendees[i].eventId].speakers.push(contacts[ii]);
										}
									}
								}
								if (attendees[i].eventAttendeeRole === 'attendee') {
									for (var iii = 0, jjj = contacts.length; iii < jjj; iii++) {
										if (contacts[iii].id === attendees[i].attendeeId) {
											eventsObj[attendees[i].eventId].attendees.push(contacts[iii]);
										}

									}
								}
							}
						/*	$(attendees).each(function (i, elem) {
								if (elem.eventAttendeeRole === 'speaker') {
									$(contacts).each(function (j, elem2) {
										if (elem2.id === elem.attendeeId) {
											eventsObj[elem.eventId].speakers.push(elem2);
										}
									})
								}
								if (elem.eventAttendeeRole === 'attendee') {
									$(contacts).each(function (j, elem3) {
										if (elem3.id === elem.attendeeId) {
											eventsObj[elem.eventId].attendees.push(elem3);
										}
									})
								}
							})*/
							$.get('/sponsorintro', function (sponsorintro) {
								for (var i = 0, j = sponsorintro.length; i < j; i++) {
									eventsObj[sponsorintro[i].eventId].sponsorIntroHeading = sponsorintro[i].sponsorshipHeading;
									eventsObj[sponsorintro[i].eventId].sponsorIntroParagraph = sponsorintro[i].sponsorshipParagraph;
								}
								/*$(sponsorintro).each(function (i, elem) {
									eventsObj[elem.eventId].sponsorIntroHeading = elem.sponsorshipHeading;
									eventsObj[elem.eventId].sponsorIntroParagraph = elem.sponsorshipParagraph;
								})*/
								$.get('/travelinfo', function (travelinfo) {
									for (var i = 0, j = travelinfo.length; i < j; i++) {
										eventsObj[travelinfo[i].eventId]['aboveMapHeader'] = travelinfo[i].aboveMapHeader;
										eventsObj[travelinfo[i].eventId]['belowMapHeading'] = travelinfo[i].belowMapHeading;
										eventsObj[travelinfo[i].eventId]['mapDesc'] = travelinfo[i].mapDesc;
										eventsObj[travelinfo[i].eventId]['mapImapHtml'] = travelinfo[i].mapImapHtml;
										eventsObj[travelinfo[i].eventId]['venueName'] = travelinfo[i].venueName;
										eventsObj[travelinfo[i].eventId]['venueStreetAddress'] = travelinfo[i].venueStreetAddress;
										eventsObj[travelinfo[i].eventId]['venueCityName'] = travelinfo[i].venueCityName;
										eventsObj[travelinfo[i].eventId]['venueDesc'] = travelinfo[i].venueDesc;
										eventsObj[travelinfo[i].eventId]['venueImage'] = travelinfo[i].venueImage;
										eventsObj[travelinfo[i].eventId]['travelHeading'] = travelinfo[i].travelHeading;
										eventsObj[travelinfo[i].eventId]['travelDesc'] = travelinfo[i].travelDesc;
										eventsObj[travelinfo[i].eventId]['travelImage'] = travelinfo[i].travelImage;
										eventsObj[travelinfo[i].eventId]['accommodationHeading'] = travelinfo[i].accommodationHeading;
										eventsObj[travelinfo[i].eventId]['accommodationParagraph'] = travelinfo[i].accommodationParagraph;
									}
								/*	$(travelinfo).each(function (i, elem) {
										eventsObj[elem.eventId]['aboveMapHeader'] = elem.aboveMapHeader;
										eventsObj[elem.eventId]['belowMapHeading'] = elem.belowMapHeading;
										eventsObj[elem.eventId]['mapDesc'] = elem.mapDesc;
										eventsObj[elem.eventId]['mapImapHtml'] = elem.mapImapHtml;
										eventsObj[elem.eventId]['venueName'] = elem.venueName;
										eventsObj[elem.eventId]['venueStreetAddress'] = elem.venueStreetAddress;
										eventsObj[elem.eventId]['venueCityName'] = elem.venueCityName;
										eventsObj[elem.eventId]['venueDesc'] = elem.venueDesc;
										eventsObj[elem.eventId]['venueImage'] = elem.venueImage;
										eventsObj[elem.eventId]['travelHeading'] = elem.travelHeading;
										eventsObj[elem.eventId]['travelDesc'] = elem.travelDesc;
										eventsObj[elem.eventId]['travelImage'] = elem.travelImage;
										eventsObj[elem.eventId]['accommodationHeading'] = elem.accommodationHeading;
										eventsObj[elem.eventId]['accommodationParagraph'] = elem.accommodationParagraph;								
									})*/
									$.get('/accommodationinfo', function (accommodationinfo) {
										for (var i = 0, j = accommodationinfo.length; i < j; i++) {
											eventsObj[accommodationinfo[i].eventId]['accommodationName'] = accommodationinfo[i].accommodationName;
											eventsObj[accommodationinfo[i].eventId]['accommodationDesc'] = accommodationinfo[i].accommodationDesc;
											eventsObj[accommodationinfo[i].eventId]['accommodationUrl'] = accommodationinfo[i].accommodationUrl;
										}
										/*$(accommodationinfo).each(function (i, elem) {
											eventsObj[elem.eventId]['accommodationName'] = elem.accommodationName;
											eventsObj[elem.eventId]['accommodationDesc'] = elem.accommodationDesc;
											eventsObj[elem.eventId]['accommodationUrl'] = elem.accommodationUrl;	
										})*/
										$.get('/traveltips', function (traveltips) {
											for (var i = 0, j = traveltips.length; i < j; i++) {
												eventsObj[traveltips[i].eventId]['tipHeading'] = traveltips[i].tipHeading;
												eventsObj[traveltips[i].eventId]['tipParagraph'] = traveltips[i].tipParagraph;
											}
											/*$(traveltips).each(function (i, elem) {
												eventsObj[elem.eventId]['tipHeading'] = elem.tipHeading;
												eventsObj[elem.eventId]['tipParagraph'] = elem.tipParagraph;
											})*/
											$.get('/travelrestaurants', function (travelrestaurants) {
												for (var i = 0, j = travelrestaurants.length; i < j; i++) {
													eventsObj[travelrestaurants[i].eventId]['restaurantName'] = travelrestaurants[i].restaurantName;
													eventsObj[travelrestaurants[i].eventId]['restaurantDesc'] = travelrestaurants[i].restaurantDesc;
												}
												/*$(travelrestaurants).each(function (i, elem) {
													eventsObj[elem.eventId]['restaurantName'] = elem.restaurantName;
													eventsObj[elem.eventId]['restaurantDesc'] = elem.restaurantDesc;
												})*/
												//create string for overview elements
												for (var key in eventsObj) {
													var daysLength = eventsObj[key].scheduleDays.length;
													var scheduleInfoObj = {};
													//loop over the speakers array and create html for speakers tab
													$(eventsObj[key].speakers).each(function (i, elem) {
														console.log(elem);
														eventsObj[key].speakersHtml += '<h4>' + elem.firstName + ' ' + elem.lastName + '</h4><h5>' + elem.msTeamTitle + '</h5><p><img class="pull-left" src="data:image;base64,' + elem.headShot + '" />' + elem.contactDescription + '</p><hr />';
													})
													//add event name to overview html
													eventsObj[key].overviewHtml += '<h2>' + eventsObj[key].eventName + '</h2>';
													//create html for over subheads and paragraphs
													for (var key2 in eventsObj[key].overviewHeadingText) {
														eventsObj[key].overviewHtml += '<h3>' + eventsObj[key].overviewHeadingText[key2] + '</h3>' + '<p>' + eventsObj[key].overviewParagraphText[key2] + '</p>';
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
													/*$(eventsObj[key].scheduleDays).each(function (i, elem) {
														if (i === 0) {
															eventsObj[key].scheduleDaysHtml += '<li class="current"><a href="#tabr' + elem + '"><h5>' + elem + '</h5></a></li>';
														}
														if (i > 0) {
															eventsObj[key].scheduleDaysHtml += '<li><a href="#tabr' + elem + '"><h5>' + elem + '</h5></a></li>';
														}
														if (i >= daysLength -1) {
															eventsObj[key].scheduleDaysHtml += '</ul>';
														}
													});*/
													//create tab-content div for each day with a placeholder for that days schedule UL
													for (var i = 0, j = eventsObj[key].scheduleDays.length; i < j; i++) {
														if (i === 0) {
															eventsObj[key].dailyScheduleHtml += '<div id="tabr' + eventsObj[key].scheduleDays[i] + '" class="tab-content" style="display:block;"><table cellspacing="0" cellpadding="0" class="striped schedule"><thead><tr><th><h3>' + eventsObj[key].scheduleDays[i] + '</h3></th></tr></thead>' + eventsObj[key].scheduleDays[i] + 'Placeholder</table></div>';
														}
														if (i > 0) {
															eventsObj[key].dailyScheduleHtml += '<div id="tabr' + eventsObj[key].scheduleDays[i] + '" class="tab-content" style="display:none;"><table cellspacing="0" cellpadding="0" class="striped schedule"><thead><tr><th><h3>' + eventsObj[key].scheduleDays[i] + '</h3></th></tr></thead><tbody>' + eventsObj[key].scheduleDays[i] + 'Placeholder</tbody></table></div>';
														}
													}
													/*$(eventsObj[key].scheduleDays).each(function (i, elem) {
														if (i === 0) {
															eventsObj[key].dailyScheduleHtml += '<div id="tabr' + elem + '" class="tab-content" style="display:block;"><table cellspacing="0" cellpadding="0" class="striped schedule"><thead><tr><th><h3>' + elem + '</h3></th></tr></thead>' + elem + 'Placeholder</table></div>';
														}
														if (i > 0) {
															eventsObj[key].dailyScheduleHtml += '<div id="tabr' + elem + '" class="tab-content" style="display:none;"><table cellspacing="0" cellpadding="0" class="striped schedule"><thead><tr><th><h3>' + elem + '</h3></th></tr></thead><tbody>' + elem + 'Placeholder</tbody></table></div>';
														}
													});*/
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
												}
												//add elements to DOM
												for (var key in eventsObj) {
													if (pathname === eventsObj[key].eventUrl) {
														document.title = eventsObj[key].eventName;
														$('#event-overview').append(eventsObj[key].overviewHtml); 
														$('#event-schedule').append(eventsObj[key].scheduleDaysHtml);
														$('#eventSpeakers').append(eventsObj[key].speakersHtml);
														console.log('End :: ', $.now());
													}
												}
												console.log(eventsObj);
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
});