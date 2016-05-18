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
	let $pastEventsDiv = $( '#2012_events' );

	$pastEventsDiv.click(function () {


		let schedule = `<table cellspacing="0" cellpadding="0">
												<thead><tr>
												<th>Name</th>
												<th>Date</th>
												<th>Location</th>
												<th>Technical topics</th>
												<th>Related Materials</th>
											</tr></thead>
											<tbody><tr>
												<td>Brussels Interoperability Protocols Plugfest</td>
												<td>November 13-14, 2012</td>
												<td>Brussels, Belgium</td>
												<td>Windows Identity, SharePoint, Exchange, and SQL Protocols</td>
												<td> - </td>
											</tr><tr>
												<td>SNIA Storage Developers conference and Plugfest 2012</td>
												<td>September 17-20, 2012</td>
												<td>Santa Clara, CA</td>
												<td>SMB, SMB2, and SMB3 file sharing protocols</td>
												<td><a href="http://www.snia.org/events/storage-developer2012/presentations12">Website</a></td>
											</tr><tr>
												<td>OSCON.com 2012</td>
												<td>July 2012</td>
												<td>Portland, OR</td>
												<td> - </td>
												<td> - </td>
											</tr><tr>
												<td>Windows File Sharing Protocols Plugfest</td>
												<td>June 18-22, 2012</td>
												<td>Redmond, WA</td>
												<td> - </td>
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Windows-File-Sharing-Protocols-Plugfest-2012">Videos</a></td>
											</tr><tr>
												<td>Interop.com 2012</td>
												<td>May 2012</td>
												<td>Las Vegas, NV</td>
												<td> - </td>
												<td><a href="http://www.interop.com/lasvegas/">Website</a></td>
											</tr><tr>
												<td>sambaXP 2012</td>
												<td>May 2012</td>
												<td>Göttingen, Germany</td>
												<td> - </td>
												<td><a href="http://sambaxp.org/">Website</a></td>
											</tr><tr>
												<td>Taipei Communication Protocols Plugfest</td>
												<td>May 2-4, 2012</td>
												<td>Taipei, Taiwan</td>
												<td>Windows RDP, Exchange and SharPoint Protocols</td>
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Taipei-Communication-Protocols-Plugfest-2012">Videos</a></td>
											</tr><tr>
												<td>Windows Identity and Exchange Protocols Plugfest</td>
												<td>April 16-20, 2012</td>
												<td>Redmond, WA</td>
												<td>Exchange RPC and Web Services Specifications; Windows Identity; Active Directory and Authentication Specifications</td>
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Windows-Identity-and-Exchange-Protocols-Plugfest-2012">Videos</a></td>
											</tr><tr>
												<td>RemoteFX Conference</td>
												<td>April 10-11, 2012</td>
												<td>Redmond, WA</td>
												<td> - </td>
												<td><a href="">Videos</a></td>
											</tr><tr>
												<td>OData Interop Meetup</td>
												<td>March 19-20, 2012</td>
												<td>Redmond, WA</td>
												<td>The Evolution of OData, OData v3, Partner Presentations, Implementing OData, and Open Discussion Session</td>
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Odata-Meetup-2012">Videos</a></td>
											</tr></tbody>
										</table>`;
		let html = $.parseHTML(schedule);
		customFunctions.showCalendarOfPastEvents(html, $pastEventsDiv, $calendar);
		customFunctions.stickyFooter();

	});
});

})(jQuery);

