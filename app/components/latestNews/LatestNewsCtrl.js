
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


		/*$scope.rss1 = () => {
			document.write('\x3Cscript type="text/javascript" src="' + ('https:' == document.location.protocol ? 'https://' : 'http://') + 'feed.mikle.com/js/rssmikle.js">\x3C/script>');
		}
*/
		/*$scope.rss2 = () => {
			// $timeout(function() {
				const params = {
					rssmikle_url: "https://msdn.microsoft.com/en-us/openspecifications/dn889925",
					rssmikle_frame_width: "320",
					rssmikle_frame_height: "900",
					frame_height_by_article: "0",
					rssmikle_target: "_blank",rssmikle_font: "Arial, Helvetica, sans-serif",
					rssmikle_font_size: "12",rssmikle_border: "off",
					responsive: "on",
					rssmikle_css_url: "",
					text_align: "left",text_align2: "left",corner: "off",
					scrollbar: "on",autoscroll: "off",
					scrolldirection: "up",scrollstep: "3",
					mcspeed: "20",
					sort: "New",
					rssmikle_title: "on",
					rssmikle_title_sentence: "Latest Interoperability News",
					rssmikle_title_link: "",
					rssmikle_title_bgcolor: "#002050",
					rssmikle_title_color: "#FFFFFF",
					rssmikle_title_bgimage: "",
					rssmikle_item_bgcolor: "#FFFFFF",
					rssmikle_item_bgimage: "",
					rssmikle_item_title_length: "55",
					rssmikle_item_title_color: "#002050",
					rssmikle_item_border_bottom: "off",
					rssmikle_item_description: "on",
					item_link: "off",rssmikle_item_description_length: "150",
					rssmikle_item_description_color: "#666666",rssmikle_item_date: "gl1",
					rssmikle_timezone: "Etc/GMT",datetime_format: "%b %e, %Y %l:%M %p",
					item_description_style: "text",item_thumbnail: "full",
					item_thumbnail_selection: "auto",article_num: "14",
					rssmikle_item_podcast: "off",keyword_inc: "",
					keyword_exc: ""};

					feedwind_show_widget_iframe(params);
				
			// }, 500);
		}*/
		

	}])
}

module.exports = LatestNewsCtrl;