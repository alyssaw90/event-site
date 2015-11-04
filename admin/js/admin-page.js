'use strict';

$(document).ready(function () {
	/*$('#add-event-menu').children().click(function () {
		$(this).toggle();
	})*/
	$('.menu').children().click(function () {
		$('.menu').children().removeClass('current');
		$(this).addClass('current');
	});
	/*$('#add-event-menu-tab').click(function() {
  	$('#new-event').css('display', 'block');
  	$('#new-event').siblings().css('display', 'none');
  	// alert('hola');
	});
	$('#edit-event-menu-tab').click(function() {
  	$('#edit-event').css('display', 'block');
  	$('#edit-event').siblings().css('display', 'none');
  	// alert('hola');
	});
	$('#admin-home-menu-tab').click(function() {
  	$('#admin-home').css('display', 'block');
  	$('#admin-home').siblings().css('display', 'none');
  	// alert('hola');
	});*/
	$('#chooseEventButton').click(function (event) {
		var $theEventId = $('#eventNames').val();
		var $theChosenEvent = $('#eventNames').clone()    //clone the element
        						.children() //select all the children
        						.remove()   //remove all the children
        						.end()  //again go back to selected element
        						.text();    //get the text of element
		console.log($theChosenEvent);
		$('#scheduleForm').show();
		// $('#main-admin').append('<div class="col_12><h1>' + )
		$('#chooseEvent').hide();
  	event.preventDefault();
	})
	$.get('/events', function (eventsData) {
		console.log(eventsData);
		var theOptions = '';
		for (var i = 0, j = eventsData.length; i < j; i++) {
			theOptions += '<option value="' + eventsData[i].id + '" data-eventName="' +  eventsData[i].eventName + '">' + eventsData[i].eventName + '</option>';
		}
		$('#eventNames').append(theOptions);
	});
})