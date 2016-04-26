'use strict';
/*global $ */
/*global document */
/*global window */
/*global stickyFooter */
/*jshint multistr: true */ 

let jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

(function($) {

	$(document).ready(function () {
			let $calendar = $('#calendar');

			$( "#2014_events" ).click(function () {


			let schedule = `<table cellspacing="0" cellpadding="0">
												<thead><tr>
													<th>Name</th>
													<th>Date</th>
													<th># of attendees</th>
													<th>Technical topics</th>
													<th>Related Materials</th>
												</tr></thead>
												<tbody><tr>
													<td>RDP Protocols Plugfest 2014 – Redmond, WA</td>
													<td>October 28-30, 2014</td>
													<td> - </td>
													<td>Protocol test suites and tools overviews, RDP documentation, Windows Multipoint Server, and RDP USB redirection</td>
													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/RDP-Protocols-Plugfest-2014">Videos</a></td>
												</tr><tr>
													<td>SDC (SNIA) – Santa Clara, CA</td>
													<td>September 15-19, 2014</td>
													<td> - </td>
													<td> - </td>
													<td> - </td>
												</tr><tr>
													<td>Redmond Interoperability Protocols Plugfest 2014 – Redmond, WA</td>
													<td>June 16-20, 2014</td>
													<td> - </td>
													<td>Windows File Sharing, SharePoint, Exchange, and SQL protocols</td>
													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Redmond-Interoperability-Protocols-Plugfest-2014">Videos</a></td>
												</tr><tr>
													<td>Beijing Interoperability Event – Beijing, China</td>
													<td>April 1-2, 2014</td>
													<td> - </td>
													<td> - </td>
													<td> - </td>
												</tr><tr>
													<td>Taipei Interoperability Protocols Plugfest 2014 – Taipei,Taiwan</td>
													<td>March 25-27, 2014</td>
													<td> - </td>
													<td>Key interoperability topics, such as Bring your own device (BYOD), OAuth, OData, Remote Desktop Protocol (RemoteFX/RDP), Office File IO, and Exchange Email clients</td>
													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Taipei-Interoperability-Protocols-Plugfest-2014">Videos</a></td>
												</tr></tbody>
											</table>`;
			let html = $.parseHTML(schedule);
			$(this).siblings().removeClass('selected-year');
			$(this).toggleClass('selected-year');
			if ($calendar.html() === schedule) {
				$calendar.empty();
			} else {
				$calendar.empty();
				$calendar.append(html);
			}
			customFunctions.stickyFooter();

		});

	});

})(jQuery);