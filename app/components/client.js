'use strict';

import * as customFunctions from './shared/methods/common-functions.js';
const jQuery = require('jquery');
// require('angular/angular');
import angular from 'angular';
require('angular-route');
require('angular-aria');
require('angular-touch');
require('angular-carousel');
require('ng-page-title');
require('angular-sanitize');
require('ng-file-upload');
require('angular-resource');
require('angular-base64');
require('angular-animate');
require('angular-ui-bootstrap');
require('angular-ui-tinymce');
require('angular-ui-sortable');
require('angular-bootstrap-confirm');
require('angular-messages');
require(`angular-password`);
require('slick-carousel');
require('angular-slick-carousel');
// import * as adal from './shared/methods/adal.js';
import * as AdalAngular from './shared/methods/adal-angular.js';

const eventsApp = angular.module('eventsApp', ['ngRoute', 'ngAria', 'ngTouch', 'angular-carousel', 'ngPageTitle', 'ngSanitize', 'ngFileUpload', 'ngResource', 'base64', 'ngAnimate', 'ui.bootstrap', 'ui.tinymce', 'ui.sortable', 'mwl.confirm', 'ngMessages', `ngPassword`, 'AdalAngular', 'slickCarousel']);

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
require('./admin/editEvent/sortableTabsDirective.js')(eventsApp);
require('./admin/editEvent/uniqueTabNameDirective.js')(eventsApp);

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
require('./admin/account/AccountController.js')(eventsApp);
require('./eventSurvey/surveyController.js')(eventsApp);
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
require('./admin/account/accountRESTResource')(eventsApp);
require('./eventSurvey/surveyRESTResource.js')(eventsApp);

//filters
require('./admin/editFiles/fileSearch.js')(eventsApp);

