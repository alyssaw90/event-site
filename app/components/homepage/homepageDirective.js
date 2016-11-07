'use strict';
import * as customFunctions from '../shared/methods/common-functions.js';
const jQuery = require('jquery');

const homepageDirective = (app) => {
	app.directive('homepageDirective', [function() {
		const homepageDirectiveDefinitionObject = {
		restrict: 'A',
    link: function postLink(scope, element, attrs) {
	
	
	angular.element(window).resize(function(){
	  customFunctions.changeHeight(jQuery('.homepageIntroBlocks'));
	  // customFunctions.homepageStickyFooter();
	});

		const $learnBlockIcon = angular.element('#learnBlockIcon');
		const $learnBlock = angular.element('#learnBlock');
		// const $infoBlockWrapper = angular.element('.infoBlockWrapper');
		const $infoBlockButton = angular.element('.infoBlockButton');
		const $infoBlocksContainer = angular.element('.infoBlocksContainer');
		const $infoBlocksContainer2 = angular.element('.infoBlocksContainer2');
		const $homepageIntroBlocks = angular.element('.homepageIntroBlocks');
		const $notANumberBlock = angular.element('#notANumberBlock');
		const $toHelpYouBlock = angular.element('#toHelpYouBlock');
		const $whoMadeItBlock = angular.element('#whoMadeItBlock');
		const $itsYourEventBlock = angular.element('#itsYourEventBlock');
		const $backToTopButton = angular.element('#backToTop');
		const $homepageEmailSignUp = angular.element('#homepageEmailSignUp');
		const $scrollButtonDiv = angular.element('.scroll-button');
		const $hiddenHomepageSectionsWrapper = angular.element('.hiddenHomepageSectionsWrapper');
		const $hiddenHomepageSections = angular.element('.hiddenHomepageSections');
		const $itsYourEventBlockText = angular.element('#itsYourEventBlockText');
		const $homepageSliderSection = angular.element('#homepageSliderSection');
		const $blockquote = angular.element('blockquote');
		const $window = angular.element(window);	
		//array of ms colors at 80% opacity - ms yellow is removed, because it's to light for background color
		let msColors = ['rgba(216, 59, 1, .8)', 'rgba(232, 17, 35, .8)', 'rgba(180, 0, 158, .8)', 'rgba(92, 45, 145, .8)', 'rgba(0, 120, 215, .8)', 'rgba(0, 130, 114, .8)', 'rgba(16, 124, 16, .8)'];
		let count = 0;
		customFunctions.changeHeight(jQuery('.homepageIntroBlocks'));

		//function to show homepage intro text when the corresponding block is clicked
		function showHomepageBlock (e) {
			let $this = angular.element(this);
			let thisBlockArrowClass = $this.attr('id') + 'ArrowBox';
			let thisBlockMobileClass = $this.attr('id') + 'Mobile';
			let thisBlockText = '#' + $this.data('thisblocktext');
			let firstChildElemSelector = `${thisBlockText} :first`;
			let blockPosition = angular.element(thisBlockText).parent().offset().top;
	   	let style = window.getComputedStyle(this, 'hover');
	   	let mobileStyle = angular.element(this).data('hoverBackgroundColor');
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
						let $thisElem = angular.element(this);
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
						let $thisMobileElem = angular.element(this);
						let mobileClass = elem.id + 'Mobile';
						$thisMobileElem.removeClass(mobileClass).css('background', 'rgb(255, 255, 255)');
					});
				}
				$hiddenHomepageSectionsWrapper.css('background-color', $this.attr('data-hoverBackgroundColor'));
				$scrollButtonDiv.css('background-color', $hiddenHomepageSectionsWrapper.css('background-color'));
				if (angular.element(thisBlockText).css('display') === 'none') {
					angular.element(thisBlockText).fadeIn();
					angular.element(thisBlockText).focus();
					angular.element(thisBlockText).siblings().hide();
					angular.element('html, body').animate({ scrollTop: blockPosition }, 'slow');
					$scrollButtonDiv.css('color', '#fff');
					// $this.next().attr('tabindex', '1');
				} else {
					angular.element(thisBlockText).fadeOut();
					angular.element(thisBlockText).siblings().hide();
					$this.next().attr('tabindex', '0');
					$scrollButtonDiv.css('color', '#2F2F2F').css('background-color', '#fff');
				}
				
			}
		}

		function moveHomepageTab(e) {
			e.preventDefault();
			let keyCode = customFunctions.getKeyCode(e);
			let parentId = `#${angular.element(this).attr('data-parent')}`;
			if (keyCode === 9 && !e.shiftKey) {
				hideHomepageSections();
				angular.element(parentId).next().children('h3').click();
				angular.element(parentId).next().children('h3').focus();
			}
		}

		function hideHomepageSections(e) {
			angular.element('.hiddenHomepageSections:visible').hide().attr('aria-hidden', 'true');
			$scrollButtonDiv.css('background-color', '#fff').css('color', '#2F2F2F');
			angular.element('.homepageIntroBlocks').each(function (i, elem) {
				let $this = angular.element(this);
				let thisBlockMobileClass = $this.attr('id') + 'Mobile';
				let thisBlockArrowClass = $this.attr('id') + 'ArrowBox';
				if ($this.hasClass(thisBlockArrowClass)) {
					$this.removeClass(thisBlockArrowClass);
					$this.removeClass('whiteText');
					$this.children('h3').removeClass('whiteText');
					// $this.children('h3').trigger('click');
				}
				if ($this.hasClass(thisBlockMobileClass)) {
					$this.removeClass(thisBlockMobileClass).css('background', 'rgb(255, 255, 255)');
				}
			});

		}


		//randomly assign background-color to the slides -- .slideshow li:nth-child(2) h2:first-child
		angular.element('.slideshow li').each(function (i) {
			let randomNum = Math.floor(Math.random() * (7 - count));
			count++;
			if (i > 0) {
				angular.element(this).children().children().css('background-color', msColors[randomNum]);
				// angular.element('.sliderRegisterButton').css('background-color', msColors[randomNum].replace('.8', '1'))
				msColors.splice(randomNum, 1);
				if (msColors.length <= 0) {
					count = 0;
					msColors = ['rgba(216, 59, 1, .8)', 'rgba(232, 17, 35, .8)', 'rgba(180, 0, 158, .8)', 'rgba(92, 45, 145, .8)', 'rgba(0, 120, 215, .8)', 'rgba(0, 130, 114, .8)', 'rgba(16, 124, 16, .8)'];
				}	
			} else if (i <= 0) {
				angular.element(this).children().children().css('background-color', 'transparent');
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
		// angular.element('.nextTab').keydown(moveHomepageTab);

		//close blocks and move back when shift + tab is clicked
		/*angular.element('.hiddenHomepageSections :first-child').keydown(function(e) {
			let parentId = `#${angular.element(this).parent('.hiddenHomepageSections').attr('id').slice(0, -4)}`;
			let keyCode = customFunctions.getKeyCode(e);
			if (e.shiftKey && keyCode === 9) {
				e.preventDefault();
				hideHomepageSections();
				angular.element(parentId).focus();
				angular.element(parentId).removeClass('whiteText');
			}
		});*/
		//hide homepage sections when you use shift + tab 
		angular.element('.hiddenHomepageSections').keydown(function(e) {
			let elemId = `#${angular.element(this).attr('id').slice(0, -4)}`;
			let keyCode = customFunctions.getKeyCode(e);
			console.log('keyCOde    ', keyCode);
			if (e.shiftKey && keyCode === 9) {
				e.preventDefault();
				hideHomepageSections();
				angular.element(elemId).focus();
				angular.element(elemId).removeClass('whiteText');
			}
		});
		//hide homepage sections when you use caps lock + arrow key
		angular.element('.homepageIntroBlocks').focus(function(e) {
			let elemId = `#${angular.element(this).attr('id')}`;
			let keyCode = customFunctions.getKeyCode(e);
			console.log('elemId    ', elemId);
			if (angular.element(elemId).hasClass('whiteText')) {
				e.preventDefault();
				hideHomepageSections();
				angular.element(elemId).focus();
				angular.element(elemId).removeClass('whiteText');
			}
		})

		/*angular.element('#itsYourEventBlockText :last-child').blur(function(e) {
			angular.element('.newsletterSubscSection p:first-child').focus();
			hideHomepageSections();
		});*/
    	return console.log('homepage directive run');
    }
  };
  return homepageDirectiveDefinitionObject
	}])
};

module.exports = homepageDirective;