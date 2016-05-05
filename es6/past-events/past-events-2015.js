'use strict';
/*global $ */
/*global document */
/*global window */
/*global stickyFooter */
/*jshint multistr: true */ 

let jQuery = require('jquery');
import * as customFunctions from '../common-functions.build.js';

(function($) {

	$(document).ready(function () {

		let $calendar = $('#calendar');
		let imgArr = [];

		$( "#2015_events" ).click(function () {


			let schedule = `<table cellspacing="0" cellpadding="0">
											<thead><tr>
												<th>Name</th>
												<th>Date</th>
												<th>Location</th>
												<th>Technical Topics</th>
												<th>Related Materials</th>
											</tr></thead>
											<tbody><tr>
												<td><a href="/shanghai2015">Shanghai Interop Dev Days 2015</a></td>
												<td>October 21 - 22, 2015</td>
												<td>Shanghai, China</td>
												<td>Office Developer Opportunity, Data Platform, OData, Open Specifications, Office Add-ins + APIs</td>
												<td><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Shanghai-Interop-Dev-Days">Videos</a>, <a href="/taipei2016">Event Page</a></td>
											</tr><tr>
												<td>Redmond Interoperability Protocols Plugfest 2015</td>
												<td>June 22-26, 2015</td>
												<td>Redmond, WA</td>
												<td>MailSim, Message Analyzer, FSSHTTP, O365 Developer Experience, OData, Exchange REST APIs, Office Parsers, Skype for Business Protocols, and Exchange ActiveSync.</td>
												<td><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Redmond-Interoperability-Protocols-Plugfest-2015">Videos</a></td>
											</tr><tr>
												<td>sambaXP 2015</td>
												<td>May 19-22, 2015</td>
												<td>Göttingen, Germany</td>
												<td> - </td>
												<td><a href="http://www.sambaxp.org/">Recordings and slides</a></td>
											</tr><tr>
												<td>Protocols Plugfest Europe 2015</td>
												<td>May 12-14, 2015</td>
												<td>Zaragoza, Spain</td>
												<td> - </td>
												<td><a href="http://www.protocolsplugfest.com/europe/program/">Videos</a></td>
											</tr><tr>
												<td>Taipei Interoperability Plugfest and Server TechFest 2015</td>
												<td>March 24-26, 2015</td>
												<td>Taipei, Taiwan</td>
												<td>Office 365 authentication, Microsoft Cloud Foundation, Office Online, Office BI Power Tools, OData, Message Analyzer, Lync, and ActiveSync.</td>
												<td><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Taipei-Interoperability-Plugfest-and-Server-TechFest-2015">Videos</a></td>
											</tr><tr>
												<td>Beijing Interop Seminar 2015</td>
												<td>March 16-17, 2015</td>
												<td>Beijing, China</td>
												<td>Office File Formats and the latest in Office developer and product technology.</td>
												<td><a href="http://connect.microsoft.com/site216/Downloads/DownloadDetails.aspx?DownloadID=57585">Presentation handouts</a></td>
											</tr></tbody>
											</table>`;

			let html = $.parseHTML(schedule);
			if ($(this).css('background-color') === 'rgba(0, 216, 204, 0.8)') {
			    $calendar.empty();
			} else {
			    $calendar.empty();
			    $calendar.append(html);
			}
			customFunctions.stickyFooter();

		});

	});

})(jQuery);