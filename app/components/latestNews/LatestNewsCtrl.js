
'use strict';

const LatestNewsCtrl = (app) => {
	app.controller('LatestNewsCtrl', ['$scope', '$timeout', 'latestNewsRESTResource', function($scope, $timeout, resource) {
		$scope.blogPosts;

		let BlogPostsREST = resource();

		$scope.getBlogPosts = () => {

			BlogPostsREST.getBlogPosts(function(err, data) {
				if (err) {
					return console.log({msg: 'could not retrieve blog posts'});
				}
				$scope.blogPosts = data;

			});

		}

		$scope.getDate = (dateStr) => {
			return new Date(dateStr).toDateString();
		}
		

	}])
}

module.exports = LatestNewsCtrl;