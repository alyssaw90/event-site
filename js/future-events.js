'use strict';

$(document).ready(function () {
	var $eventBlock = $('.event_block');
	//make block slide up effect for upcoming event blocks
	$eventBlock.hover(
		function () {
		$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
		},
		function () {
			$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200);
		});
	$eventBlock.hover(
		function () {
			var $theHtml = $(this).html();
			// $(this).css('background-color', backgroundColor);
			// $(this).prepend('<p style="text-align: center; padding-top: 20%; font-weight: bold; color: #FFF;">More Details</p>');
			$(this).find('h1').animate({opacity: 0}, 0);
			$(this).find('h3').animate({opacity: 0}, 0);
			// $theHtml.replace('<h1>', '<p style="tex0t-align: center; padding-top: 20%; font-weight: bold; color: #FFF;">More Details</p><h1>');
			
			// $(this).html('<p style="text-align: center; padding-top: 20%; font-weight: bold; color: #FFF;">More Details</p>');
			$(this).find('p').show();
			$(this).find('p').animate({opacity: 1}, 200);
		},
		function () {
			$(this).find('h1').animate({opacity: 1}, 0);
			$(this).find('h3').animate({opacity: 1}, 0);
			$(this).find('p').hide();
			$(this).find('p').animate({opacity: 0}, 0);
			// console.log($theHtml);
			// var theHtml = $(this).html();
			// console.log(backgroundColor);
			// $(this).children().show();
			// $(this).html($theHtml);
			// $(this).find('p').hide();
			// $(this).find('h1').animate({opacity: 1});
			// $(this).find('h3').animate({opacity: 1});
		})

});

$(window).load(function() {
  changeHeight('.event_block')
});


$(window).resize(function(){
  changeHeight('.event_block')
});
