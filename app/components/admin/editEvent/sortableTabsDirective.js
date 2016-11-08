'use strict';
const jQuery = require('jquery');
const jQueryUi = require('jquery-ui');

const sortableTabsDirective = (app) => {
	app.directive('sortableTabsDirective', ['$timeout', ($timeout) => {
		let widestBlock = 0;
		
		const sortableTabsDirectiveObj = {
			restrict: 'A',
			replace: true,
			link: ($scope, $elem, attrs) => {
				
                $timeout( () => {
                    
                    $elem.find('tbody').sortable({
						start: function(event, ui) {
							ui.item.startPos = ui.item.index();
						},
						stop: function(event, ui) {
							ui.item.attr('data-tabPosition', ui.item.index())
							console.log("Start position: " + ui.item.startPos);
							console.log("New position: " + ui.item.index());
							console.log('ui.item :: ', ui);
						}
					});
					
					$elem.find('tbody').disableSelection();
                });
				

			}
		}
		return sortableTabsDirectiveObj;
	}])
};

module.exports = sortableTabsDirective;