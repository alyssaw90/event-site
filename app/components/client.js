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
require('angular-cookies');
require('angular-base64');
require('angular-animate');
require('angular-ui-bootstrap');
require('angular-ui-tinymce');
require('angular-ui-sortable');
require('angular-bootstrap-confirm');
require('angular-messages');

const eventsApp = angular.module('eventsApp', ['ngRoute', 'ngAria', 'ngTouch', 'angular-carousel', 'ngPageTitle', 'ngSanitize', 'angular-google-analytics', 'ngFileUpload', 'ngResource', 'ngCookies', 'base64', 'ngAnimate', 'ui.bootstrap', 'ui.tinymce', 'ui.sortable', 'mwl.confirm', 'ngMessages']);

//directives
require('./shared/directives/allPagesDirective.js')(eventsApp);
require('./homepage/homepageDirective.js')(eventsApp);
require('./latestNews/latestNewsDirective.js')(eventsApp);
require('./contactUs/contactUsDirective.js')(eventsApp);
require('./futureEvents/futureEventsDirective.js')(eventsApp);
require('./futureEvents/bingMapDirective.js')(eventsApp);
require('./shared/header/sliderSlideDirective.js')(eventsApp);
require('./shared/header/headerDirective.js')(eventsApp);
require('./events/eventsDirective.js')(eventsApp);
require('./admin/adminCityNameAutoCompleteDirective.js')(eventsApp);
require('./admin/admin-header/adminHeaderDirective.js')(eventsApp);
require('./pastEvents/pastEventsDirective.js')(eventsApp);
require('./admin/createEvent/createEventCloseModalDirective.js')(eventsApp);
require('./admin/editEvent/editEventDirective.js')(eventsApp);
require('./admin/createEvent/matchButtonSizeDirective.js')(eventsApp);
require('./shared/header/hamburgerMenuDirective.js')(eventsApp);
require('./admin/createEvent/uniqueUrlDirective.js')(eventsApp);
require('./admin/editSlideshow/selectableSlideDirective.js')(eventsApp);
require('./admin/editFiles/matchFileDisplayHeights.js')(eventsApp);
require('./shared/header/carouselHeightDirective.js')(eventsApp);
require('./admin/makeAutoCompleteFalseDirective.js')(eventsApp);

//controllers
require('./shared/controllers/AllPagesCtrl.js')(eventsApp);
require('./shared/controllers/updateLanguageCtrl.js')(eventsApp);
require('./homepage/HomepageCtrl.js')(eventsApp);
require('./pastEvents/PastEventsCtrl.js')(eventsApp);
require('./meetTheTeam/MeetTheTeamCtrl.js')(eventsApp);
require('./futureEvents/FutureEventsController.js')(eventsApp);
require('./futureEvents/BingMapCtrl.js')(eventsApp);
require('./shared/header/HeaderController.js')(eventsApp);
require('./admin/AdminPageCtrl.js')(eventsApp);
require('./admin/createEvent/AdminCreateEventCtrl.js')(eventsApp);
require('./latestNews/LatestNewsCtrl.js')(eventsApp);
require('./events/EventsCtrl.js')(eventsApp);
require('./admin/createSpeaker/CreateSpeakerCtrl.js')(eventsApp);
require('./admin/userLogging/UserLoggingCtrl.js')(eventsApp);
require('./admin/admin-header/AdminHeaderCtrl.js')(eventsApp);
require('./admin/editSlideshow/editSlideshowCtrl.js')(eventsApp);
require('./admin/editFiles/EditFilesCtrl.js')(eventsApp);
require('./admin/editEvent/EditEventCtrl.js')(eventsApp);
require('./admin/editSpeaker/EditSpeakerController.js')(eventsApp);
//services
require('./meetTheTeam/meetTheTeamRestResource.js')(eventsApp);
require('./futureEvents/futureEventsRESTResource.js')(eventsApp);
require('./futureEvents/bingMapRESTResource.js')(eventsApp);
require('./shared/header/headerRESTResource.js')(eventsApp);
require('./admin/createEvent/createEventRESTResource.js')(eventsApp);
require('./events/eventsRESTResource.js')(eventsApp);
require('./latestNews/latestNewsRESTResource.js')(eventsApp);
require('./admin/createSpeaker/createSpeakerRESTResource.js')(eventsApp);
require('./admin/userLogging/userLoggingRESTResources.js')(eventsApp);
require('./admin/editSlideshow/editSlideshowRESTResource.js')(eventsApp);
require('./admin/editFiles/editFilesRESTResource.js')(eventsApp);
require('./admin/editEvent/editEventRESTResource.js')(eventsApp);
require('./admin/editSpeaker/editSpeakerRESTResource.js')(eventsApp);
require('./admin/adminPageRESTResource.js')(eventsApp);
require('./pastEvents/pastEventsRESTResource.js')(eventsApp);

