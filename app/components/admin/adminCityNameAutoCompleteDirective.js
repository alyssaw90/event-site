'use strict';
import * as customFunctions from '../shared/methods/common-functions.js';
const jQuery = require('jquery');

const adminCityNameAutoCompleteDirective = (app) => {
	app.directive('adminCityNameAutoCompleteDirective', ['adminPageRESTResource', (adminPageRESTResource) => {
		const adminCityNameAutoCompleteDirectiveObj = {
			restrict: 'A',
			scope: true,
			link: (scope, elem, attrs) => {
				const RESTResources = adminPageRESTResource();

		    function getBingKey() {
		    	return new Promise( (resolve, reject) => {
			      RESTResources.getBingKey( (err, data) => {
			        if (err) {
			          reject(err);
			        }
			        if (!err) {
			          resolve(data);
			        }
			      });
		    		
		    	});
		    }

				elem.autocomplete({
          source: (searchTerm, response) => {
          	getBingKey()
          	.then( bingKey => {

	          	RESTResources.getCityNames(searchTerm.term, bingKey, (err, data) => {
				      	const output = [];
				        if (err) {
				          response('Error');
				        }
				        if (!err) {
				          for (var i = 0, len = data.resourceSets[0].resources.length; i < len; i++) {
				            output.push(data.resourceSets[0].resources[i].name);
				          }
				          response(output);
				        }
				      })

          	})
          	.catch(err => {
          		response('Error');
          	})
          }, 
          minLength: 2,
          delay: 500
        });

			}
		}
		return adminCityNameAutoCompleteDirectiveObj;
	}])
};

module.exports = adminCityNameAutoCompleteDirective;