'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {
	$('.newsletter-signup').html(
		'<h4>Sign Up for the Newsletter</h4>\
		<form action="/api/addcontact" method="POST" class="vertical">\
			<label for="email">Email Address</label>\
			<input id="email" name="email" type="email" type="submit" required />\
			<p></p>\
			<label for="firstName">First Name *</label>\
			<input id="firstName" name="firstName" type="text" type="submit" />\
			<label for="lastName">Last Name *</label>\
			<input id="lastName" name="lastName" type="text" type="submit" />\
			<label for="title">Title *</label>\
			<input id="title" name="title" type="text" type="submit" />\
			<label>Which protocols are you interested in? *</label>\
			<fieldset class="scrolling-box">\
				<input type="checkbox" id="sharePointFileOperations" value="true" /> <label for="check1" class="inline">SharePoint file Operations</label>\
				<br />\
				<input type="checkbox" id="officeClient" value="true" /> <label for="check2" class="inline">Office Client</label>\
				<br />\
				<input type="checkbox" id="windowsFileSharingProtocols" value="Windows File Sharing Protocols (SMB2&3 family)" value="true"/> <label for="check3" class="inline">Windows File Sharing Protocols (SMB2&3 family)</label>\
				<br />\
				<input type="checkbox" id="windowsIdentityActiveDirectoryAndAuthenticationProtocols" value="Windows Identity (ActiveDirectory) and Authentication Protocols" value="true"/> <label for="check3" class="inline">Windows Identity (ActiveDirectory) and Authentication Protocols</label>\
				<br />\
				<input type="checkbox" id="kerberosAuthentication" value="true" /> <label for="check3" class="inline">Kerberos Authentication</label>\
				<br />\
				<input type="checkbox" id="exchangeRPC" value="true" /> <label for="check3" class="inline">Exchange RPC</label>\
				<br />\
				<input type="checkbox" id="exchangeWebServices" value="Exchange Web Services (EWS)" value="true" /> <label for="check3" class="inline">Exchange Web Services (EWS)</label>\
				<br />\
				<input type="checkbox" id="exchangeActiveSync" value="Exchange ActiveSync (EAS)" /> <label for="check3" class="inline">Exchange ActiveSync (EAS)</label>\
				<br />\
				<input type="checkbox" id="bringYourOwnDevice" value="true" /> <label for="check3" class="inline">Bring your own device (BYOD)</label>\
				<br />\
				<input type="checkbox" id="sqlServer" value="true" /> <label for="check3" class="inline">SQL Server</label>\
				<br />\
				<input type="checkbox" id="oDataREST" value="true" /> <label for="check3" class="inline">OData / REST</label>\
				<br />\
				<input type="checkbox" id="otherProtocol" value="true" /> <label for="check3" class="inline">Other</label>\
			</fieldset>\
			<input id="" name="" type="text" type="submit" />\
			<label for="newsletterSubscription">I would like to receive the newsletter</label>\
			<input id="newsletterSubscription" type="checkbox" name="newsletterSubscription" value="true" checked>\
			<p>*Optional</p>\
			<button class="medium" type="submit">Submit</button>\
			<hr>\
		</form>'
		);
	function resetForm () {
		$('form').on('submit', function () {
			console.log('hello world');
			$('form').get(0).reset();
		});
		
	}
	resetForm();
});

