'use strict';

const EventsController = (app) => {
	app.controller('EventsController', ['$scope', '$http', 'eventsRESTResource', function($scope, $http, resource) {
		$scope.errors = [];
		$scope.theEvents = [];
		$scope.theSpeakers = [];

		let DataForEditingEvents = resource();

		$scope.getEvents = () => {

			DataForEditingEvents.getAllEvents(function (err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve events'});
        };
        
        $scope.theEvents = data;
      })
			
		
		};

		$scope.getAllSpeakers = () => {

			DataForEditingEvents.getAllSpeakers(function(err, speakers) {
				if (err) {
					return $scope.errors.push({msg: 'could not retrieve speakers'});
				}

				$scope.theSpeakers = speakers;
			})
		}

	}])
}

module.exports = EventsController;