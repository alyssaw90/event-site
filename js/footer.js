'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {

	var $footer = $('footer');
	var footerMenuHTML = '<nav class="footer-right mobile-foot" style="height: 200px;">\
				<p class="visible"><a href="/about">About Us</a> | <a href="/contactus">Contact Us</a> | <a href="http://www.microsoft.com/en-us/privacystatement/default.aspx">Privacy Statement</a> | <a href="https://msdn.microsoft.com/en-us/cc300389.aspx">Terms of Service</a></p>\
			</nav>';

	var footerMenu = $.parseHTML(footerMenuHTML);
	$footer.prepend(footerMenu);
});