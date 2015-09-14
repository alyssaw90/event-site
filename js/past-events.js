'use strict'

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
		if ($calendar.html() === schedule) {
			$calendar.empty();
		} else {
			$calendar.empty();
			$calendar.append(html);
		}

	});

	$( "#2014_events" ).click(function () {


		var schedule = '<table cellspacing="0" cellpadding="0">\
											<thead><tr>\
												<th>Name</th>\
												<th>Date</th>\
												<th># of attendees</th>\
												<th>Technical topics</th>\
												<th>Related Materials</th>\
											</tr></thead>\
											<tbody><tr>\
												<td>RDP Protocols Plugfest 2014 – Redmond, WA</td>\
												<td>October 28-30, 2014</td>\
												<td> - </td>\
												<td>Protocol test suites and tools overviews, RDP documentation, Windows Multipoint Server, and RDP USB redirection</td>\
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/RDP-Protocols-Plugfest-2014">Videos</a></td>\
											</tr><tr>\
												<td>SDC (SNIA) – Santa Clara, CA</td>\
												<td>September 15-19, 2014</td>\
												<td> - </td>\
												<td> - </td>\
												<td> - </td>\
											</tr><tr>\
												<td>Redmond Interoperability Protocols Plugfest 2014 – Redmond, WA</td>\
												<td>June 16-20, 2014</td>\
												<td> - </td>\
												<td>Windows File Sharing, SharePoint, Exchange, and SQL protocols</td>\
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Redmond-Interoperability-Protocols-Plugfest-2014">Videos</a></td>\
											</tr><tr>\
												<td>Beijing Interoperability Event – Beijing, China</td>\
												<td>April 1-2, 2014</td>\
												<td> - </td>\
												<td> - </td>\
												<td> - </td>\
											</tr><tr>\
												<td>Taipei Interoperability Protocols Plugfest 2014 – Taipei,Taiwan</td>\
												<td>March 25-27, 2014</td>\
												<td> - </td>\
												<td>Key interoperability topics, such as Bring your own device (BYOD), OAuth, OData, Remote Desktop Protocol (RemoteFX/RDP), Office File IO, and Exchange Email clients</td>\
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Taipei-Interoperability-Protocols-Plugfest-2014">Videos</a></td>\
											</tr></tbody>\
										</table>';
		var html = $.parseHTML(schedule);
		if ($calendar.html() === schedule) {
			$calendar.empty();
		} else {
			$calendar.empty();
			$calendar.append(html);
		}

	});

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
		if ($calendar.html() === schedule) {
			$calendar.empty();
		} else {
			$calendar.empty();
			$calendar.append(html);
		}

	});

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
		if ($calendar.html() === schedule) {
			$calendar.empty();
		} else {
			$calendar.empty();
			$calendar.append(html);
		}

	});

});