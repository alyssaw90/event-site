'use strict';
import * as customFunctions from '../shared/methods/common-functions.js';
const jQuery = require('jquery');

const eventsDirective = (app) => {
	app.directive('eventsDirective', ['$timeout', function($timeout) {
		const eventsDirectiveObj = {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				$timeout(function() {

					const $firstTab = jQuery('#eventsPageUl').find('li:first-child');
					const $lastTab = jQuery('#eventsPageUl').find('li:last-child');
					const $tabLinks = jQuery('ul.tabs a[href^="#"]');
					const $firstEventTabDiv = jQuery('.eventTabDiv:first')/*.is('.eventTabDiv:first')*/;
					const $otherEventTabDivs = jQuery('.eventTabDiv').not('.eventTabDiv:first');
					const $firstFocusables = jQuery('div.tab-content').find('*:focusable:first');
					const $firstFocusablesArr = [];
					$firstTab.addClass('first').addClass('current');
					$lastTab.addClass('last');
					$otherEventTabDivs.attr('style', 'display:none');
					$firstEventTabDiv.attr('style', 'display:block');
					console.log('tabLinks   ', jQuery('ul.tabs'));
					function moveTab(e, self) {	
						e.stopImmediatePropagation();
						let keyCode = customFunctions.getKeyCode(e);
						// let parentId = self.parent().parent().attr('id');
						let parentId = self.closest('.tab-content').attr('id');
						let selfId = self.attr('id');
						let parentLi = '#' + jQuery(`[href="#${selfId}"]`).attr('id');
						console.log('holadhfalsf    ', parentId);
						if (keyCode === 9 && e.shiftKey && self.is('*:focus')) {
							/*hideHomepageSections();
							jQuery(parentId).next().children('h3').click();
							jQuery(parentId.n)ext().children('h3').focus();*/
							// jQuery(parentLi).parent().next().find('a').focus();
							jQuery(`a[href^="#${parentId}"]`).parent().next().find('a').focus();
						}
					}
			
					$firstFocusables.keydown(function(e) {
						let $this = jQuery(this);
						moveTab(e, $this);
					});
			
		/*			jQuery('.eventTabDiv *').keydown(function(e) {
						e.stopPropagation();
					});*/
			
					
					//add #beginningOfContent id to first tab, so it can be navigated to with skip navigation
					$firstTab.attr('id', 'beginningOfContent');
					//add -1 tab index to content of tabs
					
					//add roles and ids to tabs to tabs
					$tabLinks.each(function(i, elem) {
						let $this = jQuery(this);
						let divId = $this.attr('href');
						let anchorId = $this.attr('id') === 'beginningOfContent' ? 'beginningOfContent' : `${divId.slice(1)}Anchor`;
						// jQuery(divId).prepend(`<a id="${divId + 'start'}" class="tabStartAnchor" aria-live="polite" tabindex="-1" role="presentation" aria-hidden="true" aria-label="${$this.text()} section open"></a>`)
						
						// jQuery(divId).attr('tabindex', '0');
						$this.attr({
							'aria-role': 'navigation',
							'aria-label': `${$this.text()}, click enter/return to read contents, click tab to go to next section`,
							'aria-owns': `${divId.slice(1)}`,
							'id': anchorId
						});
			
					});



					setTimeout(function() {

						/*---------------------------------
							Tabs
						-----------------------------------*/
						// tab setup
						jQuery('.tab-content').addClass('clearfix').not(':first').hide();
						jQuery('ul.tabs').each(function(){
							let current = jQuery(this).find('li.current');
							if(current.length < 1) { jQuery(this).find('li:first').addClass('current'); }
							current = jQuery(this).find('li.current a').attr('href');
							jQuery(current).show();
						});
					
						// tab click
						jQuery(document).on('click', 'ul.tabs a[href^="#"]', function(e){
							e.preventDefault();
							let tabs = jQuery(this).parents('ul.tabs').find('li');
							let tab_next = jQuery(this).attr('href');
							let tab_current = tabs.filter('.current').find('a').attr('href');
							jQuery(tab_current).hide();
							tabs.removeClass('current');
							jQuery(this).parent().addClass('current');
							jQuery(tab_next).show();
							// history.pushState( null, null, window.location.search + jQuery(this).attr('href') );
							return false;
						});
					
						// tab hashtag identification and auto-focus
				  	let wantedTag = window.location.hash;
				  	if (wantedTag != "") {
						// This code can and does fail, hard, killing the entire app.
						// Esp. when used with the jQuery.Address project.
							try {
								let allTabs = jQuery("ul.tabs a[href^=" + wantedTag + "]").parents('ul.tabs').find('li');
								let defaultTab = allTabs.filter('.current').find('a').attr('href');
								jQuery(defaultTab).hide();
								allTabs.removeClass('current');
								jQuery("ul.tabs a[href^=" + wantedTag + "]").parent().addClass('current');
								jQuery("#" + wantedTag.replace('#','')).show();
							} catch(e) {
								// I have no idea what to do here, so I'm leaving this for the maintainer.
							}
				  	}				

					}, 500);
			
					// tab click copied from kickstart.js to make it work here
					/*jQuery(document).on('click', 'ul.tabs a[href^="#"]', function(e){
						e.preventDefault();
						var tabs = jQuery(this).parents('ul.tabs').find('li');
						var tab_next = jQuery(this).attr('href');
						var tab_current = tabs.filter('.current').find('a').attr('href');
						jQuery(tab_current).hide();
						tabs.removeClass('current');
						jQuery(this).parent().addClass('current');
						jQuery(tab_next).show();
						history.pushState( null, null, window.location.search + jQuery(this).attr('href') );
						return false;
					});
			*/
					//trigger a click event when a eventTab is focused
					$tabLinks.focus(function(e) {
						e.preventDefault();
						jQuery(this).trigger('click');	
					});
					
					//move focus to div containing content when tab link is clicked with enter
					$tabLinks.keydown(function(e) {
						let $this = jQuery(this);
						let divId = $this.attr('href');
						let keyCode = customFunctions.getKeyCode(e);
						//if enter is clicked trigger the links click function and focus on the tab content
						if (keyCode === 13) {
							// $this.trigger('click');
							jQuery(divId).siblings('.tab-content').hide().attr({ 'aria-hidden': 'true' });
							jQuery(divId).show().attr({ 'aria-hidden': 'false'});
							// jQuery(divId).first().focus();
							// jQuery(divId).attr({ 'aria-hidden': 'false' });
							jQuery(divId).find('*:focusable')[0].focus();
							return false
						
						}
					});
		
					
				
				}, 1000);
			}
			
		}

		return eventsDirectiveObj;
	}])
}

module.exports = eventsDirective;