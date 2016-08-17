'use strict';

import * as customFunctions from './../es6/common-functions.build.js';
const jQuery = require('jQuery');
require('angular/angular');
require('angular-route');
require('angular-aria');
require('angular-touch');
require('angular-carousel');
require('ng-page-title');
require('angular-sanitize');

// declare a module
const eventsApp = angular.module('eventsApp', ['ngRoute', 'ngAria', 'ngTouch', 'angular-carousel', 'ngPageTitle', 'ngSanitize']);

/*const rss1 = () => {
	document.write('\x3Cscript type="text/javascript" src="' + ('https:' == document.location.protocol ? 'https://' : 'http://') + 'feed.mikle.com/js/rssmikle.js">\x3C/script>');
}

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
}*/

//directives
require('./shared/allPagesDirective.js')(eventsApp);
require('./homepage/homepageDirective.js')(eventsApp);
require('./latestNews/latestNewsDirective.js')(eventsApp);
require('./contactUs/contactUsDirective.js')(eventsApp);
require('./futureEvents/futureEventsDirective.js')(eventsApp);
require('./futureEvents/bingMapDirective.js')(eventsApp);
require('./shared/header/sliderSlideDirective.js')(eventsApp);
require('./shared/header/headerDirective.js')(eventsApp);
require('./events/eventsDirective.js')(eventsApp);
require('./admin/adminPageDirective.js')(eventsApp);

//controllers
require('./shared/AllPagesCtrl.js')(eventsApp);
require('./homepage/HomepageCtrl.js')(eventsApp);
require('./pastEvents/PastEventsCtrl.js')(eventsApp);
require('./meetTheTeam/MeetTheTeamCtrl.js')(eventsApp);
require('./futureEvents/FutureEventsController.js')(eventsApp);
require('./futureEvents/BingMapCtrl.js')(eventsApp);
require('./shared/header/HeaderController.js')(eventsApp);
require('./admin/AdminCtrl.js')(eventsApp);
require('./latestNews/LatestNewsCtrl.js')(eventsApp);
require('./events/EventsCtrl.js')(eventsApp);
//services
require('./meetTheTeam/meetTheTeamRestResource.js')(eventsApp);
require('./futureEvents/futureEventsRESTResource.js')(eventsApp);
require('./futureEvents/bingMapRESTResource.js')(eventsApp);
require('./shared/header/headerRESTResource.js')(eventsApp);
require('./admin/adminRESTResource.js')(eventsApp);
require('./events/eventsRESTResource.js')(eventsApp);

eventsApp
// .controller('allPagesCtrl', ['$scope', '$location', '$route', function($scope, $location, $route) {
// 	$scope.showSlider = false;
// 		$scope.isCurrentPage = (pageUrl) => {
// 	   return pageUrl === $location.path();
// 		}

// 		$scope.$on('$routeChangeSuccess', function(next, current) { 
// /*
// 	 		if ($location.path() == '/' || '/latestNews') {		      
// 				customFunctions.homepageStickyFooter();
// 	    } else {
// 	    	customFunctions.stickyFooter();
// 	    }*/
	
// 	 	});

// }])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	/* Configuration is where you configure providers ( not instances) */
	console.log("Configuration hook");

	$routeProvider
	.when('/', {
		templateUrl: '/app/components/homepage/homepage.html',
		controller: 'HomepageCtrl',
		data: {
      pageTitle: 'Home Page - Microsoft Plugfests and Events'
    }
	})
	/*These redirect routes take care of 404 errors cause by angular stripping the hash from routes even when they're meant for in page navigation*/
	.when('/eventNavigationMenu', {
		redirectTo: '/'
	})
	.when('/beginningOfContent', {
		redirectTo: '/'
	})
	.when('/footerStartMenuItem', {
		redirectTo: '/'
	})
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	.when('/about', {
		templateUrl: '/app/components/about/about.html',
		data: {
      pageTitle: 'About Us Page - Microsoft Plugfests and Events'
    }
	})
	.when('/contactus', {
		templateUrl: '/app/components/contactUs/contactUs.html',
		data: {
      pageTitle: 'Contact Us Page - Microsoft Plugfests and Events'
    }

	})
	.when('/faq', {
		templateUrl: '/app/components/faq/faq.html',
		data: {
      pageTitle: 'Frequently Asked Questions Page - Microsoft Plugfests and Events'
    }
	})
	.when('/past-events', {
		templateUrl: '/app/components/pastEvents/pastEvents.html',
		controller: 'PastEventsCtrl',
		data: {
      pageTitle: 'Past Events Page - Microsoft Plugfests and Events'
    }
	})
	.when('/meet-the-team', {
		templateUrl: '/app/components/meetTheTeam/meetTheTeam.html',
		controller: 'MeetTheTeamCtrl',
		data: {
      pageTitle: 'Meet the Team Page - Microsoft Plugfests and Events'
    }
	})
	.when('/future-events', {
		templateUrl: '/app/components/futureEvents/futureEvents.html',
		controller: 'FutureEventsCtrl',
		data: {
      pageTitle: 'Future Events Page - Microsoft Plugfests and Events'
    }
	})
	.when('/latest-news', {
		templateUrl: '/app/components/latestNews/latestNews.html',
		controller: 'LatestNewsCtrl',
		data: {
      pageTitle: 'Latest Page - Microsoft Plugfests and Events'
    }
	})
	.when('/admin', {
		templateUrl: '/app/components/admin/admin.html',
		controller: 'AdminCtrl',
		data: {
      pageTitle: 'Admin Page - Microsoft Plugfests and Events'
    }
	})
	.when('/:slug', {
    templateUrl: '/app/components/events/event.html',
    controller: 'EventsCtrl',
    data: {
      pageTitle: 'Interoperability Event Page - Microsoft Plugfests and Events'
    }
  })

	//turn on html5Mode so routes don't include # symbol
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
.run(['$rootScope', '$location', '$anchorScroll', '$routeParams', '$timeout', function ($rootScope, $location, $anchorScroll, $routeParams, $timeout) {
	
	$rootScope.$on('$viewContentLoaded', function () {
			// document.getElementById('screenreader-summary').trigger('focus');
		
	});

	$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) { 

		// $location.hash($routeParams.scrollTo);
    $anchorScroll();

 		if ($location.path() == '/') {
      $rootScope.hideSlider = true;
    };

 	});

}])