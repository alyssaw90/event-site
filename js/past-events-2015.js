'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {

	var $calendar = $('#calendar');

	$( "#2015_events" ).click(function () {


		var schedule = '<table cellspacing="0" cellpadding="0">\
										<thead><tr>\
											<th>Name</th>\
											<th>Date</th>\
											<th>Number of Attendees</th>\
											<th>Technical Topics</th>\
											<th>Related Materials</th>\
										</tr></thead>\
										<tbody><tr>\
											<td>Redmond Interoperability Protocols Plugfest 2015 – Redmond, WA</td>\
											<td>June 22-26, 2015</td>\
											<td> - </td>\
											<td>MailSim, Message Analyzer, FSSHTTP, O365 Developer Experience, OData, Exchange REST APIs, Office Parsers, Skype for Business Protocols, and Exchange ActiveSync.</td>\
											<td><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Redmond-Interoperability-Protocols-Plugfest-2015">Videos</a></td>\
										</tr><tr>\
											<td>sambaXP 2015 – Göttingen, Germany</td>\
											<td>May 19-22, 2015</td>\
											<td> - </td>\
											<td> - </td>\
											<td><a href="http://www.sambaxp.org/">Recordings and slides</a></td>\
										</tr><tr>\
											<td>Protocols Plugfest Europe 2015 – Zaragoza, Spain</td>\
											<td>May 12-14, 2015</td>\
											<td> - </td>\
											<td> - </td>\
											<td><a href="http://www.protocolsplugfest.com/europe/program/">Videos</a></td>\
										</tr><tr>\
											<td>Taipei Interoperability Plugfest and Server TechFest 2015 – Taipei, Taiwan</td>\
											<td>March 24-26, 2015</td>\
											<td> - </td>\
											<td>Office 365 authentication, Microsoft Cloud Foundation, Office Online, Office BI Power Tools, OData, Message Analyzer, Lync, and ActiveSync.</td>\
											<td><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Taipei-Interoperability-Plugfest-and-Server-TechFest-2015">Videos</a></td>\
										</tr><tr>\
											<td>Beijing Interop Seminar 2015 – Beijing, China</td>\
											<td>March 16-17, 2015</td>\
											<td> - </td>\
											<td>Office File Formats and the latest in Office developer and product technology.</td>\
											<td><a href="http://connect.microsoft.com/site216/Downloads/DownloadDetails.aspx?DownloadID=57585">Presentation handouts</a></td>\
										</tr></tbody>\
										</table>';
		var html = $.parseHTML(schedule);
		$(this).siblings().removeClass('selected-year');
		$(this).toggleClass('selected-year');
		if ($calendar.html() === schedule) {
			$calendar.empty();
		} else {
			$calendar.empty();
			$calendar.append(html);
		}

	});

});