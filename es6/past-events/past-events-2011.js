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
	
		$( "#2011_events" ).click(function () {
	
	
			let schedule = `<table cellspacing="0" cellpadding="0">
											<thead><tr>
												<th>Name</th>
												<th>Date</th>
												<th>Location</th>
												<th>Technical Topics</th>
												<th>Related Materials</th>
											</tr></thead>
											<tbody><tr>
													<td>Kerberos.org Interop</td>
													<td>October 25-28, 2011</td>
													<td>Cambridge, MA</td>
													<td>Kerberos authentication protocols</td>
													<td><a href="http://www.kerberos.org/events/2011conf-interop/2011slides/2011slides.html">Website</a></td>
												</tr><tr>
													<td>SNIA.org 2011 Storage Developer Conference</td>
													<td>September 19-22, 2011</td>
													<td>Santa Clara, CA</td>
													<td>CIFS, SMB, and SMB2 file sharing protocol specifications</td>
													<td><a href="http://www.snia.org/events/storage-developer2011">Website</a></td>
												</tr><tr>
													<td>Windows File Sharing and SharePoint Protocols Plugfest</td>
													<td>June 20-24, 2011</td>
													<td>Redmond, WA</td>
													<td>SharePoint File Operations Protocols and SharePoint Front End Protocols; SMB, SMB2 and other Windows File Sharing protocols</td>
													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Windows-File-Sharing-and-SharePoint-Protocols-Plugfest-2011">Videos</a></td>
												</tr><tr>
													<td>Exchange Server Select RPC</td>
													<td>January 24-28, 2011</td>
													<td> - </td>
													<td>Exchange Server RPC, ROPS Fast Transfer, and Incremental Change Synchronization protocols</td>
													<td><a href="http://channel9.msdn.com/Series/Exchange-RPC-Protocols-Plugfest-January-2011">Videos</a></td>
												</tr><tr>
													<td>Windows Active Directory Protocols Plugfest</td>
													<td>January 2011</td>
													<td> - </td>
													<td>Active Directory protocols</td>
													<td><a href="http://channel9.msdn.com/Series/Windows-AD-Protocols-Plugfest-2011">Videos</a></td>
												</tr></tbody>
											</table>`;
			let html = $.parseHTML(schedule);
			$(this).siblings().removeClass('selected-year');
    	$(this).toggleClass('selected-year');
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

