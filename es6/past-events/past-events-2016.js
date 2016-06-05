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
    let $pastEventsDiv = $( '#2016_events' );

    let showSchedule = function(e) {
      let keyCode = customFunctions.getKeyCode(e);
      let html;
      let schedule = keyCode === 13 || keyCode === 1 ? `<table cellspacing="0" cellpadding="0" id="2016PastEvents" tabindex="0">
                      <caption>Past plugfests and events from 2008</caption>
                          <thead>
                          <tr>
                           <th>Name</th>
                           <th>Date</th>
                           <th>Location</th>
                           <th>Technical Topics</th>
                           <th>Related Materials</th>
                        </tr>
                         </thead>
                      <tbody>
                        <tr>
                          <td><a href="/taipei2016">DevDays Asia 2016 @ Taipei</a></td>
                          <td>April 19 - 21, 2016</td>
                          <td>Taipei, Taiwan</td>
                          <td>Office Developer Opportunity, Office Add-ins and APIs, Machine Learning, Big Data Analytics, Open Specifications, Hackathon</td>
                          <td><a href="/shanghai2015">Event Page</a></td>
                        </tr>
                        <tr>
                          <td><a href="/paris2016">Extend Conference</a></td>
                          <td>May 12, 2016</td>
                          <td>Paris, France</td>
                          <td>Office Developer Opportunity, Office Add-ins and APIs, Machine Learning, Big Data Analytics, Open Specifications</td>
                          <td><a href="/paris2016">Event Page</a></td>
                        </tr>
                      </tbody>
                    </table>` : undefined;
        
      
      html = $.parseHTML(schedule);
      customFunctions.showCalendarOfPastEvents(html, $pastEventsDiv, $calendar);
      // console.log('past:    ', $('#firstPastEventHeader'));
      customFunctions.stickyFooter();
      $('#2016PastEvents').focus();
      $('th, td').attr('tabindex', '0');

    }

    $pastEventsDiv.click(showSchedule);
    $pastEventsDiv.keydown(showSchedule);

  });
})(jQuery);
