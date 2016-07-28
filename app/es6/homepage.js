'use strict';
/*global $ */
/*global document */
/*global window */
/*global homepageStickyFooter */
/*global changeHeight */
/*jshint multistr: true */ 


//This function is now in the kickstart.js file line 50


// $(document).ready(function () {
// 	$.get('/homepageteam', function (homepageTeam) {
// 		let theHomepageTeam = '<h2>Meet the Team</h2>';
// 		for (let i = 0, j = homepageTeam.length; i < j; i++) {
// 			theHomepageTeam += '<div class="col_3 individual-homepage-expert"><a href="/meet-the-team#' + homepageTeam[i].divId + '"><img class="pull-left" title="' + homepageTeam[i].msTeamTitle + '" src="../upload/' + homepageTeam[i].headShot + '" /><h6>' + homepageTeam[i].firstName + ' ' + homepageTeam[i].lastName + '</h6><p>' + homepageTeam[i].msTeamTitle + '</p></a></div>';
// 		}
// 		// theHomepageTeam += '<hr class="alt1" />';
// 		$('#homepage-team').prepend(theHomepageTeam + '<hr class="alt1" />');
// 	});

/*	$.get('/events', function (homepageEvents) {
		let theHomepageSlider = '';
		let slideOne = '';
		let slideTwo = '';
		for (let i = 0, j = homepageEvents.length; i < j; i++) {
			theHomepageSlider += '<li><a href="/' + homepageEvents[i].eventUrl + '"><h2 class="desc"><span class="slide-title">'+ homepageEvents[i].eventName + '</span><br /><br /><span class="sub-title slideshow-city">' + homepageEvents[i].eventLocation + '</span><span class="sub-title slideshow-date">' + homepageEvents[i].eventStartDate + '</span><br /><br /><span class="sub-title"><i class="fa fa-code"></i>'+ homepageEvents[i].homepageBulletOne + '</span><br /><span class="sub-title"><i class="fa fa-code"></i>' + homepageEvents[i].homepageBulletTwo + '</span><br /><span class="sub-title"><i class="fa fa-code"></i>' + homepageEvents[i].homepageBulletThree + '</h2></span></a><img src="data:image;base64,' + homepageEvents[i].eventBackgroundImage + '" /></li>';
		console.log(homepageEvents[i].eventName);
		}*/

// 		$('#frontpage-slideshow').append(theHomepageSlider);
// 	});
// });

import * as customFunctions from './common-functions.build.js';
const jQuery = require('jquery');

