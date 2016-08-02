'use strict';

import * as customFunctions from './../es6/common-functions.build.js';
require('angular/angular');
require('angular-route');

// declare a module
const eventsApp = angular.module('eventsApp', ['ngRoute']);

// const rss1 = () => {
// 	document.write('\x3Cscript type="text/javascript" src="' + ('https:' == document.location.protocol ? 'https://' : 'http://') + 'feed.mikle.com/js/rssmikle.js">\x3C/script>');
// }

const rss2 = () => {
	(function() {var params = {
		rssmikle_url: "https://msdn.microsoft.com/en-us/openspecifications/dn889925",rssmikle_frame_width: "320",rssmikle_frame_height: "900",frame_height_by_article: "0",
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
	})();
}
//directives
require('./homepage/homepageDirective.build.js')(eventsApp);
// require('./latest-news/latestNewsDirective.build.js')(eventsApp);
//controllers
require('./homepage/homepageCtrl.build.js')(eventsApp);

eventsApp
.controller('allPagesCtrl', ['$scope', '$location', '$route', function($scope, $location, $route) {
	$scope.showSlider = false;
		$scope.isCurrentPage = (pageUrl) => {
	   return pageUrl === $location.path();
		}

		$scope.$on('$routeChangeSuccess', function(next, current) { 

	 		if ($location.path() == '/' || '/latest-news') {		      
				customFunctions.homepageStickyFooter();
	    } else {
	    	customFunctions.stickyFooter();
	    }
	
	 	});

}])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider, $rootScope) {
	/* Configuration is where you configure providers ( not instances) */
	console.log("Configuration hook");

	$routeProvider
	.when('/', {
		templateUrl: '/app/components/homepage/homepage.html',
		controller: 'homepageCtrl'
	})
	.when('/about', {
		templateUrl: '/app/components/about/about.html'
	})
	.when('/latest-news', {
		templateUrl: '/app/components/latest-news/latest-news.html',
		// controller: 'latestNewsCtrl'
	})

	if(window.history && window.history.pushState) {
		$locationProvider.html5Mode({
	   	enabled: true,
	   	requireBase: false
	  });
		
	}

}])
/*.directive('newScript', [function() {
	return {
		restrict: 'A',
		link: function(scope, elem, attr) {
			console.log('hola');
	angular.element('.internetExplorer > h2').hide();
	angular.element('#recentNewsSection').append('</script><script type="text/javascript" src="/app/es6/rssFeed2.js"></script>')
			
		}
	}

}])*/
.run(['$rootScope', function ($rootScope) {
	/* Run is when the app gets kicked off */
	// $rootScope.rss = rss2;
	console.log("Run hook");

	$rootScope.$on('$routeChangeSuccess', function(next, current) { 
 		customFunctions.stickyFooter();
 		/*if ($location.path() == '/') {
      $rootScope.hideSlider = true;
    };
*/
 	});

}])