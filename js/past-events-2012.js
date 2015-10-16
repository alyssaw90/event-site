'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {
	var $calendar = $('#calendar');

	$( "#2012_events" ).click(function () {


		var schedule = '<table cellspacing="0" cellpadding="0">\
												<thead><tr>\
												<th>Name</th>\
												<th>Date</th>\
												<th># of attendees</th>\
												<th>Technical topics</th>\
												<th>Related Materials</th>\
											</tr></thead>\
											<tbody><tr>\
												<td>Brussels Interoperability Protocols Plugfest – Brussels, Belgium</td>\
												<td>November 13-14, 2012</td>\
												<td>12</td>\
												<td>Windows Identity, SharePoint, Exchange, and SQL Protocols</td>\
												<td> - </td>\
											</tr><tr>\
												<td>SNIA Storage Developers conference and Plugfest 2012 – Santa Clara, CA</td>\
												<td>September 17-20, 2012</td>\
												<td>110</td>\
												<td>SMB, SMB2, and SMB3 file sharing protocols</td>\
												<td><a href="http://www.snia.org/events/storage-developer2012/presentations12">Website</a></td>\
											</tr><tr>\
												<td>OSCON.com 2012</td>\
												<td>July 2012</td>\
												<td> - </td>\
												<td> - </td>\
												<td> - </td>\
											</tr><tr>\
												<td>Windows File Sharing Protocols Plugfest</td>\
												<td>June 18-22, 2012</td>\
												<td>40</td>\
												<td> - </td>\
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Windows-File-Sharing-Protocols-Plugfest-2012">Videos</a></td>\
											</tr><tr>\
												<td>Interop.com 2012 – Las Vegas, NV</td>\
												<td>May 2012</td>\
												<td> - </td>\
												<td> - </td>\
												<td><a href="http://www.interop.com/lasvegas/">Website</a></td>\
											</tr><tr>\
												<td>sambaXP 2012 – Göttingen, Germany</td>\
												<td>May 2012</td>\
												<td> - </td>\
												<td> - </td>\
												<td><a href="http://sambaxp.org/">Website</a></td>\
											</tr><tr>\
												<td>Taipei Communication Protocols Plugfest – Taipei, Taiwan</td>\
												<td>May 2-4, 2012</td>\
												<td>110</td>\
												<td>Windows RDP, Exchange and SharPoint Protocols</td>\
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Taipei-Communication-Protocols-Plugfest-2012">Videos</a></td>\
											</tr><tr>\
												<td>Windows Identity and Exchange Protocols Plugfest – Redmond, WA</td>\
												<td>April 16-20, 2012</td>\
												<td>38</td>\
												<td>Exchange RPC and Web Services Specifications; Windows Identity; Active Directory and Authentication Specifications</td>\
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Windows-Identity-and-Exchange-Protocols-Plugfest-2012">Videos</a></td>\
											</tr><tr>\
												<td>RemoteFX Conference – Redmond, WA</td>\
												<td>April 10-11, 2012</td>\
												<td> - </td>\
												<td> - </td>\
												<td><a href="">Videos</a></td>\
											</tr><tr>\
												<td>OData Interop Meetup – Redmond, WA</td>\
												<td>March 19-20, 2012</td>\
												<td>31</td>\
												<td>The Evolution of OData, OData v3, Partner Presentations, Implementing OData, and Open Discussion Session</td>\
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Odata-Meetup-2012">Videos</a></td>\
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