eventsApp
    .config(['$routeProvider', '$locationProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function($routeProvider, $locationProvider, $httpProvider, adalProvider) {

        //enable cross origin for jsonp
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        //tell angular to send verification credentials with requests
        $httpProvider.defaults.withCredentials = true;

        //turn on html5Mode so routes don't include # symbol
        if (window.history && window.history.pushState) {
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
                requireADLogin: false,
                data: {
                    pageTitle: 'Home Page - Interop Dev Events'
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
                requireADLogin: false,
                data: {
                    pageTitle: 'About Us Page - Interop Dev Events'
                }
            })
            // .when('/contactus', {
            // 	templateUrl: '/app/components/contactUs/contactUs.html',
            // 	reloadOnSearch: false,
            // 	requireADLogin: false,
            // 	data: {
            //   pageTitle: 'Contact Us Page - Microsoft Plugfests and Events'
            // }

        // })
        .when('/faq', {
                templateUrl: '/app/components/faq/faq.html',
                reloadOnSearch: false,
                requireADLogin: false,
                data: {
                    pageTitle: 'Frequently Asked Questions Page - Interop Dev Events'
                }
            })
            .when('/support', {
                templateUrl: '/app/components/support/support.html',
                reloadOnSearch: false,
                requireADLogin: false,
                data: {
                    pageTitle: 'Support Page - Interop Dev Events'
                }
            })
            // .when('/past-events', {
            // 	templateUrl: '/app/components/pastEvents/pastEvents.html',
            // 	reloadOnSearch: false,
            // 	controller: 'PastEventsCtrl',
            // 	requireADLogin: false,
            // 	data: {
            //   pageTitle: 'Past Events Page - Microsoft Plugfests and Events'
            // }
            // })
            .when('/meet-the-team', {
                templateUrl: '/app/components/meetTheTeam/meetTheTeam.html',
                reloadOnSearch: false,
                controller: 'MeetTheTeamCtrl',
                requireADLogin: false,
                data: {
                    pageTitle: 'Meet the Team Page - Interop Dev Events'
                }
            })
            .when('/events', {
                templateUrl: '/app/components/futureEvents/futureEvents.html',
                reloadOnSearch: false,
                controller: 'FutureEventsCtrl',
                requireADLogin: false,
                data: {
                    pageTitle: 'Upcoming and Past Events Page - Interop Dev Events'
                }
            })
            .when('/latest-news', {
                templateUrl: '/app/components/latestNews/latestNews.html',
                reloadOnSearch: false,
                controller: 'LatestNewsCtrl',
                requireADLogin: false,
                data: {
                    pageTitle: 'Latest News Page - Interop Dev Events'
                }
            })
            // .when('/survey', {
            // 	templateUrl: '/app/components/eventSurvey/parisSurvey.html',
            // 	reloadOnSearch: false,
            // 	// controller: 'surveyController',
            // 	data: {
            // 		pageTitle: 'Redmond Protocol Plugfest 2017 Event Suvey - Microsoft Plugfests and Events'
            // 	}
            // })
            .when('/admin/slideshow', {
                templateUrl: '/app/components/admin/editSlideshow/editSlideshowTemplate.html',
                reloadOnSearch: false,
                controller: 'editSlideshowCtrl',
                requireADLogin: true,
                data: {
                    pageTitle: 'Edit Slideshow Settings'
                }
            })
            .when('/admin/edit-event', {
                templateUrl: '/app/components/admin/editEvent/admin-edit-event.html',
                reloadOnSearch: false,
                controller: 'EditEventCtrl',
                requireADLogin: true,
                data: {
                    pageTitle: 'Admin Page - Microsoft Plugfests and Events'
                }
            })
            .when('/admin/create-event', {
                templateUrl: '/app/components/admin/createEvent/admin-create-event.html',
                reloadOnSearch: false,
                controller: 'AdminCreateEventCtrl',
                requireADLogin: true,
                data: {
                    pageTitle: 'Admin Page - Microsoft Plugfests and Events'
                }
            })
            .when('/admin/create-speaker', {
                templateUrl: '/app/components/admin/createSpeaker/admin-create-speaker.html',
                reloadOnSearch: false,
                requireADLogin: true,
                data: {
                    pageTitle: 'Admin Page - Microsoft Plugfests and Events, create new speaker'
                }
            })
            .when('/admin/edit-speaker', {
                templateUrl: '/app/components/admin/editSpeaker/admin-edit-speakers.html',
                reloadOnSearch: false,
                requireADLogin: true,
                controller: 'EditSpeakerController',
                data: {
                    pageTitle: 'Admin Page - Microsoft Plugfests and Events'
                }
            })
            .when('/admin/edit-files', {
                templateUrl: '/app/components/admin/editFiles/edit-files-template.html',
                reloadOnSearch: false,
                requireADLogin: true,
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
            .when(`/admin/account`, {
                templateUrl: `/app/components/admin/account/account.html`,
                reloadOnSearch: false,
                controller: `AccountController`,
                requireADLogin: true,
                data: {
                    pageTitle: `Admin Page - Manage Account`
                }
            })
            .when(`/admin/help`, {
                templateUrl: `/app/components/admin/help/help.html`,
                reloadOnSearch: false,
                requireADLogin: true,
                data: {
                    pageTitle: `Admin Page - help section`
                }
            })
            .when(`/admin/redirect`, {
                redirectTo: `/admin/edit-event`,
                requireADLogin: true
            })
            .when('/:slug', {
                templateUrl: '/app/components/events/event.html',
                controller: 'EventsCtrl',
                reloadOnSearch: false,
                data: {
                    pageTitle: 'Interoperability Event Page - Microsoft Plugfests and Events'
                }
            })
            .otherwise({ redirectTo: '/' })

        var endpoints = {
            "https://localhost:3000": "https://localhost:3000/api/getTeam",
            "https://localhost:3000": "https://localhost:3000/api/getSlideshow"
        };

        adalProvider.init({
            instance: 'https://login.microsoftonline.com/',
            tenant: 'interopevents.onmicrosoft.com',
            clientId: '4fd1444e-c61a-4859-ad90-d8f7cb3b12c9',
            // redirectUri: 'http://localhost:3000/admin/edit-event',
              redirectUri: 'http://interopevents-development.azurewebsites.net/admin/edit-event',
            //   redirectUri: 'http://interopevents-staging.azurewebsites.net/admin/edit-event',
            //   redirectUri: 'https://interopevents.com/admin/edit-event',
            // postLogoutRedirectUri: 'http://localhost:3000/admin/login',
              postLogoutRedirectUri: 'http://interopevents-development.azurewebsites.net/admin/login',
            //   postLogoutRedirectUri: 'http://interopevents-staging.azurewebsites.net/admin/login',
            //   postLogoutRedirectUri: 'https://interopevents.com/admin/login',

            //cacheLocation: 'localStorage',
            anonymousEndpoints: [
                '/'
            ]
        }, $httpProvider)



    }])