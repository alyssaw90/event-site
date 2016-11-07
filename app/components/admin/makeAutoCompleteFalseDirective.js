'use strict';
const jQuery = require('jquery');

const makeAutoCompleteFalseDirective = (app) => {
	app.directive('makeAutoCompleteFalseDirective', [ function() {
		
		const makeAutoCompleteFalseDirectiveObj = {
			restrict: 'A',
			link: ($scope, $elem, attrs) => {
                let $inputs = $elem.find('input');
                // console.log('$elem :: ', $inputs, ' :: ', $elem);
                $inputs.attr('autcomplete', 'off');

			}
		}
		return makeAutoCompleteFalseDirectiveObj;
	}])
};

module.exports = makeAutoCompleteFalseDirective;