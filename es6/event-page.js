'use strict';

const jQuery = require('jquery');
require('jquery-ui');

import * as customFunctions from './common-functions.build.js';

(function($) {
	$(function() {
		let $firstTab = $('.first:first a:first-child');
		let $tabLinks = $('.tabs').find('a');
		let $tabContent = $('.tab-content');
		//add #beginningOfContent id to first tab, so it can be navigated to with skip navigation
		$firstTab.attr('id', 'beginningOfContent');
		
		//add roles to tabs
		$tabLinks.each(function(i, elem) {
			let $this = $(this);
			$this.attr({
				'aria-role': 'navigation',
				'aria-label': `${$this.text()}, click enter/return to read contents`
			});
		});

		//function to add role="article" to event tab divs so they are read by screen reader
		function addAccessibilityTags() {
			
		 	$tabContent.each(function(i, elem) {
		 		let $this = $(this);
		 		$this.attr('role', 'article');
		 		if ($this.is(':hidden')) {
		 			$this.attr('aria-hidden', 'true');
		 		}
		 		if ($this.is(':visible')) {
		 			$this.attr('aria-hidden', 'false');
		 		}
		 	});

		}
		addAccessibilityTags();
		
		//move focus to div containing content when tab link is clicked
		$tabLinks.keydown(function(e) {
			let $this = $(this);
			let divId = $this.attr('href');
			let keyCode = customFunctions.getKeyCode(e);

			if (keyCode === 13) {
				$(divId).attr({
						'aria-hidden': 'false',
						'tabindex': '0'
					}).focus();
				$(divId).children().each(function(i, el) {
					console.log('this        ', el);
				});
				addAccessibilityTags();
			}

		});
		
	})
})(jQuery)