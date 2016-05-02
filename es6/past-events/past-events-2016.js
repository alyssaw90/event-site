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

		var $calendar = $('#calendar');
		var imgArr = [];

		$( "#2016_events" ).click(function () {


			var schedule = `<table cellspacing="0" cellpadding="0">
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

			var html = $.parseHTML(schedule);
			$(this).siblings().removeClass('selected-year');
			$(this).toggleClass('selected-year');
			if ($calendar.html() === schedule) {
				$calendar.empty();
			} else {
				$calendar.empty();
				$calendar.append(html);
			}
			customFunctions.stickyFooter();

		});

	});

})(jQuery);