'use strict';

const MeetTheTeamCtrl = (app) => {
	app.controller('MeetTheTeamCtrl', ['$scope', '$http', 'meetTheTeamRESTResource', function($scope, $http, resource) {
		$scope.errors = [];
		$scope.teamMembers = [];

		let TeamMember = resource();

		$scope.getTeamMembers = () => {

			TeamMember.getMeetTheTeamSpeakers(function (err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve team members'});
        };
        
        $scope.teamMembers = data;
      })
			
		
		}
	}])
}

module.exports = MeetTheTeamCtrl;