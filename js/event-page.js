'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {
	$.get('/events', function (data) {
		var pathname = window.location.pathname.slice(1);
		var eventsObj = {};
		$(data).each(function (i, elem) {
			eventsObj[elem.id] = {};
			eventsObj[elem.id]['eventName'] = elem.eventName;
			eventsObj[elem.id]['overviewHtml'] = '';
			eventsObj[elem.id]['eventUrl'] = elem.eventUrl;
			eventsObj[elem.id]['eventStartDate'] = elem.eventStartDate;
			eventsObj[elem.id]['eventEndDate'] = elem.eventEndDate;
			eventsObj[elem.id]['eventHeaderImage'] = elem.eventHeaderImage;
			eventsObj[elem.id]['eventBackgroundImage'] = elem.eventBackgroundImage;
			eventsObj[elem.id]['eventSlideUpText'] = elem.eventSlideUpText;
			eventsObj[elem.id]['overviewParagraphText'] = [];
			eventsObj[elem.id]['overviewHeadingText'] = [];
			eventsObj[elem.id]['scheduleHtml'] = '';
			eventsObj[elem.id]['scheduleDays'] = [];
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
					if (!eventsObj[elem.eventId]['scheduleDays'][elem.scheduleDay]) {
						eventsObj[elem.eventId]['scheduleDays'][elem.scheduleDay] = {};
						eventsObj[elem.eventId]['scheduleDays'][elem.scheduleDay]['scheduleTimes'] = [];
						eventsObj[elem.eventId]['scheduleDays'][elem.scheduleDay]['scheduleDescriptions'] = [];
					}
					eventsObj[elem.eventId]['scheduleDays'][elem.scheduleDay]['scheduleTimes'].push(elem.scheduleTime);
						eventsObj[elem.eventId]['scheduleDays'][elem.scheduleDay]['scheduleDescriptions'].push(elem.description);
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
								$.get('/travelmaps', function (travelmaps) {
									$(travelmaps).each(function (i, elem) {
										eventsObj[elem.eventId]['aboveMapHeader'] = elem.aboveMapHeader;
										eventsObj[elem.eventId]['belowMapHeading'] = elem.belowMapHeading;
										eventsObj[elem.eventId]['mapDesc'] = elem.mapDesc;
										eventsObj[elem.eventId]['mapImapHtml'] = elem.mapImapHtml;								
									})
									for (var key in eventsObj) {
										eventsObj[key].overviewHtml += '<h2>' + eventsObj[key].eventName + '</h2>';
										for (var i = 0; i < eventsObj[key].overviewHeadingText.length; i++) {
											eventsObj[key].overviewHtml += '<h3>' + eventsObj[key].overviewHeadingText[i] + '</h3>' + '<p>' + eventsObj[key].overviewParagraphText[i] + '</p>';
										}
									}
									for (var key in eventsObj) {
										if (pathname === eventsObj[key].eventUrl) {
											$('#event-overview').append(eventsObj[key].overviewHtml); 
										}
									}
									console.log(eventsObj);
								})
							})
						})
					})
				})
			})
		})
	})
})