'use strict';
$(document).ready(function () {
	var $addEventMenuTab = $('#addEventSection');
	var $adminHeader = $('#admin-header');
	$('#add-event-menu-tab').click(function () {
		$('#mainAdmin').children().hide();
		$adminHeader.html('<h1>Give your event a name</h1>');
		$addEventMenuTab.show();
	});
})