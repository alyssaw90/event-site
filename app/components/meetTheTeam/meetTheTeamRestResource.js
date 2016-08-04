'use strict';


// const meetTheTeamRESTResource = (app) => {
// 	console.log('hola mundo', app);
// 	const handleError = (callback) => {
// 	  return function (data) {
// 	    console.log(data);
// 	    callback(data);
// 	  }
// 	};

// 	const handleSuccess = (callback) => {
// 	  return function (data) {
// 	    callback(null, data);
// 	  }
// 	};

// 	app.factory('meetTheTeamRESTResource', ['$http', function($http) {

// 		return function(callback) {
// 			return {
// 				getMeetTheTeamSpeakers: function() {
// 					$http.get('/getTeam')
//           .success(handleSuccess(callback))
//           .error(handleError(callback));
// 				}
// 			}
			
// 		}

// 		meetTheTeamRESTResource.getMeetTheTeamSpeakers = function() {
//         return $http.get('/getTeam')
//         			.success(handleSuccess(callback))
//         			.error(handleError(callback));
//     };

//     return meetTheTeamRESTResource;


// 	}])
// }

module.exports = meetTheTeamRESTResource;

'use strict';

const meetTheTeamRESTResource = (app) => {

	const handleError = (callback) => {
	  return function (data) {
	    console.log(data);
	    callback(data);
	  }
	};

	const handleSuccess = (callback) => {
	  return function (data) {
	    callback(null, data);
	  }
	};

	app.factory('meetTheTeamRESTResource', ['$http', function($http) {

		return function(callback) {
			return {
				getMeetTheTeamSpeakers: function(callback) {
					$http.get('/getTeam')
          .success(handleSuccess(callback))
          .error(handleError(callback));
				}
			}
			
		}

/*		meetTheTeamRESTResource.getMeetTheTeamSpeakers = function() {
        return $http.get('/getTeam')
        			.success(handleSuccess(callback))
        			.error(handleError(callback));
    };

    return meetTheTeamRESTResource;*/


	}])
}

module.exports = meetTheTeamRESTResource;