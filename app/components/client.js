'use strict';

import * as customFunctions from './shared/methods/common-functions.js';
const jQuery = require('jquery');
require('angular/angular');
require('angular-route');
require('angular-aria');
require('angular-touch');
require('angular-carousel');
require('ng-page-title');
require('angular-sanitize');
require('angular-google-analytics');
require('ng-file-upload');
require('angular-resource');

// declare a module
const eventsApp = angular.module('eventsApp', ['ngRoute', 'ngAria', 'ngTouch', 'angular-carousel', 'ngPageTitle', 'ngSanitize', 'angular-google-analytics', 'ngFileUpload', 'ngResource']);

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
require('./admin/admin-header/adminHeaderDirective.js')(eventsApp);
require('./pastEvents/pastEventsDirective.js')(eventsApp);

//controllers
require('./shared/AllPagesCtrl.js')(eventsApp);
require('./homepage/HomepageCtrl.js')(eventsApp);
require('./pastEvents/PastEventsCtrl.js')(eventsApp);
require('./meetTheTeam/MeetTheTeamCtrl.js')(eventsApp);
require('./futureEvents/FutureEventsController.js')(eventsApp);
require('./futureEvents/BingMapCtrl.js')(eventsApp);
require('./shared/header/HeaderController.js')(eventsApp);
require('./admin/AdminFileUploadCtrl.js')(eventsApp);
require('./admin/createEvent/AdminCreateEventCtrl.js')(eventsApp);
require('./latestNews/LatestNewsCtrl.js')(eventsApp);
require('./events/EventsCtrl.js')(eventsApp);
require('./admin/createSpeaker/CreateSpeakerCtrl.js')(eventsApp);
//services
require('./meetTheTeam/meetTheTeamRestResource.js')(eventsApp);
require('./futureEvents/futureEventsRESTResource.js')(eventsApp);
require('./futureEvents/bingMapRESTResource.js')(eventsApp);
require('./shared/header/headerRESTResource.js')(eventsApp);
require('./admin/createEvent/createEventRESTResource.js')(eventsApp);
require('./events/eventsRESTResource.js')(eventsApp);
require('./latestNews/latestNewsRESTResource.js')(eventsApp);
require('./admin/createSpeaker/createSpeakerRESTResource.js')(eventsApp);

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
.config(['$routeProvider', '$locationProvider', 'AnalyticsProvider', '$httpProvider', function ($routeProvider, $locationProvider, AnalyticsProvider, $httpProvider) {

	//Enable Google Analytics
	AnalyticsProvider
	.setAccount('UA-74698663-1');
	//enable cross origin for jsonp
	$httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

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
	/*.when('/admin', {
		redirectTo: '/admin/edit-event',
		data: {
      pageTitle: 'Admin Page - Microsoft Plugfests and Events'
    }
	})
	.when('/admin/create-event', {
		templateUrl: '/app/components/admin/createEvent/admin-create-event.html',
		// controller: 'AdminCreateEventCtrl',
		data: {
      pageTitle: 'Admin Page - Microsoft Plugfests and Events'
    }
	})
	.when('/admin/create-speaker', {
		templateUrl: '/app/components/admin/createSpeaker/admin-create-speaker.html',
		data: {
			pageTitle: 'Admin Page - Microsoft Plugfests and Events, create new speaker'
		}
	})
	.when('/admin/edit-event', {
		templateUrl: '/app/components/admin/editEvent/admin-edit-event.html',
		// controller: 'AdminCreateEventCtrl',
		data: {
      pageTitle: 'Admin Page - Microsoft Plugfests and Events'
    }
	})
	.when('/admin/edit-speaker', {
		templateUrl: '/app/components/admin/editSpeaker/admin-edit-speakers.html',
		// controller: 'AdminCreateEventCtrl',
		data: {
      pageTitle: 'Admin Page - Microsoft Plugfests and Events'
    }
	})*/
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
.run(['$rootScope', '$location', '$anchorScroll', '$routeParams', 'Analytics', function ($rootScope, $location, $anchorScroll, $routeParams, Analytics) {

	Analytics.pageView();
	
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