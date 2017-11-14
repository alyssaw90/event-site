//REMOVE CONTACT US

'use strict';

const contactUsDirective = () => {
	const $emailButton = angular.element('#emailButton');

	$emailButton.click(function (e) {
		$emailButton.attr('href', 'mailto:plugfests@microsoft.com?subject=' + angular.element('#emailSubject').val() + '&body=' + angular.element('#emailBody').val());
	});
}

module.exports = contactUsDirective;