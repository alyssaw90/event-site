'use strict';

const jQuery = require('jquery');
import * as customFunctions from '../../shared/methods/common-functions.js';

const matchButtonSizeDirective = (app) => {
	app.directive('matchButtonSizeDirective', [ () => {
		const matchButtonSizeDirectiveObj = {
			restrict: 'A',
			link: ($scope, $elem, attrs) => {
				let $buttons = $elem.find('button');
				customFunctions.changeWidth($buttons);				
			}
			
		}

		return matchButtonSizeDirectiveObj;
	}])
}

module.exports = matchButtonSizeDirective;