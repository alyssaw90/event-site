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

let jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

(function($) {

	$(document).ready(function () {
		//array of ms colors at 80% opacity - ms yellow is removed, because it's to light for background color
		let msColors = ['rgba(216, 59, 1, .8)', 'rgba(232, 17, 35, .8)', 'rgba(180, 0, 158, .8)', 'rgba(92, 45, 145, .8)', 'rgba(0, 120, 215, .8)', 'rgba(0, 130, 114, .8)', 'rgba(16, 124, 16, .8)'];
		let count = 0;
		let $learnBlockIcon = $('#learnBlockIcon');
		let $learnBlock = $('#learnBlock');
		let $infoBlockWrapper = $('.infoBlockWrapper');
		let $infoBlockButton = $('.infoBlockButton');
		let $infoBlocksContainer = $('.infoBlocksContainer');
		let $infoBlocksContainer2 = $('.infoBlocksContainer2');
		let $homepageIntroBlocks = $('.homepageIntroBlocks');
		let $notANumberBlock = $('#notANumberBlock');
		let $toHelpYouBlock = $('#toHelpYouBlock');
		let $whoMadeItBlock = $('#whoMadeItBlock');
		let $itsYourEventBlock = $('#itsYourEventBlock');
		let $backToTopButton = $('#backToTop');
		// let $newsletterButton = $('#newsletterButton');
		let $homepageEmailSignUp = $('#homepageEmailSignUp');
		let $scrollButtonDiv = $('.scroll-button');
		let $hiddenHomepageSectionsWrapper = $('.hiddenHomepageSectionsWrapper');
		let $window = $(window);	
		

		// console.log($('iframe').contents().css('background-color'));
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

		/*$newsletterButton.click(function (e) {
			$homepageEmailSignUp.toggle();
			$('html, body').animate({ scrollTop: $homepageEmailSignUp.offset().top }, 'slow');
			customFunctions.homepageStickyFooter();
		});*/
		//close textbox and unhighlight introBox when $backToTopButton is clicked
		$backToTopButton.click(function (e) {
			$('.hiddenHomepageSections:visible').hide();
			$scrollButtonDiv.css('background-color', '#fff').css('color', '#2F2F2F');
			$('.homepageIntroBlocks').each(function (i, elem) {
				let $this = $(this);
				let thisBlockMobileClass = $this.attr('id') + 'Mobile';
				if ($this.hasClass(thisBlockMobileClass)) {
					$this.removeClass(thisBlockMobileClass).css('background', 'rgb(255, 255, 255)');
				}
			});
			customFunctions.homepageStickyFooter();
		});
		//when a homepageIntroBlocks is clicked, show the corresponding div
		$homepageIntroBlocks.click(function (e) {
			let $this = $(this);
			let thisBlockArrowClass = $this.attr('id') + 'ArrowBox';
			let thisBlockMobileClass = $this.attr('id') + 'Mobile';
			let thisBlockText = '#' + $this.data('thisblocktext');
			let blockPosition = $(thisBlockText).parent().offset().top;
	   	let style = window.getComputedStyle(this, 'hover');
	   	let mobileStyle = $(this).data('hoverBackgroundColor');
	   	let backgroundColor = style['background-color'];
			if ($window.width() > 768) {
				$this.toggleClass(thisBlockArrowClass);
				$this.siblings().each(function (i, elem) {
					let $thisElem = $(this);
					let arrowClass = elem.id + 'ArrowBox';
					$thisElem.removeClass(arrowClass);
				});
			}
			if ($window.width() <= 768) {
					console.log(':::::::   ', $this.attr('data-hoverBackgroundColor'));
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
				$(thisBlockText).siblings().hide();
				$('html, body').animate({ scrollTop: blockPosition }, 'slow');
				$scrollButtonDiv.css('color', '#fff');
			} else {
				$(thisBlockText).fadeOut();
				$(thisBlockText).siblings().hide();
				$scrollButtonDiv.css('color', '#2F2F2F').css('background-color', '#fff');
			}
			//execute the homepageStickyFooter function to correctly position the footer after the new div is added
	   	customFunctions.homepageStickyFooter();
	   	setTimeout(customFunctions.homepageStickyFooter, 420); 
		});
		
		//make homepageIntroBlocks zoom in and down
		setTimeout(function () {
			$notANumberBlock.css('visibility', 'visible').addClass('animated zoomInDown');
			customFunctions.homepageStickyFooter();
		}, 10);
		setTimeout(function () {
			$toHelpYouBlock.css('visibility', 'visible').addClass('animated zoomInDown');
			customFunctions.homepageStickyFooter();
		}, 1000);
		setTimeout(function () {
			$whoMadeItBlock.css('visibility', 'visible').addClass('animated zoomInDown');
			customFunctions.homepageStickyFooter();
		}, 2000);
		setTimeout(function () {
			$itsYourEventBlock.css('visibility', 'visible').addClass('animated zoomInDown');
			customFunctions.homepageStickyFooter();
		}, 3000);
	});

	$(window).load(function() {
	  customFunctions.changeHeight('.homepageIntroBlocks');
	  customFunctions.homepageStickyFooter();
	});


	$(window).resize(function(){
	  customFunctions.changeHeight('.homepageIntroBlocks');
	  customFunctions.homepageStickyFooter();
	});
})(jQuery);


