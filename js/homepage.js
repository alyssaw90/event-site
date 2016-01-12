'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 


//This function is now in the kickstart.js file line 50


// $(document).ready(function () {
// 	$.get('/homepageteam', function (homepageTeam) {
// 		var theHomepageTeam = '<h2>Meet the Team</h2>';
// 		for (var i = 0, j = homepageTeam.length; i < j; i++) {
// 			theHomepageTeam += '<div class="col_3 individual-homepage-expert"><a href="/meet-the-team#' + homepageTeam[i].divId + '"><img class="pull-left" title="' + homepageTeam[i].msTeamTitle + '" src="../upload/' + homepageTeam[i].headShot + '" /><h6>' + homepageTeam[i].firstName + ' ' + homepageTeam[i].lastName + '</h6><p>' + homepageTeam[i].msTeamTitle + '</p></a></div>';
// 		}
// 		// theHomepageTeam += '<hr class="alt1" />';
// 		$('#homepage-team').prepend(theHomepageTeam + '<hr class="alt1" />');
// 	});

/*	$.get('/events', function (homepageEvents) {
		var theHomepageSlider = '';
		var slideOne = '';
		var slideTwo = '';
		for (var i = 0, j = homepageEvents.length; i < j; i++) {
			theHomepageSlider += '<li><a href="/' + homepageEvents[i].eventUrl + '"><h2 class="desc"><span class="slide-title">'+ homepageEvents[i].eventName + '</span><br /><br /><span class="sub-title slideshow-city">' + homepageEvents[i].eventLocation + '</span><span class="sub-title slideshow-date">' + homepageEvents[i].eventStartDate + '</span><br /><br /><span class="sub-title"><i class="fa fa-code"></i>'+ homepageEvents[i].homepageBulletOne + '</span><br /><span class="sub-title"><i class="fa fa-code"></i>' + homepageEvents[i].homepageBulletTwo + '</span><br /><span class="sub-title"><i class="fa fa-code"></i>' + homepageEvents[i].homepageBulletThree + '</h2></span></a><img src="data:image;base64,' + homepageEvents[i].eventBackgroundImage + '" /></li>';
		console.log(homepageEvents[i].eventName);
		}*/

// 		$('#frontpage-slideshow').append(theHomepageSlider);
// 	});
// });


