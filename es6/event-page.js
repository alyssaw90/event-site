'use strict';

const jQuery = require('jquery');
require('jquery-ui');

import * as customFunctions from './common-functions.build.js';

(function($) {
	$(function() {
		const $firstTab = $('.first:first a:first-child');
		const $tabLinks = $('ul.tabs a[href^="#"]');
		const $tabContent = $('.tab-content');
		// $('.tabs').children('li').attr('tabindex', '0');
		// console.log('tablinks:    ', $tabLinks);
		//add #beginningOfContent id to first tab, so it can be navigated to with skip navigation
		$firstTab.attr('id', 'beginningOfContent');
		//add -1 tab index to content of tabs
		// $tabContent.find('p, li:not(.tabs > li), th, td, blockquote, *:header').attr('tabindex', '-1');
		
		//add roles to tabs
		$tabLinks.each(function(i, elem) {
			let $this = $(this);
			let divId = $this.attr('href');
			let anchorId = $this.attr('id') === 'beginningOfContent' ? 'beginningOfContent' : `${divId.slice(1)}Anchor`;
		 		// console.log('owner LI:  ', anchorId.slice(0, -6));
			
			// $tabContent.attr('tabindex', '-1');
			$(divId).attr('tabindex', '0');
			$this.attr({
				'aria-role': 'navigation',
				'aria-label': `${$this.text()}, click enter/return to read contents`,
				'aria-owns': `${divId.slice(1)}`,
				'id': anchorId
			});

		});

		//function to add role="article" to event tab divs so they are read by screen reader
		function addAccessibilityTags() {
			
		 	$tabContent.each(function(i, elem) {
		 		let $this = $(this);
		 		let divId = $this.attr('id');
		 		let nextId = $this.next().attr('id');
		 		let nextTabLiAnchor = $(`a[href="#${divId}"]`).parent('li').next('li').find('a');
		 		// let nestLiId = $(`a[href="#${divId}"]`).parent('li').next('li').attr('id');
		 		let nextTabLink = $(`a[href="#${divId}"]`).parent('li').next('li');
		 		console.log('blah     ', $(`a[href="#${divId}"]`).parent('li').next('li'));
		 		$this.attr({
		 			'role': 'tab',
		 			'aria-hidden': 'true',
		 			// 'tabindex': -1 
		 		});  
		 		// $this.append(`<div><a href="" class="nextTab skipNavigation" data-parent="${nextTabLiAnchor.attr('id')}" onkeydown="function(e){${nextTabLink}.focus()}">Click enter to view next tab</a></div>`);
		 		/*if ($this.is(':hidden')) {
		 			$this.attr('aria-hidden', 'true');
		 		}
		 		if ($this.is(':visible')) {
		 			$this.attr('aria-hidden', 'false');
		 		}*/
		 	});

		}
		addAccessibilityTags();

		function moveTab(e) {
			e.preventDefault();
			let keyCode = customFunctions.getKeyCode(e);
			let parentId = `#${$(this).attr('data-parent')}`;
			let nextLi = $(parentId).next('li').find('a')
			let divId = parentId.slice(0, -6);
			// console.log('parentId      ', $(parentId).parent('li').siblings());
			if (keyCode === 13) {
				$(nextLi).trigger('click');
				// $(divId).focus();
			}
		}

		$('.nextTab').keydown(moveTab);

		// tab click
		$(document).on('click', 'ul.tabs a[href^="#"]', function(e){
			e.preventDefault();
			var tabs = $(this).parents('ul.tabs').find('li');
			var tab_next = $(this).attr('href');
			var tab_current = tabs.filter('.current').find('a').attr('href');
			$(tab_current).hide();
			tabs.removeClass('current');
			$(this).parent().addClass('current');
			$(tab_next).show();
			history.pushState( null, null, window.location.search + $(this).attr('href') );
			return false;
		});


		//add tabindexes to tab-content divs when they come into focus
		$tabContent.focus(function(e) {
			$(this).children('p, li:not(.tabs > li), th, td, blockquote, *:header').attr('tabindex', '0');
		});
		
		//move focus to div containing content when tab link is clicked
		$tabLinks.keydown(function(e) {
			let $this = $(this);
			let divId = $this.attr('href');
			let keyCode = customFunctions.getKeyCode(e);
			// let $nextTabLi = $this.parent('li').next('li').children('a');
			$(divId).siblings('.tab-content').hide();
			$(divId).show();
			if (keyCode === 13) {
				console.log(`$this.parents('li'):    `, $this.parent('li').next('li').children('a'));
				// $this.parent('li').next('li').children('a').attr('tabindex', '1');
				$this.focus();
				$this.trigger('click');
				$(divId).attr({
						'aria-hidden': 'false',
						// 'tabindex': '0'
					}).focus();
				// console.log('hello:   ', $(divId + ' *:last-child'));
				// $(divId).append(`<a href="" class="nextTab skipNavigation" onkeydown="">Move to next tab</a>`);
				// $this.parents('ul').find('a').removeAttr('tabindex');
				// $this.parent('li').next().children('a')[0].attr('tabindex', '1');
				// console.log($this.parent('li').next().children('a'), '          ', $this.parents('ul').find('a'));
				/*$(divId).children().each(function(i, el) {
						// console.log('this        ', $(this).attr('tabindex'), '        ', $(this));
					let $that = $(this);
					// console.log('taco:     ', $that);
					if ($that.is(':focusable') && !$that.hasClass('tab-content') ) {
						console.log('that:     ', $that);
					}
				});*/
				addAccessibilityTags();
			}

		});
		
	})
})(jQuery)