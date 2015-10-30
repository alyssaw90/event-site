'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {
	$.get('/events', function (data) {
		var pathname = window.location.pathname.slice(7);
		var eventsObj = {};
		$(data).each(function (i, elem) {
			eventsObj[elem.id] = {};
			eventsObj[elem.id]['eventName'] = elem.eventName;
			eventsObj[elem.id]['overviewHtml'] = '';
			eventsObj[elem.id]['scheduleDaysHtml'] = '<ul class="tabs center">';
			eventsObj[elem.id]['dailyScheduleHtml'] = '';
			eventsObj[elem.id]['eventUrl'] = elem.eventUrl;
			eventsObj[elem.id]['eventStartDate'] = elem.eventStartDate;
			eventsObj[elem.id]['eventEndDate'] = elem.eventEndDate;
			eventsObj[elem.id]['eventHeaderImage'] = elem.eventHeaderImage;
			eventsObj[elem.id]['eventBackgroundImage'] = elem.eventBackgroundImage;
			eventsObj[elem.id]['eventSlideUpText'] = elem.eventSlideUpText;
			eventsObj[elem.id]['overviewParagraphText'] = [];
			eventsObj[elem.id]['overviewHeadingText'] = [];
			eventsObj[elem.id]['scheduleDays'] = [];
			eventsObj[elem.id]['scheduleInfo'] = [];
			eventsObj[elem.id]['sponsorIntroHeading'] = '';
			eventsObj[elem.id]['sponsorIntroParagraph'] = '';
			eventsObj[elem.id]['sponsors'] = [];
			eventsObj[elem.id]['speakers'] = [];
			eventsObj[elem.id]['attendees'] = [];
			eventsObj[elem.id]['aboveMapHeader'] = '';
			eventsObj[elem.id]['belowMapHeading'] = '';
			eventsObj[elem.id]['mapDesc'] = '';
			eventsObj[elem.id]['mapImapHtml'] = '';
			/*eventsObj[elem.id]['scheduleTimes'] = [];
			eventsObj[elem.id]['scheduleDescriptions'] = [];*/
		})
		$.get('/eventoverviews', function (overviews) {
			$(overviews).each(function (i, elem) {
				eventsObj[elem.eventId]['overviewHeadingText'].push(elem.headingText);
				eventsObj[elem.eventId]['overviewParagraphText'].push(elem.paragraphText);
			})
			$.get('/eventschedules', function (schedules) {
				$(schedules).each(function (i, elem) {
					eventsObj[elem.eventId]['scheduleInfo'].push(elem);
					if (eventsObj[elem.eventId]['scheduleDays'].indexOf(elem.scheduleDay) === -1) {
						eventsObj[elem.eventId]['scheduleDays'].push(elem.scheduleDay);
					}
					/*if (!eventsObj[elem.eventId]['scheduleDays'][elem.scheduleDay]) {
						eventsObj[elem.eventId]['scheduleDays'][elem.scheduleDay] = {};
						eventsObj[elem.eventId]['scheduleDays'][elem.scheduleDay]['scheduleTimes'] = [];
						eventsObj[elem.eventId]['scheduleDays'][elem.scheduleDay]['scheduleDescriptions'] = [];
					}*/
				/*	eventsObj[elem.eventId]['scheduleDays'][elem.scheduleDay]['scheduleTimes'].push(elem.scheduleTime);
						eventsObj[elem.eventId]['scheduleDays'][elem.scheduleDay]['scheduleDescriptions'].push(elem.description);*/
				})
				$.get('/sponsors', function (sponsors) {
					$(sponsors).each(function (i, elem) {
						$(elem).each(function (j, elem2) {
							eventsObj[elem2.eventId]['sponsors'].push(elem2);
						})
					})
					$.get('/contacts', function (contacts) {
						$.get('/attendees', function (attendees) {
							$(attendees).each(function (i, elem) {
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
							})
							$.get('/sponsorintro', function (sponsorintro) {
								$(sponsorintro).each(function (i, elem) {
									eventsObj[elem.eventId].sponsorIntroHeading = elem.sponsorshipHeading;
									eventsObj[elem.eventId].sponsorIntroParagraph = elem.sponsorshipParagraph;
								})
								$.get('/travelinfo', function (travelinfo) {
									$(travelinfo).each(function (i, elem) {
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
									})
									$.get('/accommodationinfo', function (accommodationinfo) {
										$(accommodationinfo).each(function (i, elem) {
											eventsObj[elem.eventId]['accommodationName'] = elem.accommodationName;
											eventsObj[elem.eventId]['accommodationDesc'] = elem.accommodationDesc;
											eventsObj[elem.eventId]['accommodationUrl'] = elem.accommodationUrl;	
										})
										$.get('/traveltips', function (traveltips) {
											$(traveltips).each(function (i, elem) {
												eventsObj[elem.eventId]['tipHeading'] = elem.tipHeading;
												eventsObj[elem.eventId]['tipParagraph'] = elem.tipParagraph;
											})
											$.get('/travelrestaurants', function (travelrestaurants) {
												$(travelrestaurants).each(function (i, elem) {
													eventsObj[elem.eventId]['restaurantName'] = elem.restaurantName;
													eventsObj[elem.eventId]['restaurantDesc'] = elem.restaurantDesc;
												})
												//create string for overview elements
												for (var key in eventsObj) {
													var daysLength = eventsObj[key].scheduleDays.length;
													//add event name to overview html
													eventsObj[key].overviewHtml += '<h2>' + eventsObj[key].eventName + '</h2>';
													//create html for over subheads and paragraphs
													for (var key2 in eventsObj[key].overviewHeadingText) {
														eventsObj[key].overviewHtml += '<h3>' + eventsObj[key].overviewHeadingText[key2] + '</h3>' + '<p>' + eventsObj[key].overviewParagraphText[key2] + '</p>';
													} 
													//loop over scheduleDays array and add each Day name to the UL for the schedule tab
													$(eventsObj[key].scheduleDays).each(function (i, elem) {
														if (i === 0) {
															eventsObj[key].scheduleDaysHtml += '<li class="current"><a href="#tabr' + elem + '"><h5>' + elem + '</h5></a></li>';
														}
														if (i > 0) {
															eventsObj[key].scheduleDaysHtml += '<li><a href="#tabr' + elem + '"><h5>' + elem + '</h5></a></li>';
														}
														if (i >= daysLength -1) {
															eventsObj[key].scheduleDaysHtml += '</ul>';
														}
													});
													$(eventsObj[key].scheduleDays).each(function (i, elem) {
														console.log(i);
														if (i === 0) {
															eventsObj[key].dailyScheduleHtml += '<div id="tabr' + elem + '" class="tab-content" style="display:block;"><table cellspacing="0" cellpadding="0" class="striped schedule"><thead><tr><th><h3>' + elem + '</h3></th></tr></thead>' + elem + 'Placeholder</table></div>';
														}
														if (i > 0) {
															eventsObj[key].dailyScheduleHtml += '<div id="tabr' + elem + '" class="tab-content" style="display:none;"><table cellspacing="0" cellpadding="0" class="striped schedule"><thead><tr><th><h3>' + elem + '</h3></th></tr></thead>' + elem + 'Placeholder</table></div>';
														}
													});
													//combine schedule header list and schedule body
													eventsObj[key].scheduleDaysHtml += eventsObj[key].dailyScheduleHtml;
												}
												//add elements to DOM
												for (var key in eventsObj) {
													// console.log(eventsObj[key].scheduleDaysHtml)
													if (pathname === eventsObj[key].eventUrl) {
														$('#event-overview').append(eventsObj[key].overviewHtml); 
														$('#event-schedule').append(eventsObj[key].scheduleDaysHtml);
												// console.log($.now());
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