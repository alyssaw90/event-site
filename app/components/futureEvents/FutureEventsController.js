'use strict';

const FutureEventsCtrl = (app) => {
	app.controller('FutureEventsCtrl', ['$scope', '$http', 'futureEventsRESTResource', function($scope, $http, resource) {
		$scope.errors = [];
		$scope.futureEvents = [];

		let FutureEvents = resource();

		$scope.getUpcomingEvents = () => {

			FutureEvents.getFutureEvents(function (err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve future events'});
        };
        
        $scope.futureEvents = data;
      })
			
		
		}
	}])
}

module.exports = FutureEventsCtrl;