(function($) {

	$(window).load(function() {
	  customFunctions.changeHeight('.homepageIntroBlocks');
	  customFunctions.homepageStickyFooter();
	});
	
	
	$(window).resize(function(){
	  customFunctions.changeHeight('.homepageIntroBlocks');
	  customFunctions.homepageStickyFooter();
	});

	$(document).ready(function () {
		const $learnBlockIcon = $('#learnBlockIcon');
		const $learnBlock = $('#learnBlock');
		// const $infoBlockWrapper = $('.infoBlockWrapper');
		const $infoBlockButton = $('.infoBlockButton');
		const $infoBlocksContainer = $('.infoBlocksContainer');
		const $infoBlocksContainer2 = $('.infoBlocksContainer2');
		const $homepageIntroBlocks = $('.homepageIntroBlocks');
		const $notANumberBlock = $('#notANumberBlock');
		const $toHelpYouBlock = $('#toHelpYouBlock');
		const $whoMadeItBlock = $('#whoMadeItBlock');
		const $itsYourEventBlock = $('#itsYourEventBlock');
		const $backToTopButton = $('#backToTop');
		const $homepageEmailSignUp = $('#homepageEmailSignUp');
		const $scrollButtonDiv = $('.scroll-button');
		const $hiddenHomepageSectionsWrapper = $('.hiddenHomepageSectionsWrapper');
		const $hiddenHomepageSections = $('.hiddenHomepageSections');
		const $itsYourEventBlockText = $('#itsYourEventBlockText');
		const $blockquote = $('blockquote');
		const $window = $(window);	
		//array of ms colors at 80% opacity - ms yellow is removed, because it's to light for background color
		let msColors = ['rgba(216, 59, 1, .8)', 'rgba(232, 17, 35, .8)', 'rgba(180, 0, 158, .8)', 'rgba(92, 45, 145, .8)', 'rgba(0, 120, 215, .8)', 'rgba(0, 130, 114, .8)', 'rgba(16, 124, 16, .8)'];
		let count = 0;

		//function to show homepage intro text when the corresponding block is clicked
		function showHomepageBlock (e) {
			let $this = $(this);
			let thisBlockArrowClass = $this.attr('id') + 'ArrowBox';
			let thisBlockMobileClass = $this.attr('id') + 'Mobile';
			let thisBlockText = '#' + $this.data('thisblocktext');
			let firstChildElemSelector = `${thisBlockText} :first`;
			let blockPosition = $(thisBlockText).parent().offset().top;
	   	let style = window.getComputedStyle(this, 'hover');
	   	let mobileStyle = $(this).data('hoverBackgroundColor');
	   	let backgroundColor = style['background-color'];
			let keyCode;
			//get key code
			if (e.keyCode) {
				keyCode = e.keyCode;
			} else {
				keyCode = e.which;
			}
			//if the keyCode is the mouse click (1) or enter (13) show the text block 
			if (keyCode === 1 || keyCode === 13) {
				if ($window.width() > 768) {
					$this.toggleClass(thisBlockArrowClass);
					$this.toggleClass('whiteText');
					$this.siblings().each(function (i, elem) {
						let $thisElem = $(this);
						let arrowClass = elem.id + 'ArrowBox';
						$thisElem.removeClass(arrowClass);
						$thisElem.removeClass('whiteText');
					});
				}
				if ($window.width() <= 768) {
					if ($this.hasClass(thisBlockMobileClass)) {
						$this.removeClass(thisBlockMobileClass).css('background', 'rgb(255, 255, 255)');
					} else {
						$this.addClass(thisBlockMobileClass).css('background', $this.attr('data-hoverBackgroundColor'));
					}
					$this.siblings().each(function (i, elem) {
						let $thisMobileElem = $(this);
						let mobileClass = elem.id + 'Mobile';
						$thisMobileElem.removeClass(mobileClass).css('background', 'rgb(255, 255, 255)');
					});
				}
				$hiddenHomepageSectionsWrapper.css('background-color', $this.attr('data-hoverBackgroundColor'));
				$scrollButtonDiv.css('background-color', $hiddenHomepageSectionsWrapper.css('background-color'));
				if ($(thisBlockText).css('display') === 'none') {
					$(thisBlockText).fadeIn();
					$(thisBlockText).focus();
					$(thisBlockText).siblings().hide();
					$('html, body').animate({ scrollTop: blockPosition }, 'slow');
					$scrollButtonDiv.css('color', '#fff');
					// $this.next().attr('tabindex', '1');
				} else {
					$(thisBlockText).fadeOut();
					$(thisBlockText).siblings().hide();
					$this.next().attr('tabindex', '0');
					$scrollButtonDiv.css('color', '#2F2F2F').css('background-color', '#fff');
				}
				//execute the homepageStickyFooter function to correctly position the footer after the new div is added
		   	customFunctions.homepageStickyFooter();
		   	setTimeout(customFunctions.homepageStickyFooter, 420); 
				
			}
		}

		function moveTab(e) {
			e.preventDefault();
			let keyCode = customFunctions.getKeyCode(e);
			let parentId = `#${$(this).attr('data-parent')}`;
			if (keyCode === 9 && !e.shiftKey) {
				hideHomepageSections();
				$(parentId).next().children('h3').click();
				$(parentId).next().children('h3').focus();
			}
		}

		function hideHomepageSections(e) {
			$('.hiddenHomepageSections:visible').hide().attr('aria-hidden', 'true');
			$scrollButtonDiv.css('background-color', '#fff').css('color', '#2F2F2F');
			$('.homepageIntroBlocks').each(function (i, elem) {
				let $this = $(this);
				let thisBlockMobileClass = $this.attr('id') + 'Mobile';
				let thisBlockArrowClass = $this.attr('id') + 'ArrowBox';
				if ($this.hasClass(thisBlockArrowClass)) {
					$this.removeClass(thisBlockArrowClass);
					$this.children('h3').removeClass('whiteText');
					// $this.children('h3').trigger('click');
				}
				if ($this.hasClass(thisBlockMobileClass)) {
					$this.removeClass(thisBlockMobileClass).css('background', 'rgb(255, 255, 255)');
				}
			});
			customFunctions.homepageStickyFooter();
		}


		//randomly assign background-color to the slides -- .slideshow li:nth-child(2) h2:first-child
		$('.slideshow li').each(function (i) {
			let randomNum = Math.floor(Math.random() * (7 - count));
			count++;
			if (i > 0) {
				$(this).children().children().css('background-color', msColors[randomNum]);
				// $('.sliderRegisterButton').css('background-color', msColors[randomNum].replace('.8', '1'))
				msColors.splice(randomNum, 1);
				if (msColors.length <= 0) {
					count = 0;
					msColors = ['rgba(216, 59, 1, .8)', 'rgba(232, 17, 35, .8)', 'rgba(180, 0, 158, .8)', 'rgba(92, 45, 145, .8)', 'rgba(0, 120, 215, .8)', 'rgba(0, 130, 114, .8)', 'rgba(16, 124, 16, .8)'];
				}	
			} else if (i <= 0) {
				$(this).children().children().css('background-color', 'transparent');
			}
		});

		//close textbox and unhighlight introBox when $backToTopButton is clicked
		$backToTopButton.click(hideHomepageSections);
		//when a homepageIntroBlocks is clicked or enter is clicked, show the corresponding div
		// $homepageIntroBlocks.attr('tabindex', '-1');
		// $blockquote.find('span').attr('tabindex', '0');
		$homepageIntroBlocks.click(showHomepageBlock);
		$homepageIntroBlocks.keydown(showHomepageBlock);
		//when using keyboard navigation hitting tab on the hiddenHomepageSections nextTab item should send user to the next title block
		$('.nextTab').keydown(moveTab);

		//close blocks and move back when shift + tab is clicked
		/*$('.hiddenHomepageSections :first-child').keydown(function(e) {
			let parentId = `#${$(this).parent('.hiddenHomepageSections').attr('id').slice(0, -4)}`;
			let keyCode = customFunctions.getKeyCode(e);
			if (e.shiftKey && keyCode === 9) {
				e.preventDefault();
				hideHomepageSections();
				$(parentId).focus();
				$(parentId).removeClass('whiteText');
			}
		});*/
		$('.hiddenHomepageSections').keydown(function(e) {
			let elemId = `#${$(this).attr('id').slice(0, -4)}`;
			let keyCode = customFunctions.getKeyCode(e);
			if (e.shiftKey && keyCode === 9) {
				e.preventDefault();
				hideHomepageSections();
				$(elemId).focus();
				$(elemId).removeClass('whiteText');
			}
		});

		/*$('#itsYourEventBlockText :last-child').blur(function(e) {
			$('.newsletterSubscSection p:first-child').focus();
			hideHomepageSections();
		});*/

	});

})(jQuery);

