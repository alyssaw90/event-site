'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {

	var $footer = $('footer');
	var footerMenuHTML = '<div class="col_12 footer-right mobile-foot">\
				<p><a href="/about">About Us</a> | <a href="/contact">Contact Us</a> | <a href="/faq">FAQ</a> | <a href="/media">Media</a> | <a href="http://www.microsoft.com/en-us/privacystatement/default.aspx">Privacy Statement</a> | <a href="https://msdn.microsoft.com/en-us/cc300389.aspx">Terms of Service</a></p>\
			</div>';

	var footerMenu = $.parseHTML(footerMenuHTML);
	$footer.append(footerMenu);
});