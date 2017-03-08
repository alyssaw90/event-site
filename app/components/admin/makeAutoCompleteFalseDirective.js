'use strict';
const jQuery = require('jquery');

const makeAutoCompleteFalseDirective = (app) => {
	app.directive('makeAutoCompleteFalseDirective', [ function() {
		
		const makeAutoCompleteFalseDirectiveObj = {
			restrict: 'A',
			link: ($scope, $elem, attrs) => {
                let $inputs = $elem.find('input');
                $inputs.attr('autocomplete', 'off');

			}
		}
		return makeAutoCompleteFalseDirectiveObj;
	}])
};

module.exports = makeAutoCompleteFalseDirective;