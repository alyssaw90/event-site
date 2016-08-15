'use strict';

const EventsCtrl = (app) => {
	app.controller('EventsCtrl', ['$scope', '$http', 'eventsRESTResource', function($scope, $http, resource) {
		$scope.errors = [];
		$scope.events;

		let Events = resource();

		$scope.getEvents = () => {
			let path = window.location.pathname.slice(1);

			Events.getEvents(path, function (err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve header events'});
        };
        
        $scope.events = data;
      })
			
		
		};

	}])
}

module.exports = EventsCtrl;