'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {

	var $calendar = $('#calendar');

	$( "#2010_events" ).click(function () {


		var schedule = '<table cellspacing="0" cellpadding="0">\
												<thead><tr>\
												<th>Name</th>\
												<th>Date</th>\
												<th>Number of Attendees</th>\
												<th>Technical Topics</th>\
												<th>Related Materials</th>\
										</tr></thead>\
											<tbody><tr>\
												<td>Binary File Format Plugfest</td>\
												<td>October 19-20, 2010</td>\
												<td>16</td>\
												<td>Word, Excel, Outlook, and PowerPoint</td>\
												<td> - </td>\
											</tr><tr>\
												<td>SNIA.org 2010 Storage Developer Conference</td>\
												<td>September 20-23, 2010</td>\
												<td>103</td>\
												<td>CIFS, SMB, and SMB2 file sharing protocol specifications</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn768081#tile=event092010">Summary</a></td>\
											</tr><tr>\
												<td>Exchange Protocols Overview Event</td>\
												<td>September 21-22, 2010</td>\
												<td>24</td>\
												<td>Exchange Protocol specifications, including Exchange RPC, ROPS, Fast Transfer, Incremental Change Synchronization, Protocol Object Model, Notifications, Exchange Web Services, Exchange Active Sync, and other topics</td>\
												<td> - </td>\
											</tr><tr>\
												<td>SharePoint File Operations Protocols Plugfest</td>\
												<td>June 15-16, 2010</td>\
												<td>10</td>\
												<td>SharePoint File Operations Protocols and SharePoint Front End Protocols</td>\
												<td> - </td>\
											</tr><tr>\
												<td>DII Workshop on XAdES</td>\
												<td>June 8, 2010</td>\
												<td>15</td>\
												<td>XAdES digital signature interoperability and related topics</td>\
												<td> - </td>\
											</tr><tr>\
												<td>Microsoft File Sharing Protocols 2010 Plugfest</td>\
												<td>May 17-20, 2010</td>\
												<td>30</td>\
												<td>SMB and SMB2 and other file sharing protocol specifications</td>\
												<td> - </td>\
											</tr><tr>\
												<td>Microsoft Certificate DirectAccess Protocols 2010 Plugfest</td>\
												<td>April 12-15, 2010</td>\
												<td>23</td>\
												<td>Certificate and IPSec protocol specifications</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn768081#tile=event041210">Summary</a></td>\
											</tr><tr>\
												<td>DII Workshop – Beijing, China</td>\
												<td>February 25, 2010</td>\
												<td>19</td>\
												<td>Document interoperability and fidelity and related topics - 3rd annual event</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn768081#tile=event022510">Summary, video, and photos</a></td>\
											</tr><tr>\
												<td>Microsoft Active Directory Protocols 2010 Plugfest</td>\
												<td>January 18-21, 2010</td>\
												<td>11</td>\
												<td>Active Directory protocol specifications</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn768081#tile=event011810">Summary</a></td>\
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
			stickyFooter();
		}

	});

});