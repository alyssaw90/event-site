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
			eventsObj[data[i].id]['sponsorsHeading'] = data[i].sponsorsHeading;
			eventsObj[data[i].id]['sponsorsParagraph'] = data[i].sponsorsParagraph;
			eventsObj[data[i].id]['overviewParagraphText'] = [];
			eventsObj[data[i].id]['overviewHeadingText'] = [];
			eventsObj[data[i].id]['scheduleDays'] = [];
			eventsObj[data[i].id]['scheduleInfo'] = [];
			eventsObj[data[i].id]['sponsors'] = [];
			eventsObj[data[i].id]['sponsorsDivStr'] = '';
			eventsObj[data[i].id]['travelHtml'] = '';
			eventsObj[data[i].id]['speakers'] = [];
			eventsObj[data[i].id]['attendees'] = [];
			eventsObj[data[i].id]['aboveMapHeader'] = '';
			eventsObj[data[i].id]['belowMapHeading'] = '';
			eventsObj[data[i].id]['mapDesc'] = '';
			eventsObj[data[i].id]['mapImapHtml'] = '';
			eventsObj[data[i].id]['tipHeading'] = [];
			eventsObj[data[i].id]['tipParagraph'] = [];
			eventsObj[data[i].id]['accommodationName'] = [];
			eventsObj[data[i].id]['accommodationDesc'] = [];
			eventsObj[data[i].id]['accommodationUrl'] = [];
			eventsObj[data[i].id]['accommodationPhone'] = [];
			eventsObj[data[i].id]['accommodationEmail'] = [];
			eventsObj[data[i].id]['restaurantName'] = [];
			eventsObj[data[i].id]['restaurantDesc'] = [];
			/*eventsObj[data[i].id]['scheduleTimes'] = [];
			eventsObj[data[i].id]['scheduleDescriptions'] = [];*/
		}
		$.get('/eventoverviews', function (overviews) {
			for (var i = 0, j = overviews.length; i < j; i++) {
				eventsObj[overviews[i].eventId]['overviewHeadingText'].push(overviews[i].headingText);
				eventsObj[overviews[i].eventId]['overviewParagraphText'].push(overviews[i].paragraphText);
			}
			$.get('/eventschedules', function (schedules) {
				for (var i = 0, j = schedules.length; i < j; i++) {
					eventsObj[schedules[i].eventId]['scheduleInfo'].push(schedules[i]);
					if (eventsObj[schedules[i].eventId]['scheduleDays'].indexOf(schedules[i].scheduleDay) === -1) {
						eventsObj[schedules[i].eventId]['scheduleDays'].push(schedules[i].scheduleDay);
					}
				}
				$.get('/sponsors', function (sponsors) {
												console.log('Now :: ', $.now());
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
									eventsObj[travelinfo[i].eventId]['tipsDivHeading'] = travelinfo[i].tipsDivHeading;
									eventsObj[travelinfo[i].eventId]['tipsDivParagraph'] = travelinfo[i].tipsDivParagraph;
									eventsObj[travelinfo[i].eventId]['eatAndDrinkHeading'] = travelinfo[i].eatAndDrinkHeading;
								}
								console.log('travel info :::::::::::::: ', travelinfo);
								//set null values to empty strings
								$.get('/accommodationinfo', function (accommodationinfo) {
									for (var i = 0, j = accommodationinfo.length; i < j; i++) {
										eventsObj[accommodationinfo[i].eventId]['accommodationName'].push(accommodationinfo[i].accommodationName);
										eventsObj[accommodationinfo[i].eventId]['accommodationDesc'].push(accommodationinfo[i].accommodationDesc);
										eventsObj[accommodationinfo[i].eventId]['accommodationUrl'].push(accommodationinfo[i].accommodationUrl);
										eventsObj[accommodationinfo[i].eventId]['accommodationPhone'].push(accommodationinfo[i].accommodationPhone);
										eventsObj[accommodationinfo[i].eventId]['accommodationEmail'].push(accommodationinfo[i].accommodationEmail);
									}
									$.get('/traveltips', function (traveltips) {
										for (var i = 0, j = traveltips.length; i < j; i++) {
											eventsObj[traveltips[i].eventId]['tipHeading'].push(traveltips[i].tipHeading);
											eventsObj[traveltips[i].eventId]['tipParagraph'].push(traveltips[i].tipParagraph);
										}
										$.get('/travelrestaurants', function (travelrestaurants) {
											for (var i = 0, j = travelrestaurants.length; i < j; i++) {
												eventsObj[travelrestaurants[i].eventId]['restaurantName'].push(travelrestaurants[i].restaurantName);
												eventsObj[travelrestaurants[i].eventId]['restaurantDesc'].push(travelrestaurants[i].restaurantDesc);
											}
											for (var key in eventsObj) {
												var daysLength = eventsObj[key].scheduleDays.length;
												var scheduleInfoObj = {};
												var accommodationStr = '';
												var tipsStr = '';
												var eatDrinkStr = '';
												var platinumSponsorsStr = '<div class="col_12">';
												var goldSponsorsStr = '<div class="col_12">';
												var silverSponsorsStr = '<div class="col_12">';
												var bronzeSponsorsStr = '<div class="col_12">';
												var platinumSponsorCount = 0;
												var goldSponsorCount = 0;
												var silverSponsorCount = 0;
												var bronzeSponsorCount = 0;
												var platinumColDiv = '<div class="col_';
												var goldColDiv = '<div class="col_';
												var silverColDiv = '<div class="col_';
												var bronzeColDiv = '<div class="col_';
												var sponsorsStr = '<h3>Platinum Sponsors</h3>platinumSponsorsPlaceholder<hr class="alt1" /><h3>Gold Sponsors</h3>goldSponsorPlaceholder<hr class="alt1" /><h3>Silver Sponsors</h3>silverSponsorsPlaceholder<hr class="alt1" /><h3>Bronze Sponsors</h3>bronzeSponsorPlaceholder<hr class="alt1" />';
												eventsObj[key].sponsorsDivStr = '<h3>' + eventsObj[key].sponsorsHeading + '</h3><p>' + eventsObj[key].sponsorsParagraph + '</p><hr class="alt1" />';
												for (var key2 in eventsObj[key].sponsors) {
													if (eventsObj[key].sponsors[key2].platinumSponsorName) {
														platinumSponsorCount++;															
													}
													if (eventsObj[key].sponsors[key2].goldSponsorName) {
														goldSponsorCount++;															
													}
													if (eventsObj[key].sponsors[key2].silverSponsorName) {
														silverSponsorCount++;															
													}
													if (eventsObj[key].sponsors[key2].bronzeSponsorName) {
														bronzeSponsorCount++;															
													}
												}
												platinumColDiv += Math.floor(12 / platinumSponsorCount) + '">';
												goldColDiv += Math.floor(12 / goldSponsorCount) + '">';
												silverColDiv += Math.floor(12 / silverSponsorCount) + '">';
												bronzeColDiv += Math.floor(12 / bronzeSponsorCount) + '">';
												platinumSponsorsStr += '<h3>Platinum Sponsor</h3>' + platinumColDiv;
												goldSponsorsStr += '<h3>Gold Sponsor</h3>' + goldColDiv;
												silverSponsorsStr += '<h3>Silver Sponsor</h3>' + silverColDiv;
												bronzeSponsorsStr += '<h3>Bronze Sponsor</h3>' + bronzeColDiv;
												for (var key2 in eventsObj[key].sponsors){
													if (eventsObj[key].sponsors[key2].platinumSponsorDesc) {
														platinumSponsorsStr +='<img src="../uploads/' + eventsObj[key].sponsors[key2].platinumSponsorLogo + '" /><h4>' + eventsObj[key].sponsors[key2].platinumSponsorName + '</h4></div>';
													}
													if (eventsObj[key].sponsors[key2].goldSponsorDesc) {
														goldSponsorsStr += '<img src="../uploads/' + eventsObj[key].sponsors[key2].goldSponsorLogo + '" /><h4>' + eventsObj[key].sponsors[key2].goldSponsorName + '</h4></div>';
													}
													if (eventsObj[key].sponsors[key2].silverSponsorDesc) {
														silverSponsorsStr += '<img src="../uploads/' + eventsObj[key].sponsors[key2].silverSponsorLogo + '" /><h4>' + eventsObj[key].sponsors[key2].silverSponsorName + '</h4></div>';
													}
													if (eventsObj[key].sponsors[key2].bronzeSponsorDesc) {
														bronzeSponsorsStr += '<img src="../uploads/' + eventsObj[key].sponsors[key2].bronzeSponsorLogo + '" /><h4>' + eventsObj[key].sponsors[key2].bronzeSponsorName + '</h4></div>';
													}
												}
												platinumSponsorsStr += '<hr class="alt1" /></div>';
												goldSponsorsStr += '<hr class="alt1" /></div>';
												silverSponsorsStr += '<hr class="alt1" /></div>';
												bronzeSponsorsStr += '<hr class="alt1" /></div>';
												sponsorsStr.replace('platinumSponsorsPlaceholder', platinumSponsorsStr).replace('goldSponsorPlaceholder', goldSponsorsStr).replace('silverSponsorsPlaceholder', silverSponsorsStr).replace('bronzeSponsorPlaceholder', bronzeSponsorsStr);
												eventsObj[key].sponsorsDivStr += platinumSponsorsStr + goldSponsorsStr + silverSponsorsStr + bronzeSponsorsStr;
												for (var i = 0, j = eventsObj[key].accommodationName.length; i < j; i++) {
													accommodationStr += '<a href="' + eventsObj[key].accommodationUrl[i] + ' "><h4>' + eventsObj[key].accommodationName[i] + '</h4></a><p>' + eventsObj[key].accommodationDesc[i] + '</p><p>email: <a href="mailto:' + eventsObj[key].accommodationEmail[i] + '"> ' + eventsObj[key].accommodationEmail[i] + '</a></p><p>Phone: <a href="tel:' + eventsObj[key].accommodationPhone[i] + '">' + eventsObj[key].accommodationPhone[i] + '</a></p>';
												}
												for (var i = 0, j = eventsObj[key].tipHeading.length; i < j; i++) {
													tipsStr += '<h4>' + eventsObj[key].tipHeading[i] + '</h4><p>' + eventsObj[key].tipParagraph + '</p>';
												}
												for (var i = 0, j = eventsObj[key].restaurantName.length; i < j; i++) {
													eatDrinkStr += '<h4>' + eventsObj[key].restaurantName[i] + '</h4><p>' + eventsObj[key].restaurantDesc + '</p>';
												}
												eventsObj[key].travelHtml = '<h2>locationTitle</h2><div id="imapDiv" class="flexible-container">theMap</div><hr class="alt1" /><ul id="travelTabsMenu" class="tabs left"><li class="current"><a href="#venue-tab"><h5>Venue</h5></a></li><li><a href="#travel-tab"><h5>Travel</h5></a></li><li><a href="#accomodations-tab"><h5>Accomodations</h5></a></li><li><a href="#tips-tab"><h5>Tips & Tricks</h5></a></li><li><a href="#eat-drink"><h5>Where to Eat & Drink</h5></a></li></ul><div id="venue-tab" class="tab-content" style="display:none;"><img src="../uploads/VenueImage" /><h3>VenueDivHeader</h3><p>VenueDescription</p></div><div id="travel-tab" class="tab-content" style="display:none;"><img src="../uploads/TravelImage" /><h3>TravelDivHeader</h3><p>TravelDivDescription</p></div><div id="accomodations-tab" class="tab-content" style="display:none;"><h3>AccommodationsDivHeader</h3><p>AccommodationsDivDescription</p><p>AccommodationsDivList</p></div><div id="tips-tab" class="tab-content" style="display:none;"><h3>TipsDivHeader</h3><p>TipsDivDescription</p><p>TipsDivList</p></div><div id="eat-drink" class="tab-content" style="display:none;"><h3>eatDrinkDivHeader</h3><p>eatDrinkDivList</p></div>'
												if (eventsObj[key].mapImapHtml === null) {
													eventsObj[key].mapImapHtml = '';
												}
												if (eventsObj[key].aboveMapHeader !== null) {
													$('#travelTabLink').show();
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('locationTitle', eventsObj[key].aboveMapHeader);
												}
												if (eventsObj[key].aboveMapHeader === null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('<h2>locationTitle</h2>', '');
												}
												if (eventsObj[key].mapImapHtml !== null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('theMap', eventsObj[key].mapImapHtml);
												}
												if (eventsObj[key].mapImapHtml === null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('<div id="imapDiv" class="flexible-container">theMap</div>', '');
												}
												if (eventsObj[key].venueName === null && eventsObj[key].venueDesc === null && eventsObj[key].venueImage === null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('<li class="current"><a href="#venue-tab"><h5>Venue</h5></a></li>', '').replace('<div id="venue-tab" class="tab-content" style="display:none;"><img src="../uploads/VenueImage" /><h3>VenueDivHeader</h3><p>VenueDescription</p></div>', '');
												}
												if (eventsObj[key].venueName !== null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('VenueDivHeader', eventsObj[key].venueName);
												}
												if (eventsObj[key].venueDesc !== null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('VenueDescription', eventsObj[key].venueDesc);
												}
												if (eventsObj[key].venueImage !== null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('VenueImage', eventsObj[key].venueImage);
												}
												if (eventsObj[key].travelImage === null && eventsObj[key].travelHeading === null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('<li><a href="#travel-tab"><h5>Travel</h5></a></li>', '').replace('<div id="travel-tab" class="tab-content" style="display:none;"><img src="../uploads/TravelImage" /><h3>TravelDivHeader</h3><p>TravelDivDescription</p></div>', '');
												}
												if (eventsObj[key].travelImage === null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('<img src="../uploads/TravelImage" />', '');
												}
												if (eventsObj[key].travelImage !== null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('TravelImage', eventsObj[key].travelImage)
												}
												if (eventsObj[key].travelHeading !== null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('TravelDivHeader', eventsObj[key].travelHeading);
												}
												if (eventsObj[key].travelDesc === null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('<p>TravelDivDescription</p>', '');
												}
												if (eventsObj[key].travelDesc !== null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('TravelDivDescription', eventsObj[key].travelDesc);
												}
												if (eventsObj[key].accommodationHeading === null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('<li><a href="#accomodations-tab"><h5>Accomodations</h5></a></li>', '');
												}
												if (eventsObj[key].accommodationHeading !== null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('AccommodationsDivHeader', eventsObj[key].accommodationHeading);
												}
												if (eventsObj[key].accommodationParagraph === null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('<p>AccommodationsDivDescription</p>', '');
												}
												if (eventsObj[key].accommodationParagraph !== null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('AccommodationsDivDescription', eventsObj[key].accommodationParagraph);
												}
												if (eventsObj[key].accommodationName.length === 0) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('<p>AccommodationsDivList</p>');
												}
												if (eventsObj[key].accommodationName.length !== 0) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('AccommodationsDivList', accommodationStr);
												}
												if (eventsObj[key].tipsDivHeading === null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('<li><a href="#tips-tab"><h5>Tips & Tricks</h5></a></li>', '');
												}
												if (eventsObj[key].tipsDivHeading !== null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('TipsDivHeader', eventsObj[key].tipsDivHeading);
												}
												if (eventsObj[key].tipsDivParagraph === null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('<p>TipsDivDescription</p>', '');
												}
												if (eventsObj[key].tipsDivParagraph !== null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('TipsDivDescription', eventsObj[key].tipsDivParagraph);
												}
												if (eventsObj[key].tipHeading.length === 0) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('<p>TipsDivList</p>', '');
												}
												if (eventsObj[key].tipHeading.length !== 0) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('TipsDivList', tipsStr);
												}
												if (eventsObj[key].eatAndDrinkHeading === null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('<li><a href="#eat-drink"><h5>Where to Eat & Drink</h5></a></li>', '');
												}
												if (eventsObj[key].eatAndDrinkHeading !== null) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('eatDrinkDivHeader', eventsObj[key].eatAndDrinkHeading);
												}
												if (eventsObj[key].restaurantName.length === 0) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('<p>eatDrinkDivList</p>', '');
												}
												if (eventsObj[key].restaurantName.length !== 0) {
													eventsObj[key].travelHtml = eventsObj[key].travelHtml.replace('eatDrinkDivList', eatDrinkStr);
												}

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
											}
											//add elements to DOM
											for (var key in eventsObj) {
												if (pathname === eventsObj[key].eventUrl) {
													document.title = eventsObj[key].eventName;
													if (eventsObj[key].overviewHtml !== '<ul class="tabs center">') {
														$('#eventOverviewTabLink').show();
														$('#event-overview').append(eventsObj[key].overviewHtml); 
													}
													if (eventsObj[key].scheduleDaysHtml !== '<ul class="tabs center">') {
														$('#eventScheduleTabLink').show();
														$('#event-schedule').append(eventsObj[key].scheduleDaysHtml);
													}
													if (eventsObj[key].speakers.length !== 0) {
														$('#eventSpeakersTabLink').show();
														$('#eventSpeakers').append(eventsObj[key].speakersHtml);
													}
													$('#travelTab').append(eventsObj[key].travelHtml);
													if ($('#imapDiv').text().length === 0) {
														$('#imapDiv').hide();
													}
													if ($('#venue-tab').text() !== 'nullnull') {
														$('#venueTabLi').show();
														$('#venue-tab').show();

													}
													// $('ul li:first-child:visible').addClass('current');
													// $('ul').find('li:visible:first').addClass('current');
													if (eventsObj[key].sponsorsHeading) {
														$('#sponsorsTabLink').show();
														$('#eventSponsors').append(eventsObj[key].sponsorsDivStr);														
													}
													$('#eventHeader').html('<img src="../uploads/' + eventsObj[key].eventHeaderImage + '" />')
													console.log('End   :: ', $.now());
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