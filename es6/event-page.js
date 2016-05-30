'use strict';

const jQuery = require('jquery');
require('jquery-ui');

import * as customFunctions from './common-functions.build.js';

(function($) {
	$(function() {
		const $firstTab = $('.first:first a:first-child');
		const $tabLinks = $('.tabs').find('a');
		const $tabContent = $('.tab-content');
		// $('.tabs').children('li').attr('tabindex', '0');

		//add #beginningOfContent id to first tab, so it can be navigated to with skip navigation
		$firstTab.attr('id', 'beginningOfContent');
		
		//add roles to tabs
		$tabLinks.each(function(i, elem) {
			let $this = $(this);
			let divId = $this.attr('href');
			$tabContent.attr('tabindex', '-1');
			$(divId).attr('tabindex', '0');
			$this.attr({
				'aria-role': 'navigation',
				'aria-label': `${$this.text()}, click enter/return to read contents`,
				'aria-owns': `${divId.slice(1)}`
			});

		});

		//function to add role="article" to event tab divs so they are read by screen reader
		function addAccessibilityTags() {
			
		 	$tabContent.each(function(i, elem) {
		 		let $this = $(this);
		 		$this.attr({
		 			'role': 'tab',
		 			'aria-hidden': 'true',
		 			'tabindex': -1
		 		});  
		 		/*if ($this.is(':hidden')) {
		 			$this.attr('aria-hidden', 'true');
		 		}
		 		if ($this.is(':visible')) {
		 			$this.attr('aria-hidden', 'false');
		 		}*/
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
				$this.parents('ul').find('a').removeAttr('tabindex');
				$this.parent('li').next().children('a')[0].attr('tabindex', '1');
				// console.log($this.parent('li').next().children('a'), '          ', $this.parents('ul').find('a'));
				$(divId).children().each(function(i, el) {
						console.log('this        ', $(this).attr('tabindex'), '        ', $(this));
					let $that = $(this);
					if ($that.is(':focusable')) {
						
					}
				});
				addAccessibilityTags();
			}

		});
		
	})
})(jQuery)