$(document).ready(function () {
	//array of ms colors at 80% opacity - ms yellow is removed, because it's to light for background color
	var msColors = ['rgba(216, 59, 1, .8)', 'rgba(232, 17, 35, .8)', 'rgba(180, 0, 158, .8)', 'rgba(92, 45, 145, .8)', 'rgba(0, 120, 215, .8)', 'rgba(0, 130, 114, .8)', 'rgba(16, 124, 16, .8)'];
	var count = 0;
	var $learnBlockIcon = $('#learnBlockIcon');
	var $learnBlock = $('#learnBlock');
	var $infoBlockWrapper = $('.infoBlockWrapper');
	var $infoBlockButton = $('.infoBlockButton');
	var $infoBlocksContainer = $('.infoBlocksContainer');
	var $infoBlocksContainer2 = $('.infoBlocksContainer2');
	var $homepageIntroBlocks = $('.homepageIntroBlocks');
	var $notANumberBlock = $('#notANumberBlock');
	var $toHelpYouBlock = $('#toHelpYouBlock');
	var $whoMadeItBlock = $('#whoMadeItBlock');
	var $itsYourEventBlock = $('#itsYourEventBlock');
	var $backToTopButton = $('#backToTop');
	var $newsletterButton = $('#newsletterButton');
	var $homepageEmailSignUp = $('#homepageEmailSignUp');
	var $scrollButtonDiv = $('.scroll-button');
	var $window = $(window);
	
	//randomly assign background-color to the slides -- .slideshow li:nth-child(2) h2:first-child
	$('.slideshow li').each(function (i) {
		var randomNum = Math.floor(Math.random() * (7 - count));
		count++
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

	// console.log($('.sliderRegisterButton').css('background-color'));

	/*$infoBlockWrapper.click(function (e) {
		var blockPosition = findPos(this);
		var thisBlockId = '#' + $(this).data('thisblock');
		// console.log($(this).data('thisblock'));
		if ($(thisBlockId).css('display') === 'none') {
			$(thisBlockId).show();
			$(thisBlockId).siblings().hide();
			$('html, body').animate({ scrollTop: blockPosition }, 'slow');
		} else {
			$(thisBlockId).hide();
			$(thisBlockId).siblings().hide();
		}
	});

	$infoBlockButton.click(function () {
		if ($infoBlocksContainer.is(':visible')) {
			$infoBlocksContainer.fadeOut(function() { 
				$infoBlocksContainer2.fadeIn(); 
			}); 	
		}
		if ($infoBlocksContainer2.is(':visible')) {
			$infoBlocksContainer2.fadeOut(function() { 
				$infoBlocksContainer.fadeIn(); 
			}); 	
		}
	})*/

	$newsletterButton.click(function (e) {
		$homepageEmailSignUp.toggle();
		$('html, body').animate({ scrollTop: $homepageEmailSignUp.offset().top }, 'slow');
		homepageStickyFooter();
	})
	//close textbox and unhighlight introBox when $backToTopButton is clicked
	$backToTopButton.click(function (e) {
		$('.hiddenHomepageSections:visible').hide();
		$scrollButtonDiv.css('background-color', '#fff').css('color', '#2F2F2F');
		$('.homepageIntroBlocks').each(function (i, elem) {
			var $this = $(this);
			var thisBlockMobileClass = $this.attr('id') + 'Mobile';
			$this.css('background-color', '#fff');
			/*if ($this.hasClass(thisBlockMobileClass)) {
				console.log('hola');
				// $this.removeClass(thisBlockMobileClass);
			}*/
		})
		homepageStickyFooter();
	})
	//when a homepageIntroBlocks is clicked, show the corresponding div
	$homepageIntroBlocks.click(function (e) {
		var $this = $(this);
		var $hiddenHomepageSectionsWrapper = $('.hiddenHomepageSectionsWrapper');
		var thisBlockArrowClass = $this.attr('id') + 'ArrowBox';
		var thisBlockMobileClass = $this.attr('id') + 'Mobile';
		var thisBlockText = '#' + $this.data('thisblocktext');
		var blockPosition = $(thisBlockText).parent().offset().top;
   	var style = window.getComputedStyle(this, 'hover');
   	var mobileStyle = $(this).data('hoverBackgroundColor');
   	var backgroundColor = style['background-color'];
   	// console.log('hello :::::: ', style);
		if ($window.width() > 768) {
			$this.toggleClass(thisBlockArrowClass);
			$this.siblings().each(function (i, elem) {
				var $thisElem = $(this);
				var arrowClass = elem.id + 'ArrowBox';
				$thisElem.removeClass(arrowClass);
			});

		}
		if ($window.width() <= 768) {
  		// $this.toggleClass(thisBlockMobileClass);
  		// console.log(' :::::::  ', $this.css('background-color'));
  		if ($this.css('background-color') === 'rgb(255, 255, 255)') {
				$this.css('background-color', $this.attr('data-hoverBackgroundColor'));
			} else {
				$this.css('background-color', 'rgb(255, 255, 255)');
			}
			$this.siblings().each(function (i, elem) {
				var $thisMobileElem = $(this);
				var mobileClass = elem.id + 'Mobile';
				$thisMobileElem.removeClass(mobileClass).css('background-color', '#fff');
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
   	homepageStickyFooter(); 
	});
	
	//make homepageIntroBlocks zoom in and down
	setTimeout(function () {
		$notANumberBlock.css('visibility', 'visible').addClass('animated zoomInDown');
		homepageStickyFooter();
		// $('.homepageIntroBlocks section:nth-child(4)').removeClass('animated zoomInDown');
	}, 10);
	setTimeout(function () {
		$toHelpYouBlock.css('visibility', 'visible').addClass('animated zoomInDown');
		homepageStickyFooter();
		// $('.homepageIntroBlocks section:nth-child(1)').removeClass('animated zoomInDown');
	}, 1000);
	setTimeout(function () {
		$whoMadeItBlock.css('visibility', 'visible').addClass('animated zoomInDown');
		homepageStickyFooter();
		// $('.homepageIntroBlocks section:nth-child(2)').removeClass('animated zoomInDown');
	}, 2000);
	setTimeout(function () {
		// $('.homepageIntroBlocks section:nth-child(3)').removeClass('animated zoomInDown');
		$itsYourEventBlock.css('visibility', 'visible').addClass('animated zoomInDown');
		homepageStickyFooter();
	}, 3000);
});

$(window).load(function() {
  changeHeight('.homepageIntroBlocks');
  homepageStickyFooter();
});


$(window).resize(function(){
  changeHeight('.homepageIntroBlocks');
  homepageStickyFooter();
});