'use strict';

const AdminCtrl = (app) => {
	app.controller('AdminCtrl', ['$scope', '$http', 'adminRESTResource', function($scope, $http, resource) {
		$scope.errors = [];
		$scope.theEvents = [];
		$scope.theSpeakers = [];
		$scope.newEvent = {};
		$scope.hideModal = true;

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

		$scope.createNewEvent = (newEvent) => {

      DataForEditingEvents.createEvent(newEvent, function (err, data) {
        if (err) {
          $scope.errors.push({msg: 'could not save newEvent: ' + $scope.newEvent.eventName});
        }
        console.log('data:     ', data);
      });
    };

    $scope.closeModalWindow = () => {
    	$scope.hideModal = !$scope.hideModal;
    }

	}])
}

module.exports = AdminCtrl;