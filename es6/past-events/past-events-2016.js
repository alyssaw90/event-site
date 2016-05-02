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
        let imgArr = [];

        $( "#2016_events" ).click(function () {


            let schedule = `<table cellspacing="0" cellpadding="0">
											<thead><tr>
												<th>Name</th>
												<th>Date</th>
												<th>Location</th>
												<th>Technical Topics</th>
												<th>Related Materials</th>
											</tr></thead>
											<tbody><tr>
												<td><a href="/taipei2016">DevDays Asia 2016 @ Taipei</a></td>
												<td>April 19 - 21, 2016</td>
												<td>Taipei, Taiwan</td>
												<td>Office Developer Opportunity, Office Add-ins and APIs, Machine Learning, Big Data Analytics, Open Specifications, Hackathon</td>
												<td> - </td>
											</tr></tbody>
											</table>`;

            let html = $.parseHTML(schedule);
            //for some reason the customFunctions.pastEventBackgroundSwitch(); method does not work on this past event block. I need to figure out why
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