//filters
require('./admin/editFiles/fileSearch.js')(eventsApp);

eventsApp
.config(['$routeProvider', '$locationProvider', 'AnalyticsProvider', '$httpProvider', function ($routeProvider, $locationProvider, AnalyticsProvider, $httpProvider) {

	//Enable Google Analytics
	AnalyticsProvider
	.setAccount('UA-74698663-1');

	//enable cross origin for jsonp
	$httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  //tell angular to send verification credentials with requests
  $httpProvider.defaults.withCredentials = true;

	//turn on html5Mode so routes don't include # symbol
	if(window.history && window.history.pushState) {
		$locationProvider.html5Mode({
	   	enabled: true,
	   	requireBase: false
	  });
		
	}
	//set up angularjs front-end routes
	$routeProvider
	.when('/', {
		templateUrl: '/app/components/homepage/homepage.html',
		controller: 'HomepageCtrl',
		reloadOnSearch: false,
		data: {
      pageTitle: 'Home Page - Microsoft Plugfests and Events'
    }
	})
	/*These 3 redirect routes take care of 404 errors cause by angular stripping the hash from routes even when they're meant for in page navigation*/
	.when('/eventNavigationMenu', {
		redirectTo: '/'
	})
	.when('/beginningOfContent', {
		redirectTo: '/'
	})
	.when('/footerStartMenuItem', {
		redirectTo: '/'
	})
	.when('/about', {
		templateUrl: '/app/components/about/about.html',
    reloadOnSearch: false,
		data: {
      pageTitle: 'About Us Page - Microsoft Plugfests and Events'
    }
	})
	.when('/contactus', {
		templateUrl: '/app/components/contactUs/contactUs.html',
		reloadOnSearch: false,
		data: {
      pageTitle: 'Contact Us Page - Microsoft Plugfests and Events'
    }

	})
	.when('/faq', {
		templateUrl: '/app/components/faq/faq.html',
		reloadOnSearch: false,
		data: {
      pageTitle: 'Frequently Asked Questions Page - Microsoft Plugfests and Events'
    }
	})
	.when('/past-events', {
		templateUrl: '/app/components/pastEvents/pastEvents.html',
		reloadOnSearch: false,
		controller: 'PastEventsCtrl',
		data: {
      pageTitle: 'Past Events Page - Microsoft Plugfests and Events'
    }
	})
	.when('/meet-the-team', {
		templateUrl: '/app/components/meetTheTeam/meetTheTeam.html',
		reloadOnSearch: false,
		controller: 'MeetTheTeamCtrl',
		data: {
      pageTitle: 'Meet the Team Page - Microsoft Plugfests and Events'
    }
	})
	.when('/future-events', {
		templateUrl: '/app/components/futureEvents/futureEvents.html',
		reloadOnSearch: false,
		controller: 'FutureEventsCtrl',
		data: {
      pageTitle: 'Future Events Page - Microsoft Plugfests and Events'
    }
	})
	.when('/latest-news', {
		templateUrl: '/app/components/latestNews/latestNews.html',
		reloadOnSearch: false,
		controller: 'LatestNewsCtrl',
		data: {
      pageTitle: 'Latest Page - Microsoft Plugfests and Events'
    }
	})
	.when('/admin/slideshow', {
		templateUrl: '/app/components/admin/editSlideshow/editSlideshowTemplate.html',
		reloadOnSearch: false,
		controller: 'editSlideshowCtrl',
		data: {
			pageTitle: 'Edit Slideshow Settings'
		}
	})
	/*.when('/admin', {
		redirectTo: '/admin/edit-event',
		reloadOnSearch: false,
		data: {
      pageTitle: 'Admin Page - Microsoft Plugfests and Events'
    }
	})*/
	.when('/admin/edit-event', {
		templateUrl: '/app/components/admin/editEvent/admin-edit-event.html',
		reloadOnSearch: false,
		controller: 'EditEventCtrl',
		data: {
      pageTitle: 'Admin Page - Microsoft Plugfests and Events'
    }
	})
	.when('/admin/create-event', {
		templateUrl: '/app/components/admin/createEvent/admin-create-event.html',
		reloadOnSearch: false,
		controller: 'AdminCreateEventCtrl',
		data: {
      pageTitle: 'Admin Page - Microsoft Plugfests and Events'
    }
	})
	.when('/admin/create-speaker', {
		templateUrl: '/app/components/admin/createSpeaker/admin-create-speaker.html',
		reloadOnSearch: false,
		data: {
			pageTitle: 'Admin Page - Microsoft Plugfests and Events, create new speaker'
		}
	})
	.when('/admin/edit-speaker', {
		templateUrl: '/app/components/admin/editSpeaker/admin-edit-speakers.html',
		reloadOnSearch: false,
		controller: 'EditSpeakerController',
		data: {
      pageTitle: 'Admin Page - Microsoft Plugfests and Events'
    }
	})
	.when('/admin/edit-files', {
		templateUrl: '/app/components/admin/editFiles/edit-files-template.html',
		reloadOnSearch: false,
		// controller: 'EditFilesCtrl',
		data: {
      pageTitle: 'Admin Page - Microsoft Plugfests and Events'
    }
	})
	.when('/admin/login', {
		templateUrl: '/app/components/admin/userLogging/login.html',
		reloadOnSearch: false,
		// controller: 'AdminCreateEventCtrl',
		data: {
      pageTitle: 'Admin Page - Microsoft Plugfests and Events'
    }
	})
	.when('/:slug', {
    templateUrl: '/app/components/events/event.html',
    controller: 'EventsCtrl',
    reloadOnSearch: false,
    data: {
      pageTitle: 'Interoperability Event Page - Microsoft Plugfests and Events'
    }
  })

}])
.run(['$rootScope', '$location', '$anchorScroll', '$routeParams', '$http', 'Analytics', '$cookies', '$timeout', ($rootScope, $location, $anchorScroll, $routeParams, $http, Analytics, $cookies, $timeout) => {
	//start Google analytics
	Analytics.pageView();

	function followHashRoute() {
		let anchor = $location.hash();
		$timeout(function() {
			if (anchor) {
				// angular.element(`ul.tabs a[href="#${anchor}"]`).triggerHandler('click');
				// tab hashtag identification and auto-focus
				let hashLink = '#' + $location.hash();
				let hashDivs = jQuery(hashLink);
		  	let wantedTag = window.location.hash;
		  	if (wantedTag != "") {
				// This code can and does fail, hard, killing the entire app.
				// Esp. when used with the jQuery.Address project.
						let allTabs = angular.element("ul.tabs a[href^=" + wantedTag + "]").parents('ul.tabs').find('li');
						let defaultTab = allTabs.filter('.current').find('a').attr('href');
						jQuery(defaultTab).hide();
						allTabs.removeClass('current');
						angular.element("ul.tabs a[href^=" + wantedTag + "]").parent().addClass('current');
						angular.element("#" + wantedTag.replace('#','')).show();
						$anchorScroll();
				}
			}
			
		}, 1100);
	}

	//when the route starts with /admin, call the /api/user/checklogin route to check if the user is logged in and redirect them to the login page if they aren't
	if ( /\/admin.*$/.test($location.path()) ) {
		$http.get('/api/user/checklogin')
		.success( (data) => {
      $rootScope.isAuthenticated = true;
		})
		.error( (err) => {
      $rootScope.isAuthenticated = false;
      $cookies.remove('interopAdmin');
			$location.path('/admin/login');
		})
	}
	
	$rootScope.$on('$viewContentLoaded', () => {
		followHashRoute();
			// document.getElementById('screenreader-summary').trigger('focus');
			
			// $anchorScroll(anchor);
		
	});

	$rootScope.$on( '$routeChangeStart', function(event, next, current) { 
		
		followHashRoute();
		//when the route starts with /admin, call the /api/user/checklogin route to check if the user is logged in and redirect them to the login page if they aren't
		if ( /\/admin.*$/.test($location.path()) ) {
			$http.get('/api/user/checklogin')
			.success( (data) => {
        $rootScope.isAuthenticated = true;
			})
			.error( (err) => {
        $rootScope.isAuthenticated = false;
        $cookies.remove('interopAdmin');
				$location.path('/admin/login');
			})
		}
	});

	$rootScope.$on('$routeUpdate', () => {
		followHashRoute();
		
	});

	$rootScope.$on('$routeChangeSuccess', (newRoute, oldRoute) => { 

		// scroll the window to the top when a new page is opened
    $anchorScroll();
    //if the path is the root, 
 		/*if ($location.path() == '/') {
      $rootScope.hideSlider = true;
    };
*/
 	});

}])