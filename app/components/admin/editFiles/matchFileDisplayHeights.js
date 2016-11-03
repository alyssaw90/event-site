'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const matchFileDisplayHeights = (app) => {
	app.directive('matchFileDisplayHeights', ['$timeout', ($timeout) => {
		const matchFileDisplayHeightsObj = {
			restrict: 'A',
			scope: true,
			link ($scope, $elem, attrs) {
				let tallest = 0;

				$scope.$watch(() => {
					customFunctions.changeHeight($elem.children('label'));
					// customFunctions.changeWidth($elem.children('label'));
				});

			}
		}
		return matchFileDisplayHeightsObj;
	}]);
};

module.exports = matchFileDisplayHeights;