'use strict';

$(document).ready(function () {
	var $calendar = $('#calendar');

	$( "#2013_events" ).click(function () {


		var schedule = '<table cellspacing="0" cellpadding="0">\
												<thead><tr>\
												<th>Name</th>\
												<th>Date</th>\
												<th># of attendees</th>\
												<th>Technical topics</th>\
												<th>Related Materials</th>\
											</tr></thead>\
											<tbody><tr>\
												<td>Shanghai Interoperability Protocols Seminar – Shanghai, China</td>\
												<td>December 10-12, 2013</td>\
												<td> - </td>\
												<td> - </td>\
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Shanghai-Interoperability-Protocols-Seminar-2013">Videos</a></td>\
											</tr><tr>\
												<td>SNIA Storage Developers conference and Plugfest 2013 – Santa Clara, CA</td>\
												<td>September 16-19, 2013</td>\
												<td>120</td>\
												<td>SMB, SMB2 and SMB3 file sharing protocols</td>\
												<td><a href="http://www.snia.org/events/storage-developer2013/presentation">Website</a></td>\
											</tr><tr>\
												<td>Redmond Interoperability Protocols Plugfest 2014 – Redmond, WA</td>\
												<td>June 24-28, 2013</td>\
												<td>80</td>\
												<td>Exchange RPC and Web Services and Office SharePoint Specifications; Windows Identity; Active Directory, File Sharing and Authentication Specifications; SQL and OData Protocols</td>\
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Redmond-Interoperability-Protocols-Plugfest-2013">Videos</a></td>\
											</tr><tr>\
												<td>Taipei Interoperability Protocols Plugfest – Taipei, Taiwan</td>\
												<td>April 23-25, 2013</td>\
												<td>110</td>\
												<td>Windows RDP, Exchange and SharePoint Protocols</td>\
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Taipei-Interoperability-Protocols-Plugfest-2013">Videos</a></td>\
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

})