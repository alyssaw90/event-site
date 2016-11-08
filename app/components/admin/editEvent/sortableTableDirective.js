'use strict';
const jQuery = require('jquery');
const jQueryUi = require('jquery-ui');

const sortableTableDirective = (app) => {
	app.directive('sortableTableDirective', ['$timeout', ($timeout) => {
		let widestBlock = 0;
		
		const sortableTableDirectiveObj = {
			restrict: 'A',
			replace: true,
			link: ($scope, $elem, attrs) => {
				
                $timeout( () => {
                    
                    $elem.find('tbody').sortable({
						start: function(event, ui) {
							ui.item.startPos = ui.item.index();
						},
						stop: function(event, ui) {
							console.log("Start position: " + ui.item.startPos);
							console.log("New position: " + ui.item.index());
						}
					});
					
					$elem.find('tbody').disableSelection();
                });
				

			}
		}
		return sortableTableDirectiveObj;
	}])
};

module.exports = sortableTableDirective;