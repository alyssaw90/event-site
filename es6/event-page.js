'use strict';

const jQuery = require('jquery');
require('jquery-ui');

import * as customFunctions from './common-functions.build.js';

(function($) {
	$(function() {
		const $firstTab = $('.first:first a:first-child');
		const $tabLinks = $('ul.tabs a[href^="#"]');
		const $tabContent = $('.tab-content');
		
		//add #beginningOfContent id to first tab, so it can be navigated to with skip navigation
		$firstTab.attr('id', 'beginningOfContent');
		//add -1 tab index to content of tabs
		
		//add roles and ids to tabs to tabs
		$tabLinks.each(function(i, elem) {
			let $this = $(this);
			let divId = $this.attr('href');
			let anchorId = $this.attr('id') === 'beginningOfContent' ? 'beginningOfContent' : `${divId.slice(1)}Anchor`;
			
			$(divId).attr('tabindex', '0');
			$this.attr({
				'aria-role': 'navigation',
				'aria-label': `${$this.text()}, click enter/return to read contents, click tab to go to next section`,
				'aria-owns': `${divId.slice(1)}`,
				'id': anchorId
			});

		});


		//add a navigation div to the bottom of tab-content divs to navigate to next item in tab list
		function addNavAnchor() {
			
		 	$tabContent.each(function(i, elem) {
		 		let $this = $(this);
		 		let divId = $this.attr('id');
		 		let $nextTabLiAnchor = $(`a[href="#${divId}"]`).parent('li').next('li').find('a');
		 		let $nextTabLink = $(`a[href="#${divId}"]`).parent('li').next('li');
		 		let $thisLi = $(`a[href="#${divId}"]`).parent('li');
		 		let nextTabId = $nextTabLink.find('a').attr('href');
		 		let newAnchorTag = $nextTabLiAnchor.attr('id') !== undefined ? $nextTabLiAnchor.attr('id') : 'footerStartMenuItem';
		 		//add an id to the list items
		 		$thisLi.attr('id', `tab${i + 1}`);
		 		//if the next tab has an undefined id and it is not a subsection of a larger tab
		 		if ($nextTabLiAnchor.attr('id') === undefined && $(`#${divId}`).parents('.tab-content').length === 0) {
		 			nextTabId = '#footerStartMenuItem';
		 			newAnchorTag = 'footerStartMenuItem';
		 		}
		 		//for tabs that are subsections of larger tabs get the infor the outer tab
		 		if ($nextTabLiAnchor.attr('id') === undefined && $(`#${divId}`).parents('.tab-content').length !== 0) {
		 			let outerTabId = $this.parent().attr('id');
		 			nextTabId = '#' + $this.parent().parent().find(`a[aria-owns="${outerTabId}"]`).attr('id');
		 			newAnchorTag = $this.parent().parent().find(`a[aria-owns="${outerTabId}"]`).attr('href');
		 		}
		 		//add aria-hidden role and tab roll to tab
		 		$this.attr({
		 			'role': 'tab',
		 			'aria-hidden': 'true',
		 		});
		 		//append a skipNavigation link to the end of the tab section
		 		$this.append(`<div><a href="${nextTabId}" class="skipNavigation nextTab" data-parent="${newAnchorTag}" >Click tab or enter to go back to the tab list</a></div>`);

		 	});

		}

		//
		function tabNavigation(e) {
			let $this = $(this);
			let keyCode = customFunctions.getKeyCode(e);
			let parentId = `#${$this.attr('data-parent')}`;
			//if the data-parent attribute is not footerStartMenuItem assign it the link of the next tab, otherwise assign it to #footerStartMenuItem
			let nextLiId = $this.attr('data-parent') !== 'footerStartMenuItem' ? `#${$(parentId).parent('li').find('a').attr('id')}` : '#footerStartMenuItem';
			//if enter or tab is clicked, but not shift focus of the next li
			let previosEl = $this.parent().prevAll(':focusable')[0];
			if ((keyCode === 13 || keyCode === 9) && !e.shiftKey) {
				$(nextLiId).focus();
			}
			//if shift tab is clicked focus on the previous li
			if (keyCode === 9 && e.shiftKey) {
				previosEl.focus();
			}
		}


		// tab click copied from kickstart.js to make it work here
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
			let $this = $(this);
			//if it's the speakers tab add tabindex to the p tag, otherwise don't include the p tags 
			if ($this.attr('id') === 'speakers') {
				$this.find('p, li:not(.tabs > li), th, td, *:header, .nextTab, .rightArrow, .downArrow').attr('tabindex', '0');
			} else {
				$this.find('li:not(.tabs > li), th, td, *:header, .nextTab, .rightArrow, .downArrow').attr('tabindex', '0');
			}
		});
		
		//move focus to div containing content when tab link is clicked
		$tabLinks.keydown(function(e) {
			let $this = $(this);
			let divId = $this.attr('href');
			let keyCode = customFunctions.getKeyCode(e);
			$(divId).siblings('.tab-content').hide();
			$(divId).show();
			//if enter is clicked trigger the links click function and focus on the tab content
			if (keyCode === 13) {
				$this.focus();
				$this.trigger('click');
				$(divId).attr({ 'aria-hidden': 'false' }).focus();
			
			}
			//if tab is clicked and it is the last tab link, hide all content from tab navigation and to go to next section
			if (keyCode === 9 && $this.parent('li').hasClass('last')) {
				$(divId).attr('tabindex', -1);
				$(divId).find('*').attr('tabindex', -1);
			}
		});

		//add nav anchors to all sections
		addNavAnchor();

		$('.nextTab').keydown(tabNavigation);
		
	})
})(jQuery)