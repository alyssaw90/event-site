
'use strict';

const LatestNewsCtrl = (app) => {
	app.controller('LatestNewsCtrl', ['$scope', '$timeout', 'latestNewsRESTResource', '$http', '$sce', function($scope, $timeout, resource, $http, $sce) {
		$scope.blogPosts;

		let BlogPostsREST = resource();

		$scope.getBlogPosts = () => {

			BlogPostsREST.getBlogPosts(function(err, data) {
				if (err) {
					// return console.log({msg: 'could not retrieve blog posts'});
					return console.log(err)
				}
				$scope.blogPosts = data;
			});
			// $http.jsonp($sce.trustAsResourceUrl('http://sxp.microsoft.com/feeds/3.0/msdntn/MSDNOpenSpecificationFeeds/json?callback=JSON_CALLBACK'))
			// .then(function successCallback(data){
			// 			// return callback(null, data);
			// 			console.log(data)
			// 			$scope.blogPost = data;
			// 		})


		}

		$scope.getDate = (dateStr) => {
			return new Date(dateStr).toDateString();
		}
		

	}])
}

module.exports = LatestNewsCtrl;