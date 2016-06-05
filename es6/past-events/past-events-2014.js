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
    let $pastEventsDiv = $( '#2014_events' );

    let showSchedule = function(e) {
      let keyCode = customFunctions.getKeyCode(e);
      let html;
      let schedule = keyCode === 13 || keyCode === 1 ? `<table id="2014PastEvents" cellspacing="0" cellpadding="0">
												<thead><tr>
													<th>Name</th>
													<th>Date</th>
													<th>Location</th>
													<th>Technical topics</th>
													<th>Related Materials</th>
												</tr></thead>
												<tbody><tr>
													<td>RDP Protocols Plugfest 2014</td>
													<td>October 28-30, 2014</td>
													<td>Redmond, WA</td>
													<td>Protocol test suites and tools overviews, RDP documentation, Windows Multipoint Server, and RDP USB redirection</td>
													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/RDP-Protocols-Plugfest-2014">Videos</a></td>
												</tr><tr>
													<td>SDC (SNIA)</td>
													<td>September 15-19, 2014</td>
													<td>Santa Clara, CA</td>
													<td> - </td>
													<td> - </td>
												</tr><tr>
													<td>Redmond Interoperability Protocols Plugfest 2014</td>
													<td>June 16-20, 2014</td>
													<td>Redmond, WA</td>
													<td>Windows File Sharing, SharePoint, Exchange, and SQL protocols</td>
													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Redmond-Interoperability-Protocols-Plugfest-2014">Videos</a></td>
												</tr><tr>
													<td>Beijing Interoperability Event</td>
													<td>April 1-2, 2014</td>
													<td>Beijing, China</td>
													<td> - </td>
													<td> - </td>
												</tr><tr>
													<td>Taipei Interoperability Protocols Plugfest 2014</td>
													<td>March 25-27, 2014</td>
													<td>Taipei, Taiwan</td>
													<td>Key interoperability topics, such as Bring your own device (BYOD), OAuth, OData, Remote Desktop Protocol (RemoteFX/RDP), Office File IO, and Exchange Email clients</td>
													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Taipei-Interoperability-Protocols-Plugfest-2014">Videos</a></td>
												</tr></tbody>
											</table>` : undefined;
        
      
      html = $.parseHTML(schedule);
      customFunctions.showCalendarOfPastEvents(html, $pastEventsDiv, $calendar);
      // console.log('past:    ', $('#firstPastEventHeader'));
      customFunctions.stickyFooter();
      $('#2014PastEvents').focus();
      $('th, td').attr('tabindex', '0');

    }

    $pastEventsDiv.click(showSchedule);
    $pastEventsDiv.keydown(showSchedule);

  });
})(jQuery);
