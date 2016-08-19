'use strict';

const AdminCtrl = (app) => {
	app.controller('AdminCtrl', ['$scope', '$http', 'Upload', 'adminRESTResource', function($scope, $http, Upload, resource) {
		$scope.errors = [];
		$scope.theEvents = [];
		$scope.theSpeakers = [];
		$scope.newEvent = {};

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
		};

		$scope.createNewEvent = (event) => {
			let fd = new FormData();
     	for ( let key in event ) {
		    fd.append(key, event[key]);
			}
			// console.log('the event              ', $files);
      DataForEditingEvents.createEvent(event, function (err, data) {
        if (err) {
          $scope.errors.push({msg: 'could not save event: ' + $scope.newEvent.eventName});
        };
      });
    };

	}])
}

module.exports = AdminCtrl;