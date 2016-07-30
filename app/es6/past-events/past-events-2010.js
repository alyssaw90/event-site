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
    let $pastEventsDiv = $( '#2010_events' );

    let showSchedule = function(e) {
      let html;
      let schedule = `<table id="2010PastEvents" tabindex="0" cellspacing="0" cellpadding="0">
												<thead><tr>
												<th>Name</th>
												<th>Date</th>
												<th>Location</th>
												<th>Technical Topics</th>
												<th>Related Materials</th>
										</tr></thead>
											<tbody><tr>
												<td>Binary File Format Plugfest</td>
												<td>October 19-20, 2010</td>
												<td> - </td>
												<td>Word, Excel, Outlook, and PowerPoint</td>
												<td> - </td>
											</tr><tr>
												<td>SNIA.org 2010 Storage Developer Conference</td>
												<td>September 20-23, 2010</td>
												<td>Santa Clara, CA</td>
												<td>CIFS, SMB, and SMB2 file sharing protocol specifications</td>
												<td><a href="https://msdn.microsoft.com/openspecifications/dn768081#tile=event092010">Summary</a></td>
											</tr><tr>
												<td>Exchange Protocols Overview Event</td>
												<td>September 21-22, 2010</td>
												<td>24</td>
												<td>Exchange Protocol specifications, including Exchange RPC, ROPS, Fast Transfer, Incremental Change Synchronization, Protocol Object Model, Notifications, Exchange Web Services, Exchange Active Sync, and other topics</td>
												<td> - </td>
											</tr><tr>
												<td>SharePoint File Operations Protocols Plugfest</td>
												<td>June 15-16, 2010</td>
												<td> - </td>
												<td>SharePoint File Operations Protocols and SharePoint Front End Protocols</td>
												<td> - </td>
											</tr><tr>
												<td>DII Workshop on XAdES</td>
												<td>June 8, 2010</td>
												<td> - </td>
												<td>XAdES digital signature interoperability and related topics</td>
												<td> - </td>
											</tr><tr>
												<td>Microsoft File Sharing Protocols 2010 Plugfest</td>
												<td>May 17-20, 2010</td>
												<td> - </td>
												<td>SMB and SMB2 and other file sharing protocol specifications</td>
												<td> - </td>
											</tr><tr>
												<td>Microsoft Certificate DirectAccess Protocols 2010 Plugfest</td>
												<td>April 12-15, 2010</td>
												<td> - </td>
												<td>Certificate and IPSec protocol specifications</td>
												<td><a href="https://msdn.microsoft.com/openspecifications/dn768081#tile=event041210">Summary</a></td>
											</tr><tr>
												<td>DII Workshop</td>
												<td>February 25, 2010</td>
												<td>Beijing, China</td>
												<td>Document interoperability and fidelity and related topics - 3rd annual event</td>
												<td><a href="https://msdn.microsoft.com/openspecifications/dn768081#tile=event022510">Summary, video, and photos</a></td>
											</tr><tr>
												<td>Microsoft Active Directory Protocols 2010 Plugfest</td>
												<td>January 18-21, 2010</td>
												<td> - </td>
												<td>Active Directory protocol specifications</td>
												<td><a href="https://msdn.microsoft.com/openspecifications/dn768081#tile=event011810">Summary</a></td>
											</tr></tbody>
										</table>`;
        
      
      html = $.parseHTML(schedule);
      customFunctions.showCalendarOfPastEvents(html, $pastEventsDiv, $calendar);
      // console.log('past:    ', $('#firstPastEventHeader'));
      customFunctions.stickyFooter();
      $('#2010PastEvents').focus();
      /*$('th, td').attr('tabindex', '0');
      $('td a:only-child').parent('td').attr('tabindex', '-1');*/

    }

    $pastEventsDiv.click(showSchedule);
    $pastEventsDiv.keydown(function (e) {
      let keyCode = customFunctions.getKeyCode(e);
      if (keyCode === 13) {
        showSchedule();
      }
    });

  });
})(jQuery);
