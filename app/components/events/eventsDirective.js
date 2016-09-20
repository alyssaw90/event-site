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
					const $tabContent = jQuery('.tab-content').not('.eventTabDiv:first');
					$firstTab.addClass('first').addClass('current');
					$lastTab.addClass('last');
					$otherEventTabDivs.attr('style', 'display:none');
					$firstEventTabDiv.attr('style', 'display:block');


					function moveTab(e, self) {	
						e.stopImmediatePropagation();
						let keyCode = customFunctions.getKeyCode(e);
						// let parentId = self.parent('.eventTabDiv').attr('id');
						let selfId = self.attr('id');
						let parentLi = '#' + jQuery(`[href="#${selfId}"]`).attr('id');
			
						if (keyCode === 9 && e.shiftKey && self.is('*:focus')) {
							/*hideHomepageSections();
							jQuery(parentId).next().children('h3').click();
							jQuery(parentId.n)ext().children('h3').focus();*/
							console.log('parentLi:  ', self.parent().attr('id'));
							jQuery(parentLi).parent().next().find('a').focus();
						}
					}
			
					$tabContent.keydown(function(e) {
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
						jQuery(divId).prepend(`<a id="${divId + 'start'}" class="tabStartAnchor" aria-live="polite" tabindex="-1" role="presentation" aria-hidden="true" aria-label="${$this.text()} section open"></a>`)
						
						// jQuery(divId).attr('tabindex', '0');
						$this.attr({
							'aria-role': 'navigation',
							'aria-label': `${$this.text()}, click enter/return to read contents, click tab to go to next section`,
							'aria-owns': `${divId.slice(1)}`,
							'id': anchorId
						});
			
					});
			
					// tab click copied from kickstart.js to make it work here
					jQuery(document).on('click', 'ul.tabs a[href^="#"]', function(e){
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
							jQuery(divId).find('a')[0].focus();
						
						}
					});
		
					
				
				}, 300);
			}
			
		}

		return eventsDirectiveObj;
	}])
}

module.exports = eventsDirective;