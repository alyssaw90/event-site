// Creates placeholder data and placeholder databases

'use strict';

const models = require('./index');
const User = models.User;
const Speaker = models.Speaker;
const Event = models.Event;
const EventTab = models.EventTab;
const Slideshow = models.Slideshow;
const Slide = models.Slide;
const MsUser = models.MsUser;
const clc = require('cli-color');

module.exports = function() {

    /////////////////////////////Sync Schemas////////////////////////////////////////////////
    Slideshow.sync({
            force: false
        })
        .then(function() {
            return Slide.sync({
                force: false
            });
        })
        .then(function() {
            return Event.sync({
                force: false
            });
        })
        .then(function() {
            return EventTab.sync({
                force: false
            });
        })
        .then(function() {
            return Speaker.sync({
                force: false
            });
        })
        .then(function() {
            return User.sync({
                force: false
            });
        })
        .then(() => {
            return MsUser.sync({
                force: true
            });
        })

    ////////////////////////////////////Slidshow and Slides//////////////////////////////////////////////

    .then(function() {
            return Slideshow.create({
                slideshowName: 'homepageSlideshow'
            });
        })
        .then(function() {
            return Slide.create({
                imgSrcUrl: 'Beijing-Header-8.26.jpg',
                imgDestUrl: 'beijing2016cn',
                title: 'DevDays Asia 2016 @ Beijing banner',
                altText: 'Banner image for DevDays Asia 2016 @ Beijing'
            });
        })
        .then(function() {
            return Slide.create({
                imgSrcUrl: 'RDP-Banner.jpg',
                imgDestUrl: 'redmondrdp2016',
                title: 'Remote Desktop Protocol (RDP) IO lab banner',
                altText: 'Banner image for Remote Desktop Protocol (RDP) IO lab'
            });
        })
        .then(function() {
            return Slide.create({
                imgSrcUrl: 'past-events-banner.jpg',
                imgDestUrl: 'past-events',
                title: 'Past Events Page Banner',
                altText: 'Banner image for Past Events Page'
            });
        })

    ////////////////////////////////////Admin User placeholder/////////////////////////////////////
    .then(() => {
            return User.create({
                userName: `root`,
                password: process.env.ROOT_PASSWORD,
                email: process.env.ROOT_EMAIL,
                isAdmin: true
            });
        })
        /////////////////////////MS Account Users/////////////////////////////////////////////////
        .then(() => {
            return MsUser.create({
                email: `v-mibowe@microsoft.com`,
                isAdmin: true
            });
        })
        .then(() => {
            return MsUser.create({
                email: `v-bachau@microsoft.com`,
                isAdmin: true
            });
        })
        ////////////////////////////////////Event placeholder/////////////////////////////////////

    .then(function() {
            return Event.create({
                eventName: 'DevDays Asia 2016 @Taipei',
                eventUrl: 'taipei2016',
                eventStartDate: new Date('2016-04-19:08:00:00'),
                eventEndDate: new Date('2016-04-21:23:00:00'),
                eventLocation: 'Taipei, Taiwan',
                eventContinent: 'Asia',
                eventHeaderImage: 'TAIPEIHeader.png',
                eventTechnicalTopics: 'Office Developer Opportunity, Office Add-ins and APIs, Machine Learning, Big Data Analytics, Open Specifications, Hackathon',
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventName: 'Extend Conference',
                // eventRegistrationLink: , //link to registrationfor event
                eventUrl: 'paris2016',
                eventLocation: 'Paris, France',
                eventContinent: 'Europe',
                eventStartDate: new Date('2016-05-12:00:00:01'), //the start date...
                eventEndDate: new Date('2016-05-12:23:59:00'), // the end date...
                eventHeaderImage: 'Extend-banniereV2-(002).gif', //link to header image
                eventTechnicalTopics: 'Office Developer Opportunity, Office Add-ins and APIs, Machine Learning, Big Data Analytics, Open Specifications',
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventName: 'Redmond Protocols Plugfest & Windows Interoperability (IO) Lab',
                // eventRegistrationLink: Sql.STRING, //link to registrationfor event
                eventUrl: 'redmond2016',
                eventLocation: 'Redmond, WA',
                eventContinent: 'North America',
                eventStartDate: new Date('2016-06-13:00:01:00'), //the start date...
                eventEndDate: new Date('2016-06-24:23:00:00'), // the end date...
                eventHeaderImage: 'Plugfest-and-IO-Lab-5.jpg', //link to header image
                eventTechnicalTopics: 'Microsoft Windows Protocol, Interoperability within Microsoft Office, Exchange, SharePoint, Windows and SQL Server. Office, SharePoint, & Exchange Protocol Testing',
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                /*eventName: 'India Event',
                // eventRegistrationLink: Sql.STRING, //link to registrationfor event
                eventLocation: 'India',
                eventContinent: 'Asia',
                eventStartDate: '2016', //the start date...
                eventEndDate: '2016', // the end date...
                eventHeaderImage: 'India-2016.jpg', //link to header image
                eventHighlightColor: '#00188f',
                // eventSpeakers: null*/
            });
        })
        .then(function() {
            return Event.create({
                eventName: 'Shanghai Interop Dev Days 2015',
                eventUrl: 'shanghai2015',
                eventLocation: 'Shanghai, China',
                eventContinent: 'Asia',
                eventStartDate: new Date('2015-10-20:00:01:00'),
                eventEndDate: new Date('2015-10-21:23:00:00'),
                eventHeaderImage: 'shanghai-header.jpg',
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventName: 'Paris 2017',
                eventUrl: 'paris2017',
                eventLocation: 'Paris, France',
                eventContinent: 'Europe',
                eventStartDate: '2017',
                eventEndDate: '2017',
                eventHeaderImage: 'paris-2017-banner.jpg',
                isPublished: true,
                showOnHeader: true
            });
        })
        .then(function() {
            return Event.create({
                eventName: 'DevDays Asia 2017 @ Taipei',
                eventUrl: 'taipei2017',
                eventLocation: 'Taipei, Taiwn',
                eventContinent: 'Asia',
                eventStartDate: '2017',
                eventEndDate: '2017',
                eventHeaderImage: 'taipei-2017-banner.jpg',
                isPublished: true,
                showOnHeader: true
            });
        })
        .then(function() {
            return Event.create({
                eventName: 'Redmond Protocol Plugfest 2017',
                eventUrl: 'redmond2017',
                eventLocation: 'Redmond, WA',
                eventContinent: 'North America',
                eventStartDate: '2017',
                eventEndDate: '2017',
                eventHeaderImage: 'redmond-2017-banner.jpg',
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventName: 'SNIA SMB3 Plugfest',
                eventUrl: 'santa_clara2016',
                eventLocation: 'Santa Clara, CA',
                eventContinent: 'North America',
                eventStartDate: new Date('September 19, 2016'),
                eventEndDate: new Date('September 22, 2016'),
                eventHeaderImage: 'header_sdc_2016.jpg',
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventLocation: 'Göttingen',
                eventUrl: 'gottingen2015',
                eventEndDate: new Date('May 22, 2015'),
                eventStartDate: new Date('May 22, 2015'),
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventLocation: 'Zaragoza, Spain',
                eventUrl: 'zaragoza2015',
                eventEndDate: new Date('May 14, 2015'),
                eventStartDate: new Date('May 14, 2015'),
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventLocation: 'Beijing',
                eventUrl: 'beijing2015',
                eventEndDate: new Date('March 17, 2015'),
                eventStartDate: new Date('March 17, 2015'),
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventLocation: 'Santa Clara',
                eventUrl: 'santa_clara2015',
                eventEndDate: new Date('March 17, 2015'),
                eventStartDate: new Date('March 17, 2015'),
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventLocation: 'Las Vegas',
                eventUrl: 'lasvegas2015',
                eventEndDate: new Date('March 17, 2015'),
                eventStartDate: new Date('March 17, 2015'),
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventLocation: 'Cambridge, MA',
                eventUrl: 'cambridge2015',
                eventEndDate: new Date('March 17, 2015'),
                eventStartDate: new Date('March 17, 2015'),
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventLocation: 'London',
                eventUrl: 'london2015',
                eventEndDate: new Date('March 17, 2015'),
                eventStartDate: new Date('March 17, 2015'),
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventLocation: 'Tokyo',
                eventUrl: 'tokyo2015',
                eventEndDate: new Date('March 17, 2015'),
                eventStartDate: new Date('March 17, 2015'),
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventLocation: 'Munich',
                eventUrl: 'munich2015',
                eventEndDate: new Date('March 17, 2015'),
                eventStartDate: new Date('March 17, 2015'),
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventLocation: 'Seoul',
                eventUrl: 'seoul2015',
                eventEndDate: new Date('March 17, 2015'),
                eventStartDate: new Date('March 17, 2015'),
                isPublished: true
            });
        })
        .then(function() {
            return Event.create({
                eventName: 'DevDays Asia 2016 @ Beijing ',
                eventLocation: 'Beijing, China',
                eventUrl: 'beijing2016',
                eventContinent: 'Asia',
                eventStartDate: new Date('October 21, 2016'),
                eventEndDate: new Date('October 23, 2016'),
                eventHeaderImage: 'Beijing-Header-8.26.jpg',
                isPublished: true,
                showOnHeader: false,
                eventTechnicalTopics: 'Microsoft Graph, Office Add-ins, Open Specifications, Windows Protocols, OData'
            });
        })
        .then(function() {
            return Event.create({
                eventName: 'Remote Desktop Protocol (RDP) IO lab',
                eventUrl: 'redmondrdp2016',
                eventLocation: 'Redmond, WA',
                eventContinent: 'North America',
                eventStartDate: new Date('November 1, 2016'),
                eventEndDate: new Date('November 3, 2016'),
                eventHeaderImage: 'RDP-Banner.jpg',
                eventVenueName: 'Microsoft Building 25',
                eventVenueAddress: '15700 NE 39th St, Redmond, WA 98052',
                eventVenueImg: 'B25_web.jpg',
                eventAboutTabText: `<h2>Remote Desktop Protocol (RDP) IO lab</h2>
				<p>The purpose of the event is to provide an opportunity for you to use the RDP test suites with assistance from the test suite developers and support engineers, as well as an opportunity to hear from and interact with the Remote Desktop engineering team. The focus will be on testing, with limited presentations provided.</p>
				<br>
				<ul class="noStyleUl">
					<li><b>When:</b> November 1-3, 2016</li>
					<li><b>Where:</b> Building 25, Microsoft headquarters in Redmond, Washington </li>
					<li><b>Who:</b> RDP implementers</li>
					<li><b>Cost:</b> Free</li>
				</ul>
				<p>If you are interested in participating or have additional questions, please contact <a href="mailto:prana@microsoft.com?subject=RDP%20IO%20Lab">Prakash Narayanan</a> </p>`,
                isPublished: true,
                showOnHeader: true
            });
        })
        .then(function() {
            return Event.create({
                eventName: 'DevDays Asia 2016 @ Beijing ',
                eventLocation: 'Beijing, China',
                eventUrl: 'beijing2016cn',
                eventContinent: 'Asia',
                eventStartDate: new Date('October 21, 2016'),
                eventEndDate: new Date('October 23, 2016'),
                eventHeaderImage: 'Beijing-Header-8.26.jpg',
                isPublished: true,
                showOnHeader: true,
                eventTechnicalTopics: 'Microsoft Graph, Office Add-ins, Open Specifications, Windows Protocols, OData',
                eventLanguage: 'cn'
            });
        })

    ////////////////////////////////////EventTab placeholder/////////////////////////////////////

    .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 1,
                tabTitle: 'About',
                tabContent: '<h3>DevDays Asia 2016 @ Taipei</h3><h4>April 19th - 21st, TAF Innovation Base</h4><p>Microsoft established the Internet of Things (IoT) Industry Development Center in October of 2015 to integrate global and local partners from the ecosystem, accelerating the process of developing IoT solutions for the manufacturing, financial, health care, transportation, and retailing industries. </p><p>DevDays Asia 2016 @ Taipei, directed by Industrial Development Bureau, and hosted by Microsoft and Digital Content Industry Promotion Office, will be held in April to help developers catch up with new concepts and technologies. </p><p>In the three-day program, Microsoft developers from the US will deliver lectures, host workshops, and interact with participants to generate amazing ideas and solutions. </p><p>On the first day, keynote speeches on new concepts and technologies for enhancing productivity, cloud computing, and data analysis platform will be delivered by the Microsoft developers. The speakers will focus on the technologies for boosting productivity, cloud and data platform. </p><p>In the morning session of the second day, the Microsoft developers will provide code samples and share their tips and guidelines about application development. A HAOckathon ( Hackathon + A for Analytical + O for Open ) that focuses on improving social good will be held in the afternoon of the second day. Contestants will get the chance to use the latest technologies to promote social welfare with the Microsoft developers. </p><p>For the remaining day and a half, the Microsoft developers will help contestants implement their ideas and generate improved solutions. Aligning with the theme of promoting social welfare, contestants can choose a wide letiety of topics, such as Hack for Enhancing Productivity, Hack for the Environment and Marine Eco-system, Hack for the Good, Hack for Government Open Data, Hack for University Education, etc. By better using technologies, it is possible to bring good deeds to a whole new level. Generous prizes will be awarded for the contestants of Hackathon, including a Surface Pro 4, a one-year subscription to Visual Studio Enterprise with MSDN, and a one-year subscription to Office 365. </p><p>Don’t hesitate to reserve your seats for DevDays Asia 2016 in Taipei!<h5>Information</h5><ul><li>Date: 19th-21st April (Tue - Thu)</li><li>Event Plan:<ul type="square"><li>Day 1 Morning: Keynote</li><li>Day 1 Afternoon + Day 2 Morning: Tracks + Workshops</li><li>Day 2 Afternoon + Day 3: HAOckathon (Hackathon)</li></ul></li><li>Contact：02-25622880 # 3671 Mr.Dai</li><li><a href="https://www.microsoft.com/taiwan/events/devdays/">DevDay Asia 2016 @Taipei 亞太開發人員技術年會 - 生產力暨物聯網應用開發元年</a></li></ul><br /><br />'
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 2,
                tabTitle: 'Agenda',
                tabContent: '<table class="tableWithVerticalLines eventScheduleTable" style="width: 25%"><thead><tr class=""><th>Presentation</th></tr></thead><tbody><tr><td class="lightGreenBackground">Data Platform</td></tr><tr><td class="lightBlueBackground">Productivity</td></tr><tr><td class="lightOrangeBackground">Open Specifications </td></tr><tr><td class="lightPinkBackground">Lightning Talk</td></tr><tr><td class="lightYellowBackground">Hackathon</td></tr><tr><td class="lightGrayBackground">Breaks & Lunch</td></tr></tbody></table><h2>Day One, April 19</h2><table class="tableWithVerticalLines eventScheduleTable scheduleTable"><thead><tr><th class="lightGreenBackground">Time</th><th class="lightGreenBackground">Room A<br />Data Platform</th><th class="lightBlueBackground">Time</th><th class="lightBlueBackground">Room B<br />Productivity</th><th class="medOrangeBackground">Time</th><th class="medOrangeBackground">Room C<br />Open Specifications </th></tr></thead><tbody><tr><td>9:00-9:40</td><td>Welcome</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>9:45-10:30</td><td>Office 開發者的趨勢與商機<br />Office Developer Opportunity</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>10:30-10:45</td><td class="lightGrayBackground">中場休息 Break</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td></tr><tr><td>10:45-11:15</td><td>Keynote: Data Development Opportunity Part I</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>11:15-11:40</td><td>Keynote: Data Development Opportunity Part II </td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>11:40-12:00</td><td class="lightYellowBackground">HAOckathon 好客松介紹 <br />HAOckathon Overview & Kickoff</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>12:00-13:15</td><td class="lightGrayBackground">中午用餐 Lunch and Press</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td></tr><tr><td class="withoutBottomBorder bottomAlignTd">13:15-15:00</td><td class="lightGreenBackground withoutBottomBorder bottomAlignTd">Big Data Ingestion and Storage </td><td>13:15-14:00</td><td class="lightBlueBackground">dev.office.com 資源介紹與開發平台<br />Dev.Office.com: Office Developer Resources</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>&nbsp;</td><td class="lightGreenBackground">&nbsp;</td><td>14:00-15:00</td><td class="lightBlueBackground">Office 365 APIs: Office Graph</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>15:00-15:15</td><td class="lightGrayBackground">中場休息 Break</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td></tr><tr><td>15:15-16:15</td><td class="lightGreenBackground">Machine Learning and Advanced Analytics </td><td>15:15-16:00</td><td class="lightBlueBackground">Mail, Calendar, and Contacts REST Demonstration</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td class="withoutBottomBorder bottomAlignTd">16:15-17:15</td><td class="lightGreenBackground withoutBottomBorder bottomAlignTd">R and Python</td><td>16:00-16:45</td><td class="lightBlueBackground">Office Add-Ins 開發介紹<br />Office Add-ins intro and development</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>&nbsp;</td><td class="lightGreenBackground">&nbsp;</td><td>16:45-17:15</td><td class="lightBlueBackground">Case Studies: How other companies utilize Office</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>17:15-21:00</td><td class="lightYellowBackground">HAOckathon 好客松團隊創意發想<br />HAOckathon Team Building and Brainstorm</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr></tbody></table><br /><br /><br /><br /><h2>Day Two, April 20</h2><table class="tableWithVerticalLines eventScheduleTable scheduleTable"><thead><tr><th class="lightGreenBackground">Time</th><th class="lightGreenBackground">Room A<br />Data Platform</th><th class="lightBlueBackground">Time</th><th class="lightBlueBackground">Room B<br />Productivity</th><th class="medOrangeBackground">Time</th><th class="medOrangeBackground">Room C<br />Open Specifications </th></tr></thead><tbody><tr><td>9:00-9:30</td><td class="lightYellowBackground">HAOckathon 好客松團隊創意發想<br />Team Building and Brainstorm</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td>9:00-9:20</td><td class="lightOrangeBackground">開發人員必備: Open Specification 和工具介紹<br />Intro to Open Specifications and Tools</td></tr><tr><td class="withoutBottomBorder bottomAlignTd">9:30-10:30</td><td class="lightGreenBackground withoutBottomBorder bottomAlignTd">Power BI with Big Data Stores</td><td>9:30-10:00</td><td class="lightBlueBackground">O365 Developer Program sign-up & Training</td><td>9:20-9:50</td><td class="lightOrangeBackground">SQL Protocol Overview</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightGreenBackground">&nbsp;</td><td>10:00-10:30</td><td class="lightBlueBackground">Accessing APIs through add-ins </td><td>9:50-10:30</td><td class="lightOrangeBackground">OData 服務介紹與應用實戰<br />OData Overviews and Demos</td></tr><tr><td>10:30-10:45</td><td class="lightGrayBackground">中場休息 Break</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightGreenBackground withoutBottomBorder">&nbsp;<td>10:45-11:15</td><td class="lightBlueBackground">API Explorer</td><td class="withoutBottomBorder">10:45-11:30</td><td class="lightOrangeBackground withoutBottomBorder">Exchange Protocols: ActiveSync, Exchange Web Services, MAPI</td></tr><tr><td class="withoutBottomBorder">10:45-11:45</td><td class="lightGreenBackground withoutBottomBorder">Creating an Azure ML Experiment</td><td class="withoutBottomBorder">11:15-11:45</td><td class="lightBlueBackground withoutBottomBorder">Office UI Fabric </td><td class="withoutBottomBorder">&nbsp;</td><td class="lightOrangeBackground">&nbsp;</td></tr><tr><td>&nbsp;</td><td class="lightGreenBackground">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="lightBlueBackground">&nbsp;</td><td class="withoutBottomBorder">11:30-12:00</td><td class="lightOrangeBackground withoutBottomBorder">SharePoint Protocols </td></tr><tr><td>11:45-12:00</td><td class="lightYellowBackground">HAOckathon Getting Started</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="lightOrangeBackground">&nbsp;</td></tr><tr><td>12:00-13:00</td><td class="lightGrayBackground">中午用餐 Lunch</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td></tr><tr><td class="withoutBottomBorder">13:00-17:00</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td>13:00-13:30</td><td class="lightOrangeBackground">Parsing Office Traffic: Message Analyzer & Fiddler</td></tr><tr><td class="withoutBottomBorder">13:30</td><td class="lightYellowBackground withoutBottomBorder bottomAlignTd"><strong>Team Sign-up Deadline 1:30pm</strong></td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td>13:30-13:45</td><td class="lightOrangeBackground">透過 WOPI (Web 應用程式開放平台介面) 實踐 Office Web Apps 整合應用<br />Office Online (MS-WOPI)</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>13:45-14:00</td><td class="lightPinkBackground">Source Control (Managing your project) - Lightning Talk</td><td>13:45-14:15</td><td class="lightOrangeBackground">Office Co-Authoring (MS-FSSHTTP)</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td>14:15-14:30</td><td class="lightOrangeBackground">Office File Formats </td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>14:30-14:45</td><td class="lightPinkBackground">Existing Open Source Projects - Lightning Talk</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>15:30-15:45</td><td class="lightPinkBackground">Auth with Office - Lightning Talk</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>&nbsp;</td><td class="lightYellowBackground">&nbsp;</td><td>16:30-16:45</td><td class="lightPinkBackground">IOT - Lightning Talk</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>17:00-18:00</td><td class="lightGrayBackground">晚餐時間 Dinner</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td></tr><tr><td>18:00-20:00</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>18:00-18:15</td><td class="lightPinkBackground">Machine Learning Gallery  - Lightning Talk</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground">&nbsp;</td><td>19:15-19:30</td><td class="lightPinkBackground">Power BI  - Lightning Talk</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>20:00</td><td class="lightGrayBackground">Evening snacks served</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td><td class="lightGrayBackground">&nbsp;</td></tr><tr><td>20:30-0:00</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>20:30-20:45</td><td class="lightPinkBackground">Azure Data Factory  - Lightning Talk</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>21:30-21:45</td><td class="lightPinkBackground">Azure Data Lake - Lightning Talk</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>22:30-22:45</td><td class="lightPinkBackground">Project Deployment and Publish - Lightning Talk</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td class="withoutBottomBorder">&nbsp;</td><td class="lightYellowBackground withoutBottomBorder">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr></tbody></table><br /><br /><br /><br /><h2>Day Three, April 21</h2><table class="tableWithVerticalLines eventScheduleTable scheduleTable"><thead><tr><th class="lightGreenBackground">Time</th><th class="lightGreenBackground">Room A<br />Data Platform</th><th class="lightBlueBackground">Time</th><th class="lightBlueBackground">Room B<br />Productivity</th><th class="medOrangeBackground">Time</th><th class="medOrangeBackground">Room C<br />Open Specifications </th></tr></thead><tbody><tr><td>9:00-12:00</td><td class="lightYellowBackground">Hackathon Continues</td><td>9:00-9:15</td><td class="lightPinkBackground">Delivering your pitch - Lightning Talk</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>12:00</td><td class="lightYellowBackground">提交好客松開發成果<br />HAOckathon projects submitted by 12:00</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>12:00-14:00</td><td class="lightGrayBackground">中午用餐 & 初審評選<br />Lunch and Preliminary Evaluation</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>13:30-14:40</td><td class="lightYellowBackground">總決賽 (入圍代表簡報 5 分鐘 + QA 2 分鐘)<br />Final Presentation</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>14:40-15:00</td><td class="lightYellowBackground">評審決選討論<br />Judge Final Comment and Discussion</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr><tr><td>15:00-15:30</td><td class="lightYellowBackground">致詞 & 頒獎<br />Awards Ceremony and Closing Remarks</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td><td class="withoutBottomBorder">&nbsp;</td></tr></tbody></table><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />'
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 3,
                tabTitle: 'Venue',
                tabContent: '<h4>Venue: TAF<h4><h5>(No.177, Sec. 1, Jianguo S. Rd., Da’an Dist., Taipei City 106, Taiwan (R.O.C.))</h5><img src="../uploads/taipei-dev-days-2016-map.png" />'
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 4,
                tabTitle: 'HAOckathon',
                tabContent: '<h2>HAOckathon ( Hackathon + A for Analytical + O for Open )</h2><ul class="tabs left"><li class="current"><a target="_self" href="#taipei2016IntroTab"><span style="font-size: 1.5em">Introduction</span></a></li><li><a target="_self" href="#taipei2016TopicsTab"><span style="font-size: 1.5em">Topics</span></a></li><li><a target="_self" href="#taipei2016RegistrationNotes"><span style="font-size: 1.5em">Notes on registration</span></a></li><li><a target="_self" href="#taipei2016Awards"><span style="font-size: 1.5em">Awards</span></a></li><li><a target="_self" href="#taipei2016Regulation"><span style="font-size: 1.5em">Regulation</span></a></li><li><a target="_self" href="#taipei2016Reference"><span style="font-size: 1.5em">Reference</span></a></li></ul><div id="taipei2016IntroTab" class="tab-content" style="display:block;"><h3>Introduction</h3><p>This will be a golden opportunity for contestants of the Hackathon. During the remaining day and a half, Microsoft Experienced Developers from the US will help contestants implement their ideas and hopefully generate improved solutions. Aligning with the theme of promoting social welfare, contestants can choose a wide letiety of topics, such as Hack for Enhancing Productivity, Hack for the Environment and Marine Eco-system, Hack for the Good, Hack for Government Open Data, Hack for University Education, etc. By better utilizing technologies, it is possible to bring good deeds to a whole new level. Generous prizes will be awarded for the contestants of the Hackathon, including a Surface Pro 4, a one-year subscription to Visual Studio Enterprise with MSDN, a one-year subscription to Azure Pass and Office 365.</p><ul><li>Time: From afternoon of April 20<sup>th</sup> to the morning of April 21<sup>st</sup></li><li>Group: <span style="color:#0070c0">Productivity APP</span> and <span style="color:#0070c0">Cloud & Data Platform APP</span>. Each team is to be composed of 4 members; a total of 80 teams is expected.<li>Ranking and its criteria: See table below for ranking and its criteria. There will be 5 teams from each group ranked for the finals. Each of them will exhibit their outcomes and make a 5 minute presentation to the review panel. Each group will generate 3 winning teams, respectively. See below for the awards for individual teams at different places.<ul style="list-style-type:none;"><li><table class="striped tight" style="width:50%" cellspacing="0" cellpadding="0"><thead><tr><th>Ranking Criteria</th><th>Weight</th></tr></thead><tr><td>Impact</td><td>50%</td></tr><tr><td>Concept</td><td>15%</td><tr><td>Execution</td><td>20%</td></tr><tr><td>Feasibility</td><td>15%</td></tr></table></ul></li></ul></div><div id="taipei2016TopicsTab" class="tab-content" style="display:none;"><h3>Topics</h3><ul><li>Theme:  Generate a better solution to enhance social welfare</li><li>App Groups: Productivity APP or Cloud and Data Platform APP</li><li>Topics:<ul type="square"><li>Hack for Enhancing Productivity</li><li>Hack for the Environment and Marine Eco-system</li><li>Hack for the Good</li><li>Hack for Government Open Data</li><li>Hack for University Education</li></ul></ul></div><div id="taipei2016RegistrationNotes" class="tab-content" style="display:none;"><h3>Notes on registration</h3><ul type="square"><li>You are welcome to this race if you are interested in the latest technology and able to form a development team of 4 members. At least one in your team must be equipped with development skills in Office 365 Add-ons or Azure Data Platform (e.g. SQL, ML and Cortana Analytics Suite).</li><li>Please register online with <strong>DevDays Asia 2016 @ Taipei</strong> as an individual contestant and form a team in advance or by recruiting team members on the scene. Register your team at the <strong>DevDays Asia 2016 @ Taipei</strong> Info Desk by filling in the required HAOckathon registration form by April 19th. You need to have a team leader to be your contest affairs liaison. You may change which group you want to race with before the HAOckathon gets started officially on the 20th of April.</li><li>Works for the contest may be shaped and planned for development beforehand, but no code, product, or work available in the market nor the submissions that won or was submitted to any other race will be allowed, except Imagine Cup, AIT Fish Hackathon, BizSpark.</li><li>You may take a rest by napping on the table or in your own sleeping bag at the refreshment zone during the development session of the contest. </li><li>There will be development experts from America who will work with you. You are more than welcome to discuss and review your experiences with them.</li><li>Organizers reserve the right to review your qualifications.</li></ul></div><div id="taipei2016Awards" class="tab-content" style="display:none;"><h3><h3>Awards</h3>  <table class="striped" cellspacing="0" cellpadding="0"><thead><tr><th>&nbsp;</th><th>Productivity APP</th><th>Cloud & Data Platform APP</th></tr></thead><tbody><tr><th><strong>1st place</strong><p>Two teams, one for each group</p></th><td><ul><li>Surface Pro 4 (worth TWD 72,888, one for each team member)</li><li>Visual Studio Enterprise with MSDN one-year subscription (worth TWD 250,000, one for each team member)</li><li>Office 365 Home one-year subscription (worth TWD 3,190, one for each team member)</li></ul></td><td><ul><li>  Surface Pro 4 (worth TWD 72,888, one for each team member)</li><li>Visual Studio Enterprise with MSDN one-year subscription (worth TWD 250,000, one for each team member)</li><li>Office 365 Home one-year subscription (worth TWD 3,190, one for each team member)</li></ul></td></tr><tr><th><strong>2nd place</strong><p>Two teams, one for each group</p></th><td><ul><li>Hardware equipment, worth about TWD 30K (one for each team member)</li><li>Office 365 Home one-year subscription (worth TWD 3,190, one for each team member)</li></ul></td><td><ul><li>Hardware equipment, worth about TWD 30K (one for each team member)</li><li>Office 365 Home one-year subscription (worth TWD 3,190, one for each team member)</li></ul></td></tr><tr><th><strong>3rd place</strong><p>Two teams, one for each group</p></th><td><ul><li>Hardware equipment, worth about TWD 10K (one for each team member)</li><li>Office 365 Home one-year subscription (worth TWD 3,190, one for each team member)</li></ul></td><td><ul><li>Hardware equipment, worth about TWD 10K (one for each team member)</li><li>Office 365 Home one-year subscription (worth TWD 3,190, one for each team member)</li></ul></td></tr></tbody></table><p>* The organizer shall reserve the rights to change awards without any advance notice</p></h3></div><div id="taipei2016Regulation" class="tab-content" style="display:none;"><ol><li>Contestants are required to go through the entire race to get the participation award provided by the sponsor. </li><li>Award winner is responsible for any tax subject to the relevant tax laws. The race organizer shall be in no case held liable to any tax levied due to the award. The award winner consents that the race organizer’s withholding or pay the relevant taxes (if any). For more information on tax regulations, please visit the eTax Portal at <a href="http://www.etax.nat.gov.tw">http://www.etax.nat.gov.tw</a>.</li><li>Award winners have no right to exchange their awards for cash or other forms. Race sponsors shall not give any extra awards (either goods or cash) in case the previous one is lost, stolen, or damaged. </li><li>Race organizers reserve the rights to take care of any awards left un-awarded and replace the said awards with other goods with equivalent values without any notice in advance. </li><li>Data submitted by contestants must be true and correct without any forgery or alterations. Contestants shall not provide personal data to any third party in lieu of their own by means of fraud or theft. Contestants shall have no violations against the law.</li><li>The review panel has the final say on the finalists and winners at each stage of this race. </li><li>Race organizers, sponsors and its execution agents have the rights in reproducing, editing, converting, distributing, publicly transmitting, publicly performing, publicly presenting, publicly broadcasting, publicly verbal disclosing, referencing, or excerpting, and any other act required for using contest works by and basic data of contestants, including but not limited to name, portraits and photos, (hereafter referred to as “contest data”) unlimited number of times in their worldwide marketing activities, promotional activities, charity activities, and relevant media including publications, information, proposals, promotional materials, brochures and websites. </li><li>In case contestants took actions against measures of this race (including notes on the contests), regulations, the race itself or its website, actions aimed at interrupting this race or interfering with other contestants or participating this race in illegal activities or against the public order and good morals and manner including unfair, deceptive and fraudulent practices, subject to the organizer’s judgment, he/she agrees to the organizer’s immediate removal of his/her race or award winning qualifications (including recovering the award cash, certificate and trophy by the race organizer). He/she shall be held liable for any legal responsibility and held liable for compensating the organizer, sponsor, execution agent and their executives, directors, supervisors and employees for any of their loss and expenses due to these damages. </li><li>The contestants have learnt that any one of them or any individual attempting to compromise the web site or the progress of this race would breach relevant civil or criminal laws. The organizer, sponsors and their execution agents shall reserve the right in requesting for compensation, to the extent permitted by the relevant regulations, against damage by these individuals.</li><li>The organizer shall reserve the right to change the program of this race with a notice in advance. Race attendees, once participating in or registering to it, shall consent to be bound by this program. Any matter not covered herein shall be supplemented and publicized on the web site of this race by the organizer.</li></ol></div><div id="taipei2016Reference" class="tab-content" style="display:none;"><ul type="square"><li>Cloud Tools_Azure<ol><li>Visual Studio free download  <a href="https://www.visualstudio.com">https://www.visualstudio.com</a> </li><li>Azure portal <a href="http://portal.azure.com">http://portal.azure.com</a>  </li><li>Azure Documentation  <a href="http://azure.Microsoft.com">http://azure.Microsoft.com</a>  </li><li>Open Data On Azure <a href="https://ossonazure.bhuntr.com/api.php">https://ossonazure.bhuntr.com/api.php</a> </li></ol></li><li>Microsoft Project Oxford (Image recognition and Speech recognition API) <a href="https://www.projectoxford.ai/doc">https://www.projectoxford.ai/doc</a> Office API <a href="http://dev.office.com">http://dev.office.com</a> </li><li>Office API http://dev.office.com</li><li>Azure Web App Deployment<ul style="list-style-type:none;"><li><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/01/13/azure-amp-visual-studio-2015-web.aspx">http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/01/13/azure-amp-visual-studio-2015-web.aspx</a></li></ul></li><li>Open Source PHP:<ol><li>Build PHP-MySQL Web application with Azure<ul style="list-style-type:none;"><li><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/02/19/azurer-php-mysql-web.aspx">http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/02/19/azurer-php-mysql-web.aspx</a></li></ul><li>Build PHP website with Azure<ul style="list-style-type:none;"><li><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/01/13/azure-visual-studio-php.aspx">http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/01/13/azure-visual-studio-php.aspx</a></li></ul></ol></li><li>Cross-platform Development：<ol><li>Build Cross-platform Azure App Service with Xamarin<ul style="list-style-type:none;"><li><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/01/22/xamarin-azure-app-service.aspx">http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/01/22/xamarin-azure-app-service.aspx</a></li></ul></li></ol></li><li>Use Azure for IoT<ul style="list-style-type:none;"><li><a href="https://azure.microsoft.com/en-us/develop/iot/">https://azure.microsoft.com/en-us/develop/iot/</a> </li></ul></li><li>Virtual Machine:<ol><li>Build up Linux Virtual Machine by Azure<ul style="list-style-type:none;"><li><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/02/19/azure-vm.aspx">http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/02/19/azure-vm.aspx</a></li></ul></ol></li><li>IoT & Machine Learning demo : <a href="https://channel9.msdn.com/Series/mini-Connect-2016/youbike">https://channel9.msdn.com/Series/mini-Connect-2016/youbike</a> </li><li>Client: UWP : <a href="http://blogs.msdn.com/b/hermanwu/archive/2015/08/03/windows-10-uwa-uwp-app.aspx">http://blogs.msdn.com/b/hermanwu/archive/2015/08/03/windows-10-uwa-uwp-app.aspx</a></li><li>SQL Database : <a href="https://azure.microsoft.com/zh-tw/documentation/services/sql-database/">https://azure.microsoft.com/zh-tw/documentation/services/sql-database/</a> </li><li>Develop support<ol><li>.NET : <a href="http://azure.microsoft.com/zh-tw/develop/net/">http://azure.microsoft.com/zh-tw/develop/net/</a></li><li>R: <a hreg="https://azure.microsoft.com/zh-tw/documentation/articles/machine-learning-r-quickstart/">https://azure.microsoft.com/zh-tw/documentation/articles/machine-learning-r-quickstart/</a> </li><li>PHP : <a href="https://azure.microsoft.com/zh-tw/develop/php/">https://azure.microsoft.com/zh-tw/develop/php/</a> </li><li>JAVA : <a href="http://azure.microsoft.com/zh-tw/develop/java/">http://azure.microsoft.com/zh-tw/develop/java/</a> </li><li>Node.js : <a href="http://azure.microsoft.com/zh-tw/develop/nodejs/">http://azure.microsoft.com/zh-tw/develop/nodejs/</a> </li><li>IOS , Android , Windows : http://azure.microsoft.com/zh-tw/develop/mobile/ </li></ol></li><li>Microsoft Azure documentation : <a href="http://azure.microsoft.com/zh-tw/documentation/">http://azure.microsoft.com/zh-tw/documentation/</a> </li><li>Azure Website: <a href="http://azure.microsoft.com/zh-tw/">http://azure.microsoft.com/zh-tw/</a> </li><li>MSDN : <a href="http://social.msdn.microsoft.com/Forums/zh-tw/home?category=windowsazuretw">http://social.msdn.microsoft.com/Forums/zh-tw/home?category=windowsazuretw</a> </li><li>Microsoft Azure Taiwan User Group : <a href="https://www.facebook.com/groups/AzureTWUG/">https://www.facebook.com/groups/AzureTWUG/</a></li><li>MVA (Microsoft Virtual Academy) : <a href="http://www.microsoftvirtualacademy.com/">http://www.microsoftvirtualacademy.com/</a></li></ul></div>'
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 5,
                tabTitle: 'Data Platform Track Reference',
                tabContent: '<ul class="tabs left"><li class="first current"><a target="_self" href="#data-platform-reference-cn"><h6>數據平臺參考</h6></a></li><li class="last"><a target="_self" href="#data-platform-reference-en"><h6>Data Platform Reference</h6></a></li></ul><div class="tab-content" id="data-platform-reference-cn"><p>爲資料平臺主題出席的參會者們，我們在活動及好客松(hackathon) 期間爲您提供了以下參考資料。</p><span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span> Azure雲端工具</h5><ul style="display: none;"><li><a href="https://www.visualstudio.com">Visual Studio 免費下載</a></li><li><a href="http://portal.azure.com">Azure 登入</a></li><li><a href="http://azure.Microsoft.com">Azure 文檔</a></li><li><a href="https://ossonazure.bhuntr.com/api.php">在 Azure 上的開發數據</a></li></ul></span><h5><a href="https://www.projectoxford.ai/doc">微軟牛津項目(Microsoft Project Oxford): 圖像識別和語音辨別的 API</h5><h5><a href="http://dev.office.com">Office API</a></h5><h5><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/01/13/azure-amp-visual-studio-2015-web.aspx">Azure 網絡應用程式的開發</a></h5><span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span> 開放資源(open source) PHP</h5><ul style="display: none;"><li><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/02/19/azurer-php-mysql-web.aspx">由 Azure 來建立 PHP-MySQL 的網絡應用程式</a></li><li><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/01/13/azure-visual-studio-php.aspx">由Azure 來建立 PHP 網站 的應用程式</a></li></ul></span><span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span> 跨平臺開發</h5><ul style="display: none;"><li><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/01/22/xamarin-azure-app-service.aspx">由Xamarin來建立跨平臺的 Azure 應用程式服務</a></li></ul></span><h5><a href="https://azure.microsoft.com/en-us/develop/iot/">由Azure 來建立物聯網</a></h5><span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span>虛擬機器</h5><ul style="display: none;"><li><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/02/19/azure-vm.aspx">由 Azure建立 的 Linux 虛擬機器</a></li></ul></span><h5><a href="https://channel9.msdn.com/Series/mini-Connect-2016/youbike">物聯網與機器學習的演示</a></h5><h5><a href="http://blogs.msdn.com/b/hermanwu/archive/2015/08/03/windows-10-uwa-uwp-app.aspx">用戶端 (通用的 Windows 平臺)</a></h5><h5><a href="https://azure.microsoft.com/zh-tw/documentation/services/sql-database/">SQL 資料庫</a></h5><span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span> 開發支援</h5><ul style="display: none;"><li><a href="http://azure.microsoft.com/zh-tw/develop/net/">.NET</a></li><li><a href="https://azure.microsoft.com/zh-tw/documentation/articles/machine-learning-r-quickstart/">R</a></li><li><a href="https://azure.microsoft.com/zh-tw/develop/php/">PHP</a></li><li><a href="http://azure.microsoft.com/zh-tw/develop/java/">JAVA</a></li><li><a href="http://azure.microsoft.com/zh-tw/develop/nodejs/">Node.js</a></li><li><a href="http://azure.microsoft.com/zh-tw/develop/mobile/">iOS , Android , Windows</a></li></ul></span><h5><a href="http://azure.microsoft.com/zh-tw/documentation/">微軟 Azure 文檔</a></h5><h5><a href="http://azure.microsoft.com/zh-tw/">微軟Azure網站</a></h5><h5><a href="http://social.msdn.microsoft.com/Forums/zh-tw/home?category=windowsazuretw">MSDN 論壇</a></h5><h5><a href="https://www.facebook.com/groups/AzureTWUG/">微軟 Azure 臺灣用戶組</a></h5><h5><a href="http://www.microsoftvirtualacademy.com/">微軟技術的學習影音檔平台 (Microsoft Virtual Academy)</a></h5></div><div class="tab-content" id="data-platform-reference-en" style="display: none;"><p>For attendees of the Data Platform Track, the resources below are available during the event and the hackathon.</p><span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span> Azure cloud tools</h5><ul style="display: none;"><li><a href="https://www.visualstudio.com">Visual Studio free download</a></li><li><a href="http://portal.azure.com">Azure portal</a></li><li><a href="http://azure.Microsoft.com">Azure documentation</a></li><li><a href="https://ossonazure.bhuntr.com/api.php">Open data on Azure</a></li></ul></span><h5><a href="https://www.projectoxford.ai/doc">Microsoft Project Oxford</a> (image recognition and speech recognition API)</h5><h5><a href="http://dev.office.com">Office API</a></h5><h5><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/01/13/azure-amp-visual-studio-2015-web.aspx">Azure web app deployment</a></h5><span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span> Open source PHP</h5><ul style="display: none;"><li><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/02/19/azurer-php-mysql-web.aspx">Build PHP-MySQL Web application with Azure</a></li><li><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/01/13/azure-visual-studio-php.aspx">Build PHP website with Azure</a></li></ul></span><span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span> Cross-platform development</h5><ul style="display: none;"><li><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/01/22/xamarin-azure-app-service.aspx">Build Cross-platform Azure App Service with Xamarin</a></li></ul></span><h5><a href="https://azure.microsoft.com/en-us/develop/iot/">Use Azure for IoT</a></h5><span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span>Virtual machine</h5><ul style="display: none;"><li><a href="http://blogs.msdn.com/b/microsoft_student_partners_in_taiwan/archive/2016/02/19/azure-vm.aspx">Build up Linux virtual machine by Azure</a></li></ul></span><h5><a href="https://channel9.msdn.com/Series/mini-Connect-2016/youbike">IoT and machine learning demo</a></h5><h5><a href="http://blogs.msdn.com/b/hermanwu/archive/2015/08/03/windows-10-uwa-uwp-app.aspx">Client (Universal Windows Platform)</a></h5><h5><a href="https://azure.microsoft.com/zh-tw/documentation/services/sql-database/">SQL database</a></h5><span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span> Developer support</h5><ul style="display: none;"><li><a href="http://azure.microsoft.com/zh-tw/develop/net/">.NET</a></li><li><a href="https://azure.microsoft.com/zh-tw/documentation/articles/machine-learning-r-quickstart/">R</a></li><li><a href="https://azure.microsoft.com/zh-tw/develop/php/">PHP</a></li><li><a href="http://azure.microsoft.com/zh-tw/develop/java/">JAVA</a></li><li><a href="http://azure.microsoft.com/zh-tw/develop/nodejs/">Node.js</a></li><li><a href="http://azure.microsoft.com/zh-tw/develop/mobile/">iOS , Android , Windows</a></li></ul></span><h5><a href="http://azure.microsoft.com/zh-tw/documentation/">Microsoft Azure documentation</a></h5><h5><a href="http://azure.microsoft.com/zh-tw/">Azure website</a></h5><h5><a href="http://social.msdn.microsoft.com/Forums/zh-tw/home?category=windowsazuretw">MSDN forum</a></h5><h5><a href="https://www.facebook.com/groups/AzureTWUG/">Microsoft Azure Taiwan User Group</a></h5><h5><a href="http://www.microsoftvirtualacademy.com/">Microsoft Virtual Academy (MVA)</a></h5></div><script src="http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.9.0.min.js"></script><script type="text/javascript">$(".taipeiDropDown2016").on("click keydown", function(event) {var keyCode = event.keyCode || event.which; if (keyCode === 1 || keyCode === 9 || keyCode === 13) { $(this).find(".rightArrow").toggle();$(this).find(".downArrow").toggle();$(this).find("ol").toggle(250);$(this).find("ul").toggle(250);}});</script>'
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 6,
                tabTitle: 'Productivity Track Reference',
                tabContent: `<div id="taipei2016-chinese-curriculum">
<ul class="tabs left curriculumList">
<li class="first current"><a target="_self" href="#taipei2016-curriculum-welcome-cn"><h6>歡迎</h6></a></li>
<li id="taipei2016-curriculum-overview-cn-tab"><a target="_self" href="#taipei2016-curriculum-overview-cn"><h6>概述</h6></a></li>
<li id="taipei2016-curriculum-registration-cn-tab"><a target="_self" href="#taipei2016-curriculum-registration-cn"><h6>報名註冊 </h6></a></li>
<li id="taipei2016-curriculum-napa-cn-tab"><a target="_self" href="#taipei2016-curriculum-napa-cn"><h6>Napa</h6></a></li>
<li id="taipei2016-curriculum-vs2015-cn-tab"><a target="_self" href="#taipei2016-curriculum-vs2015-cn"><h6>Visual Studio 2015</h6></a></li>
<li id="taipei2016-curriculum-api-cn-tab"><a target="_self" href="#taipei2016-curriculum-api-cn"><h6>API 演練</h6></a></li>
<li id="taipei2016-curriculum-publishing-cn-tab"><a target="_self" href="#taipei2016-curriculum-publishing-cn"><h6>發佈</h6></a></li>
<li class="taipei1016-eng float-right"><a href=""><h6>English</h6></a></li>
<li class="taipei2016-cn float-right last"><a href=""><h6>汉语</h6></a></li>
</ul>
<div id="taipei2016-curriculum-welcome-cn" class="tab-content" style="display: block;">
<h2>歡迎</h2>
<p>此課程能幫助您擴展Office及學習Office 增益集的開發和發佈過程。</p>
<p>如果您沒有Office, 請在<a href="http://dev.office.com/devprogram">Office Dev Center</a>的網站上報名及填寫單表（詳細步驟，請參閲<a class="welcomeTab" data-tabId="taipei2016-curriculum-registration-cn-tab" href="">報名註冊 </a>）。通過 Office 365 開發人員計劃，您能拿到免費的Office 365開發人員賬戶及為期一年Office 365的訂閲。</p>
<ol class="tabs">
<li class="welcomeTab" data-tabId="taipei2016-curriculum-overview-cn-tab"><a href="">Office 增益集平台概述</a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-registration-cn-tab"><a href="">報名註冊 </a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-napa-cn-tab"><a href="">Napa Office 365開發工具及演練</a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-vs2015-cn-tab"><a href="">Visual Studio Community 2015及演練</a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-api-cn-tab"><a href="">API演練</a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-publishing-cn-tab"><a href="">發佈</a></li>
</ol>
</div>
<div id="taipei2016-curriculum-overview-cn" class="tab-content" style="display: none;">
<h2>Office 增益集平台概述</h2>
<h3>本文內容</h3>
<ul>
<li><a target="_self" href="#taipei2016-what-is-office-addin-cn">Office 增益 集是什麽？</a></li>
<li><a target="_self" href="#taipei2016-anatomy-of-an-office-addin-cn">Office 增益集的基本元件</a></li>
<li><a target="_self" href="#taipei2016-types-of-office-addins-cn">Office 增益集的類型</a></li>
<li><a target="_self" href="#taipei2016-scenarios-cn">案例</a></li>
<li><a target="_self" href="#taipei2016-office-apps-that-support-addins-cn">支援 Office 增益集的 Office 應用程式</a> </li>
<li><a target="_self" href="#taipei2016-development-life-cycle-cn">Office 增益集開發週期</a></li>
<li><a target="_self" href="#taipei2016-resources-cn">資源</a></li>
</ul>
<h3 id="taipei2016-what-is-office-addin-cn">Office 增益集 是什麽？</h3>
<p>Office 增益集是一個裝載於瀏覽器控制項的Web 應用程式或是執行在 Office 應用程式內容中的iframe 。</p>
<p>開發增益集的工具有幾種：</p>
<ul>
<li><a href="https://www.napacloudapp.com/Getting-Started">Napa Office 365 開發工具</a> </li>
<li><a href="https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx">Visual Studio Community 2015 開發工具 (免費社區版)</a>與<a href="https://www.visualstudio.com/features/office-tools-vs">Microsoft 開發人員工具</a> </li>
<li><a href="https://msdn.microsoft.com/zh-tw/library/office/mt628821.aspx">文字編輯器</a></li>
</ul>
<h3 id="taipei2016-anatomy-of-an-office-addin-cn">Office 增益集的基本元件</h3>
<p>Office 增益集的基本元件是 XML 資訊清單檔案和增益集的預設網頁。</p>
<figcaption>資訊清單 + 網頁 = Office 增益集</figcaption>
<img src="../uploads/office-web-curriculum-taipei-1.png" />
<p>資訊清單可指定增益集的設定及功能，例如下列：</p>
<ul>
<li>實施增益集 UI 及程式設計邏輯之網頁的 URL。</li>
<li>增益集的顯示名稱、描述、識別碼、版本及預設地區設定。</li>
<li>增益集的啟動和顯示方式： 
<ul>
<li>與文件互動的增益集形式為工作窗格，或內嵌在文件內容中。</li>
<li>與郵件項目 (郵件或約會) 互動的增益集：在閱讀或撰寫項目時。</li>
</ul>
</li>
<li>增益集的權限層級和資料存取需求。</li>
</ul>
<h3 id="taipei2016-types-of-office-addins-cn">Office 增益集的類型</h3>
<p>Office 增益集有三種類型 ：工作窗格、內容及 Outlook。</p>
<h4>工作窗格增益集 (可以擴展Word、 Excel 與 PowerPoint 功能的增益集)</h4>
<p>您可以通過工作窗格資訊清單 (<a href="http://dev.office.com/docs/add-ins/design/add-in-commands-for-excel-and-word-preview">task pane add-in manifest</a>) 來註冊您的增益集及在 Word、 Excel 與PowerPoint 中添加新功能。此清單支援兩種融合模式</strong>:</p>
<ul>
<li>增益集命令 (Add-in commands)</li>
<li>可插入的工作窗格(Insertable task panes)</li>
</ul>
<h5>增益集命令 (Add-in commands)</h5>
<p>您可以在Office增益集中添加增益集命令來讓您 擴展 Office for Windows Desktop 與Office Online 的使用者介面。 例如， 您可以在功能區或選定的內容功能表内添加及設置Office 增益集的按鈕，這能允許使用者輕鬆地訪問 Office 增益集。命令按鈕可以啟動不同的行動，如通過自訂的 HTML 或執行一個 JavaScript 函數來顯示一個窗格（或多個窗格）。有關詳細資訊，請參見 <a href="http://dev.office.com/docs/add-ins/overview/office-add-ins">Office Add-ins platform overview</a> > Types of Office add-ins > Add-in Commands. 我們還建議您看<a href="https://channel9.msdn.com/Events/Visual-Studio/Connect-event-2015/316">九 頻道</a>的視頻來更深層次地瞭解此功能。</p>
<figcaption>有命令的增益集在 Excel Desktop中運行</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-14.jpg" />
<figcaption>有命令的增益集在 Excel Online中運行</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-16.jpg" />
<p>通過 VersionOverrides，您可以對增益集資訊清單中的命令設置定義。Office平臺能在本機的使用者介面對它們進行解譯。若要開始，請查閱<a href="https://github.com/OfficeDev/Office-Add-in-Commands-Samples/">GitHub 代碼範例</a>和<a href="http://dev.office.com/docs/add-ins/design/add-in-commands-for-excel-and-word-preview">Excel、 Word、 PowerPoint增益集命令</a>。</p>
<h5>可插入的 工作窗格</h5>
<p>用戶端不支援增益集命令有 （Office 2013 ，Office for Mac 與Office for IPad）。這些用戶端 將通過咨詢清單中的DefaultUrl來運行工作窗格增益集。此增益集然后會從Insert Tab中的My Add-ins選項卡中啓動。</p>
<table class="tableWithBorders tableFirstRowBold">
<tr><th>注意事項</th></tr>
<tr><td>一個咨詢清單内可以有在不支援增益集命令的用戶端中而運行的工作窗格增益集，也可以有在支援增益集命令版本中運行的工作窗格增益集。這允許您在所有支援Office 增益集的用戶端中運行一個增益集。</td></tr>
</table>
<p>工作窗格增益集能與 Office 文件并行運作，并可讓您提供關聯式資訊和功能，以強化文件檢視及撰寫體驗。例如，工作窗格增益集可以根據文件中選取的產品名稱或組件編號在 Web 服務查詢并擷取產品資訊。</p>
<figcaption>工作窗格增益集 </figcaption>
<img src="../uploads/office-web-curriculum-taipei-2.png" />
<p>若要在 Excel 2013、Excel Online 或 Word 2013 中嘗試工作窗格增益集，請安裝<a href="https://store.office.com/wikipedia-WA104099688.aspx?assetid=WA104099688">維基百科</a>增益集。</p>
<h4>內容增益集</h4>
<p>內容增益集會將 Web 式功能在文件內容中嵌入及顯示。內容增益集可讓您把豐富的 網絡視覺資料、內嵌的媒體 (例如 YouTube 視訊播放程式或圖片庫) ，以及其它外部內容集成在文件中。</p>
<figcaption>內容增益集</figcaption>
<img src="../uploads/office-web-curriculum-taipei-3.png" />
<p>若要在 Excel 2013 或 Excel Online 中嘗試內容增益集，請安裝 <a href="https://store.office.com/bing-maps-WA102957661.aspx?assetid=WA102957661">Bing 地圖服務</a>增益集。</p>
<h4>Outlook 增益集</h4>
<p>當您檢視或撰寫 Outlook 項目時，Outlook 增益集會顯示在該項目旁邊。在讀取案例中 (使用者檢視收到項目時) 或在撰寫案例中 (使用者回覆或建立新的項目時)，它們可以與電子郵件、會議邀請、會議回覆、會議取消或約會搭配使用。</p>
請參閲<a href="http://dev.office.com/docs/add-ins/outlook/outlook-add-ins">Outlook add-ins</a> 來瞭解Outlook增益集
<table class="tableWithBorders tableFirstRowBold">
<tr><th>注意事項</th></tr>
<tr><td>Outlook 增益集需要最低的版本爲 Exchange 2013 或 Exchange Online 來主控使用者的信箱。不支援 POP 和 IMAP 電子郵件帳戶。</td></tr>
</table>
<figcaption>有命令按鈕的Outlook增益集在功能區内</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-17.jpg" />
<figcaption>讀取案例中的 Outlook 增益集</figcaption>
<img src="../uploads/office-web-curriculum-taipei-4.png" />
<p>若要在 Outlook、Outlook for Mac 或 Outlook Web App 中嘗試 Outlook 增益集，請安裝 <a href="https://store.office.com/package-tracker-WA104162083.aspx?assetid=WA104162083">Package Tracker</a> 增益集。</p>
<h3 id="taipei2016-scenarios-cn">案例</h3>
<ul>
<li><strong>翻譯精靈</strong> - Word 工作窗格增益集，會自動將選取的文字從文件語言翻譯為下拉式清單中選取的其他語言。</li>
<li><strong>建立圖表</strong> - Excel 內容增益集，會從選取的資料建置自動圖表。</li>
<li><strong>第三方服務整合</strong> - Word 或 Excel 工作窗格增益集，會自動顯示與選取的文字對應的維基百科頁面。</li>
<li><strong>豐富的資料結合</strong> - Excel 中的 Bing 地圖內容增益集，會繪製石油公司的近岸設備及資源位置，包括從公司資源管理系統取得這項即時資訊。</li>
<li><strong>規格驗證</strong> - 飛機元件設計規格的小節或段落會被標示為過期，因為 Word 工作窗格增益集會與商務系統通訊，以將內容與最新的規格驗證。</li>
<li><strong>開始工作流程</strong> - Outlook 增益集，可以協助您根據範本建立訊息或會議邀請、插入會議位置的詳細資訊或使用者選擇的簽章，以及附加相關的文件。 </li>
<li><strong>訂單詳細資料呈現在內容</strong> - 這個 Outlook 增益集可偵測電子郵件中內嵌採購單號碼或客戶編號的郵件，并在郵件中呈現訂單或客戶的詳細資料。這可能包括要採取的動作，例如核准。</li>
</ul>
<h3 id="taipei2016-office-apps-that-support-addins-cn">支援 Office 增益集的 Office 應用程式</h3>
<table class="striped">
<tr><th>Office 應用程式</th><th>內容增益集</th><th>Outlook 增益集</th><th>工作窗格增益集</th></tr>
<tr><td>Access Web App</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Excel 2013 或更新版本</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Excel Online  </td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Excel for iPad  </td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Outlook 2013 或更新版本  </td><td>&nbsp;</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td></tr>
<tr><td>Outlook for Mac </td><td>&nbsp;</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td></tr>
<tr><td>Outlook Web App</td><td>&nbsp;</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td></tr>
<tr><td>裝置適用的 OWA</td><td>&nbsp;</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td></tr>
<tr><td>PowerPoint 2013 或更新版本</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>PowerPoint Online</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Project 2013 或更新版本  </td><td>&nbsp;</td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Word 2013 或更新版本</td><td>&nbsp;</td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Word Online</td><td>&nbsp;</td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Word for iPad</td><td>&nbsp;</td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
</table>
<h3 id="taipei2016-development-life-cycle-cn">Office 增益集開發週期</h3>
<p>請參考以下内容來計畫開發工作窗格、 內容和 Outlook 的Office增益集。</p>
<ol>
<li>決定增益集的目的。</li>
<li>識別資料及增益集的資料或數據來源。</li>
<li>識別開發增益集的類型和 Office 最佳支援的增益集用途的主機應用程式的類型。</li>
<li>爲增益集設計與實施使用者體驗及使用者介面。</li>
<li>建立根據Office 增益集資訊清單結構描述的 XML 資訊清單檔案。</li>
<li>安裝及測試增益集。</li>
<li>發佈增益集。</li>
<li>更新增益集</li>
</ol>
<h3 id="taipei2016-resources-cn">資源</h3>
<p><a href="https://msdn.microsoft.com/ZH-TW/library/office/jj220082.aspx">Office 增益集平台概觀</a></p>
<p><a href="https://dev.office.com/docs/add-ins/overview/office-add-ins">Office  增益集平台概觀（Office Dev Center 英文更新版）</a></p>
<p><a href="https://dev.office.com/getting-started/addins">Getting started with Office Add-ins</a></p>
<p><a href="https://code.visualstudio.com/Docs/runtimes/office">Office Add-ins with VS code</a></p>
<p><a href="https://msdn.microsoft.com/ZH-TW/library/office/jj220077.aspx">Office 增益集開發週期</a></p>
<p><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Shanghai-Interop-Dev-Days/Office-Add-ins-Intro-and-Development">Office 增益集 介紹與開發</a></p>
<p><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Shanghai-Interop-Dev-Days/Build-a-Complete-Office-Add-in-Solution">建設一個完整的Office 增益集</a></p>
<p><a href="https://github.com/OfficeDev">Office Developer代碼範例</a></p>
</div>
<div id="taipei2016-curriculum-registration-cn" class="tab-content" style="display: none;">
<h2>報名註冊 </h2>
<h3>本文内容</h3>
<ol>
<li><a target="_self" href="#taipei2016-sign-up-at-office-dev-cenbter-cn">在Office Dev Center網站上報名</a></li>
<li><a target="_self" href="#taipei2016-join-dev-program-cn">獲取Office 365開發人員賬戶</a></li>
<li><a target="_self" href="#taipei2016-access-your-office-365-cn">登入Office 365</a></li>
<li><a target="_self" href="#taipei2016-assign-office-365-license-cn">分配Office 365許可證</a></li>
<li><a target="_self" href="#taipei2016-registration-resources-cn">資源</a></li>
</ol>
<h3 id="taipei2016-sign-up-at-office-dev-cenbter-cn">在Office Dev Center網站上報名</h3>
<p>在<a href="http://dev.office.com/devprogram">Office Dev Center</a>的網站上報名及填寫單表。通過 Office 365 開發人員計劃，您能拿到免費的Office 365開發人員賬戶及為期一年Office 365的訂閲。</p>
<figcaption>圖 1: Office 365 Dev Program</figcaption>
 <img src="../uploads/office-web-curriculum-taipei-5.png" />
<h3 id="taipei2016-join-dev-program-cn">獲取Office 365開發人員賬戶</h3>
<ol>
<li>完成上個環節後您將收到一封來自Office 365 Developer Program的電子郵件。在電子郵件里，請按一下連接來註冊免費的 Office 365 開發人員帳戶。</li>
<li>在第一頁 的註冊表格上請提供有關自己的資訊，選擇[下一步]。</li>
<li> 在第二頁上(圖 2), 指定訂閱管理員的使用者識別碼。</li>
</ol>
<figcaption>圖 2. Office 365 開發人員網站網域名稱</figcaption>
<img src="../uploads/office-web-curriculum-taipei-6.png" />
<p>4.  建立 <strong>.onmicrosoft.com</strong> 的子網域。</p>
<p class="indentP"> 註冊之後，您必須使用所產生的認證 (格式為 <a href="mailto:UserID@yourdomain.onmicrosoft.com">UserID@yourdomain.onmicrosoft.com</a>) 登入您在其中管理帳戶的 Office 365 入口網站。SharePoint Online 開發人員網站會佈建於您的新網域中：http://yourdomain.sharepoint.com。 </p>
<p>5. 選擇 [下一步]，並填寫單表的最後一頁。如果您選擇用電話號碼來取得確認碼，則可以提供行動電話或地面通訊電話號碼，但不是 VoIP 號碼。</p>
<table class="tableWithBorders tableFirstRowBold">
<tr><th>注意事項</th></tr>
<tr><td>如果您嘗試註冊開發人員帳戶時已登入另一個 Microsoft 帳戶，可能會收到此訊息“抱歉，您輸入的使用者識別碼無法運作。它看起來無效。請務必輸入組織分配給您的使用者識別碼。您的使用者識別碼通常看起來像是 <i>someone@example.com</i> 或 <i>someone@example.onmicrosoft.com</i>。”
如果您看到此訊息，請退出原本使用的 Microsoft 帳戶然後再試一次。如果仍然收到此訊息，請清除瀏覽器緩存，或切換到 [InPrivate 瀏覽]，然後填寫單表。</td></tr>
</table>
<p>一旦創建了您的帳戶，您將收到另一封電子郵件，<a href="http://portal.office.com">請連接Office 365</a>。</p>
<h3 id="taipei2016-access-your-office-365-cn">登入Office 365</h3>
<p>您的瀏覽器會開啟 Office 365 安裝頁面。請選擇 [管理] 圖示，以開啟管理中心頁面。</p>
<figcaption>圖 3：Office 365 管理中心頁面</figcaption>
<img src="../uploads/office-web-curriculum-taipei-7.png" />
<ol>
<li>您必須等待 開發人員網站準備完成。準備完成之後，請在瀏覽器中刷新 管理中心頁面。</li>
<li>然後在頁面上選擇 [建置增益集]來開啟您開發人員網站。您應該會看到像圖 4 中的網站。在頁面有測試增益集清單。這會確認網站是否符合SharePoint開發人員網站模板。如果您看到的是普通的小組網站，請稍候幾分鐘並重新啟動您的網站。
<br />如果您還沒有開發工具，請按一下[添加] "Napa" Office 365 開發工具。您即可在此網站上使用Napa及開發Office增益。</li>
<li>記下網站 URL。在 Visual Studio 中建立 SharePoint Add-ins 專案時會用到它。</li>
</ol>
<figcaption>圖4：開發人員網站的首頁與測試清單中的增益集</figcaption>
 <img src="../uploads/office-web-curriculum-taipei-8.png" />
<h3 id="taipei2016-assign-office-365-license-cn">分配office 365許可證</h3>
<p>分配給自己 （活躍用戶）Office 365 許可證。點擊 "華夫格" > [管理員] 圖示。</p>
<figcaption>圖5： Office 365首頁</figcaption>
<img src="../uploads/office-web-curriculum-taipei-10.png" />
<p class="indentP">1.   在左側導航面板中，選擇 [用戶] > [活躍用戶]</p>
<p class="indentP">2.   在核取方塊内選擇自己。您的個人資料會顯示在右邊。點擊下方的項目編輯：給自己分配許可證</p>
<figcaption>圖 6：Office 365 管理中心頁面 > 活躍用戶</figcaption>
<img src="../uploads/office-web-curriculum-taipei-11.png" />
<p class="indentP">3. 在[用戶位置]的組合框設置您的地點。並選擇Microsoft Office 365的開發。點擊[保存]完成分配的許可證。</p>
<figcaption>圖7：分配活躍用戶許可證</figcaption>
<img src="../uploads/office-web-curriculum-taipei-12.png">
<p class="indentP">4. 在完成後，返回到 Office 365 的主頁。頁面將顯示可用的 Office 的產品。拉下頁面，可以看到完整的顯示。</p>
<figcaption>圖8：Office 365 首頁</figcaption>
<img src="../uploads/office-web-curriculum-taipei-13.png" />
<p>如要回到開發者網站，點擊在左上角的"華夫格"> [管理] > [構建的應用程式]。</p>
<h3 id="taipei2016-registration-resources-cn">資源</h3>
<p><a href="https://msdn.microsoft.com/zh-tw/library/office/dn467914.aspx">Office 開發人員文件</a></p>
<p><a href="https://msdn.microsoft.com/zh-tw/library/office/fp179924.aspx#o365_signup">註冊 Office 365 開發人員網站</a></p>
</div>
<div id="taipei2016-curriculum-napa-cn" class="tab-content" style="display: none;">
<h2>Napa Office 365開發工具及演練</h2>
<h3>本文内容</h3>
<ul>
<li><a target="_self" href="#taipei2016-prerequisites-napa-cn">必要條件</a></li>
<li><a target="_self" href="#taipei2016-create-office-addins-with-napa-cn">在Office 365 開發人員網站上建置Office 增益集</a></li>
<li><a target="_self" href="#taipei2016-create-excel-addin-with-napa-cn">使用Napa Office 365 開發工具來建立Excel内容增益集</a></li>
<li><a target="_self" href="#taipei2016-debug-your-addin-napa-cn">增益集在 Internet Explorer 中偵錯</a></li>
<li><a target="_self" href="#taipei2016-resources-napa-cn">資源</a></li>
</ul>
<h3 id="taipei2016-prerequisites-napa-cn">必要條件</h3>
<p>報名及參加<a href="http://dev.office.com/devprogram">Office 365 Developer Program</a>。參考<a class="welcomeTab" data-tabId="taipei2016-curriculum-registration-cn-tab">報名註冊</a>。</p>
<table class="tableWithBorders tableFirstRowBold">
<tr><th>注意事項</th></tr>
<tr><td>如果您已經有Office 365， 您也可以使用不需要Office 365 開發人員網站的<a href="https://www.napacloudapp.com/Getting-Started">Napa替代版本</a>。 此版本支援用您的個人<a href="https://www.microsoft.com/en-us/account/default.aspx">Microsoft 帳戶</a>來建立Office 增益集。</td></tr>
</table>
<h3 id="taipei2016-create-office-addins-with-napa-cn">在Office 365 開發人員網站上建置Office 增益集</h3>
<p>您可以直接從瀏覽器視窗來使用Napa開發工具及開始建置Office 增益集。您不需要安裝任何其它Visual Studio類似的工具。所有您需要的爲支援的瀏覽器和Office 365 開發者免費賬戶。（Firefox是針對 Mac 用戶所推薦的瀏覽器）。</p>
<p>若要開始，註冊Office 365 開發人員賬戶。然後在開發人員網站上安裝Napa，之後您可以準備建立Office 增益集。當您準備使用Visual Studio強大功能時， Napa可以下載您的專案並讓您繼續進行開發Office 增益集。</p>
<ol>
<li>如果您已完成Office 365 開發人員網站的<a class="welcomeTab" data-tabId="taipei2016-curriculum-registration-cn-tab">報名註冊</a>， 用您建置的憑證而登入<a href="http://portal.office.com">Office 365</a> > 點擊 [管理] > [建置增益集]。<br />如果您沒有Napa, 您將被引導及[添加] Napa Office 365 開發工具。</li>
<li>在開發人員網站上， 再次點擊 [建置增益集] 磚。</li>
<h3 id="taipei2016-create-excel-addin-with-napa-cn" style="margin-left: -25px">使用Napa Office 365 開發工具來建立Excel内容增益集</h3>
<li>選擇 [新增專案] 磚。 只有當您已經建立了其它專案后， [加入新的專案] 磚才會出現。 </li>
<li>演練<a href="https://msdn.microsoft.com/ZH-TW/library/office/jj220065.aspx">Excel 與 Napa Office 365 開發工具建立內容的增益集</a>。</li>
</ol>
<h3 id="taipei2016-debug-your-addin-napa-cn">增益集在 Internet Explorer 中偵錯  </h3>
<p>如果您啟動增益集Excel Online，並且使用 Internet Explorer (IE)，您可以使用 F12 開發人員工具偵錯 JavaScript、 HTML 和階層式樣式表 (CSS) 內容增益集。 如需詳細資訊，請參閱<a href="https://msdn.microsoft.com/ZH-TW/library/office/mt488952.aspx">使用 F12 開發人員工具</a> 。 如果您使用 Internet Explorer 以外的瀏覽器，搜尋瀏覽器文件。 </p>
<h3 id="taipei2016-resources-napa-cn">資源</h3>
<p><a href="https://msdn.microsoft.com/ZH-TW/library/office/jj220038.aspx">使用 Napa 與 Office 365 開發人員網站建立 Office 增益集</a></p>
<p><a href="https://msdn.microsoft.com/ZH-TW/library/office/dn974046.aspx">使用 Napa Office 365 開發工具建立 Office 增益集</a></p>
<p><a href="https://msdn.microsoft.com/ZH-TW/library/office/jj554660.aspx">使用 Napa Office 365 開發工具建立的工作窗格增益集</a></p>
</div>
<div id="taipei2016-curriculum-vs2015-cn" class="tab-content" style="display: none;">
<h2>Visual Studio Community 2015及演練</h2>
<h3>本文内容</h3>
<ul>
<li><a target="_self" href="#taipei2016-vs-2015-prerequisites-cn">必要條件</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-setup-cn">下載及安裝免費的Visual Studio Community 2015</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-hello-world-cn">用 Visual Studio 來建立工作窗格或內容增益集</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-build-first-excel-addin-cn">建立您的第一個Excel增益集</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-debuging-cn">在Visual Studio中偵錯</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-resources-cn">資源</a></li>
</ul>
<h3 id="taipei2016-vs-2015-prerequisites-cn">必要條件</h3>
<ul>
<li><a href="https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx">Visual Studio Community 2015 (免費版)</a></li>
<li><a href="https://www.visualstudio.com/features/office-tools-vs">Office開發者工具</a></li>
<li>演練《用 Visual Studio 來建立工作窗格或內容增益集》需要Excel 2013或更新版，Word 2013或更新版。</li>
<li> 演練《建立您的第一個Excel增益集》需要Excel 2016 or Excel Online。（新發佈的Excel API 具有額外的功能，但它衹限適用于Excel 2016或線上版本。例如增益集不在Excel 2013里啟動，確認最新的 Excel 已安裝。）</li>
</ul>
<h3 id="taipei2016-vs-2015-setup-cn">下載及安裝免費的Visual Studio Community 2015</h3>
<p class="indentP">1. 如果您沒有Visual Studio, 請下載及安裝免費的<a href="https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx">Visual Studio 2015 Community Edition</a> 與 <a href="https://www.visualstudio.com/features/office-tools-vs">Office開發者工具</a>。 </p>
<img src="../uploads/office-web-curriculum-taipei-14.png" />
<br />
<table class="tableWithBorders tableFirstRowBold">
<tr><th>注意事項</th></tr>
<tr><td>當您在Visual Studio中開發與偵錯增益集時， Visual Studio會部署和使用 IIS Express，并在本機上執行您的增益集的網頁檔案， 因此不需要其它網頁伺服器。同樣地，如果您使用Napa，在瀏覽器中做開發與偵錯，它會從您用來登入 Napa 帳戶相關聯的儲存部署來執行增益集的網頁檔案。</td></tr>
</table>
<p class="indentP">2. 選擇<strong>File</strong> > <strong>New</strong> > <strong>Project</strong>.</p>
<p class="indentP">3. 在<strong>New Project</strong>方塊中，選擇<strong>Template</strong> <strong>Visual C#</strong> > <strong>Office/SharePoint</strong> > <strong>Office Add-in</strong> (或App for Office). </p>
<img src="../uploads/office-web-curriculum-taipei-15.png" />
<p class="indentP">4. 命名該專案<strong>HelloWorld</strong>, 然後選擇<strong>OK</strong>。</p>
<p class="indentP">5. 在此演示，選擇<strong>Task pane</strong>作為應用程式類型, 然後選擇<strong>Next</strong>。</p>
<p class="indentP">6.  選擇 <strong>Excel</strong> 作為要承載外接程式中的 Office 增益集。您可以選擇多個選項，Office 增益集將運行在任何選定的應用程式中。</p>
<p class="indentP">Visual Studio 創建的專案出現在Solution Explorer。其中預設頁Home.html文件在 Visual Studio 中打開。</p>
<p>如果您希望使用 Visual Studio 以外的編輯器，<a href="https://msdn.microsoft.com/ZH-TW/library/office/mt628821.aspx">您可以使用任何編輯器來建置Office增益集</a>。
<h3 id="taipei2016-vs-2015-hello-world-cn">用 Visual Studio 來 建立工作窗格或內容增益集</h3>
<p>用Visual Studio來演練教程<a href="https://msdn.microsoft.com/zh-tw/library/office/fp142161.aspx">工作窗格或內容增益集</a></p>
<h3 id="taipei2016-vs-2015-build-first-excel-addin-cn">建立您的第一個Excel增益集</h3>
<p>演練<a href="https://msdn.microsoft.com/EN-US/library/office/mt616491.aspx">Build your first Excel add-in</a></p>
<p>新的 Excel JavaScript API 與 Excel  2016 和 Excel 線上版本進行互動。如果您使用 Excel 2013 來操作Excel增益集，您將可能看到此錯誤:</p>
<table class="tableWithBorders tableFirstRowBold">
<tr><td>0x800a1391 - JavaScript runtime error: \'Excel\' is undefined</td></tr>
</table>
<p>如果您沒有 Excel 2016，您可以使用 Office 365 開發者網站。 請參閱<a class="welcomeTab" data-tabId="taipei2016-curriculum-registration-cn-tab">報名註冊 </a>。 使用Napa開發工具讓Excel 增益集在 線上版本中運行。</p>
<h3 id="taipei2016-vs-2015-debuging-cn">在Visual Studio中偵錯</h3>
<p>設定中斷點。點擊<strong>Start Debugging</strong>或按<strong>F5</strong>來開始偵錯。</p>
<h3 id="taipei2016-vs-2015-resources-cn">資源</h3>
<p><a href="https://dev.office.com/">Office Dev Center</a></p>
</div>
<div id="taipei2016-curriculum-api-cn" class="tab-content" style="display: none;">
<h2>API演練</h2>
<h3>本文内容</h3>
<ul>
<li><a target="_self" href="#taipei2016-api-programming-overview-cn">程式設計概述</a></li>
<li><a target="_self" href="#taipei2016-api-reference-cn">API 參照</a></li>
<li><a target="_self" href="#taipei2016-api-samples-cn">Office 增益集代碼範例</a></li>
<li><a target="_self" href="#taipei2016-api-exercises-cn">演練</a></li>
<li><a target="_self" href="#taipei2016-api-resources-cn">資源</a></li>
</ul>
<h3 id="taipei2016-api-programming-overview-cn">程式設計概述</h3>
<p>在您開始建置增益集之前，請參閲<a href="https://msdn.microsoft.com/ZH-TW/library/office/fp160953.aspx">瞭解 Office 的 JavaScript API</a>以及對於不同Office增益集的程式設計概述。</p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/mt616487.aspx">Excel</a></p>
<p><a href="http://dev.office.com/docs/add-ins/word/word-add-ins-programming-overview">Word</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/fp161015.aspx">Outlook</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn610884.aspx">PowerPoint</a></p>
<p>需要注意的是，如果您使用的JavaScript API只能在某些Office版本中運作，例如您在Excel增益集里使用了限於Excel 2016 或線上版本的新發佈的 Excel JavaScript API ，確認最新的Office已安裝以便開發及<a href="https://msdn.microsoft.com/ZH-TW/library/office/mt561423.aspx">測試</a>。</p>
<p>確保您增益集能預期運作， 請參閲<a href="https://msdn.microsoft.com/ZH-TW/library/office/dn535871.aspx">指定 Office 主機和 API 需求</a>。</p>
<h3 id="taipei2016-api-reference-cn">API 參照</h3>
<p>在參考範例的同時把<a href="https://msdn.microsoft.com/ZH-TW/library/office/jj220074.aspx">Office 增益集 API 與結構描述參考</a> （或比如<a href="https://msdn.microsoft.com/ZH-TW/library/office/mt616490.aspx">Excel 增益集 JavaScript API 參考</a> ） 與參考範例來進行對照能加快您對Office增益集的入門。</p>
<h3 id="taipei2016-api-samples-cn">Office 增益集代碼範例</h3>
<p><a href="https://dev.office.com/blogs/Add-in-Samples-Have-Moved-To-GitHub">Add-in samples have moved to GitHub</a></p>
<p><a href="https://github.com/OfficeDev">Office Developer on GitHub</a></p>
<p><a href="https://dev.office.com/code-samples">Office Dev Center  </a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/mt616484.aspx">Excel add-in code samples </a></p>
<p><a href="https://github.com/OfficeDev/Word-Add-in-ClauseLibrary-Code-Sample">Word-Add-in-ClauseLibrary-Code-Sample</a></p>
<p><a href="https://github.com/OfficeDev/office-js-docs">Office JavaScript APIs on GitHub</a></p>
<p><a href="https://dev.outlook.com/MailAppsGettingStarted/GetStarted">Get Started with Outlook add-ins for Office 365</a></p>
<h3 id="taipei2016-api-exercises-cn">演練</h3>
<p>用<a href="/uploads/ColorizerVS.zip">Excel Colorizer Add-in for Excel 2016</a>來演練Excel add-in JavaScript API。以下練習可以給您擴展Excel Colorizer Add-in for Excel 2016一些提示與啓發:</p>
<ol>
<li>添加 [Pattern]選項: [Square Waves] (方波)。 波的振幅和週期應由現有的[Pattern Contrast %] (對比)和 [Pattern Waves] (週期)來控制。這項練習包括以下:
<ol type="a">
<li>調整 [Pattern] (模式類型) 的下拉式列示方塊UI。</li>
<li>調整現有的 JavaScript 代碼來顯示 [Pattern Contrast %] 和 [Pattern Waves] 。</li>
<li>添加必要的代碼來生成方波。</li>
</ol>
</li>
<li>添加一個新功能。當啟用時，在被選範圍標題之後的第一行開始, 在表格最左側列中添加連續數字（編號）。把這些數字顯示爲黑色和粗體。這項練習包括以下:
<ol type="a">
<li>添加新的核取方塊控制項目來啓用此功能。</li>
<li>用 <a href="https://msdn.microsoft.com/EN-US/library/office/mt616490.aspx">Excel add-ins JavaScript API</a>來 覆蓋儲存格的文本及填上正確的數字（編號）。</li>
<li>用 <a href="https://msdn.microsoft.com/EN-US/library/office/mt616490.aspx">Excel add-ins JavaScript API</a>來正確設置儲存格的格式，使字體爲黑色及粗體。</li>
</ol>
</li>
<li>添加一個新功能。爲被選範圍添加邊框。此練習需要一個新的下拉式列示方塊。設置選項: None （無邊框）、Outer（外邊框）、 Inner（內邊框）、Outer and Inner （外内框都有） 。使外邊框比內邊框粗兩倍。這項練習包括以下:
<ol type="a">
<li>添加新的下拉式列示方塊及設置選項， None （無邊框） 為預設選項。</li>
<li>用 <a href="https://msdn.microsoft.com/EN-US/library/office/mt616490.aspx">Excel add-ins JavaScript API</a>來添加所需的代碼及根據用戶的選項 來顯示邊框。</li>
</ol>
</li>
</ol>
<h3 id="taipei2016-api-resources-cn">資源</h3>
<p><a href="https://msdn.microsoft.com/ZH-TW/library/office/mt561423.aspx">疑難排解與使用 Office 增益集的使用者錯誤</a></p>
<p><a href="https://msdn.microsoft.com/zh-tw/library/office/mt484317.aspx">Design and UI 設計與互動模式</a></p>
</div>
<div id="taipei2016-curriculum-publishing-cn" class="tab-content" style="display: none;">
<h2>發佈</h2>
<p>本案例演示從美國西岸來發佈 Excel Colorizer Add-in for Excel 2016 增益集及提交至Office 市集的步驟， 使用的開發工具是Visual Studio Community 2015。微軟 Azure 爲承載 Excel Colorizer 的主機平臺。</p>
<p>如果您要按照自己的情況來發佈您的Office增益集，請參閲MSDN 資源 > <a href="https://msdn.microsoft.com/zh-tw/library/office/fp123515.aspx">發佈</a>。</p>
<h3>本文内容</h3>
<ol>
<li><a target="_self" href="#taipei2016-publishing-decide-end-point-cn">決定發佈Office 增益集的通訊端點</a></li>
<li><a target="_self" href="#taipei2016-publishing-set-up-dev-computer-cn">爲開發而設定電腦：安裝.NET 的Azure SDK (英文)，訂閲Azure賬戶， 及使用Office 2016</a></li>
<li><a target="_self" href="#taipei2016-publishing-create-azure-website-cn">在Azure中建立網站</a></li>
<li><a target="_self" href="#taipei2016-publishing-publish-add-in-azure-cn">Office 增益集發佈到 Azure 網站</a></li>
<li><a target="_self" href="#taipei2016-publishing-edit-addin-manifest-cn">使增益集資訊清單檔案指向在Azure的Office 增益集</a></li>
<li><a target="_self" href="#taipei2016-publishing-run-addin-cn">在Office客戶端應用程序里運行Office增益集</a></li>
<li><a target="_self" href="#taipei2016-publishing-submit-to-office-store-cn">把增益集提交到Office市集</a></li>
<li><a target="_self" href="#taipei2016-publishing-publishing-resources-cn">資源</a></li>
</ol>
<h3 id="taipei2016-publishing-decide-end-point-cn">決定發佈Office 增益集的通訊端點</h3>
<p>決定發佈Office 增益集的通訊端點:</p>
<ol type="a">
<li>Office 市集</li>
<li>SharePoint 上的 Office 增益集目錄</li>
<li>Exchange 目錄</li>
<li>網路共用的資料夾增益集目錄</li>
</ol>
<p>本案例演示如何將Office增益集發佈到<a href="https://msdn.microsoft.com/ZH-TW/library/office/dn622055.aspx">微軟 Azure</a>，<a href="https://msdn.microsoft.com/zh-tw/library/office/jj220037.aspx">然後提交至Office 市集</a>。</p>
<h3 id="taipei2016-publishing-set-up-dev-computer-cn">爲開發而設定電腦：安裝.NET 的Azure SDK (英文)，訂閲Azure賬戶， 及使用Office 2016</h3>
<ol>
<li>在<a href="http://azure.microsoft.com/en-us/downloads/">Azure 下載頁面</a>安裝爲.NET 的Azure SDK (英文) 。本案例使用免費的<a href="https://www.microsoft.com/en-us/download/details.aspx?id=48146">Microsoft Visual Studio Community 2015</a>。
<ol type="a">
<li>在 [語言]，選擇[.NET]。 </li>
<li>如果您已安裝的Visual Studio ，選擇符合您的Visual Studio版本的Azure .NET SDK            版本。 </li>
<li>當詢問您是否要執行或儲存安裝可執行檔時，請選擇 [執行]。 </li>
<li>在 Web 平台 Installer 視窗中，選擇 [安裝]。 </li>
</ol>
</li>
<li>安裝Office 2016或更新Office 2013 。Excel Colorizer 增益集衹限于在Excel 2016上運行。
<br />
<table class="tableWithBorders tableFirstRowBold">
<tr><th>注意事項</th></tr>
<tr><td>您可以取得<a href="http://office.microsoft.com/en-us/try/?WT.intid1=ODC_ENUS_FX101785584_XT104056786">1 個月的Office試用版本</a>。</td></tr>
</table>
</li> 
<li>取得Azure的帳戶。
<br />
<table class="tableWithBorders tableFirstRowBold">
<tr><th>注意事項</th></tr>
<tr><td>如果您是 Microsoft Developer Network (MSDN) 訂閱者<a href="http://www.windowsazure.com/en-us/pricing/member-offers/msdn-benefits/">Azure的 訂閱是MSDN訂閲的一部分</a>。</td></tr>
<tr><td>如果您不是 MSDN 訂閱者，您仍然可以在<a href="https://azure.microsoft.com/en-us/pricing/free-trial/">Windows Azure網站上取得免費Azure試用版</a>。</td></tr>
</table>
</li> 
</ol>
<h3 id="taipei2016-publishing-create-azure-website-cn">在Azure中建立網站</h3>
<p>建立空白的Azure網站有幾種方式。如果您使用 Visual Studio Community 2015，請遵循從Visual Studio IDE 中建立Azure網站從中的步驟。</p>
<p>使用Visual Studio 2015 或免費版本來建立空白的Azure網站。</p>
<ol>
<li>在 Visual Studio的[檢視] 功能表中選擇 [伺服器檔案總管] ，按一下滑鼠右鍵 [Azure] 并選擇 [連接到 Microsoft Azure 訂閱] 。遵循指示連線您的 Azure 訂閱。 </li>
<li>在Visual Studio，[伺服器檔案總管] 中展開Azure、滑鼠右鍵按一下[應用程式服務]，然後選擇[建立新的 Web 應用程式]。 </li>
<li>在 [ Windows Azure 上建立 Web 應用程式] 對話方塊中，提供此資訊： 
<ul>
<li>輸入您網站的唯一的 [Web 應用程式名稱]。Azure驗證 azurewebsites.net 是網域内唯一的網站名稱。 </li>
<li>選擇 您使用授權建立此網站的[應用程式服務計劃]。如果您建立新的計劃，您也需要命名它。 </li>
<li>選擇您的網站之[資源群組]。如果您建立新的群組，您也需要 命名它。 </li>
<li>選擇適合您的[地理區域]。 </li>
<li>針對[資料庫伺服器]： 接受預設值[沒有資料庫]，然後選擇 [建立]。 </li>
<li class="noStyleUL">新的網站會出現 在被選擇的資源群組下: 從[伺服器總管]進入 > [ Azure] > [應用程式服務]。</li>
</ul>
</li>
<li>滑鼠右鍵按一下 新增的網站，然後選擇 [瀏覽器中的檢視]。瀏覽器中開啟并顯示網頁及此訊息"此網站已成功建立"。 </li>
<li>在瀏覽器網址列中，更變網站的 URL讓其使用HTTPS，按[Enter] ，并確認已啟用 HTTPS 通訊協定。Office 增益集模型需要增益集使用 HTTPS 通訊協定。 </li>
<li>在Visual Studio 2015中，以滑鼠右鍵按一下[伺服器檔案總管]中的新網站，并選擇 [下載發佈設定檔]，然後將該設定檔儲存到電腦。發佈設定檔有您的認證并可讓您在 Azure 網站上發佈您的 Office 增益集。 </li>
</ol>
<h3 id="taipei2016-publishing-publish-add-in-azure-cn">Office 增益集發佈到Azure 網站</h3>
<ol>
<li>把增益集在Visual Studio中開啟，展開 [方案總管中]的 解決方案節點，您會看到兩個專案的解決方案。 </li>
<li>以滑鼠右鍵按一下Web 專案，然後選擇 [發佈] 。 
<br />
Web 專案會有Office 增益集網站檔案, 所以這是您發佈到Azure的專案。 </li>
<li> 在[發佈網站]，選擇 [匯入]。 </li>
<li>[匯入發佈設定] 中選擇 [瀏覽] ，然後瀏覽至您儲存發佈設定檔本主題中前面的地方。選擇[確定]以匯入您的設定檔。 </li>
<li>在[發佈網站]、 [連線] 索引標籤中接受預設值并選擇 [下一步]。 
<br />
再一次選擇 [下一步] >接受預設設定。 </li>
<li>在 [預覽]標籤上選擇 [啟動預覽]。預覽會顯示所有將發佈至 Azure 網站的Web專案及其檔案。 </li>
<li>選擇 [發佈]。Visual Studio將Office 增益集 的web 專案發佈到Azure 網站。 </li>
<li>在Visual Studio完成發佈 web 專案后、 瀏覽器中開啟并顯示網頁及文字"此 web 應用程式已成功建立"。 這是網站目前的預設的頁面。 </li>
<li class="noStyleUL">若 要查看 增益集的 網頁，更變URL 及使用 https: 并加上增益集的預設HTML頁面的路徑。例如，更變的 URL 看起來應類似https://YourDomain.azurewebsites.net/Addin/Home/Home.html。這會確認增益集的 網站現在已裝載於Azure。拷貝此 URL，因為編輯增益集資訊清單檔案時會需要它。  </li>
</ol>
<h3 id="taipei2016-publishing-edit-addin-manifest-cn">使增益集資訊清單檔案指向在Azure的Office 增益集</h3>
<ol>
<li>在Visual Studio 中把Office 增益集打開，在[方案總管中]展開解決方案以便顯示這兩個專案。 </li>
<li>打開增益集資訊清單。 </li>
<li>針對[來源位置]：輸入增益集的主要HTML頁面上的URL。例如在發佈增益集之後，在上一個步驟中拷貝的 URL https://YourDomain.azurewebsites.net/Addin/Home/Home.html. 儲存此咨詢清單。 </li>
</ol>
<h3 id="taipei2016-publishing-run-addin-cn">在Office客戶端應用程序里運行Office增益集</h3>
<p>您的源位置已經從本地服務器的測試環境轉變成在Azure中的網站網址。運行Office增益集及進行測試。本Colorizer增益集衹限于在Excel 2016, Excel Online 中運行。</p>
<h3 id="taipei2016-publishing-submit-to-office-store-cn">把增益集提交至Office市集</h3>
<h4>一般在提交增益集之前，請參閲以下文章：</h4>
<p><a href="https://msdn.microsoft.com/zh-tw/library/office/jj220037.aspx">提交Office 與 SharePoint 增益集和 Office 365 web 應用程式至Office 市集</a></p>
<p><a href="https://msdn.microsoft.com/ZH-TW/library/office/dn356576.aspx">提交Office 與 SharePoint 增益集和 Office 365 web 應用程式送至買方儀表板的檢查清單</a></p>
<p><a href="https://msdn.microsoft.com/ZH-TW/library/office/jj591603.aspx">提交Office 市集應用程式和增益集的常見問題</a></p>
<p><a href="https://msdn.microsoft.com/ZH-TW/library/office/jj220035.aspx">提交到 Office 市集的應用程式和增益集的驗證原則(第 1.9 版)</a></p>
<p><a href="https://msdn.microsoft.com/ZH-TW/library/office/fp161044.aspx">Office 增益集的 XML 資訊清單</a></p>
<p><a href="https://msdn.microsoft.com/ZH-TW/library/office/dn535869.aspx">更新Office JavaScript API及資訊清單結構描述檔案的版本</a></p>
<p><a href="https://msdn.microsoft.com/ZH-TW/library/office/dn221992.aspx">從內容傳遞網路 (Content Delivery Network)來 引用 Office 程式庫的 JavaScript API</a></p>
<h4>發佈 Excel Colorizer Add-in for Excel 2016進行了以下事項:</h4>
<ol>
<li>把增益集送至 Office 市集，請使用 <a href="https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=12&ct=1434731402&rver=6.4.6456.0&wp=MBI_SSL_SA&wreply=https://sellerdashboard.microsoft.com/Wlid/AfterLogin?returnUrl=https://sellerdashboard.microsoft.com/?culture=en-US&lc=1033&id=284543">Microsoft賣方儀表板</a>。
<br />
首先您必須建立個人或公司帳戶。如果有必要建立賣方賬戶，請參考<a href="https://sellerdashboard.microsoft.com/Registration">建立賣方帳戶并新增支付額資訊</a>。
<br />
本演示創建了個人帳戶來發佈Office增益集。因爲增益集爲免費，買方賬戶沒有建立。
<br />
填寫賬戶信息， 提交并等待批准。</li>
<li>提交準備圖示、應用程式 (增益集) 徽標、 螢幕截圖、 隱私和支援語句的HTML 文件。
<br />
圖像的尺寸，參閲<a href="https://msdn.microsoft.com/ZH-TW/library/office/dn356576.aspx">提交Office 與 SharePoint 增益集和 Office 365 web 應用程式送至買方儀表板的檢查清單</a> 。</li>
<li>圖示、 隱私和支援的聲明 (.html 文件) 發佈到 Azure 帳戶。</li>
<li>清單中, 除了預設元素，Excel Colorizer 增益集添加了 IconUrl、 SupportUrl 和必須要求的元素（Excel Colorizer 增益集使用Excel 新的API, 并且衹限于在Excel 2016 或上綫版本中運行）。清單架構檔的版本為1.1。
<br />
<table class="tableWithBorders tableFirstRowBold">
<tr><th>注意事項</th></tr>
<tr><td>每個增益集都不同， 為確保增益集按預期方式工作，請參閲 <a href="https://msdn.microsoft.com/ZH-TW/library/office/dn535871.aspx">指定 Office 主機和 API 需求</a>和<a href="https://msdn.microsoft.com/ZH-TW/library/office/mt590206.aspx">設定 office 增益集 (英文) 需求</a> 。</td></tr>
</table>
</li>
<li>如果在增益集中使用 Office JavaScript API，您必須<a href="https://msdn.microsoft.com/ZH-TW/library/office/dn221992.aspx">參照從CDN URL Microsoft 主控的 Office.js 檔案</a>。不要在增益集中包含 Office.js 檔案的複本或參照其它地方主控之檔案的複本。</li>
<li> Visual Studio中，驗證增益集資訊清單， 點擊組建 > [發佈] > [執行驗證檢查] 。</li>
<li>登入到 Microsoft 賣方儀表板并添加應用程式（增益集）。
<ul>
<li>輸入版本編號。在賣方儀表板中提交的版本編號必須與增益集資訊清單里的版本編號相同。例如:
<br />
賣方儀表板: 1.0.0.0
<br />
增益集資訊清單：1.0.0.0</li>
<li>上傳截圖和 App 徽標。</li>
<li> 上傳應用程式套裝軟體，也就是應用程式（增益集）的資訊清單。</li>
<li>提供支援和隱私的 URL。支援語句里并有聯絡信息（聯絡信息也可以在增益集里）。聯絡信息可以是以下任何一項或全部: 電子郵件地址、 電話號碼、 連絡人單表，有效的社會媒體連接 (例如Facebook 或 Twitter 上和您接觸的 URL) 或其它評論交流形式。</li>
</ul>
</li>
<li>交您的應用程式 (增益集)，并等待批准。</li>
<li>提交了增益集之後，如果它沒有通過Office 市集的批准，您將會收到一份說明哪些項目需要更改的驗證測試報告。這份驗證測試報告是根據<a href="https://msdn.microsoft.com/ZH-TW/library/office/jj220035.aspx">提交 應用程式和增益集至Office 市集的驗證原則 (第 1.9 版)</a>而進行的測試。在進行更改后，您可再次提交增益集。 </li>
</ol>
<h3 id="taipei2016-publishing-publishing-resources-cn">資源</h3>
<p><a href="https://msdn.microsoft.com/ZH-TW/library/office/jj220082.aspx#StartBuildingApps_PublishingBasics">發佈的基本概念</a></p>
<p><a href="https://msdn.microsoft.com/ZH-TW/library/office/dn622055.aspx#bk_usingVS2013">Office 增益集在 Microsoft Azure 主機上</a></p>
<p><a href="https://msdn.microsoft.com/zh-tw/library/office/jj220037.aspx">提交Office 與 SharePoint 增益集和 Office 365 web 應用程式至Office市集</a></p>
</div>
</div>
<div id="taipei2016-english-curriculum" style="display: none;">
<ul class="tabs left curriculumList">
<li class="first current"><a target="_self" href="#taipei2016-curricilum-welcome-en"><h6>Welcome</h6></a></li>
<li id="taipei2016-curriculum-overview-en-tab"><a target="_self" href="#taipei2016-curriculum-overview-en"><h6>Overview</h6></a></li>
<li id="taipei2016-curriculum-registration-en-tab"><a target="_self" href="#taipei2016-curriculum-registration-en"><h6>Registration</h6></a></li>
<li id="taipei2016-curriculum-napa-en-tab"><a target="_self" href="#taipei2016-curriculum-napa-en"><h6>Napa</h6></a></li>
<li id="taipei2016-curriculum-vs2015-en-tab"><a target="_self" href="#taipei2016-curriculum-vs2015-en"><h6>Visual Studio 2015</h6></a></li>
<li id="taipei2016-curriculum-api-en-tab"><a target="_self" href="#taipei2016-curriculum-api-en"><h6>API tutorial</h6></a></li>
<li id="taipei2016-curriculum-publishing-en-tab"><a target="_self" href="#taipei2016-curriculum-publishing-en"><h6>Publishing</h6></a></li>
<li class="taipei1016-eng float-right"><a href=""><h6>English</h6></a></li>
<li class="taipei2016-cn float-right last"><a href=""><h6>汉语</h6></a></li>
</ul>
<div id="taipei2016-curricilum-welcome-en" class="tab-content">
<p>Welcome to the Office Add-in training curriculum! Follow the modules to learn about the end-to-end process of developing and publishing an add-in to extend Office.</p>
<p>If you don\'t already have Office, sign up with <a href="http://dev.office.com/devprogram">Office Dev Center</a> by clicking <strong>Dev Program sign up</strong> to get an Office 365 developer account and receive a one-year, free subscription for an Office 365 Development instance. See <a  class="welcomeTab" data-tabId="taipei2016-curriculum-registration-en-tab" href="">Registration</a> for details.</p>
<ol class="tabs">
<li class="welcomeTab" data-tabId="taipei2016-curriculum-overview-en-tab"><a href="">Office Add-ins platform overview</a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-registration-en-tab"><a href="">Registration</a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-napa-en-tab"><a href="">Napa Office 365 Development Tools</a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-vs2015-en-tab"><a href="">Visual Studio Community 2015</a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-api-en-tab"><a href="">API tutorial</a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-publishing-en-tab"><a href="">Publishing</a></li>
</ol>
</div>
<div id="taipei2016-curriculum-overview-en" class="tab-content" style="display: none;">
<h2>Office Add-ins platform overview</h2>
<h3>Topics</h3>
<ul>
<li><a target="_self" href="#taipei2016-what-is-office-addin-en">What is an Office Add-in?</a></li>
<li><a target="_self" href="#taipei2016-anatomy-of-an-office-addin-en">Anatomy of an Office Add-in</a></li>
<li><a target="_self" href="#taipei2016-types-of-office-addins-en">Types of Office Add-ins</a></li>
<li><a target="_self" href="#taipei2016-scenarios-en">Scenarios</a></li>
<li><a target="_self" href="#taipei2016-office-apps-that-support-addins-en">Office applications that support Office Add-ins</a> </li>
<li><a target="_self" href="#taipei2016-development-life-cycle-en">Development life cycle</a></li>
<li><a target="_self" href="#taipei2016-resources-en">Resources</a></li>
</ul>
<h3 id="taipei2016-what-is-office-addin-en">What is an Office Add-in?</h3>
<p>An Office Add-in is a web application hosted in a browser control or iframe running in the context of an Office application. There are several ways to developer an Office Add-in.</p>
<ul>
<li>You can create a simple Office Add-in by using <a href="https://www.napacloudapp.com/Getting-Started">Napa Office 365 Development Tools web app</a>.</li>
<li>You can use the free <a href="https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx">Visual Studio Community 2015</a> along with <a href="https://www.visualstudio.com/features/office-tools-vs">Office Developer Tools</a>.</li>
<li>You can also use <a href="https://msdn.microsoft.com/en-us/library/office/mt628821.aspx">text editor to create Office Add-ins</a>.</li>
</ul>
<h3 id="taipei2016-anatomy-of-an-office-addin-en">Anatomy of an Office Add-in</h3>
<p>The basic components of an Office Add-in are an XML manifest file and the default webpage of your add-in.</p>
<figcaption>Manifest + webpage = an Office Add-in</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-15.jpg" />
<p>The manifest specifies settings and capabilities of the add-in, such as the following:</p>
<ul>
<li>The URL of the webpage that implements the add-in\'s UI and programming logic.</li>
<li>The add-in\'s display name, description, ID, version, and default locale.</li>
<li>How the add-in activates and displays: 
<ul>
<li>For add-ins that interact with documents: as a task pane, or in line with document content.</li>
<li>For add-ins that interact with mail items (messages or appointments): when reading or composing the item.</li>
</ul>
</li>
<li>The permission level and data access requirements for the add-in.</li>
</ul>
<h3 id="taipei2016-types-of-office-addins-en">Types of Office Add-ins</h3>
<p>There are three types of Office Add-ins: task pane, content, and Outlook.</p>
<h3>Task pane add-ins (Word, Excel, and PowerPoint Add-ins that extend functionality)</h3>
<p>You can add new functionality to Word, Excel, or PowerPoint by registering your add-in using a <a href="http://dev.office.com/docs/add-ins/design/add-in-commands-for-excel-and-word-preview">task pane add-in manifest</a>. This manifest supports two integration modes:</p>
<ul>
<li>Add-in commands</li>
<li>Insertable task panes</li>
</ul>
<h4>Add-in commands</h4>
<p>Use add-in commands to extend the user interface of Office for Windows Desktop and Office Online. For example, you can add uttons for your add-ins on the ribbon or selected contextual menus, allowing users to easily access their add-ins within Office. Command buttons can launch the different actions such as showing a pane (or multiple panes) with a custom HTML or executing a JavaScript function. We recommend that you <a href="https://channel9.msdn.com/Events/Visual-Studio/Connect-event-2015/316">watch this Channel9 video</a> for a deeper overview of this feature.</p>
<figcaption>Add-in with commands running in Excel Desktop </figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-14.jpg" />
<figcaption>Add-in with commands running in Excel Online </figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-16.jpg" />
<p>You can define your commands in your add-in manifest by using VersionOverrides. The Office platform takes care of interpreting them into native UI. To get started, check out these <a href="https://github.com/OfficeDev/Office-Add-in-Commands-Samples/">samples on GitHub</a>, and see <a href="http://dev.office.com/docs/add-ins/design/add-in-commands-for-excel-and-word-preview">Add-in commands for Excel, Word, and PowerPoint</a></p>
<h4>Insertable Taskpanes</h4>
<p>Clients that do not support add-in commands yet (Office 2013, Office for Mac and Office for IPad) will run your add-in as a Task pane using the DefaultUrl provided in the manifest. The add-in can then be launched via the My Add-ins menu from the Insert Tab. </p>
<table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</th></tr>
<tr><td>A single manifest can have both a task pane add-in that runs in clients that do not support commands and a version that runs with commands. This allows you to have a single add-in that works across all clients that support Office Add-ins.</td></tr>
</table>
<p>Task pane add-ins work side-by-side with an Office document, and let you supply contextual information and functionality to enhance the document viewing and authoring experience. For example, a task pane add-in can look up and retrieve product information from a web service based on the product name or part number selected in the document.</p>
<figcaption>Task pane add-ins</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-2.png" />
<p>To try out a task pane add-in in Excel 2013, Excel Online, or Word 2013, install the <a href="https://store.office.com/wikipedia-WA104099688.aspx?assetid=WA104099688">Wikipedia</a> add-in.</p>
<h3>Content add-ins</h3>
<p>Content add-ins integrate web-based features as content that shown in line with the body of a document. Content add-ins let you integrate rich, web-based data visualizations, embedded media (such as a YouTube video player or a picture gallery), as well as other external content.</p>
<figcaption>Content add-ins</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-3.png" />
<p>To try out a content add-in in Excel 2013 or Excel Online, install the <a href="https://store.office.com/bing-maps-WA102957661.aspx?assetid=WA102957661">Bing Maps</a> add-in.</p>
<h3>Outlook add-ins</h3>
<p>Outlook add-ins display next to an Outlook item when you\'re viewing or composing it. They can work with an email message, meeting request, meeting response, meeting cancellation, or appointment in a read scenario – the user viewing a received item – or in a compose scenario – the user replying or creating a new item.</p>
<p>To learn more, see <a href="http://dev.office.com/docs/add-ins/outlook/outlook-add-ins">Outlook add-ins</a></p>
<table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</th></tr>
<tr><td>Outlook add-ins require a minimum version of Exchange 2013 or Exchange Online to host the user’s mailbox. POP and IMAP email accounts aren\'t supported.</td></tr>
</table>
<figcaption>An add-in with command buttons on the ribbon</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-17.jpg" />
<figcaption>Outlook add-in in a read scenario</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-4.png" />
<p>To try out an Outlook add-in in Outlook, Outlook for Mac, or Outlook Web App, install the <a href="https://store.office.com/package-tracker-WA104162083.aspx?assetid=WA104162083">Package Tracker</a> add-in.</p>
<h3 id="taipei2016-scenarios-en">Scenarios</h3>
<ul>
<li><strong>Translation wizard</strong>—A Word task pane add-in that automatically translates selected text from the document language to another language selected from a drop-down list.</li>
<li><strong>Chart creation</strong>—An Excel content add-in that builds a chart automatically from selected data.</li>
<li><strong>Third-party service integration</strong>—A Word or Excel task pane add-in that automatically displays the Wikipedia page that corresponds to selected text.</li>
<li><strong>Rich mash-ups</strong>—A Bing map content add-in in Excel that plots the offshore equipment and resource locations for a petroleum company, including getting this information in real time from the company resource-management system.</li>
<li><strong>Spec validation</strong>—A section or paragraph of a design specification for an aircraft component is flagged as outdated, because a Word task pane add-in that communicates with a business system to validate the contents against the latest spec.</li>
<li><strong>Kicking off workflows</strong>—An Outlook add-in can assist creating a message or meeting request based on templates, inserting meeting location details or user’s choice of a signature, and attaching related documents.</li>
<li><strong>Order details surfaced in context</strong>—An Outlook add-in that detects a purchase order number or customer number embedded in an email message can present details of the order or customer in the message. This could include an action to take, such as approval.</li>
</ul>
<h3 id="taipei2016-office-apps-that-support-addins-en">Office applications that support Office Add-ins</h3>
<table class="striped">
<tr><th>Office application</th><th>Content add-ins</th><th>Outlook add-ins</th><th>Task pane add-ins</th></tr>
<tr><td>Access web apps</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Excel 2013 or later</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Excel Online  </td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Excel for iPad  </td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Outlook 2013 or later</td><td>&nbsp;</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td></tr>
<tr><td>Outlook for Mac </td><td>&nbsp;</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td></tr>
<tr><td>Outlook Web App</td><td>&nbsp;</td><td><i class="fa fa-check"></i></td><td></td&nbsp;></tr>
<tr><td>OWA for Devices</td><td>&nbsp;</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td></tr>
<tr><td>PowerPoint 2013 or later</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>PowerPoint Online</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Project 2013 or later</td><td>&nbsp;</td><td>&nbsp;</td>&nbsp;<td><i class="fa fa-check"></i></td></tr>
<tr><td>Word 2013 or later</td><td>&nbsp;</td><td>&nbsp;</td>&nbsp;<td><i class="fa fa-check"></i></td></tr>
<tr><td>Word Online</td><td>&nbsp;</td><td>&nbsp;</td>&nbsp;<td><i class="fa fa-check"></i></td></tr>
<tr><td>Word for iPad</td><td>&nbsp;</td><td>&nbsp;</td>&nbsp;<td><i class="fa fa-check"></i></td></tr>
</table>
<h3 id="taipei2016-development-life-cycle-en">Development lifecycle</h3>
<p>Plan the end-to-end process for developing task pane, content, and Outlook add-ins to extend Office applications.</p>
<ol>
<li>Decide on the purpose of the add-in. </li>
<li>Identify the data and data source for the add-in. </li>
<li>Identify the type of add-in and Office host applications that best support the purpose of the add-in. </li>
<li>Design and implement the user experience and user interface for the add-in. </li>
<li>Create an XML manifest file based on the Office Add-ins manifest schema. </li>
<li>Install and test the add-in. </li>
<li>Publish the add-in. </li>
<li>Updating the add-in </li>
</ol>
<h3 id="taipei2016-resources-en">Resources</h3>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj220082.aspx">Office Add-ins platform overview</a></p>
<p><a href="https://dev.office.com/getting-started/addins">Getting started with Office Add-ins</a></p>
<p><a href="https://code.visualstudio.com/Docs/runtimes/office">Office Add-ins with VS code</a></p>
<p><a href="https://github.com/OfficeDev">Office Developer code samples</a></p>
</div>
<div id="taipei2016-curriculum-registration-en" class="tab-content" style="display: none;">
<h2>Registration</h2>
<h3>Topics</h3>
<ol>
<li><a target="_self" href="#taipei2016-sign-up-at-office-dev-cenbter-en">Sign up with Office Dev Center</a></li>
<li><a target="_self" href="#taipei2016-join-dev-program-en">Get an Office 365 developer account</a></li>
<li><a target="_self" href="#taipei2016-access-your-office-365-en">Access your Office 365</a></li>
<li><a target="_self" href="#taipei2016-assign-office-365-license-en">Assign Office 365 license</a></li>
<li><a target="_self" href="#taipei2016-registration-resources-en">Resources</a></li>
</ol>
<h3 id="taipei2016-sign-up-at-office-dev-cenbter-en">Sign up with Office Dev Center</h3>
<p>Sign up with <a href="http://dev.office.com/devprogram">Office Dev Center</a> to get a free Office 365 developer account and receive a one-year, free subscription for an Office 365 Development instance.  </p>
<figcaption>Figure 1. Office 365 Dev Program</figcaption>
 <img src="../uploads/office-web-curriculum-taipei-en-5.png" />
<h3 id="taipei2016-join-dev-program-en">Get an Office 365 developer account</h3>
<ol>
<li>You will receive an email from the Office 365 Developer Program. Scroll down the email, click on the provided link to sign up for a free Office 365 developer account.</li>
<li>The first page (not shown) of the signup form is self-explanatory. Just supply the information about yourself that is requested and choose <strong>Next</strong>.</li>
<li>On the second page, shown in Figure 2, specify a user ID for the administrator of the subscription. </li>
</ol>
<figcaption>Figure 2. Office 365 Developer Site domain name</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-6.png" />
<p>4. Create a subdomain of <strong>.onmicrosoft.com</strong></p>
<p class="indentP"> After signup, you have to use the resulting credentials (in the format <a href="mailto:UserID@yourdomain.onmicrosoft.com">UserID@yourdomain.onmicrosoft.com</a>) to sign in to your Office 365 portal site where you administer your account. Your SharePoint Online Developer Site is provisioned at your new domain: http://yourdomain.sharepoint.com.</p>
<p>5. Choose <strong>Next</strong> and fill out the final page of the form. If you choose to provide a telephone number to obtain a confirmation code, you can provide a mobile or land line telephone number, but not a VoIP (Voice over Internet Protocol) number.</p>
<table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</tj></tr>
<tr><td><p>If you’re logged on to another Microsoft account when you try to sign up for a developer account, you might get this message: "Sorry, that user ID you entered didn’t work. It looks like it’s not valid. Be sure you enter the user ID that your organization assigned to you. Your user ID usually looks like <i>someone@example.com</i> or <i>someone@example.onmicrosoft.com</i>."</p>
<p>If you see this message, log out of the Microsoft account you were using and try again. If you still get the message, clear your browser cache or switch to InPrivate Browsing and then fill out the form.</p>
</td></tr>
</table>
<p>Once your account is created, you will receive another email that contains a link to access your Office 365.</p>
<h3 id="taipei2016-access-your-office-365-en">Access your Office 365</h3>
<p>Your browser will open the Office 365 installation page. Choose the Admin icon to open the admin center page.</p>
<figcaption>Figure 3. Office 365 admin center page</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-7.png" />
<ol>
<li>You’ll have to wait for your Developer Site to finish provisioning. After provisioning is complete, refresh the admin center page in your browser.</li>
<li>Then, choose the Build Add-ins link to open your Developer Site. You should see a site that looks like the one in Figure 4. There is an Add-ins in Testing list on the page. This confirms that the website was made with SharePoint\'s Developer Site template. If you see a regular team site instead, wait a few minutes and launch your site again.<br />If you do not have the development tool, you will be directed to Add the Napa Office 365 Development Tools. You can use Napa to develop your add-ins on this site.</li>
<li>Make a note of the URL of the site. It is used when you create SharePoint Add-ins projects in Visual Studio.</li>
</ol>
<figcaption>Figure 4. Your Developer Site home page with the Add-ins in Testing list</figcaption>
 <img src="../uploads/office-web-curriculum-taipei-en-8.png" />
<h3 id="taipei2016-assign-office-365-license-en">Assign Office 365 license</h3>
<p><strong>Note:</strong> The following steps are not needed if the Office 365 homepage automatically displays the products that are available for download (See Figure 8). The steps below are based on the Old Office 365 Admin Center.</p> 
<p>To assign Office 365 license for yourself, the active user. Click on the “waffle” icon > Admin icon located on the top left.</p>
<figcaption>Figure 5. Office 365 landing page</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-10.png" />
<p class="indentP">In the left navigation panel, select <strong>Users</strong> > <strong>Active Users</strong> </p>
<p class="indentP">Select yourself by clicking on the checkbox. Your profile will be shown on the right. Click <strong>Edit</strong> under the item: <strong>Assigned license</strong></p>
<figcaption>Figure 6. Office 365 admin center > Active Users</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-11.png" />
<p class="indentP">3. Select your location in the <strong>Set user location</strong> combo box. And select <strong>Microsoft Office 365 Developer</strong>. Click <strong>Save</strong> to finish assigning the license.</p>
<figcaption>Figure 7: Assign license for the active user profile</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-12.png">
<p class="indentP">4. After you’re finished, return to the Office 365 homepage. The page will display the products that are available to you, including the Office web apps. Pull down the page to see the full display.</p>
<figcaption>Figure 8. Office 365</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-13.png" />
<p>To navigate back to the developer site, click on the “waffle” icon (located in the top-left corner) > <strong>Admin</strong> > <strong>Build Apps</strong>.</p>
<h3 id="taipei2016-registration-resources-en">Resources</h3>
<p><a href="https://msdn.microsoft.com/en-us/library/office/dn467914.aspx">Office developer documentation</a></p>
<p><a href="https://msdn.microsoft.com/en-us/library/office/fp179924.aspx#o365_signup">Set up for an Office 365 Developer Site</a></p>
</div>
<div id="taipei2016-curriculum-napa-en" class="tab-content" style="display: none;">
<h2>Napa Office 365 Development Tools</h2>
<h3>Topics</h3>
<ul>
<li> <a target="_self" href="#taipei2016-prerequisites-napa-en">Prerequisites</a></li>
<li><a target="_self" href="#taipei2016-create-office-addins-with-napa-en">Create Office Add-ins with Napa on an Office 365 Developer Site</a></li>
<li><a target="_self" href="#taipei2016-create-excel=addin-with-napa-en">Create a content add-in for Excel with Napa Office 365 Development Tool </a></li>
<li><a target="_self" href="#taipei2016-debug-your-addin-napa-en">Debug your add-in in Internet Explorer </a></li>
<li><a target="_self" href="#taipei2016-resources-napa-en">Resources</a></li>
</ul>
<h3 id="taipei2016-prerequisites-napa-en">Prerequisites</h3>
<p>Join the <a href="http://dev.office.com/devprogram">Office 365 Developer Program</a>. See <a class="welcomeTab" data-tabId="taipei2016-curriculum-registration-en-tab">Registration</a></p>
<table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</th></tr>
<tr><td>If you have Office 365, there\'s an alternate version of <a href="https://www.napacloudapp.com/Getting-Started">Napa</a> that doesn\'t use or require an Office 365 Developer Site. That version supports creating only Office Add-ins using your personal <a href="https://www.microsoft.com/en-us/account/default.aspx">Microsoft account</a>. </td></tr>
</table>
<h3 id="taipei2016-create-office-addins-with-napa-en">Create Office Add-ins with Napa on an Office 365 Developer Site</a></h3>
<p>Napa is a great way to get started building Office Add-ins right in a browser window. You don\'t need to install any tools such as Visual Studio.  All you need is an Office 365 account and a supported browser. (Firefox is the recommended browser for Mac users.)</p>
<p>To get started, sign up for an Office 365 Developer Site. Then, install Napa on your developer site and you are ready to create Office Add-ins.</p>
<ol>
<li>If you’ve completed the steps in Registration, you will have access to the Office 365 Developer Site. Sign in with your credential created in Registration at <a href="http://www.portal.office.com/">www.portal.office.com</a> > Click on <strong>Admin</strong> > <strong>Build Apps</strong> to access your developer site.<br />If you do not have the development tool, you will be directed to <strong>Add</strong> the Napa Office 365 Development Tools.</li>
<li>Click on <strong>Build Apps</strong> on the developer site to open the Napa Office 365 Development Tools web app in your browser.<br /><h3 style="margin-left: -25px" id="taipei2016-create-excel=addin-with-napa-en">Create a content add-in for Excel with Napa Office 365 Development Tool </h3></li>
<li>Open the Napa Office 365 Development Tools web app in your browser and choose the <strong>Add New Project</strong> tile. (The Add New Project tile appears only if you have created other projects.)</li>
<li>Try the tutorial: <a href="https://msdn.microsoft.com/EN-US/library/office/jj220065.aspx">Create a content add-in for Excel with Napa Office 365 Development Tools</a></li>
</ol>
<h3 id="taipei2016-debug-your-addin-napa-en">Debug your add-in in Internet Explorer</h3>
<p>If you start your add-in in Excel Online, and you use Internet Explorer (IE), you can use F12 developer tools to debug the JavaScript, HTML, and Cascading Style Sheets (CSS) of your content add-in. See <a href="https://msdn.microsoft.com/library/bg182326(v=vs.85)">Using the F12 developer tools</a> for more information. If you use a browser other than Internet Explorer, search your browser documentation.</p>
<h3 id="taipei2016-resources-napa-en">Resources</h3>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj220038.aspx">Create Office Add-ins with Napa on an Office 365 Developer Site</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn974046.aspx">Create Office Add-ins with Napa Office 365 Development Tools</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj554660.aspx">Create a task pane add-in with Napa Office 365 Development Tools</a></p>
</div>
<div id="taipei2016-curriculum-vs2015-en" class="tab-content" style="display: none;">
<h2>Visual Studio Community 2015</h2>
<h3>Topics</h3>
<ul>
<li><a target="_self" href="#taipei2016-vs-2015-prerequisites-en">Prerequisites</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-setup-en">Set up your free Visual Studio Community 2015</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-hello-world-en">Build your first Hello World task pane add-in with Visual Studio</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-build-first-excel-addin-en">Build your first Excel add-in</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-debuging-en">Debug in Visual Studio</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-resources-ens-en">Resources</a></li>
</ul>
<h3 id="taipei2016-vs-2015-prerequisites-en">Prerequisites</h3>
<ul>
<li><a href="https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx">Visual Studio community 2015 (free version)</a></li>
<li><a href="https://www.visualstudio.com/features/office-tools-vs">Office Developer Tools</a></li>
<li>Excel 2013 or later and Word 2013 or later for "Build your first Hello World" and extend on your "Hello World" add-in</li>
<li>Excel 2016, Excel Online for "Build your first Excel add-in" (The new API released with Office 2016 has additional functionalities, but works with the latest version of Office or the online version.) </li>
</ul>
<h3 id="taipei2016-vs-2015-setup-en">Set up your free Visual Studio Community 2015</h3>
<p class="indentP">1. If you don\'t have Visual Studio, download <a href="https://go.microsoft.com/fwlink/?LinkId=532606&clcid=0x409">Visual Studio 2015 Community Edition</a> along with <a href="https://www.visualstudio.com/features/office-tools-vs">Office Developer Tools</a>. </p>
<img src="../uploads/office-web-curriculum-taipei-14.png" />
<table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</strong></th>
<tr><td>When you develop and debug an add-in in Visual Studio, Visual Studio deploys and runs your add-in\'s webpage files locally with IIS Express, and doesn\'t require an additional web server. Similarly, when you develop and debug with Napa in the browser, it deploys and runs your add-in\'s webpage files from storage associated with the account you used to sign into Napa.</td></tr>
</table>
<p class="indentP">2. Choose <strong>File</strong> > <strong>New</strong> > <strong>Project</strong>.</p>
<p class="indentP">3. In the <strong>New Project</strong> dialog, choose <strong>Templates</strong> > <strong>Visual C#</strong> > <strong>Office/SharePoint</strong> > <strong>Office Add-in</strong> (or App for Office).</p>
<img src="../uploads/office-web-curriculum-taipei-15.png" />
<p class="indentP">4. Name the project <strong>HelloWorld</strong>, and then choose <strong>OK</strong>.</p>
<p class="indentP">5. Select <strong>Task</strong> pane as the app type and then <strong>Next</strong>.</p>
<p class="indentP">6.  Select <strong>Excel</strong> as the Office application that you want to host your add-in. You can select multiple options, and your add-in will run in any of the selected applications.</p>
<p class="indentP">Visual Studio creates the project, and its files appear in Solution Explorer. The default Home.html page opens in Visual Studio.</p>
<p>If you prefer to use an editor other than Visual Studio, keep in mind you can <a href="https://msdn.microsoft.com/library/office/mt628821.aspx">create an Office add-in using any editor.</a>
<h3 id="taipei2016-vs-2015-hello-world-en">Build your first Hello World task pane add-in with Visual Studio</h3>
<p>Try this tutorial: <a href="https://msdn.microsoft.com/en-us/library/office/fp142161.aspx">Create a task pane or content add-in with Visual Studio</a></p>
<h3 id="taipei2016-vs-2015-build-first-excel-addin-en">Build your first Excel add-in</h3>
<p>Try this tutorial: <a href="https://msdn.microsoft.com/EN-US/library/office/mt616491.aspx">Build your first Excel add-in</a></p>
<p>The new Excel add-in JavaScript API interacts with Excel 2016, and Excel online. If you use Excel 2013 to run your add-in, you will see this error:</p>
<table class="tableWithBorders tableFirstRowBold">
<tr><td>0x800a1391 - JavaScript runtime error: \'Excel\' is undefined</td></tr>
</table>
<p>If you do not have Excel 2016, login to your Office 365 Developer Site, see <a class="welcomeTab" data-tabId="taipei2016-curriculum-registration-en-tab">Registration</a>.  Use the Napa development tool and run your add-in using Excel Online.</p>
<h3 id="taipei2016-vs-2015-debuging-en">Debug in Visual Studio</h3>
<p>Add breakpoints and click <strong>Start Debugging</strong> or press <strong>F5</strong> to start debugging.</p>
<h3 id="taipei2016-vs-2015-resources-en">Resources</h3>
<p><a href="https://dev.office.com/">Office Dev Center</a></p>
</div>
<div id="taipei2016-curriculum-api-en" class="tab-content" style="display: none;">
<h2>API tutorial </h2>
<h3>Topics</h3>
<ul>
<li><a target="_self" href="#taipei2016-api-programming-overview-en">Programming overview</a></li>
<li><a target="_self" href="#taipei2016-api-reference-en">API reference</a></li>
<li><a target="_self" href="#taipei2016-api-samples-en">Samples</a></li>
<li><a target="_self" href="#taipei2016-api-exercises-en">Exercises</a></li>
<li><a target="_self" href="#taipei2016-api-resources-en">Resources</a></li>
</ul>
<h3 id="taipei2016-api-programming-overview-en">Programming overview</h3>
<p>Before you begin writing your add-in, it may be helpful to review <a href="https://msdn.microsoft.com/en-us/library/office/fp160953.aspx">Understanding the JavaScript API for Office</a> and the programming overview for the different types of Office add-in.</p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/mt616487.aspx">Excel</a></p>
<p><a href="http://dev.office.com/docs/add-ins/word/word-add-ins-programming-overview">Word</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/fp161015.aspx">Outlook</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn610884.aspx">PowerPoint</a></p>
<p>Note that if you make use of JavaScript APIs that are only available in some versions of Office; for example, you might use the new JavaScript APIs for Excel in an add-in that runs in Excel 2016, make sure you have Excel 2016 or Excel Online during development and <a href="http://dev.office.com/docs/add-ins/testing/testing-and-troubleshooting">testing</a>. </p>
<p>To ensure that your add-in works as expected, see <a href="https://msdn.microsoft.com/EN-US/library/office/dn535871.aspx">Specify Office hosts and API requirements</a>.</p>
<h3 id="taipei2016-api-reference-en">API reference</h3>
<p>Explore the <a href="https://dev.office.com/reference/add-ins/javascript-api-for-office">JavaScript API for Office reference</a> – or <a href="https://dev.office.com/docs/add-ins/excel/excel-add-ins-javascript-api-reference">Excel add-ins JavaScript API reference</a> for example – along with the code samples may expedite the learning.</p>
<h3 id="taipei2016-api-samples-en">Samples</h3>
<p><a href="https://dev.office.com/blogs/Add-in-Samples-Have-Moved-To-GitHub">Add-in samples have moved to GitHub</a></p>
<p><a href="https://github.com/OfficeDev">Office Developer on GitHub</a></p>
<p><a href="https://dev.office.com/code-samples">Office Dev Center  </a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/mt616484.aspx">Excel add-in code samples </a></p>
<p><a href="https://github.com/OfficeDev/Word-Add-in-ClauseLibrary-Code-Sample">Word-Add-in-ClauseLibrary-Code-Sample</a></p>
<p><a href="https://github.com/OfficeDev/office-js-docs">Office JavaScript APIs on GitHub</a></p>
<p><a href="https://dev.outlook.com/MailAppsGettingStarted/GetStarted">Get Started with Outlook add-ins for Office 365</a></p>
<h3 id="taipei2016-api-exercises-en">Exercises</h3>
<p>Try using the Excel add-in JavaScript API with the <a href="../uploads/ColorizerVS.zip">Excel Colorizer Add-in for Excel 2016</a>.</p>
<p>Use the following tasks as a guide on how you may extend the basic Colorizer:</p>
<ol>
<li>Add another pattern option called Square Waves.  The wave amplitude and cycle are controlled by the existing <strong>Pattern Contrast %</strong> and <strong>Pattern Waves</strong> controls. This task consists of the following:
<ol type="a">
<li>Adjust the UI combo box for the pattern type.</li>
<li>Adjust the existing JavaScript code that determines the visibility for the contrast and cycle controls.</li>
<li>Add the necessary code to generate square waves.</li>
</ol>
</li>
<li>Add a new feature to enumerate the leftmost column in a table. When enabled, consecutive numbers in the leftmost column are added to the selected range starting with the first row after the header. The numbers are black and in bold. This task consists of the following:
<ol type="a">
<li>Add a new checkbox control to enable this new functionality.</li>
<li>Use the <a href="https://msdn.microsoft.com/EN-US/library/office/mt616490.aspx">Excel add-ins JavaScript API</a> to overwrite the cells’ text values with the right numbers.</li>
<li>Use the <a href="https://msdn.microsoft.com/EN-US/library/office/mt616490.aspx">Excel add-ins JavaScript API</a> to format the cells correctly so that fonts are black and in bold.</li>
</ol>
</li>
<li>Add a new feature to create borders for the given selection. This tasks requires a new combo box with the following options: None, Outer, Inner, Outer and Inner. Make the outer border twice as thick as the inner borders. This task consists of the following:
<ol type="a">
<li>Add new combo box with the right values. “None” is selected as default.</li>
<li>Add the required code to create a table based on the specified choice using the <a href="https://msdn.microsoft.com/EN-US/library/office/mt616490.aspx">Excel add-ins JavaScript API</a>.</li>
</ol>
</li>
</ol>
<h3 id="taipei2016-api-resources-en">Resources </h3>
<p><a href="https://dev.office.com/docs/add-ins/testing/debug-add-ins-using-f12-developer-tools-on-windows-10">Testing</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/mt484317.aspx">Design guidelines for Office Add-ins</a></p>
</div>
<div id="taipei2016-curriculum-publishing-en" class="tab-content" style="display: none;">
<h2>Publishing</h2>
<p>This tutorial shows the steps to publish the Excel Colorizer Add-in for Excel 2016 from the west U.S. for distribution in Office Store. Visual Studio Community 2015 is the IDE of choice. Microsoft Azure is the web hosting platform for the Colorizer.  </p>
<p>To publish your add-in using other methods that are specific to your scenario, please see resources on <a href="http://dev.office.com/docs/add-ins/publish/publish">publishing</a>.</p>
<h3>Topics</h3>
<ol>
<li><a target="_self" href="#taipei2016-publishing-decide-end-point-en">Decide on the Office Add-ins distribution end-points</a></li>
<li><a target="_self" href="#taipei2016-publishing-set-up-dev-computer-en">Set up your development computer with Azure SDK for .NET, an Azure subscription, and Office 2016</a></li>
<li><a target="_self" href="#taipei2016-publishing-create-azure-website-en">Create a website in Azure</a></li>
<li><a target="_self" href="#taipei2016-publishing-publish-add-in-azure-en">Publish your Office Add-in to the Azure website</a></li>
<li><a target="_self" href="#taipei2016-publishing-edit-addin-manifest-en">Edit the add-in manifest file to point to the Office Add-in on Azure</a></li>
<li><a target="_self" href="#taipei2016-publishing-run-addin-en">Run the add-in in the Office client application</a></li>
<li><a target="_self" href="#taipei2016-publishing-submit-to-office-store-en">Submit your add-in to the Office Store</a></li>
<li><a target="_self" href="#taipei2016-publishing-publishing-resources-en">Resources</a></li>
</ol>
<h3 id="taipei2016-publishing-decide-end-point-en">Decide on the Office Add-ins distribution end-points</h3>
<p>Decide on the distribution end-points to publish your Office Add-ins:</p>
<ol type="a">
<li>Office Store </li>
<li>Office Add-ins catalog on SharePoint </li>
<li>Exchange catalog</li>
<li>Network shared folder add-in catalog</li>
</ol>
<p>This tutorial uses <a href="http://dev.office.com/docs/add-ins/publish/host-an-office-add-in-on-microsoft-azure">Microsoft Azure</a> to host the add-in and <a href="https://msdn.microsoft.com/en-us/library/office/jj220037.aspx">submit the add-ins to the Office Store for publishing</a>.</p>
<h3 id="taipei2016-publishing-set-up-dev-computer-en">Set up your development computer with Azure SDK for .NET, an Azure subscription, and Office 2016</h3>
<ol>
<li>Install the Azure SDK for .NET from the <a href="http://azure.microsoft.com/en-us/downloads/">Azure downloads page</a>. This tutorial uses the free <a href="https://www.microsoft.com/en-us/download/details.aspx?id=48146">Microsoft Visual Studio Community 2015</a>.</a>
<ol type="a">
<li>Under <strong>Languages</strong>, choose <strong>.NET</strong>.</li>
<li>Choose the version of the Azure .NET SDK that matches your version of Visual Studio, if you already have Visual Studio installed.</li>
<li>When you’re asked whether to run or save the installation executable, choose <strong>Run</strong>.</li>
<li>In the Web Platform Installer window, choose <strong>Install</strong>.</li>
</ol>
</li>
<li>Install Office 2016. (The Colorizer add-in works only in Excel 2016 or Excel Online.)
<br />
<table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</strong></th>
<tr><td><a href="https://products.office.com/en-us/try?legRedir=true&WT.intid1=ODC_ENUS_FX101785584_XT104056786&CorrelationId=cae9f0f9-caf0-411f-b512-426d951c2259">You can get a trial version of Office for one month.</a></td></tr>
</table>
</li> 
<li>Get your Azure account. 
<br />
<table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</strong></th>
<tr><td>If you’re a Microsoft Developer Network (MSDN) subscriber, <a href="http://www.windowsazure.com/en-us/pricing/member-offers/msdn-benefits/">you get an Azure subscription as part of your MSDN subscription</a>.</a></td></tr>
<tr><td>If you\'re not an MSDN subscriber, you can still <a href="https://azure.microsoft.com/en-us/pricing/free-trial/">get a free trial of Azure at the Windows Azure website</a>.</td></tr>
</table>
</li> 
</ol>
<h3 id="taipei2016-publishing-create-azure-website-en">Create a website in Azure</h3>
<p>There are a couple of ways you can create an empty Azure website. If you\'re using Visual Studio 2015 or the free community version, follow the steps below to create an Azure website from within the Visual Studio IDE.</p>
<p><strong>Using Visual Studio Community 2015 </strong></p>
<ol>
<li>In Visual Studio, in the <strong>View</strong> menu choose <strong>Server Explorer</strong>. Right click <strong>Azure</strong> and choose <strong>Connect to Microsoft Azure subscription</strong>. Follow the instructions for connecting to your Azure subscription.</li>
<li>In Visual Studio, in <strong>Server Explorer</strong>, expand <strong>Azure</strong>, right-click <strong>App Service</strong>, and then choose <strong>Create New App Service</strong>.</li>
<li>In the <strong>Create Web App on Windows Azure</strong> dialog box, provide this information: 
<ul>
<li>Enter a unique <strong>Web App name</strong> for your site. Azure verifies that the site name is unique across the azurewebsites.net domain.</li>
<li>Choose the <strong>App Service plan</strong> you\'re using to authorize creating this website. If you create a new plan, you also need to name it. </li>
<li>Choose the <strong>Resource group</strong> for your site. If you create a new group, you also need to name it.</li>
<li>Choose a geographical <strong>Region</strong> appropriate for you.</li>
<li><strong>For Database server</strong>: accept the default of No database and then choose <strong>Create</strong>.</li>
<li class="noStyleUL">The new website appears under the chosen resource group under <strong>App Service</strong> under <strong>Azure</strong> in <strong>Server Explorer</strong>.</li>
</ul>
</li>
<li>Right-click the new website, and then choose <strong>View in Browser</strong>. Your browser opens and displays a webpage with the message "This web site has been successfully created."</li>
<li>In the browser address bar, change the URL for the website so that it uses HTTPS and press <strong>Enter</strong> to confirm that the HTTPS protocol is enabled. The Office Add-in model requires add-ins to use the HTTPS protocol. </li>
<li>In Visual Studio 2015, right-click the new website in <strong>Server Explorer</strong>, choose <strong>Download Publish Profile</strong> and then save the profile to your computer. The publish profile contains your credentials and enables you to publish your Office Add-in to the Azure website.</li>
</ol>
<h3 id="taipei2016-publishing-publish-add-in-azure-en">Publish your Office Add-in to the Azure website</h3>
<ol>
<li>With your add-in open in Visual Studio, expand the solution node in <strong>Solution Explorer</strong> so that you see both projects for the solution. </li>
<li>Right-click the web project, and then choose <strong>Publish</strong>. 
<br />
The web project contains Office Add-in website files so this is the project that you publish to Azure.</li>
<li>In <strong>Publish Web</strong>, choose <strong>Import</strong>. </li>
<li>In <strong>Import Publish Settings</strong>, choose <strong>Browse</strong>, and then browse to the place where you saved your publish profile earlier in this topic. Choose <strong>OK</strong> to import your profile.</li>
<li>In <strong>Publish Web</strong>, on the <strong>Connection tab</strong>, accept the defaults and choose <strong>Next</strong>. 
<br />
Choose <strong>Next</strong> > again to accept the default settings.</li>
<li>On the <strong>Preview</strong> tab, choose <strong>Start Preview</strong>. The preview shows you all the files in the web project that will be published to the Azure website.</li>
<li>Choose <strong>Publish</strong>. Visual Studio publishes the web project for your Office Add-in to your Azure Web Site. </li>
<li>When Visual Studio finishes publishing the web project, your browser opens and shows a webpage with the text "This web app has been successfully created." This is the current default page for the website.
<br />
To see the webpage for your add-in, change the URL to use https: and add the path of your add-in\'s default HTML page. For example, the changed URL should look like https://YourDomain.azurewebsites.net/Addin/Home/Home.html. This confirms that your add-in\'s website is now hosted on Azure. Copy this URL because you\'ll need it when you edit the add-in manifest file later in this topic. </li>
</ol>
<h3 id="taipei2016-publishing-edit-addin-manifest-en">Edit the add-in manifest file to point to the Office Add-in on Azure</h3>
<ol>
<li>In Visual Studio with the Office Add-in open in <strong>Solution Explorer</strong>, expand the solution so that both projects are shown.</li>
<li>Open the add-in manifest XML file.</li>
<li>For <strong>Source Location</strong>: enter the URL for the add-in\'s main HTML page that you copied in the previous step after you published the add-in, for example, https://YourDomain.azurewebsites.net/Addin/Home/Home.html. </li>
<li class="noStyleUL">Save the manifest file.</li>
</ol>
<h3 id="taipei2016-publishing-run-addin-en">Run the add-in in the Office client application</h3>
<p>By now, your source location has changed from the local server for the testing environment to the website URL in Azure. </p>
<p>Run your add-in in the Office client and test that the add-in is working.</p>
<h3 id="taipei2016-publishing-submit-to-office-store-en">Submit your add-in to the Office Store</h3>
<h4>The recommended reading for submitting your add-in to the Office Store is as follows:</h4>
<p><a href="https://msdn.microsoft.com/en-us/library/office/jj220037.aspx">Submit Office and SharePoint Add-ins and Office 365 web apps to the Office Store</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn356576.aspx">Checklist for submitting Office and SharePoint Add-ins and Office 365 web apps to the Seller Dashboard </a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj591603.aspx">Office Store app and add-in submission FAQ</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj220035.aspx">Validation policies for apps and add-ins submitted to the Office Store (version 1.9)</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/fp161044.aspx#O15AgaveManifestOverview_Samplev1_1">Office Add-ins XML manifest</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn535869.aspx">Update the version of your JavaScript API for Office and manifest schema files</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn221992.aspx">Referencing the JavaScript API for Office library from its content delivery network (CDN)</a></p>
<h4>To publish the Excel Colorizer Add-in for Excel 2016, the following tasks are performed:</h4>
<ol>
<li>To include your app or add-in in the Office Store, submit it to the <a href="https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=12&ct=1434731402&rver=6.4.6456.0&wp=MBI_SSL_SA&wreply=https://sellerdashboard.microsoft.com/Wlid/AfterLogin?returnUrl=https://sellerdashboard.microsoft.com/?culture=en-US&lc=1033&id=284543">Microsoft Seller Dashboard</a>. 
<br />
Create an individual or company account and, if applicable, add payout information. To open an account, see <a href="https://sellerdashboard.microsoft.com/Registration">Create a seller account and add payout information</a>.
<br />
For this tutorial, an individual account is created to publish the add-in. Because the add-in is free, no payout information is provided.
<br />
Fill out the account profile, submit, and wait for the approval. </li>
<li>An icon, App logo, screenshots, and .html files containing privacy and support statements are prepared before the submission. Follow the specifications for the image dimensions in the <a href="https://msdn.microsoft.com/EN-US/library/office/dn356576.aspx">Checklist for submitting Office and SharePoint Add-ins and Office 365 web apps to the Seller Dashboard</a>.</li>
<li>Publish the icon, privacy and support statements to your Azure account.</li>
<li>In the manifest file, add the IconUrl, SupportUrl, and the Requirements elements in addition to the default elements. (The Excel Colorizer uses the new Excel add-in JavaScript APIs that runs in Excel 2016 or Excel Online). The manifest schema version is 1.1.
<br /><table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</strong></th>
<tr><td>Every add-in is different, to ensure that your add-in works as expected, see <a href="https://msdn.microsoft.com/EN-US/library/office/dn535871.aspx">Specify Office hosts and API requirements</a>  and <a href="https://msdn.microsoft.com/EN-US/library/office/mt590206.aspx">Office add-in requirement sets</a>.</td></tr>
</table>
</li>
<li><a href="https://msdn.microsoft.com/en-us/library/dn221992.aspx">Reference the Microsoft hosted Office.js file from its CDN URL</a>. Don\'t include a copy of the Office.js file in your add-in. <a href="https://msdn.microsoft.com/en-us/library/jj591603.aspx">See Office Store app and add-in submission FAQ</a> > How do I reference the JavaScript APIs for Office in my add-ins?</li>
<li>If you’re using Visual Studio, validate the manifest by clicking on <strong>Build</strong> > <strong>Publish</strong> > <strong>Perform Validation Check</strong></li>
<li>Login to the Microsoft Seller Dashboard to add the App. 
<ul>
<li>Enter the version number. The version number submitted via the Seller Dashboard must be the same as that in the add-in manifest. For example:
<br />Seller Dashboard: 1.0.0.0
<br />Add-in Manifest: 1.0.0.0</li>
<li>Upload the screenshots and the App logo.</li>
<li>Upload the app package (i.e. the manifest XML file). </li>
<li>Supply the Support and Privacy Statement URL. Include your contact information in the Support Statement URL or alternatively within your add-in. This can be any or all of the following: email address, phone number, contact form, valid social media link (e.g. a URL to your contact page on Facebook or Twitter), or comments form.</li>
</ul>
</li>
<li>Submit the app and wait for the approval.</li>
<li>After your add-in is submitted, a Validation Test Results report will be returned to you if the add-in is not approved by the Office Store. The validation test is performed based on <a href="https://msdn.microsoft.com/en-us/library/office/jj220035.aspx">Validation policies for apps and add-ins submitted to the Office Store (version 1.9)</a>, and lists the required changes. Make the changes and resubmit your add-in. </li>
</ol>
<h3 id="taipei2016-publishing-publishing-resources-en">Resources</h3>
<p><a href="http://dev.office.com/docs/add-ins/publish/publish">Publishing</a></p>
<p><a href="http://dev.office.com/docs/add-ins/publish/host-an-office-add-in-on-microsoft-azure">Host an Office Add-in on Microsoft Azure</a></p>
<p><a href="https://msdn.microsoft.com/en-us/library/office/jj220037.aspx">Submit Office and SharePoint Add-ins and Office 365 web apps to the Office Store</a></p>
</div>
</div>
<script type="text/javascript" src="../lib/kickstart.js"></script>
<script type="text/javascript">
$(function () {
let $taipei1016Eng = $(".taipei1016-eng");
let $taipei2016Cn = $(".taipei2016-cn");
let $taipei2016ChineseCurriculum = $("#taipei2016-chinese-curriculum");
let $taipei2016EnglishCurriculum = $("#taipei2016-english-curriculum");
let $welcomeTab = $(".welcomeTab");
let $curriculumList = $(".curriculumList");
let languageSection = window.location.href.slice(-3);
let hashRoute = window.location.href;
let http = "http";
$("a[href^=http]").attr("target", "_blank");
function checkFooter() {
setTimeout(function() {
if ($("html").height() > $(window).height()) {
homepageStickyFooter();
}
if ($("html").height() <= $(window).height()) {
stickyFooter();
}
}, 500);
}
if (languageSection === "-en") {
$taipei2016EnglishCurriculum.show();
$taipei2016ChineseCurriculum.hide();
} else {
$taipei2016EnglishCurriculum.hide();
$taipei2016ChineseCurriculum.show();  
}
$taipei2016Cn.click(function(e) {
e.preventDefault();
$taipei2016ChineseCurriculum.show();
$taipei2016EnglishCurriculum.hide();
});
$taipei1016Eng.click(function(e) {
e.preventDefault();
$taipei2016EnglishCurriculum.show();
$taipei2016ChineseCurriculum.hide();
});
$welcomeTab.click(function(e) {
e.preventDefault();
let tabid = $(this).data("tabid");
let tabIDName = "#" + tabid;
let divWithTabId = "div" + tabIDName.slice(0, -4);
$curriculumList.children().each(function(i, elem) {
if ($(this).attr("id") === tabid) {
let wantedTab = $(this);
let tabs = $(this).parents("ul.tabs").find("li");
let tab_next = tabs.filter(".current").find("a").attr("href");
let tab_current = tabs.filter(tabIDName).find("a").attr("href");
$(tab_current).hide();
tabs.removeClass("current");
$(this).addClass("current");
$(tab_next).show();
$(this).parent().parent().children("div").hide();
$(this).parent().parent().children(divWithTabId).show();
return false;
}
});
});
$("a").click(function() {
stickyFooter();
checkFooter();
});
});
setTimeout(function() {
  let tabsArr = [];
  $("#eventTabLinks").children("li").each(function(index, el) {
    tabsArr.push($(this).children().attr("href"));
  });
  if (window.location.hash && tabsArr.indexOf(window.location.hash) < 0 && $(window.location.hash).parent().parent().parents().children("ul.tabs").find("li").find("a").length > 0) {
    let $newDivId = "#" + $(window.location.hash).parent().parent().attr("id");
    let $tabs2 = $(window.location.hash).parent().parent().parents().children("ul.tabs").find("li");
    let $newTabCheck = $(window.location.hash).parent().parent().parents().children("ul.tabs").find("li").find("a");
    let $newTab;
    $newTabCheck.each(function(index, el) {
      if ($(this).attr("href") === $newDivId) {$newTab = $(this).parent();}
    });
    $tabs2.removeClass("current");
    $newTab.addClass("current");
    $(".tab-content.eventTabDiv").hide();
    $($newDivId).show();
  }
  if (window.location.hash && tabsArr.indexOf(window.location.hash) < 0 && $(window.location.hash).parent().parent().parents().children("ul.tabs").find("li").find("a").length <= 0) {
    let $newDivId3 = "#" + $(window.location.hash).parent().attr("id");
    let $tabs3 = $(window.location.hash).parent().parents().children("ul.tabs").find("li");
    let $newTabCheck3 = $(window.location.hash).parent().parents().children("ul.tabs").find("li").find("a");
    let $newTab3;
    $newTabCheck3.each(function(index, el) {
      if ($(this).attr("href") === $newDivId3) {$newTab3 = $(this).parent();}
    });
    $tabs3.removeClass("current");
    $newTab3.addClass("current");
    $(".tab-content.eventTabDiv").hide();
    $($newDivId3).show();
  }
}, 10)
</script>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 7,
                tabTitle: 'DevDays Event Material',
                tabContent: '<h2>DevDays Event Material</h2><p>Click on the link below to download the materials</p><ul><li><a href="/uploads/Productivity.zip">Productivity</a></li><li><a href="/uploads/Data-Platform.zip">Cloud + Data Platform</a></li><li><a href="/uploads/Open-Specs.zip">Open Specifications</a></li><li><a href="/uploads/Lightening-Talk.zip">Lightening Talks</a></li><li><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/DevDays-Asia--Taipei-2016">Presentation Videos</a></li></ul><br /><br /><br /><br /><br /><br />'
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 1,
                tabTitle: 'About',
                tabContent: '<a class="button blue float-right" style="height:65px;" href="https://www.facebook.com/events/815243558586451/">Find us on:<br /><i class="fa fa-facebook-square fa-2x"></i> acebook</a><h2>Extend Conference</h2><h4 class="center">Paris, France - May 12, 2016</h4><p>Microsoft introduces Extend – a 1-day event that brings together the latest technologies from Office, Data Platform, and Open Specifications.  Explore updates in Data Platform including machine learning, big data ingestion, and advanced analytics. Find out why Satya Nadella called Office 365, “the most strategic developer surface area” for Microsoft by discovering the potential of Office Add-ins and Office APIs. Finally, get direct access to a team of Microsoft program managers and engineers who are not only subject matter experts, but are excited to help you! Finish up the day at an evening mixer with attendees and Microsoft engineers.</p><h5>Where: Paris, France</h5><h5>Terrass Kardinal</h5><h5>45 Rue Jussieu, 75005 Paris, France</h5><h5>When: May 12, 2016</h5><h5>Cost: Free</h5><br />'
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 2,
                tabTitle: 'Agenda',
                tabContent: `<h2>Thursday, May 12, 2016</h2>
<table class="tableWithVerticalLines eventScheduleTable scheduleTable">
	<tr><td>9:30-10:00</td><td class="lightBlueBackground">Office Developer Opportunity</td></tr>
	<tr><td>10:00-10:45</td><td class="lightGreenBackground">Advanced Analytics Keynote</td></tr>
	<tr><td>10:45-11:00</td><td>Break</td></tr>
	<tr><td>11:00-11:45</td><td class="lightGreenBackground">Big Data Ingestion</td></tr>
	<tr><td>11:45-12:15</td><td class="lightGreenBackground">Machine Learning</td></tr>
	<tr><td>12:15-12:45</td><td class="lightGreenBackground">R and Python</td></tr>
	<tr><td>12:45-13:45</td><td>Lunch</td></tr>
	<tr><td>13:45-14:15</td><td class="lightGreenBackground">Power BI using Big Data</td></tr>
	<tr><td>14:15-14:45</td><td class="lightGreenBackground">Cognitive Services</td></tr>
	<tr><td>14:45-15:15</td><td class="lightBlueBackground">Office Add-ins Intro and Development</td></tr>
	<tr><td>15:15-15:45</td><td class="lightBlueBackground">Office 365 APIs: Office Graph</td></tr>
	<tr><td>15:45-16:00</td><td>Break</td></tr>
	<tr><td>16:00-16:45</td><td class="lightBlueBackground">Mail, Calendar, and Contacts REST APIs and Exchange Protocols</td></tr>
	<tr><td>16:45-17:15</td><td class="lightBlueBackground">Office Add-ins and Graph Testimonials by Infinite Square</td></tr>
	<tr><td>17:15-17:45</td><td class="lightBlueBackground">Office and SharePoint Protocols</td></tr>
	<tr><td>17:45-18:15</td><td class="lightGreenBackground">OData Overview and Demonstration</td></tr>
	<tr><td>18:15-20:00</td><td>Cocktails and Appetizers</td></tr>
</table>
<br />
<table class="tableWithVerticalLines scheduleTable" style="width:10%;">
	<tr><td class="lightGreenBackground">Data Platform</td></tr>
	<tr><td class="lightBlueBackground">Productivity</td></tr>
</table>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 3,
                tabTitle: 'Venue',
                tabContent: `
								<h3>Terrass Kardinal</h3>
								<p>45 Rue Jussieu</p>
								<p>75005 Paris, France</p>
								<p><a href="http://terrass-kardinal.com/">terrass-kardinal.com </a></p>
								<p><a href="tel:33156020345">+33 1 56 02 03 45 </a></p>
								<img src="uploads/terrass-kardinal.jpg" />`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 4,
                tabTitle: 'Data Platform Resources',
                tabContent: `<span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span> Azure cloud tools</h5><ul style="display: none;"><li><a href="https://www.visualstudio.com">Visual Studio free download</a></li><li><a href="http://portal.azure.com">Azure portal</a></li><li><a href="http://azure.Microsoft.com">Azure documentation</a></li></ul></span><h5><a href="https://www.projectoxford.ai/doc">Microsoft Cognitive Services</a> (image recognition and speech recognition API, formerly Project Oxford)</h5><h5><a href="http://dev.office.com/getting-started/office365apis">Office API</a></h5><h5><a href="https://azure.microsoft.com/en-us/documentation/articles/web-sites-deploy/">Azure web app deployment</a></h5><span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span> Open source PHP</h5><ul style="display: none;"><li><a href="https://azure.microsoft.com/en-us/documentation/articles/web-sites-php-mysql-deploy-use-git/">Build PHP-MySQL Web application with Azure</a></li><li><a href="https://azure.microsoft.com/en-us/develop/php/">Build PHP website with Azure</a></li></ul></span><span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span> Cross-platform development</h5><ul style="display: none;"><li><a href="https://developer.xamarin.com/guides/cross-platform/azure/mobile-services/">Build Cross-platform Azure App Service with Xamarin</a></li></ul></span><h5><a href="https://azure.microsoft.com/en-us/develop/iot/">Use Azure for IoT</a></h5><span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span>Virtual machine</h5><ul style="display: none;"><li><a href="https://azure.microsoft.com/en-us/documentation/articles/virtual-machines-linux-portal-create/">Build up Linux virtual machine by Azure</a></li></ul></span><h5><a href="https://channel9.msdn.com/Shows/themakershow/The-Maker-Show-Mini-Windows-IoT-Core-and-Azure-Machine-Learning-Demo--First-Robotics-2016">IoT and machine learning demo</a></h5><h5><a href="https://msdn.microsoft.com/en-us/windows/uwp/get-started/whats-a-uwp">Client (Universal Windows Platform)</a></h5><h5><a href="https://azure.microsoft.com/en-us/documentation/services/sql-database/">SQL database</a></h5><span class="taipeiDropDown2016"><h5><span class="rightArrow">&#x25B8;</span><span class="downArrow" style="display: none;">&#x25BE;</span> Developer support</h5><ul style="display: none;"><li><a href="https://azure.microsoft.com/en-us/develop/net/">.NET</a></li><li><a href="https://azure.microsoft.com/en-us/documentation/articles/machine-learning-r-quickstart/">R</a></li><li><a href="https://azure.microsoft.com/en-us/develop/php/">PHP</a></li><li><a href="https://azure.microsoft.com/en-us/develop/java/">JAVA</a></li><li><a href="https://azure.microsoft.com/en-us/develop/nodejs/">Node.js</a></li><li><a href="https://azure.microsoft.com/en-us/documentation/services/app-service/mobile/">iOS , Android , Windows</a></li></ul></span><h5><a href="https://azure.microsoft.com/en-us/documentation/">Microsoft Azure documentation</a></h5><h5><a href="https://azure.microsoft.com/en-us/">Azure website</a></h5><h5><a href="https://social.msdn.microsoft.com/Forums/en-us/home?category=windowsazuretw">MSDN forum</a></h5><h5><a href="https://mva.microsoft.com/">Microsoft Virtual Academy (MVA)</a></h5><script src="http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.9.0.min.js"></script><script type="text/javascript">$(".taipeiDropDown2016").click(function(event) {var $this = $(this);$this.find(".rightArrow").toggle();$this.find(".downArrow").toggle();$this.find("ol").toggle(250);$this.find("ul").toggle(250);});$(".taipeiDropDown2016").focus(function(event) {var $this = $(this);$this.find(".rightArrow").show();$this.find(".downArrow").show();$this.find("ol").show(250);$this.find("ul").show(250);$this.find("li").attr("tabindex", "0");});</script>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 5,
                tabTitle: 'Productivity Resources',
                tabContent: `<ul class="tabs left curriculumList">
<li class="first current"><a target="_self" href="#taipei2016-curricilum-welcome-en"><h6>Welcome</h6></a></li>
<li id="taipei2016-curriculum-overview-en-tab"><a target="_self" href="#taipei2016-curriculum-overview-en"><h6>Overview</h6></a></li>
<li id="taipei2016-curriculum-registration-en-tab"><a target="_self" href="#taipei2016-curriculum-registration-en"><h6>Registration</h6></a></li>
<li id="taipei2016-curriculum-napa-en-tab"><a target="_self" href="#taipei2016-curriculum-napa-en"><h6>Napa</h6></a></li>
<li id="taipei2016-curriculum-vs2015-en-tab"><a target="_self" href="#taipei2016-curriculum-vs2015-en"><h6>Visual Studio 2015</h6></a></li>
<li id="taipei2016-curriculum-api-en-tab"><a target="_self" href="#taipei2016-curriculum-api-en"><h6>API tutorial</h6></a></li>
<li id="taipei2016-curriculum-publishing-en-tab"><a target="_self" href="#taipei2016-curriculum-publishing-en"><h6>Publishing</h6></a></li>
</ul>
<div id="taipei2016-curricilum-welcome-en" class="tab-content">
<p>Welcome to the Office Add-in training curriculum! Follow the modules to learn about the end-to-end process of developing and publishing an add-in to extend Office.</p>
<p>If you don\'t already have Office, sign up with <a href="http://dev.office.com/devprogram">Office Dev Center</a> by clicking <strong>Dev Program sign up</strong> to get an Office 365 developer account and receive a one-year, free subscription for an Office 365 Development instance. See <a  class="welcomeTab" data-tabId="taipei2016-curriculum-registration-en-tab" href="">Registration</a> for details.</p>
<ol class="tabs">
<li class="welcomeTab" data-tabId="taipei2016-curriculum-overview-en-tab"><a href="">Office Add-ins platform overview</a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-registration-en-tab"><a href="">Registration</a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-napa-en-tab"><a href="">Napa Office 365 Development Tools</a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-vs2015-en-tab"><a href="">Visual Studio Community 2015</a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-api-en-tab"><a href="">API tutorial</a></li>
<li class="welcomeTab" data-tabId="taipei2016-curriculum-publishing-en-tab"><a href="">Publishing</a></li>
</ol>
</div>
<div id="taipei2016-curriculum-overview-en" class="tab-content" style="display: none;">
<h2>Office Add-ins platform overview</h2>
<h3>Topics</h3>
<ul>
<li><a target="_self" href="#taipei2016-what-is-office-addin-en">What is an Office Add-in?</a></li>
<li><a target="_self" href="#taipei2016-anatomy-of-an-office-addin-en">Anatomy of an Office Add-in</a></li>
<li><a target="_self" href="#taipei2016-types-of-office-addins-en">Types of Office Add-ins</a></li>
<li><a target="_self" href="#taipei2016-scenarios-en">Scenarios</a></li>
<li><a target="_self" href="#taipei2016-office-apps-that-support-addins-en">Office applications that support Office Add-ins</a> </li>
<li><a target="_self" href="#taipei2016-development-life-cycle-en">Development life cycle</a></li>
<li><a target="_self" href="#taipei2016-resources-en">Resources</a></li>
</ul>
<h3 id="taipei2016-what-is-office-addin-en">What is an Office Add-in?</h3>
<p>An Office Add-in is a web application hosted in a browser control or iframe running in the context of an Office application. There are several ways to developer an Office Add-in.</p>
<ul>
<li>You can create a simple Office Add-in by using <a href="https://www.napacloudapp.com/Getting-Started">Napa Office 365 Development Tools web app</a>.</li>
<li>You can use the free <a href="https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx">Visual Studio Community 2015</a> along with <a href="https://www.visualstudio.com/features/office-tools-vs">Office Developer Tools</a>.</li>
<li>You can also use <a href="https://msdn.microsoft.com/en-us/library/office/mt628821.aspx">text editor to create Office Add-ins</a>.</li>
</ul>
<h3 id="taipei2016-anatomy-of-an-office-addin-en">Anatomy of an Office Add-in</h3>
<p>The basic components of an Office Add-in are an XML manifest file and the default webpage of your add-in.</p>
<figcaption>Manifest + webpage = an Office Add-in</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-15.jpg" />
<p>The manifest specifies settings and capabilities of the add-in, such as the following:</p>
<ul>
<li>The URL of the webpage that implements the add-in\'s UI and programming logic.</li>
<li>The add-in\'s display name, description, ID, version, and default locale.</li>
<li>How the add-in activates and displays: 
<ul>
<li>For add-ins that interact with documents: as a task pane, or in line with document content.</li>
<li>For add-ins that interact with mail items (messages or appointments): when reading or composing the item.</li>
</ul>
</li>
<li>The permission level and data access requirements for the add-in.</li>
</ul>
<h3 id="taipei2016-types-of-office-addins-en">Types of Office Add-ins</h3>
<p>There are three types of Office Add-ins: task pane, content, and Outlook.</p>
<h3>Task pane add-ins (Word, Excel, and PowerPoint Add-ins that extend functionality)</h3>
<p>You can add new functionality to Word, Excel, or PowerPoint by registering your add-in using a <a href="http://dev.office.com/docs/add-ins/design/add-in-commands-for-excel-and-word-preview">task pane add-in manifest</a>. This manifest supports two integration modes:</p>
<ul>
<li>Add-in commands</li>
<li>Insertable task panes</li>
</ul>
<h4>Add-in commands</h4>
<p>Use add-in commands to extend the user interface of Office for Windows Desktop and Office Online. For example, you can add uttons for your add-ins on the ribbon or selected contextual menus, allowing users to easily access their add-ins within Office. Command buttons can launch the different actions such as showing a pane (or multiple panes) with a custom HTML or executing a JavaScript function. We recommend that you <a href="https://channel9.msdn.com/Events/Visual-Studio/Connect-event-2015/316">watch this Channel9 video</a> for a deeper overview of this feature.</p>
<figcaption>Add-in with commands running in Excel Desktop </figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-14.jpg" />
<figcaption>Add-in with commands running in Excel Online </figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-16.jpg" />
<p>You can define your commands in your add-in manifest by using VersionOverrides. The Office platform takes care of interpreting them into native UI. To get started, check out these <a href="https://github.com/OfficeDev/Office-Add-in-Commands-Samples/">samples on GitHub</a>, and see <a href="http://dev.office.com/docs/add-ins/design/add-in-commands-for-excel-and-word-preview">Add-in commands for Excel, Word, and PowerPoint</a></p>
<h4>Insertable Taskpanes</h4>
<p>Clients that do not support add-in commands yet (Office 2013, Office for Mac and Office for IPad) will run your add-in as a Task pane using the DefaultUrl provided in the manifest. The add-in can then be launched via the My Add-ins menu from the Insert Tab. </p>
<table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</th></tr>
<tr><td>A single manifest can have both a task pane add-in that runs in clients that do not support commands and a version that runs with commands. This allows you to have a single add-in that works across all clients that support Office Add-ins.</td></tr>
</table>
<p>Task pane add-ins work side-by-side with an Office document, and let you supply contextual information and functionality to enhance the document viewing and authoring experience. For example, a task pane add-in can look up and retrieve product information from a web service based on the product name or part number selected in the document.</p>
<figcaption>Task pane add-ins</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-2.png" />
<p>To try out a task pane add-in in Excel 2013, Excel Online, or Word 2013, install the <a href="https://store.office.com/wikipedia-WA104099688.aspx?assetid=WA104099688">Wikipedia</a> add-in.</p>
<h3>Content add-ins</h3>
<p>Content add-ins integrate web-based features as content that shown in line with the body of a document. Content add-ins let you integrate rich, web-based data visualizations, embedded media (such as a YouTube video player or a picture gallery), as well as other external content.</p>
<figcaption>Content add-ins</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-3.png" />
<p>To try out a content add-in in Excel 2013 or Excel Online, install the <a href="https://store.office.com/bing-maps-WA102957661.aspx?assetid=WA102957661">Bing Maps</a> add-in.</p>
<h3>Outlook add-ins</h3>
<p>Outlook add-ins display next to an Outlook item when you\'re viewing or composing it. They can work with an email message, meeting request, meeting response, meeting cancellation, or appointment in a read scenario – the user viewing a received item – or in a compose scenario – the user replying or creating a new item.</p>
<p>To learn more, see <a href="http://dev.office.com/docs/add-ins/outlook/outlook-add-ins">Outlook add-ins</a></p>
<table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</th></tr>
<tr><td>Outlook add-ins require a minimum version of Exchange 2013 or Exchange Online to host the user’s mailbox. POP and IMAP email accounts aren\'t supported.</td></tr>
</table>
<figcaption>An add-in with command buttons on the ribbon</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-17.jpg" />
<figcaption>Outlook add-in in a read scenario</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-4.png" />
<p>To try out an Outlook add-in in Outlook, Outlook for Mac, or Outlook Web App, install the <a href="https://store.office.com/package-tracker-WA104162083.aspx?assetid=WA104162083">Package Tracker</a> add-in.</p>
<h3 id="taipei2016-scenarios-en">Scenarios</h3>
<ul>
<li><strong>Translation wizard</strong>—A Word task pane add-in that automatically translates selected text from the document language to another language selected from a drop-down list.</li>
<li><strong>Chart creation</strong>—An Excel content add-in that builds a chart automatically from selected data.</li>
<li><strong>Third-party service integration</strong>—A Word or Excel task pane add-in that automatically displays the Wikipedia page that corresponds to selected text.</li>
<li><strong>Rich mash-ups</strong>—A Bing map content add-in in Excel that plots the offshore equipment and resource locations for a petroleum company, including getting this information in real time from the company resource-management system.</li>
<li><strong>Spec validation</strong>—A section or paragraph of a design specification for an aircraft component is flagged as outdated, because a Word task pane add-in that communicates with a business system to validate the contents against the latest spec.</li>
<li><strong>Kicking off workflows</strong>—An Outlook add-in can assist creating a message or meeting request based on templates, inserting meeting location details or user’s choice of a signature, and attaching related documents.</li>
<li><strong>Order details surfaced in context</strong>—An Outlook add-in that detects a purchase order number or customer number embedded in an email message can present details of the order or customer in the message. This could include an action to take, such as approval.</li>
</ul>
<h3 id="taipei2016-office-apps-that-support-addins-en">Office applications that support Office Add-ins</h3>
<table class="striped">
<tr><th class ="align-left">Office application</th><th class ="align-left">Content add-ins</th><th class ="align-left">Outlook add-ins</th><th class ="align-left">Task pane add-ins</th></tr>
<tr><td>Access web apps</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Excel 2013 or later</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Excel Online  </td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Excel for iPad  </td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Outlook 2013 or later</td><td>&nbsp;</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td></tr>
<tr><td>Outlook for Mac </td><td>&nbsp;</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td></tr>
<tr><td>Outlook Web App</td><td>&nbsp;</td><td><i class="fa fa-check"></i></td><td></td&nbsp;></tr>
<tr><td>OWA for Devices</td><td>&nbsp;</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td></tr>
<tr><td>PowerPoint 2013 or later</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>PowerPoint Online</td><td><i class="fa fa-check"></i></td><td>&nbsp;</td><td><i class="fa fa-check"></i></td></tr>
<tr><td>Project 2013 or later</td><td>&nbsp;</td><td>&nbsp;</td>&nbsp;<td><i class="fa fa-check"></i></td></tr>
<tr><td>Word 2013 or later</td><td>&nbsp;</td><td>&nbsp;</td>&nbsp;<td><i class="fa fa-check"></i></td></tr>
<tr><td>Word Online</td><td>&nbsp;</td><td>&nbsp;</td>&nbsp;<td><i class="fa fa-check"></i></td></tr>
<tr><td>Word for iPad</td><td>&nbsp;</td><td>&nbsp;</td>&nbsp;<td><i class="fa fa-check"></i></td></tr>
</table>
<h3 id="taipei2016-development-life-cycle-en">Development lifecycle</h3>
<p>Plan the end-to-end process for developing task pane, content, and Outlook add-ins to extend Office applications.</p>
<ol>
<li>Decide on the purpose of the add-in. </li>
<li>Identify the data and data source for the add-in. </li>
<li>Identify the type of add-in and Office host applications that best support the purpose of the add-in. </li>
<li>Design and implement the user experience and user interface for the add-in. </li>
<li>Create an XML manifest file based on the Office Add-ins manifest schema. </li>
<li>Install and test the add-in. </li>
<li>Publish the add-in. </li>
<li>Updating the add-in </li>
</ol>
<h3 id="taipei2016-resources-en">Resources</h3>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj220082.aspx">Office Add-ins platform overview</a></p>
<p><a href="https://dev.office.com/getting-started/addins">Getting started with Office Add-ins</a></p>
<p><a href="https://code.visualstudio.com/Docs/runtimes/office">Office Add-ins with VS code</a></p>
<p><a href="https://github.com/OfficeDev">Office Developer code samples</a></p>
</div>
<div id="taipei2016-curriculum-registration-en" class="tab-content" style="display: none;">
<h2>Registration</h2>
<h3>Topics</h3>
<ol>
<li><a target="_self" href="#taipei2016-sign-up-at-office-dev-cenbter-en">Sign up with Office Dev Center</a></li>
<li><a target="_self" href="#taipei2016-join-dev-program-en">Get an Office 365 developer account</a></li>
<li><a target="_self" href="#taipei2016-access-your-office-365-en">Access your Office 365</a></li>
<li><a target="_self" href="#taipei2016-assign-office-365-license-en">Assign Office 365 license</a></li>
<li><a target="_self" href="#taipei2016-registration-resources-en">Resources</a></li>
</ol>
<h3 id="taipei2016-sign-up-at-office-dev-cenbter-en">Sign up with Office Dev Center</h3>
<p>Sign up with <a href="http://dev.office.com/devprogram">Office Dev Center</a> to get a free Office 365 developer account and receive a one-year, free subscription for an Office 365 Development instance.  </p>
<figcaption>Figure 1. Office 365 Dev Program</figcaption>
 <img src="../uploads/office-web-curriculum-taipei-en-5.png" />
<h3 id="taipei2016-join-dev-program-en">Get an Office 365 developer account</h3>
<ol>
<li>You will receive an email from the Office 365 Developer Program. Scroll down the email, click on the provided link to sign up for a free Office 365 developer account.</li>
<li>The first page (not shown) of the signup form is self-explanatory. Just supply the information about yourself that is requested and choose <strong>Next</strong>.</li>
<li>On the second page, shown in Figure 2, specify a user ID for the administrator of the subscription. </li>
</ol>
<figcaption>Figure 2. Office 365 Developer Site domain name</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-6.png" />
<p>4. Create a subdomain of <strong>.onmicrosoft.com</strong></p>
<p class="indentP"> After signup, you have to use the resulting credentials (in the format <a href="mailto:UserID@yourdomain.onmicrosoft.com">UserID@yourdomain.onmicrosoft.com</a>) to sign in to your Office 365 portal site where you administer your account. Your SharePoint Online Developer Site is provisioned at your new domain: http://yourdomain.sharepoint.com.</p>
<p>5. Choose <strong>Next</strong> and fill out the final page of the form. If you choose to provide a telephone number to obtain a confirmation code, you can provide a mobile or land line telephone number, but not a VoIP (Voice over Internet Protocol) number.</p>
<table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</tj></tr>
<tr><td><p>If you’re logged on to another Microsoft account when you try to sign up for a developer account, you might get this message: "Sorry, that user ID you entered didn’t work. It looks like it’s not valid. Be sure you enter the user ID that your organization assigned to you. Your user ID usually looks like <i>someone@example.com</i> or <i>someone@example.onmicrosoft.com</i>."</p>
<p>If you see this message, log out of the Microsoft account you were using and try again. If you still get the message, clear your browser cache or switch to InPrivate Browsing and then fill out the form.</p>
</td></tr>
</table>
<p>Once your account is created, you will receive another email that contains a link to access your Office 365.</p>
<h3 id="taipei2016-access-your-office-365-en">Access your Office 365</h3>
<p>Your browser will open the Office 365 installation page. Choose the Admin icon to open the admin center page.</p>
<figcaption>Figure 3. Office 365 admin center page</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-7.png" />
<ol>
<li>You’ll have to wait for your Developer Site to finish provisioning. After provisioning is complete, refresh the admin center page in your browser.</li>
<li>Then, choose the Build Add-ins link to open your Developer Site. You should see a site that looks like the one in Figure 4. There is an Add-ins in Testing list on the page. This confirms that the website was made with SharePoint\'s Developer Site template. If you see a regular team site instead, wait a few minutes and launch your site again.<br />If you do not have the development tool, you will be directed to Add the Napa Office 365 Development Tools. You can use Napa to develop your add-ins on this site.</li>
<li>Make a note of the URL of the site. It is used when you create SharePoint Add-ins projects in Visual Studio.</li>
</ol>
<figcaption>Figure 4. Your Developer Site home page with the Add-ins in Testing list</figcaption>
 <img src="../uploads/office-web-curriculum-taipei-en-8.png" />
<h3 id="taipei2016-assign-office-365-license-en">Assign Office 365 license</h3>
<p>To assign Office 365 license for yourself, the active user. Click on the “waffle” icon > Admin icon located on the top left.</p>
<figcaption>Figure 5. Office 365 landing page</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-10.png" />
<p class="indentP">In the left navigation panel, select <strong>Users</strong> > <strong>Active Users</strong> </p>
<p class="indentP">Select yourself by clicking on the checkbox. Your profile will be shown on the right. Click <strong>Edit</strong> under the item: <strong>Assigned license</strong></p>
<figcaption>Figure 6. Office 365 admin center > Active Users</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-11.png" />
<p class="indentP">3. Select your location in the <strong>Set user location</strong> combo box. And select <strong>Microsoft Office 365 Developer</strong>. Click <strong>Save</strong> to finish assigning the license.</p>
<figcaption>Figure 7: Assign license for the active user profile</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-12.png">
<p class="indentP">4. After you’re finished, return to the Office 365 homepage. The page will display the products that are available to you, including the Office web apps. Pull down the page to see the full display.</p>
<figcaption>Figure 8. Office 365</figcaption>
<img src="../uploads/office-web-curriculum-taipei-en-13.png" />
<p>To navigate back to the developer site, click on the “waffle” icon (located in the top-left corner) > <strong>Admin</strong> > <strong>Build Apps</strong>.</p>
<h3 id="taipei2016-registration-resources-en">Resources</h3>
<p><a href="https://msdn.microsoft.com/en-us/library/office/dn467914.aspx">Office developer documentation</a></p>
<p><a href="https://msdn.microsoft.com/en-us/library/office/fp179924.aspx#o365_signup">Set up for an Office 365 Developer Site</a></p>
</div>
<div id="taipei2016-curriculum-napa-en" class="tab-content" style="display: none;">
<h2>Napa Office 365 Development Tools</h2>
<h3>Topics</h3>
<ul>
<li> <a target="_self" href="#taipei2016-prerequisites-napa-en">Prerequisites</a></li>
<li><a target="_self" href="#taipei2016-create-office-addins-with-napa-en">Create Office Add-ins with Napa on an Office 365 Developer Site</a></li>
<li><a target="_self" href="#taipei2016-create-excel=addin-with-napa-en">Create a content add-in for Excel with Napa Office 365 Development Tool </a></li>
<li><a target="_self" href="#taipei2016-debug-your-addin-napa-en">Debug your add-in in Internet Explorer </a></li>
<li><a target="_self" href="#taipei2016-resources-napa-en">Resources</a></li>
</ul>
<h3 id="taipei2016-prerequisites-napa-en">Prerequisites</h3>
<p>Join the <a href="http://dev.office.com/devprogram">Office 365 Developer Program</a>. See <a class="welcomeTab" data-tabId="taipei2016-curriculum-registration-en-tab">Registration</a></p>
<table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</th></tr>
<tr><td>If you have Office 365, there\'s an alternate version of <a href="https://www.napacloudapp.com/Getting-Started">Napa</a> that doesn\'t use or require an Office 365 Developer Site. That version supports creating only Office Add-ins using your personal <a href="https://www.microsoft.com/en-us/account/default.aspx">Microsoft account</a>. </td></tr>
</table>
<h3 id="taipei2016-create-office-addins-with-napa-en">Create Office Add-ins with Napa on an Office 365 Developer Site</a></h3>
<p>Napa is a great way to get started building Office Add-ins right in a browser window. You don\'t need to install any tools such as Visual Studio.  All you need is an Office 365 account and a supported browser. (Firefox is the recommended browser for Mac users.)</p>
<p>To get started, sign up for an Office 365 Developer Site. Then, install Napa on your developer site and you are ready to create Office Add-ins.</p>
<ol>
<li>If you’ve completed the steps in Registration, you will have access to the Office 365 Developer Site. Sign in with your credential created in Registration at <a href="http://www.portal.office.com/">www.portal.office.com</a> > Click on <strong>Admin</strong> > <strong>Build Apps</strong> to access your developer site.<br />If you do not have the development tool, you will be directed to <strong>Add</strong> the Napa Office 365 Development Tools.</li>
<li>Click on <strong>Build Apps</strong> on the developer site to open the Napa Office 365 Development Tools web app in your browser.<br /><h3 style="margin-left: -25px" id="taipei2016-create-excel=addin-with-napa-en">Create a content add-in for Excel with Napa Office 365 Development Tool </h3></li>
<li>Open the Napa Office 365 Development Tools web app in your browser and choose the <strong>Add New Project</strong> tile. (The Add New Project tile appears only if you have created other projects.)</li>
<li>Try the tutorial: <a href="https://msdn.microsoft.com/EN-US/library/office/jj220065.aspx">Create a content add-in for Excel with Napa Office 365 Development Tools</a></li>
</ol>
<h3 id="taipei2016-debug-your-addin-napa-en">Debug your add-in in Internet Explorer</h3>
<p>If you start your add-in in Excel Online, and you use Internet Explorer (IE), you can use F12 developer tools to debug the JavaScript, HTML, and Cascading Style Sheets (CSS) of your content add-in. See <a href="https://msdn.microsoft.com/library/bg182326(v=vs.85)">Using the F12 developer tools</a> for more information. If you use a browser other than Internet Explorer, search your browser documentation.</p>
<h3 id="taipei2016-resources-napa-en">Resources</h3>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj220038.aspx">Create Office Add-ins with Napa on an Office 365 Developer Site</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn974046.aspx">Create Office Add-ins with Napa Office 365 Development Tools</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj554660.aspx">Create a task pane add-in with Napa Office 365 Development Tools</a></p>
</div>
<div id="taipei2016-curriculum-vs2015-en" class="tab-content" style="display: none;">
<h2>Visual Studio Community 2015</h2>
<h3>Topics</h3>
<ul>
<li><a target="_self" href="#taipei2016-vs-2015-prerequisites-en">Prerequisites</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-setup-en">Set up your free Visual Studio Community 2015</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-hello-world-en">Build your first Hello World task pane add-in with Visual Studio</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-build-first-excel-addin-en">Build your first Excel add-in</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-debuging-en">Debug in Visual Studio</a></li>
<li><a target="_self" href="#taipei2016-vs-2015-resources-ens-en">Resources</a></li>
</ul>
<h3 id="taipei2016-vs-2015-prerequisites-en">Prerequisites</h3>
<ul>
<li><a href="https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx">Visual Studio community 2015 (free version)</a></li>
<li><a href="https://www.visualstudio.com/features/office-tools-vs">Office Developer Tools</a></li>
<li>Excel 2013 or later and Word 2013 or later for "Build your first Hello World" and extend on your "Hello World" add-in</li>
<li>Excel 2016, Excel Online for "Build your first Excel add-in" (The new API released with Office 2016 has additional functionalities, but works with the latest version of Office or the online version.) </li>
</ul>
<h3 id="taipei2016-vs-2015-setup-en">Set up your free Visual Studio Community 2015</h3>
<p class="indentP">1. If you don\'t have Visual Studio, download <a href="https://go.microsoft.com/fwlink/?LinkId=532606&clcid=0x409">Visual Studio 2015 Community Edition</a> along with <a href="https://www.visualstudio.com/features/office-tools-vs">Office Developer Tools</a>. </p>
<img src="../uploads/office-web-curriculum-taipei-14.png" />
<table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</strong></th>
<tr><td>When you develop and debug an add-in in Visual Studio, Visual Studio deploys and runs your add-in\'s webpage files locally with IIS Express, and doesn\'t require an additional web server. Similarly, when you develop and debug with Napa in the browser, it deploys and runs your add-in\'s webpage files from storage associated with the account you used to sign into Napa.</td></tr>
</table>
<p class="indentP">2. Choose <strong>File</strong> > <strong>New</strong> > <strong>Project</strong>.</p>
<p class="indentP">3. In the <strong>New Project</strong> dialog, choose <strong>Templates</strong> > <strong>Visual C#</strong> > <strong>Office/SharePoint</strong> > <strong>Office Add-in</strong> (or App for Office).</p>
<img src="../uploads/office-web-curriculum-taipei-15.png" />
<p class="indentP">4. Name the project <strong>HelloWorld</strong>, and then choose <strong>OK</strong>.</p>
<p class="indentP">5. Select <strong>Task</strong> pane as the app type and then <strong>Next</strong>.</p>
<p class="indentP">6.  Select <strong>Excel</strong> as the Office application that you want to host your add-in. You can select multiple options, and your add-in will run in any of the selected applications.</p>
<p class="indentP">Visual Studio creates the project, and its files appear in Solution Explorer. The default Home.html page opens in Visual Studio.</p>
<p>If you prefer to use an editor other than Visual Studio, keep in mind you can <a href="https://msdn.microsoft.com/library/office/mt628821.aspx">create an Office add-in using any editor.</a>
<h3 id="taipei2016-vs-2015-hello-world-en">Build your first Hello World task pane add-in with Visual Studio</h3>
<p>Try this tutorial: <a href="https://msdn.microsoft.com/en-us/library/office/fp142161.aspx">Create a task pane or content add-in with Visual Studio</a></p>
<h3 id="taipei2016-vs-2015-build-first-excel-addin-en">Build your first Excel add-in</h3>
<p>Try this tutorial: <a href="https://msdn.microsoft.com/EN-US/library/office/mt616491.aspx">Build your first Excel add-in</a></p>
<p>The new Excel add-in JavaScript API interacts with Excel 2016, and Excel online. If you use Excel 2013 to run your add-in, you will see this error:</p>
<table class="tableWithBorders tableFirstRowBold">
<tr><td>0x800a1391 - JavaScript runtime error: \'Excel\' is undefined</td></tr>
</table>
<p>If you do not have Excel 2016, login to your Office 365 Developer Site, see <a class="welcomeTab" data-tabId="taipei2016-curriculum-registration-en-tab">Registration</a>.  Use the Napa development tool and run your add-in using Excel Online.</p>
<h3 id="taipei2016-vs-2015-debuging-en">Debug in Visual Studio</h3>
<p>Add breakpoints and click <strong>Start Debugging</strong> or press <strong>F5</strong> to start debugging.</p>
<h3 id="taipei2016-vs-2015-resources-en">Resources</h3>
<p><a href="https://dev.office.com/">Office Dev Center</a></p>
</div>
<div id="taipei2016-curriculum-api-en" class="tab-content" style="display: none;">
<h2>API tutorial </h2>
<h3>Topics</h3>
<ul>
<li><a target="_self" href="#taipei2016-api-programming-overview-en">Programming overview</a></li>
<li><a target="_self" href="#taipei2016-api-reference-en">API reference</a></li>
<li><a target="_self" href="#taipei2016-api-samples-en">Samples</a></li>
<li><a target="_self" href="#taipei2016-api-exercises-en">Exercises</a></li>
<li><a target="_self" href="#taipei2016-api-resources-en">Resources</a></li>
</ul>
<h3 id="taipei2016-api-programming-overview-en">Programming overview</h3>
<p>Before you begin writing your add-in, it may be helpful to review <a href="https://msdn.microsoft.com/en-us/library/office/fp160953.aspx">Understanding the JavaScript API for Office</a> and the programming overview for the different types of Office add-in.</p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/mt616487.aspx">Excel</a></p>
<p><a href="http://dev.office.com/docs/add-ins/word/word-add-ins-programming-overview">Word</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/fp161015.aspx">Outlook</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn610884.aspx">PowerPoint</a></p>
<p>Note that if you make use of JavaScript APIs that are only available in some versions of Office; for example, you might use the new JavaScript APIs for Excel in an add-in that runs in Excel 2016, make sure you have Excel 2016 or Excel Online during development and <a href="http://dev.office.com/docs/add-ins/testing/testing-and-troubleshooting">testing</a>. </p>
<p>To ensure that your add-in works as expected, see <a href="https://msdn.microsoft.com/EN-US/library/office/dn535871.aspx">Specify Office hosts and API requirements</a>.</p>
<h3 id="taipei2016-api-reference-en">API reference</h3>
<p>Explore the <a href="https://dev.office.com/reference/add-ins/javascript-api-for-office">JavaScript API for Office reference</a> – or <a href="https://dev.office.com/docs/add-ins/excel/excel-add-ins-javascript-api-reference">Excel add-ins JavaScript API reference</a> for example – along with the code samples may expedite the learning.</p>
<h3 id="taipei2016-api-samples-en">Samples</h3>
<p><a href="https://dev.office.com/blogs/Add-in-Samples-Have-Moved-To-GitHub">Add-in samples have moved to GitHub</a></p>
<p><a href="https://github.com/OfficeDev">Office Developer on GitHub</a></p>
<p><a href="https://dev.office.com/code-samples">Office Dev Center  </a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/mt616484.aspx">Excel add-in code samples </a></p>
<p><a href="https://github.com/OfficeDev/Word-Add-in-ClauseLibrary-Code-Sample">Word-Add-in-ClauseLibrary-Code-Sample</a></p>
<p><a href="https://github.com/OfficeDev/office-js-docs">Office JavaScript APIs on GitHub</a></p>
<p><a href="https://dev.outlook.com/MailAppsGettingStarted/GetStarted">Get Started with Outlook add-ins for Office 365</a></p>
<h3 id="taipei2016-api-exercises-en">Exercises</h3>
<p>Try using the Excel add-in JavaScript API with the <a href="../uploads/ColorizerVS.zip">Excel Colorizer Add-in for Excel 2016</a>.</p>
<p>Use the following tasks as a guide on how you may extend the basic Colorizer:</p>
<ol>
<li>Add another pattern option called Square Waves.  The wave amplitude and cycle are controlled by the existing <strong>Pattern Contrast %</strong> and <strong>Pattern Waves</strong> controls. This task consists of the following:
<ol type="a">
<li>Adjust the UI combo box for the pattern type.</li>
<li>Adjust the existing JavaScript code that determines the visibility for the contrast and cycle controls.</li>
<li>Add the necessary code to generate square waves.</li>
</ol>
</li>
<li>Add a new feature to enumerate the leftmost column in a table. When enabled, consecutive numbers in the leftmost column are added to the selected range starting with the first row after the header. The numbers are black and in bold. This task consists of the following:
<ol type="a">
<li>Add a new checkbox control to enable this new functionality.</li>
<li>Use the <a href="https://msdn.microsoft.com/EN-US/library/office/mt616490.aspx">Excel add-ins JavaScript API</a> to overwrite the cells’ text values with the right numbers.</li>
<li>Use the <a href="https://msdn.microsoft.com/EN-US/library/office/mt616490.aspx">Excel add-ins JavaScript API</a> to format the cells correctly so that fonts are black and in bold.</li>
</ol>
</li>
<li>Add a new feature to create borders for the given selection. This tasks requires a new combo box with the following options: None, Outer, Inner, Outer and Inner. Make the outer border twice as thick as the inner borders. This task consists of the following:
<ol type="a">
<li>Add new combo box with the right values. “None” is selected as default.</li>
<li>Add the required code to create a table based on the specified choice using the <a href="https://msdn.microsoft.com/EN-US/library/office/mt616490.aspx">Excel add-ins JavaScript API</a>.</li>
</ol>
</li>
</ol>
<h3 id="taipei2016-api-resources-en">Resources </h3>
<p><a href="https://dev.office.com/docs/add-ins/testing/debug-add-ins-using-f12-developer-tools-on-windows-10">Testing</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/mt484317.aspx">Design guidelines for Office Add-ins</a></p>
</div>
<div id="taipei2016-curriculum-publishing-en" class="tab-content" style="display: none;">
<h2>Publishing</h2>
<p>This tutorial shows the steps to publish the Excel Colorizer Add-in for Excel 2016 from the west U.S. for distribution in Office Store. Visual Studio Community 2015 is the IDE of choice. Microsoft Azure is the web hosting platform for the Colorizer.  </p>
<p>To publish your add-in using other methods that are specific to your scenario, please see resources on <a href="http://dev.office.com/docs/add-ins/publish/publish">publishing</a>.</p>
<h3>Topics</h3>
<ol>
<li><a target="_self" href="#taipei2016-publishing-decide-end-point-en">Decide on the Office Add-ins distribution end-points</a></li>
<li><a target="_self" href="#taipei2016-publishing-set-up-dev-computer-en">Set up your development computer with Azure SDK for .NET, an Azure subscription, and Office 2016</a></li>
<li><a target="_self" href="#taipei2016-publishing-create-azure-website-en">Create a website in Azure</a></li>
<li><a target="_self" href="#taipei2016-publishing-publish-add-in-azure-en">Publish your Office Add-in to the Azure website</a></li>
<li><a target="_self" href="#taipei2016-publishing-edit-addin-manifest-en">Edit the add-in manifest file to point to the Office Add-in on Azure</a></li>
<li><a target="_self" href="#taipei2016-publishing-run-addin-en">Run the add-in in the Office client application</a></li>
<li><a target="_self" href="#taipei2016-publishing-submit-to-office-store-en">Submit your add-in to the Office Store</a></li>
<li><a target="_self" href="#taipei2016-publishing-publishing-resources-en">Resources</a></li>
</ol>
<h3 id="taipei2016-publishing-decide-end-point-en">Decide on the Office Add-ins distribution end-points</h3>
<p>Decide on the distribution end-points to publish your Office Add-ins:</p>
<ol type="a">
<li>Office Store </li>
<li>Office Add-ins catalog on SharePoint </li>
<li>Exchange catalog</li>
<li>Network shared folder add-in catalog</li>
</ol>
<p>This tutorial uses <a href="http://dev.office.com/docs/add-ins/publish/host-an-office-add-in-on-microsoft-azure">Microsoft Azure</a> to host the add-in and <a href="https://msdn.microsoft.com/en-us/library/office/jj220037.aspx">submit the add-ins to the Office Store for publishing</a>.</p>
<h3 id="taipei2016-publishing-set-up-dev-computer-en">Set up your development computer with Azure SDK for .NET, an Azure subscription, and Office 2016</h3>
<ol>
<li>Install the Azure SDK for .NET from the <a href="http://azure.microsoft.com/en-us/downloads/">Azure downloads page</a>. This tutorial uses the free <a href="https://www.microsoft.com/en-us/download/details.aspx?id=48146">Microsoft Visual Studio Community 2015</a>.</a>
<ol type="a">
<li>Under <strong>Languages</strong>, choose <strong>.NET</strong>.</li>
<li>Choose the version of the Azure .NET SDK that matches your version of Visual Studio, if you already have Visual Studio installed.</li>
<li>When you’re asked whether to run or save the installation executable, choose <strong>Run</strong>.</li>
<li>In the Web Platform Installer window, choose <strong>Install</strong>.</li>
</ol>
</li>
<li>Install Office 2016. (The Colorizer add-in works only in Excel 2016 or Excel Online.)
<br />
<table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</strong></th>
<tr><td><a href="https://products.office.com/en-us/try?legRedir=true&WT.intid1=ODC_ENUS_FX101785584_XT104056786&CorrelationId=cae9f0f9-caf0-411f-b512-426d951c2259">You can get a trial version of Office for one month.</a></td></tr>
</table>
</li> 
<li>Get your Azure account. 
<br />
<table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</strong></th>
<tr><td>If you’re a Microsoft Developer Network (MSDN) subscriber, <a href="http://www.windowsazure.com/en-us/pricing/member-offers/msdn-benefits/">you get an Azure subscription as part of your MSDN subscription</a>.</a></td></tr>
<tr><td>If you\'re not an MSDN subscriber, you can still <a href="https://azure.microsoft.com/en-us/pricing/free-trial/">get a free trial of Azure at the Windows Azure website</a>.</td></tr>
</table>
</li> 
</ol>
<h3 id="taipei2016-publishing-create-azure-website-en">Create a website in Azure</h3>
<p>There are a couple of ways you can create an empty Azure website. If you\'re using Visual Studio 2015 or the free community version, follow the steps below to create an Azure website from within the Visual Studio IDE.</p>
<p><strong>Using Visual Studio Community 2015 </strong></p>
<ol>
<li>In Visual Studio, in the <strong>View</strong> menu choose <strong>Server Explorer</strong>. Right click <strong>Azure</strong> and choose <strong>Connect to Microsoft Azure subscription</strong>. Follow the instructions for connecting to your Azure subscription.</li>
<li>In Visual Studio, in <strong>Server Explorer</strong>, expand <strong>Azure</strong>, right-click <strong>App Service</strong>, and then choose <strong>Create New App Service</strong>.</li>
<li>In the <strong>Create Web App on Windows Azure</strong> dialog box, provide this information: 
<ul>
<li>Enter a unique <strong>Web App name</strong> for your site. Azure verifies that the site name is unique across the azurewebsites.net domain.</li>
<li>Choose the <strong>App Service plan</strong> you\'re using to authorize creating this website. If you create a new plan, you also need to name it. </li>
<li>Choose the <strong>Resource group</strong> for your site. If you create a new group, you also need to name it.</li>
<li>Choose a geographical <strong>Region</strong> appropriate for you.</li>
<li><strong>For Database server</strong>: accept the default of No database and then choose <strong>Create</strong>.</li>
<li class="noStyleUL">The new website appears under the chosen resource group under <strong>App Service</strong> under <strong>Azure</strong> in <strong>Server Explorer</strong>.</li>
</ul>
</li>
<li>Right-click the new website, and then choose <strong>View in Browser</strong>. Your browser opens and displays a webpage with the message "This web site has been successfully created."</li>
<li>In the browser address bar, change the URL for the website so that it uses HTTPS and press <strong>Enter</strong> to confirm that the HTTPS protocol is enabled. The Office Add-in model requires add-ins to use the HTTPS protocol. </li>
<li>In Visual Studio 2015, right-click the new website in <strong>Server Explorer</strong>, choose <strong>Download Publish Profile</strong> and then save the profile to your computer. The publish profile contains your credentials and enables you to publish your Office Add-in to the Azure website.</li>
</ol>
<h3 id="taipei2016-publishing-publish-add-in-azure-en">Publish your Office Add-in to the Azure website</h3>
<ol>
<li>With your add-in open in Visual Studio, expand the solution node in <strong>Solution Explorer</strong> so that you see both projects for the solution. </li>
<li>Right-click the web project, and then choose <strong>Publish</strong>. 
<br />
The web project contains Office Add-in website files so this is the project that you publish to Azure.</li>
<li>In <strong>Publish Web</strong>, choose <strong>Import</strong>. </li>
<li>In <strong>Import Publish Settings</strong>, choose <strong>Browse</strong>, and then browse to the place where you saved your publish profile earlier in this topic. Choose <strong>OK</strong> to import your profile.</li>
<li>In <strong>Publish Web</strong>, on the <strong>Connection tab</strong>, accept the defaults and choose <strong>Next</strong>. 
<br />
Choose <strong>Next</strong> > again to accept the default settings.</li>
<li>On the <strong>Preview</strong> tab, choose <strong>Start Preview</strong>. The preview shows you all the files in the web project that will be published to the Azure website.</li>
<li>Choose <strong>Publish</strong>. Visual Studio publishes the web project for your Office Add-in to your Azure Web Site. </li>
<li>When Visual Studio finishes publishing the web project, your browser opens and shows a webpage with the text "This web app has been successfully created." This is the current default page for the website.
<br />
To see the webpage for your add-in, change the URL to use https: and add the path of your add-in\'s default HTML page. For example, the changed URL should look like https://YourDomain.azurewebsites.net/Addin/Home/Home.html. This confirms that your add-in\'s website is now hosted on Azure. Copy this URL because you\'ll need it when you edit the add-in manifest file later in this topic. </li>
</ol>
<h3 id="taipei2016-publishing-edit-addin-manifest-en">Edit the add-in manifest file to point to the Office Add-in on Azure</h3>
<ol>
<li>In Visual Studio with the Office Add-in open in <strong>Solution Explorer</strong>, expand the solution so that both projects are shown.</li>
<li>Open the add-in manifest XML file.</li>
<li>For <strong>Source Location</strong>: enter the URL for the add-in\'s main HTML page that you copied in the previous step after you published the add-in, for example, https://YourDomain.azurewebsites.net/Addin/Home/Home.html. </li>
<li class="noStyleUL">Save the manifest file.</li>
</ol>
<h3 id="taipei2016-publishing-run-addin-en">Run the add-in in the Office client application</h3>
<p>By now, your source location has changed from the local server for the testing environment to the website URL in Azure. </p>
<p>Run your add-in in the Office client and test that the add-in is working.</p>
<h3 id="taipei2016-publishing-submit-to-office-store-en">Submit your add-in to the Office Store</h3>
<h4>The recommended reading for submitting your add-in to the Office Store is as follows:</h4>
<p><a href="https://msdn.microsoft.com/en-us/library/office/jj220037.aspx">Submit Office and SharePoint Add-ins and Office 365 web apps to the Office Store</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn356576.aspx">Checklist for submitting Office and SharePoint Add-ins and Office 365 web apps to the Seller Dashboard </a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj591603.aspx">Office Store app and add-in submission FAQ</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj220035.aspx">Validation policies for apps and add-ins submitted to the Office Store (version 1.9)</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/fp161044.aspx#O15AgaveManifestOverview_Samplev1_1">Office Add-ins XML manifest</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn535869.aspx">Update the version of your JavaScript API for Office and manifest schema files</a></p>
<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn221992.aspx">Referencing the JavaScript API for Office library from its content delivery network (CDN)</a></p>
<h4>To publish the Excel Colorizer Add-in for Excel 2016, the following tasks are performed:</h4>
<ol>
<li>To include your app or add-in in the Office Store, submit it to the <a href="https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=12&ct=1434731402&rver=6.4.6456.0&wp=MBI_SSL_SA&wreply=https://sellerdashboard.microsoft.com/Wlid/AfterLogin?returnUrl=https://sellerdashboard.microsoft.com/?culture=en-US&lc=1033&id=284543">Microsoft Seller Dashboard</a>. 
<br />
Create an individual or company account and, if applicable, add payout information. To open an account, see <a href="https://sellerdashboard.microsoft.com/Registration">Create a seller account and add payout information</a>.
<br />
For this tutorial, an individual account is created to publish the add-in. Because the add-in is free, no payout information is provided.
<br />
Fill out the account profile, submit, and wait for the approval. </li>
<li>An icon, App logo, screenshots, and .html files containing privacy and support statements are prepared before the submission. Follow the specifications for the image dimensions in the <a href="https://msdn.microsoft.com/EN-US/library/office/dn356576.aspx">Checklist for submitting Office and SharePoint Add-ins and Office 365 web apps to the Seller Dashboard</a>.</li>
<li>Publish the icon, privacy and support statements to your Azure account.</li>
<li>In the manifest file, add the IconUrl, SupportUrl, and the Requirements elements in addition to the default elements. (The Excel Colorizer uses the new Excel add-in JavaScript APIs that runs in Excel 2016 or Excel Online). The manifest schema version is 1.1.
<br /><table class="tableWithBorders tableFirstRowBold">
<tr><th>Note</strong></th>
<tr><td>Every add-in is different, to ensure that your add-in works as expected, see <a href="https://msdn.microsoft.com/EN-US/library/office/dn535871.aspx">Specify Office hosts and API requirements</a>  and <a href="https://msdn.microsoft.com/EN-US/library/office/mt590206.aspx">Office add-in requirement sets</a>.</td></tr>
</table>
</li>
<li><a href="https://msdn.microsoft.com/en-us/library/dn221992.aspx">Reference the Microsoft hosted Office.js file from its CDN URL</a>. Don\'t include a copy of the Office.js file in your add-in. <a href="https://msdn.microsoft.com/en-us/library/jj591603.aspx">See Office Store app and add-in submission FAQ</a> > How do I reference the JavaScript APIs for Office in my add-ins?</li>
<li>If you’re using Visual Studio, validate the manifest by clicking on <strong>Build</strong> > <strong>Publish</strong> > <strong>Perform Validation Check</strong></li>
<li>Login to the Microsoft Seller Dashboard to add the App. 
<ul>
<li>Enter the version number. The version number submitted via the Seller Dashboard must be the same as that in the add-in manifest. For example:
<br />Seller Dashboard: 1.0.0.0
<br />Add-in Manifest: 1.0.0.0</li>
<li>Upload the screenshots and the App logo.</li>
<li>Upload the app package (i.e. the manifest XML file). </li>
<li>Supply the Support and Privacy Statement URL. Include your contact information in the Support Statement URL or alternatively within your add-in. This can be any or all of the following: email address, phone number, contact form, valid social media link (e.g. a URL to your contact page on Facebook or Twitter), or comments form.</li>
</ul>
</li>
<li>Submit the app and wait for the approval.</li>
<li>After your add-in is submitted, a Validation Test Results report will be returned to you if the add-in is not approved by the Office Store. The validation test is performed based on <a href="https://msdn.microsoft.com/en-us/library/office/jj220035.aspx">Validation policies for apps and add-ins submitted to the Office Store (version 1.9)</a>, and lists the required changes. Make the changes and resubmit your add-in. </li>
</ol>
<h3 id="taipei2016-publishing-publishing-resources-en">Resources</h3>
<p><a href="http://dev.office.com/docs/add-ins/publish/publish">Publishing</a></p>
<p><a href="http://dev.office.com/docs/add-ins/publish/host-an-office-add-in-on-microsoft-azure">Host an Office Add-in on Microsoft Azure</a></p>
<p><a href="https://msdn.microsoft.com/en-us/library/office/jj220037.aspx">Submit Office and SharePoint Add-ins and Office 365 web apps to the Office Store</a></p>
</div>
<script type="text/javascript" src="../lib/kickstart.js"></script>
<script type="text/javascript">
$(function () {
let $taipei1016Eng = $(".taipei1016-eng");
let $taipei2016Cn = $(".taipei2016-cn");
let $taipei2016ChineseCurriculum = $("#taipei2016-chinese-curriculum");
let $taipei2016EnglishCurriculum = $("#taipei2016-english-curriculum");
let $welcomeTab = $(".welcomeTab");
let $curriculumList = $(".curriculumList");
let languageSection = window.location.href.slice(-3);
let hashRoute = window.location.href;
let http = "http";
$("a[href^=http]").attr("target", "_blank");
function checkFooter() {
setTimeout(function() {
if ($("html").height() > $(window).height()) {
homepageStickyFooter();
}
if ($("html").height() <= $(window).height()) {
stickyFooter();
}
}, 500);
}
if (languageSection === "-en") {
$taipei2016EnglishCurriculum.show();
$taipei2016ChineseCurriculum.hide();
} else {
$taipei2016EnglishCurriculum.hide();
$taipei2016ChineseCurriculum.show();  
}
$taipei2016Cn.click(function(e) {
e.preventDefault();
$taipei2016ChineseCurriculum.show();
$taipei2016EnglishCurriculum.hide();
});
$taipei1016Eng.click(function(e) {
e.preventDefault();
$taipei2016EnglishCurriculum.show();
$taipei2016ChineseCurriculum.hide();
});
$welcomeTab.click(function(e) {
e.preventDefault();
let tabid = $(this).data("tabid");
let tabIDName = "#" + tabid;
let divWithTabId = "div" + tabIDName.slice(0, -4);
$curriculumList.children().each(function(i, elem) {
if ($(this).attr("id") === tabid) {
let wantedTab = $(this);
let tabs = $(this).parents("ul.tabs").find("li");
let tab_next = tabs.filter(".current").find("a").attr("href");
let tab_current = tabs.filter(tabIDName).find("a").attr("href");
$(tab_current).hide();
tabs.removeClass("current");
$(this).addClass("current");
$(tab_next).show();
$(this).parent().parent().children("div").hide();
$(this).parent().parent().children(divWithTabId).show();
return false;
}
});
});
$("a").click(function() {
stickyFooter();
checkFooter();
});
});
setTimeout(function() {
  let tabsArr = [];
  $("#eventTabLinks").children("li").each(function(index, el) {
    tabsArr.push($(this).children().attr("href"));
  });
  if (window.location.hash && tabsArr.indexOf(window.location.hash) < 0 && $(window.location.hash).parent().parent().parents().children("ul.tabs").find("li").find("a").length > 0) {
    let $newDivId = "#" + $(window.location.hash).parent().parent().attr("id");
    let $tabs2 = $(window.location.hash).parent().parent().parents().children("ul.tabs").find("li");
    let $newTabCheck = $(window.location.hash).parent().parent().parents().children("ul.tabs").find("li").find("a");
    let $newTab;
    $newTabCheck.each(function(index, el) {
      if ($(this).attr("href") === $newDivId) {$newTab = $(this).parent();}
    });
    $tabs2.removeClass("current");
    $newTab.addClass("current");
    $(".tab-content.eventTabDiv").hide();
    $($newDivId).show();
  }
  if (window.location.hash && tabsArr.indexOf(window.location.hash) < 0 && $(window.location.hash).parent().parent().parents().children("ul.tabs").find("li").find("a").length <= 0) {
    let $newDivId3 = "#" + $(window.location.hash).parent().attr("id");
    let $tabs3 = $(window.location.hash).parent().parents().children("ul.tabs").find("li");
    let $newTabCheck3 = $(window.location.hash).parent().parents().children("ul.tabs").find("li").find("a");
    let $newTab3;
    $newTabCheck3.each(function(index, el) {
      if ($(this).attr("href") === $newDivId3) {$newTab3 = $(this).parent();}
    });
    $tabs3.removeClass("current");
    $newTab3.addClass("current");
    $(".tab-content.eventTabDiv").hide();
    $($newDivId3).show();
  }
}, 10)
</script>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 6,
                tabTitle: 'Extend Event Material',
                tabContent: `<h2>Extend Event Material</h2>
									<ul class="noStyleUL">
									<li><a href="/uploads/Extend-2016-Presentations.zip"><h4>Extend PowerPoint Presentations</h4></a></li>
									<li><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Microsoft-Extend-Paris-2016"><h4>Presentation Videos</h4></a></li>
									</ul>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 1,
                tabTitle: 'Redmond Protocol Plugfest ',
                tabContent: `<h2>Redmond Protocol Plugfest</h2><p>Enjoy a 5-day Microsoft event centered around Open Specifications, interoperability, and Extensibility. Attendees will learn more about interoperability within Microsoft Office, Exchange, SharePoint, Windows and SQL Server. Office, SharePoint, and Exchange protocol testing will be supported at the event. Hardware will not be provided however; we will have support engineers on site for assistance. Office protocol test resources are available on <a href="https://github.com/OfficeDev/Interop-TestSuites">GitHub</a>.  Any Windows testing is available during the <a href="http://interopevents.com/redmond2016#windowsinteroperabilityiolab">Windows IO Lab</a> from June 20-24, 2016. Windows File Server test suites are also available on <a href="https://github.com/Microsoft/WindowsProtocolTestSuites">GitHub</a>. </p>
<p>Microsoft subject matter experts from both the support organization and the product team gather at the Plugfest to present protocol updates, to answer questions, and to debug with customers. </p>
<p>Our team at Microsoft also knows the importance of relaxation and fun. The Redmond Protocols Plugfest provides a balance between work and play with evening socials, a visit to the Microsoft company store, and plenty of networking opportunities.</p>
<ul class="noStyleUL">
	<li><strong>When:</strong> June 13 - 17, 2016</li>
	<li><strong>Where:</strong> Building 20, Microsoft headquarters in Redmond, Washington </li>
	<li><strong>Who:</strong> Developers building solutions that leverage Office, Exchange, SharePoint, Windows, or SQL</li>
	<li><strong>Cost:</strong> Free</li>
</ul>
<ul class="tabs left"><li class="current"><a target="_self" href="#redmond2016WindowsAgenda"><span style="font-size: 1.5em">Agenda</span></a></li><li><a target="_self" href="#redmond2016WindowsTechnologies"><span style="font-size: 1.5em">Technologies</span></a></li></ul>
<div id="redmond2016WindowsAgenda" class="tab-content eventTabDiv" style="display:block;">
<p>* If you cannot attend the entire Plugfest, we encourage you to attend days and sessions that best fit your schedule.</p>
<h2>Monday, June 13, 2016</h2>
<table class="redmond2016ScheduleTable tableWithVerticalLines scheduleTableTextOnly">
	<thead><th class="lightGrayBackground">Time</th><th class="lightGrayBackground">Presentation Zone</th><th class="lightGrayBackground">Speaker</th></thead>
	<tr><td>8:00-9:00</td><td>Breakfast</td><td>&nbsp</td></tr>
	<tr><td>9:00-9:30</td><td class="lightBlueBackground">Plugfest Welcome<a class="button small blue float-right" href="/uploads/Plugfest-Welcome-2016.pptx" download>Download Presentation</a></td><td class="lightBlueBackground">Bailey Chauner</td></tr>
	<tr><td>9:30-10:15</td><td class="lightBlueBackground">Office Developer Opportunity<a class="button small blue float-right" href="/uploads/Office-Developer-Opp.pptx" download>Download Presentation</a></td><td class="lightBlueBackground">Tristan Davis</td></tr>
	<tr><td>10:15-10:30</td><td>Break</td><td>&nbsp</td></tr>
	<tr><td>10:30-11:15</td><td class="lightBlueBackground">Getting Started with Add-ins and Microsoft Graph<a class="button small blue float-right" href="/uploads/Getting-Started-with-Add-ins-and-the-Microsoft-Graph.pptx" download>Download Presentation</a></td><td class="lightBlueBackground">Keyur Patel</td></tr>
	<tr><td>11:15-12:00</td><td class="lightBlueBackground">Excel Integration using Microsoft Graph APIs<a class="button small blue float-right" href="/uploads/Excel-Integration-using-Microsoft-Graph-API.pptx" download>Download Presentation</a></td><td class="lightBlueBackground">Sudhi Ramamurthy</td></tr>
	<tr><td>12:00-13:00</td><td>Lunch</td><td>&nbsp</td></tr>
	<tr><td>13:00-13:45</td><td class="lightBlueBackground">Build Powerful Add-ins with Excel APIs<a class="button small blue float-right" href="/uploads/Build-Powerful-Add-ins-with-Excel-APIs.pptx" download>Download Presentation</a></td><td class="lightBlueBackground">Yu Liu</td></tr>
	<tr><td>13:45-14:30</td><td class="lightBlueBackground">Mail, Calendar, and Contacts Graph API Demonstration<a class="button small blue float-right" href="/uploads/Mail-Calendar-and-Contacts-Graph-API-Demonstration.pptx" download>Download Presentation</a></td><td class="lightBlueBackground">Andrew Davidoff</td></tr>
	<tr><td>14:30-15:15</td><td class="lightBlueBackground">Office Online Integration (MS-WOPI)<a class="button small blue float-right" href="/uploads/Online-Integration-WOPI.pptx" download>Download Presentation</a></td><td class="lightBlueBackground">Nick Simons</td></tr>
	<tr><td>15:15-15:30</td><td>Break</td><td>&nbsp</td></tr>
	<tr><td>15:30-16:15</td><td class="lightBlueBackground">Office File Formats<a class="button small blue float-right" href="/uploads/File-Format-Overview-Redmond-2016.pptx" download>Download Presentation</a></td><td class="lightBlueBackground">Tom Jebo</td></tr>
	<tr><td>16:30-19:00</td><td>Wood fired pizza dinner </td><td>&nbsp</td></tr>
</table>
<br /><br />
<h2>Tuesday, June 14, 2016</h2>
<table class="redmond2016ScheduleTable tableWithVerticalLines scheduleTableTextOnly">
	<thead><th class="lightGrayBackground">Time</th><th class="lightGrayBackground">Presentation Zone</th><th class="lightGrayBackground">Speaker</th><th class="lightGrayBackground">Time</th><th class="lightGrayBackground">White Room</th><th class="lightGrayBackground">Speaker</th></thead>
	<tr><td>8:00-9:00</td><td>Breakfast</td><td></td><td>&nbsp</td><td></td><td></td></tr>
	<tr><td>9:00-9:20</td><td class="lightGreenBackground">SQL 2016 Protocol Overview<a href="/uploads/SQL-Server-Interoperability-Overview_Updated.pptx" class="button green small float-right">Download Presentation</a></td><td class="lightGreenBackground">KB Badu-Antwi</td><td></td><td></td><td></td></tr>
	<tr><td>9:20-10:15</td><td class="lightGreenBackground">Big Data Overview<a href="/uploads/Redmond_Protocols_Plugfest_Intro_to_ADL_Store_and_Analytics_2016_06_14.pptx" class="button green small float-right">Download Presentation</a></td><td class="lightGreenBackground">Asad Khan + Saveen Reddy </td><td></td><td></td><td></td></tr>
	<tr><td>10:15-10:30</td><td>Break</td><td></td><td></td><td></td><td></td></tr>
	<tr><td>10:30-11:15</td><td class="lightGreenBackground">SQL Server: Developing modern applications with Temporal Tables and JSON <a class="button small green float-right" href="/uploads/SQL2016---Developing-modern-applications-with-Temporal-Tables-and-JSON.pptx" download>Download Presentation</a></td><td class="lightGreenBackground">Jos de Bruijn</td><td>10:30-11:15</td><td class="lightBlueBackground">Office Co-authoring (MS-FSSHTTP)</td><td class="lightBlueBackground">Simon Clarke</td></tr>
	<tr><td>11:15-12:00</td><td class="lightGreenBackground">SQL Server: Always On<a class="button small green float-right" href="/uploads/SQL-Always-On.pptx" download>Download Presentation</a></td><td class="lightGreenBackground">Kevin Farlee</td><td></td><td></td><td></td></tr>
	<tr><td>12:00-13:00</td><td>Lunch & Machine Learning Talk<a data-presentationTime="June 14, 2016 12:00" class="button small float-right" href="/uploads/Machine-Learning-Lunch-Session.pptx" download>Download Presentation</a></td><td>Ted Way</td><td></td><td></td><td></td></tr>
	<tr><td>13:00-13:45</td><td class="lightGreenBackground">SQL Server: Speeding up data ingestion and transaction processing with In-Memory OLTP<a data-presentationTime="June 14, 2016 1:00pm" class="button small green float-right" href="/uploads/SQL2016---In-Memory-OLTP.pptx" download>Download Presentation</a></td><td class="lightGreenBackground">Jos de Bruijn</td><td>13:00-13:45</td><td class="lightBlueBackground">Exchange 2016 Protocol Overview<a class="button small blue float-right" href="/uploads/Exchange-2016-Protocol-Overview.pptx" download>Download Presentation</a></td><td class="lightBlueBackground">Andrew Davidoff</td></tr>
	<tr><td>13:45-14:30</td><td class="lightGreenBackground">SQL Server: Real-time operational analytics<a class="button small green float-right" href="/uploads/SQL-Server-2016 -Real-Time-Operational-Analytics.pptx" download>Download Presentation</a></td><td class="lightGreenBackground">Sunil Agarwal</td><td>13:45-14:15</td><td class="lightBlueBackground">Office Interoperability Test Tools (Test Suites and Open Source Projects)<a data-presentationTime="June 14, 2016 13:45" class="button small blue float-right" href="/uploads/Office-Interoperability-Test-Tools-(Test-Suites-and-Open-Source-Projects).pptx" download>Download Presentation</a></td><td class="lightBlueBackground">Jinghui Zhang</td></tr>
	<tr><td>14:30-15:15</td><td class="lightGreenBackground">SQL Server: R Services<a data-presentationTime="June 14, 2016 14:30" class="button small green float-right" href="/uploads/SQL-Server-2016-R-Services.pptx" download>Download Presentation</a></td><td class="lightGreenBackground">Umachandar Jayachandran</td><td></td><td></td><td></td></tr>
	<tr><td>15:15-15:30</td><td>Break</td><td></td><td></td><td></td><td></td></tr>
	<tr><td>15:30-16:15</td><td class="lightGreenBackground">SQL Server: PolyBase<a data-presentationTime="June 14, 2016 15:30" class="button small green float-right" href="/uploads/SQL-Server-2016-PolyBase.pptx" download>Download Presentation</a></td><td class="lightGreenBackground">Casey Karst</td><td>15:30-16:00</td><td class="lightBlueBackground">Office Network Parsers (Message Analyzer and Fiddler)<a data-presentationTime="June 14, 2016 15:30" class="button small blue float-right" href="/uploads/Office-Network-Parsers---JingyuShao.pptx" download>Download Presentation</a></td><td class="lightBlueBackground">Jingyu Shao</td></tr>
	<tr><td>16:15-17:00</td><td class="lightGreenBackground">SQL Server: Stretch Database <a data-presentationTime="June 14, 2016 16:15" class="button small green float-right" href="/uploads/SQL-Server-2016-Stretch-Database.pptx" download>Download Presentation</a></td><td class="lightGreenBackground">Joe Yong</td><td>16:15-16:45</td><td class="lightBlueBackground">Calling 3rd Party APIs from an Outlook Add-in<a data-presentationTime="June 14, 2016 16:15" class="button small blue float-right" href="/uploads/Accessing-APIs-through-Add-Ins.pptx" download>Download Presentation</a></td><td class="lightBlueBackground">Tarun Chopra</td></tr>
	<tr><td>17:30-19:30</td><td>Barbecue dinner at Lincoln Square in Bellevue, WA</td><td></td><td></td><td></td><td></td></tr>
</table>
<br /><br />
<h2>Wednesday, June 15, 2016</h2>
<table class="redmond2016ScheduleTable tableWithVerticalLines scheduleTableTextOnly">
	<thead><th class="lightGrayBackground">Time</th><th class="lightGrayBackground">Presentation Zone</th><th class="lightGrayBackground">Speaker</th></thead>
	<tr><td>8:00-9:15</td><td>Breakfast</td><td></td></tr>
	<tr><td>9:15-9:45</td><td class="lightOrangeBackground">Plugfest Welcome + Windows Keynote<a data-presentationTime="June 15, 2016 9:15" class="button small orange float-right" href="/uploads/Welcome-wednesday.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Neil Martin (Welcome), Mike Neil (Key Note)</td></tr>
	<tr><td>9:45-10:30</td><td class="lightOrangeBackground">Windows Server telemetry<a data-presentationTime="June 15, 2016 9:45" class="button small orange float-right" href="/uploads/Windows-Protocol-&-Privacy.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Neil Martin</td></tr>
	<tr><td>10:30-10:45</td><td>Break</td><td></td></tr>
	<tr><td>10:45-11:30</td><td class="lightOrangeBackground">Windows 10 telemetry<a data-presentationTime="June 15, 2016 10:45" class="button small orange float-right" href="/uploads/Windows-Telemetry-Privacy-Plugfest-0616.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Steve May</td></tr>
	<tr><td>11:30-12:00</td><td class="lightOrangeBackground">Tech talk on Device Management<a data-presentationTime="June 15, 2016 11:30" class="button small orange float-right" href="/uploads/Plugfest-June-2016-Device-Health-Attestation.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Kam Kouladjie</td></tr>
	<tr><td>12:15-13:15</td><td>Lunch (Members from Auth and AD team will be available for a chat session)</td></tr>
	<tr><td>13:15-14:00</td><td class="lightOrangeBackground">Azure Files talk<a data-presentationTime="June 15, 2016 13:15" class="button small orange float-right" href="/uploads/Plugfest_2016_Azure_Files.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">David Goebel</td></tr>
	<tr><td>14:00-14:45</td><td class="lightOrangeBackground">AD/BYOD test suites and updates<a data-presentationTime="June 15, 2016 14:00" class="button small orange float-right" href="/uploads/June-2016-AD-Family-and-BYOD-Protocol-Test-Suite-Updates.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Randy Dong</td></tr>
	<tr><td>14:45-15:00</td><td>Break</td><td></td></tr>
	<tr><td>15:00-15:30</td><td class="lightOrangeBackground">New and Modified Windows Protocol Documents<a style="margin-left: 1%;" data-presentationTime="June 15, 2016 15:00" class="button small orange float-right" href="/uploads/PlugfestDocList.xlsx" download>Download Document List</a><a data-presentationTime="June 15, 2016 15:00" class="button small orange float-right" href="/uploads/New-and-Modified-Protocols.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Ron Starr</td></tr>
	<tr><td>15:30-16:00</td><td class="lightOrangeBackground">Adhoc conversation on Open Authoring and use of tools such as Markdown and Github <strong>*(Venue: White Room)</strong></td><td class="lightOrangeBackground">Jim Mauer and Team</td></tr>
	<tr><td>16:30-19:00</td><td>Dinner from Pacific Northwest Catering</td><td></td></tr>
</table>
<br /><br />
<h2>Thursday, June 16, 2016</h2>
<table class="redmond2016ScheduleTable tableWithVerticalLines scheduleTableTextOnly">
	<thead><th class="lightGrayBackground">Time</th><th class="lightGrayBackground">Presentation Zone</th><th class="lightGrayBackground">Speaker</th></thead>
	<tr><td>8:00-9:00</td><td>Breakfast</td></tr>
	<tr><td>9:00-9:45</td><td class="lightOrangeBackground">File Sharing<a data-presentationTime="June 16, 2016 9:00" class="button small orange float-right" href="/uploads/SMB3-Low-Latency-Talpey.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Tom Talpey</td></tr>
	<tr><td>9:45-10:30</td><td class="lightOrangeBackground">Software-defined Storage and SMB’s Critical Role<a data-presentationTime="June 16, 2016 9:45" class="button small orange float-right" href="/uploads/Software-defined-Storage-and-SMBs-critical-role.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Elden Christensen</td></tr>
	<tr><td>10:30-10:45</td><td>Break</td><td></td></tr>
	<tr><td>10:45-11:30</td><td class="lightOrangeBackground">File Server Test Suite updates and demo<a data-presentationTime="June 16, 2016 10:45" class="button small orange float-right" href="/uploads/File-Server-Family-Test-Suite-Updates-(1).pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Yan Zeng, Lu Chen</td></tr>
	<tr><td>11:30-12:00</td><td class="lightOrangeBackground">HVRS+RSVD+SQOS – Iterative updates and Q&A<a data-presentationTime="June 16, 2016 11:30" class="button small orange float-right" href="/uploads/Hyper-V-Storage-HVRS-SQOS-RSVD-VHDX-HRL-2016-Plugfest-mattkur.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Matt Kurjanowicz, Jim Wooldridge</td></tr>
	<tr><td>12:00-13:00</td><td>Lunch</td><td></td></tr>
	<tr><td>13:00-13:45</td><td class="lightOrangeBackground">Windows Containers<a data-presentationTime="June 16, 2016 13:00" class="button small orange float-right" href="/uploads/Windows-Container.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Bhanu Prakash</td></tr>
	<tr><td>13:45-14:30</td><td class="lightOrangeBackground">Testing hardware components for private/hybrid clouds<a data-presentationTime="June 16, 2016 13:45" class="button small orange float-right" href="/uploads/Validating-Hardware-for-Private-Clouds.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Aniket Malatpure, Anagha Koshe</td></tr>
	<tr><td>14:30-14:45</td><td>Break</td><td></td></tr>
	<tr><td>14:45-15:30</td><td class="lightOrangeBackground">Overview documents:  Role of the Message Analyzer parsers and network captures<a data-presentationTime="June 16, 2016 14:45" class="button small orange float-right" href="/uploads/Windows-Overview-Documents-Presentation.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Althea Champagnie, Paul Bartos, Randy Dong</td></tr>
	<tr><td>15:30-16:15</td><td class="lightOrangeBackground">Windows protocol test suites open source<a data-presentationTime="June 16, 2016 15:30" class="button small orange float-right" href="/uploads/2016-June-Windows-Protocol-Test-Suites-Open-Source.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Christine Huang</td></tr>
	<tr><td>16:30-17:30</td><td>Visit the Microsoft Store</td><td></td></tr>
	<tr><td>17:30-19:30</td><td>Dinner at in.gredients – a John Howie restaurant </td><td></td></tr>
</table>
<br /><br />
<h2>Friday, June 17, 2016</h2>
<table class="redmond2016ScheduleTable tableWithVerticalLines scheduleTableTextOnly">
	<thead><th class="lightGrayBackground">Time</th><th class="lightGrayBackground">Presentation Zone</th><th class="lightGrayBackground">Speaker</th></thead>
	<tr><td>8:00-9:00</td><td>Breakfast</td><td></td></tr>
	<tr><td>9:00-9:45</td><td class="lightOrangeBackground">Keynote/Nano Server: The Future of Windows Server Starts Now<a data-presentationTime="June 17, 2016 9:00" class="button small orange float-right" href="/uploads/Windows-Nano-Server.pptxs" download>Download Presentation</a></td><td class="lightOrangeBackground">Andrew Mason</td></tr>
	<tr><td>9:45-10:30</td><td class="lightOrangeBackground">Open SSH</td><td class="lightOrangeBackground">Manoj Ampalam</td></tr>
	<tr><td>10:30-10:45</td><td>Break</td><td></td></tr>
	<tr><td>10:45-11:30</td><td class="lightOrangeBackground">Enhanced User experience in Protocol test suites<a data-presentationTime="June 17, 2016 10:45" class="button small orange float-right" href="/uploads/Enhanced-User-Experience-for-Protocol-Testsuite.pptx" download>Download Presentation</a></td><td class="lightOrangeBackground">Vivian Tian</td></tr>
	<tr><td>12:00-13:00</td><td>Lunch</td><td></td></tr>
</table>
<br /><br />
<table class="redmond2016ScheduleTable tableWithVerticalLines scheduleTableTextOnly" style="width: 12%;">
	<tr><td class="lightBlueBackground">Office</td></tr>
	<tr><td class="lightGreenBackground">Data Platform</td></tr>
	<tr><td class="lightOrangeBackground">Windows</td></tr>
</table>
</div>
    <div id="redmond2016WindowsTechnologies" class="tab-content eventTabDiv" style="display:none;">
    <ul>
    	<li>What's New in Office</li><li>Open Specifications + Interoperability</li>
   		<li>Protocol Test Suites</li><li>Mail Sim</li>
   		<li>Microsoft Big Data</li><li>Office Parsers</li>
   		<li>Microsoft Cloud Foundations</li>
   		<li>OData</li><li>Exchange</li>
   		<li>SharePoint</li><li>File Formats</li>
   		<li>Mail, Calendar + Contacts</li><li>WOPI</li>
   		<li>HyperV SMB3 Storage</li>
   		<li>Private Cloud Simulator</li>
    </ul>
    </div>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 2,
                tabTitle: 'Windows Interoperability (IO) Lab',
                tabContent: `<div class="col_12"><h3>Windows Interoperability (IO) Lab </h3>
    <p>The Windows Interoperability (IO) Lab is the opportunity to test your implementation with Microsoft Windows protocol test suites.   During the IO lab you have the opportunity to directly engage with Windows Protocol Support, Test Suite Development, and Windows development team as well as network with other professionals from all over the world.</p>
    <ul class="noStyleUL">
    	<li><strong>When:</strong>  June 20-24, 2016</li>
    	<li><strong>Where:</strong> Microsoft headquarters in Redmond, Washington </li>
    	<li><strong>Who:</strong> File sharing (SMB 2&3), Authentication and AD protocol implementers</li>
    	<li><strong>Cost:</strong> Free</li>
    </ul>
    </div>
  	<div class="col_12">
  	<div>
  		<p>Core concentration during the IO lab week would be on <strong>Interop testing your protocol implementations</strong>.</p>
  		<p>This year’s Windows IO lab will be held in Building 20 in an “open-hall-format”. This will be similar to how the SNIA’s Storage Developer Conference (SDC) Plugfest is organized. We hope this will promote more interactions both amongst the partners and with the Microsoft Product Groups.</p>
  		<h3>Chalk-talk sessions</h3>
			<table class=" tableWithVerticalLines scheduleTableTextOnly">
				<tr><td><strong>Monday</strong></td><td><strong>11-11:45 AM</strong></td><td class="lightOrangeBackground"> The Evolution of Identity on Windows</td><td class="lightOrangeBackground">Edgar Olougouna</td><td class="lightOrangeBackground">White Room</td></tr>
				<tr><td><strong>Tuesday</strong></td><td><strong>11-11:45 AM</strong></td><td class="lightOrangeBackground"> MSRC talk</td><td class="lightOrangeBackground">Stephen Finnigan</td><td class="lightOrangeBackground">White Room</td></tr>
				<tr><td><strong>Wedesday</strong></td><td><strong>11-11:45 AM</strong></td><td class="lightOrangeBackground"> Steps to calculate NTLM keys from network trace</td><td class="lightOrangeBackground">Obaid Farooqi</td><td class="lightOrangeBackground">White Room</td></tr>
				<tr><td><strong>Thursday</strong></td><td><strong>11-11:45 AM</strong></td><td class="lightOrangeBackground"> Engagement around RSVD document</td><td class="lightOrangeBackground">Jeff McCashland</td><td class="lightOrangeBackground">White Room</td></tr>
			</table>
			</div>
		</div>
		<div class="col_12">
		<div>
			<ul>
				<li>Server Message Block (SMB2&3)</li><li>Remote Shared Virtual Disk (RSVD)</li>
				<li>Active Directory (ADOD) and Identity</li><li>Authentication (AUTHSOD and PAC/Kile)</li>
				<li>Bring Your Own Device (BYOD)</li>
				<li>Authorization (AZOD)</li>
				<li>Claim-Based Access Control (CBAC)</li>
			</ul>
			</div>
		</div>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 3,
                tabTitle: 'Accommodations',
                tabContent: '<h2>Silver Cloud Inns & Hotels</h2><h3>How to Book Online</h3><img src="../uploads/silver-cloud-in.jpg" alt="Silver Cloud Inn Logo" class="align-left" /><p>URL: <a href="http://www.silvercloud.com" targe="_blank">www.silvercloud.com</a></p><p>Destination: Pull down a tab and select <strong>“Redmond”</strong> </p><p>Enter: <strong>Arrival/Departure</strong> date; Enter: Number of Adults / Children</p><p>Click on <strong>“Check for Availability”</strong>, a published room type/rates will populate the page</p><p>Enter Group ID/Login: <strong>RDMDPLUG</strong></p><p>Enter your Password: <strong>plugfest2016</strong> (lower case)</p><p>Click on <strong>“Login”</strong> tab below, Then Click on the <strong>“Check Availability”</strong> tab</p><p>A new page will then populate showing<strong> “Redmond Plugfest 2016”</strong> Room Type/Rate </p><p>Select room type and follow instructions until done.</p><p>You may also copy and paste below link: </p><p>https://redmond.silvercloud.com/irmnet/(S(priycso41uvl2e0n2wk0fjg1))/res/resmain.aspx?hotel=7&Arrival=06%2F20%2F2016&Departure=06%2F24%2F2016&People1=1&People2=0</p><p>Note: you may prepay online by selecting a box marked “Would you like to pay for this now?”</p><ul style="list-style-type: none"><li>Call Reservation Toll Free Line at <a href="tel:8002056934"> 1.800.205.6934</a></li><li>Call the Hotel direct at <a href="tel:4257468200"> 425.746.8200</a> and mention <strong>“Redmond Plugfest”</strong> Group</li><li>Email your reservation request to: <a href="mailto:reservations@redmond.silvercloud.com">reservations@redmond.silvercloud.com</a> </li><li><strong>Rate Validity:</strong> June 12 – June 24, 2016 </li><li><strong>Check-In Time:</strong> 1500 hour (3:00pm - PDT) <strong>Check-Out Time: 1200 hour (12:00pm – PDT)</strong> </li><li><strong>Cancellation Policy:</strong> 24 hours at 1500 hour (3:00pm – PDT), day before arrival date.</li></ul><p style="text-align: center;"><i> We thank you for an opportunity to serve you.</i></p><hr class="alt1" /><p style="text-align: center;"><i>Silver Cloud Inn Redmond | 2122 152nd Avenue NE | Redmond | WA 98052 USA</i></p><p style="text-align: center;"><i>Reservation: 800.205.6934 |Hotel: 425.746.8200 | Fax: 425.747.2078</i></p><p style="text-align: center;"><i><a href="http://www.silvercloud.com"> www.silvercloud.com</a></i></p>'
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 4,
                tabTitle: 'Venue',
                tabContent: `<h3>Building 20</h3>
									<h4>Microsoft Campus</h4>
									<h4>3709 157th Ave NE</h4>
									<h4>Redmond, WA 98052</h4>
									<h4>Parking</h4>
									<ul class="noStyleUL">
										<li>Building 20 provides 50 parking spaces</li>
										<li>We encourage you to carpool or take a shuttle, taxi, or other ride service to the venue.</li>
										<li>If you are planning on parking, please arrive early to ensure your space.</li>
										<li>If you have any further questions, please contact <a href="mailto:plugfests@microsoft.com">plugfests@microsoft.com</a></li>
									</ul>

									<img src="../uploads/ms-campus.jpg" alt="Microsoft Campus" />`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 4,
                tabTitle: 'Event Resources',
                tabContent: `<h3>Office</h3>
									<h5>Office Protocol Test Suites  <a href="https://github.com/OfficeDev/Interop-TestSuites">https://github.com/OfficeDev/Interop-TestSuites</a> </h5>
									<ul>
										<li>Exchange EAS, EWS, MAPIHTTP</li>
										<li>SharePoint Protocols</li>
										<li>WOPI/FSSHTTP</li>
									</ul>
									<h5>MailSim: <a href="https://github.com/OfficeDev/Interop-MailSim">https://github.com/OfficeDev/Interop-MailSim</a> </h5>
									<ul>
										<li>Outlook traffic generation</li>
										<li>REST Mail Client </li>
									</ul>
									<h5>Network Tracing </h5>
									<ul>
										<li>Fiddler: <a href="https://github.com/OfficeDev/Office-Inspectors-for-Fiddler">https://github.com/OfficeDev/Office-Inspectors-for-Fiddler</a></li>
										<li>Message Analyzer: <a href="https://www.microsoft.com/en-us/download/details.aspx?id=44226">https://www.microsoft.com/en-us/download/details.aspx?id=44226</a> </li>
									</ul>
									<h3>Data</h3>
									
									<p>Tools on <a href="http://www.odata.org/">http://www.odata.org/</a></p>
									
									<h3>Windows</h3>
									
									<h5>Windows Protocol Test Suites:</h5>
									<p><a href="https://github.com/Microsoft/WindowsProtocolTestSuites">https://github.com/Microsoft/WindowsProtocolTestSuites</a></p>
									
									<h5>Protocol Test Framework:</h5>
									<p><a href="https://github.com/Microsoft/ProtocolTestFramework">https://github.com/Microsoft/ProtocolTestFramework</a></p>`
            });
        })
        /*.then(function() {
        	return EventTab.create({
        		isPublished: true,
        		tabNumber: 1,
        		tabTitle: 'About',
        		tabContent: `<p>With the success of interoperability and developer events in Shanghai, Beijing, Taipei, Paris, and Redmond, Microsoft Office and Data Platform teams are ready to travel to India!</p>

        									<p>Substantial growth in the IT industry, a rapid increase of startups, and an abundance of computer science students make India a fantastic location for our next Microsoft event. </p>
        									
        									<p>If you’re interested in attending an event in India, have any questions or suggestions, please email us at <a href="mailto:plugfests@microsoft.com">plugfests@microsoft.com</a>.</p>`
        	});
        })*/
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 1,
                tabTitle: 'About',
                tabContent: `<ul class="noStyleUL">
									<li>Where: Shanghai, China</li>
									<li>Who: Students, professionals, and coders welcome.  </li>
									<li>Date:  October 20 – 21, 2015 </li>
									<li>Venue: Shanghai Marriott City Center  </li>
									<li>Cost: Free</li>
									</ul>
									<h4>Join Us</h4>
									<p>Microsoft Office’s user base is over 1.2 billion strong and represents one of the most strategic developer surface areas. Be competitive and learn how to innovate with the Office 365 developer platform, access our user base through the Office Store, and develop using OData.</p>
									<p>In an increasingly connected world, OData (the Open Data protocol) provides powerful, standards-based connectivity and interoperability for Web APIs, and as an open industry standard for RESTful APIs. OData is widely adopted by companies such as SAP, Salesforce and Microsoft. Learn how to build OData APIs and apps to easily integrate with their services and applications.</p>
									 
									<h4>Learn</h4>
									<p>Get up to speed on the latest developer technologies from Office, learn about OData, and collaborate with Microsoft experts. Coverage includes Office 365 APIs, Word, Excel, Outlook, and PowerPoint Add-ins, Mail, Contacts, Calendar, and Files, and Office file formats. Gain insight into OData’s features, dive deep into protocol specifications, and get hands-on experience on OData frameworks and applications.</p>
									 
									<h4>Innovate</h4>
									<p>Connect with Microsoft and other developers. Build new apps or work on existing apps at the event. Interoperate with one of the fastest growing Microsoft productivity platforms and develop new solutions.  </p>
									<p>No experience necessary. Developers recommended. Students and professionals encouraged.</p>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 2,
                tabTitle: 'Agenda',
                tabContent: `<h2>Tuesday, October 20, 2015</h2>
<table style="table-layout: fixed;" class="tableWithVerticalLines scheduleTableTextOnly">
<thead><tr style="line-height: 4em;"><th style="width: 8%;" class="darkBlueBackground whiteText">&nbsp;</th><th class="darkBlueBackground whiteText">Conference Room</th><th class="darkBlueBackground whiteText">Hack Session 1: Add-ins </th><th class="darkBlueBackground whiteText">Hack Session 2: OData</th></thead>
<tr><td>9-9:30</td><td>Keynote</td><td colspan="2" class="withoutBottomBorder">&nbsp;</td></tr>
<tr><td>9:30-10:15</td><td>The Office Developer Opportunity </td><td colspan="2" class="withoutBottomBorder">&nbsp;</td></tr>
<tr><td>10:15-11:00</td><td>Office Add-ins Intro and Development</td><td colspan="2" class="withoutBottomBorder">&nbsp;</td></tr>
<tr><td>11:00-11:15</td><td class="lightGrayBackground">Break</td><td colspan="2" colspan="2" style="padding-left: 25%;" class="withoutBottomBorder">Opens after lunch</td></tr>
<tr><td>11:15-12:00</td><td>Build a Complete Office Add-in Solution</td><td colspan="2" class="withoutBottomBorder">&nbsp;</td></tr>
<tr><td>12:00-1:00</td><td class="lightGrayBackground">Lunch</td><td colspan="2">&nbsp;</td></tr>
<tr><td>1:00-2:00</td><td>Office 365 APIs</td><td rowspan="7" style="word-wrap: break-word;" class="lightGreenBackground">Add-ins and O365 Solutions, Development Tools, and Open Source Hack Session</td><td rowspan="7" style="text-align: center;" class="lightBlueBackground">OData Hack Session</td></tr>
<tr><td>2:00-2:15</td><td class="lightGrayBackground">Break</td></tr>
<tr><td>2:15-3:00</td><td>Data Platform Overview</td></tr>
<tr><td>3:00-3:30</td><td>An Introduction to OData</td></tr>
<tr><td>3:30-4:30</td><td>Building OData Services</td></tr>
<tr><td>4:30-5:00</td><td>Consuming OData Services: (.NET)</td></tr>
<tr><td>5:00-5:30</td><td>Consuming OData Services (Java)</td></tr>
</table>
<br /><br /><br />
<h2>Wednesday, October 21, 2015</h2>
<table style="table-layout: fixed;" class="tableWithVerticalLines scheduleTableTextOnly">
<thead><tr style="line-height: 4em;"><th style="width: 8%;" class="darkBlueBackground whiteText">&nbsp;</th><th class="darkBlueBackground whiteText">Conference Room</th><th class="darkBlueBackground whiteText">Hack Session 1: Add-ins </th><th class="darkBlueBackground whiteText">Hack Session 2: OData</th></thead>
<tr><td>9-9:30</td><td>Open Specifications and Interoperability </td><td rowspan="5" style="word-wrap: break-word;" class="lightGreenBackground">Add-ins and O365 Solutions, Development Tools, and Open Source Hack Session</td><td rowspan="5" class="lightBlueBackground" style="text-align: center;">OData Hack Session </td></tr>
<tr><td>9:30-10:00</td><td>Exchange Protocols Overview and EAS Deep Dive</td></tr>
<tr><td>10:00-10:45</td><td>Mail, Calendar, and Contacts REST Demonstration</td></tr>
<tr><td>10:45-11:00</td><td class="lightGrayBackground">Break</td></tr>
<tr><td>11:00-11:45</td><td>Exchange Web Services Demo and Examples</td></tr>
<tr><td>11:45-1:00</td><td colspan="3" class="lightGrayBackground">Lunch</td></tr>
<tr><td>1:00-1:30</td><td>Office Online Integration</td><td class="withoutBottomBorder lightGreenBackground">&nbsp;</td><td class="withoutBottomBorder lightBlueBackground">&nbsp;</td></tr>
<tr><td>1:30-2:15</td><td>Office and SharePoint File IO</td><td class="withoutBottomBorder lightGreenBackground">&nbsp;</td><td class="withoutBottomBorder lightBlueBackground">&nbsp;</td></tr>
<tr><td>2:15-2:45</td><td>OData Validator</td><td class="withoutBottomBorder lightGreenBackground">&nbsp;</td><td class="withoutBottomBorder lightBlueBackground">OData Hack</td></tr>
<tr><td>2:45-3:00</td><td class="lightGrayBackground">Break</td><td class="withoutBottomBorder lightGreenBackground">&nbsp;</td><td class="withoutBottomBorder lightBlueBackground">Session</td></tr>
<tr><td>3:00-3:30</td><td>Overview of Microsoft File Formats</td><td class="withoutBottomBorder lightGreenBackground">&nbsp;</td><td class="withoutBottomBorder lightBlueBackground">&nbsp;</td></tr>
<tr><td>3:30-4:30</td><td>Build an OOXML document </td><td class="withoutBottomBorder lightGreenBackground">&nbsp;</td><td class="withoutBottomBorder lightBlueBackground">&nbsp;</td></tr>
</table>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 3,
                tabTitle: 'Event Material',
                tabContent: `<h2>Shanghai Interop Dev Days Materials</h2>
<ul>
	<li><a download="uploads/Shanghai-Interop-Dev-Days-2015-Resources.zip">Shanghai Interop Dev Days Presentations</a></li>
	<li><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Shanghai-Interop-Dev-Days">Shanghai Interop Dev Days Videos</a></li>
	<li>Click on a photo to enlarge it, then right click to download</li>
</ul>
<div class="gallery">
<a href="uploads/_MG_3990.JPG"><img src="uploads/_MG_3990.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_3992.JPG"><img src="uploads/_MG_3992.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_3993.JPG"><img src="uploads/_MG_3993.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_3996.JPG"><img src="uploads/_MG_3996.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_3999.JPG"><img src="uploads/_MG_3999.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4002.JPG"><img src="uploads/_MG_4002.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4007.JPG"><img src="uploads/_MG_4007.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4013.JPG"><img src="uploads/_MG_4013.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4016.JPG"><img src="uploads/_MG_4016.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4019.JPG"><img src="uploads/_MG_4019.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4021.JPG"><img src="uploads/_MG_4021.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4025.JPG"><img src="uploads/_MG_4025.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4026.JPG"><img src="uploads/_MG_4026.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4030.JPG"><img src="uploads/_MG_4030.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4031.JPG"><img src="uploads/_MG_4031.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4046.JPG"><img src="uploads/_MG_4046.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4048.JPG"><img src="uploads/_MG_4048.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4053.JPG"><img src="uploads/_MG_4053.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4058.JPG"><img src="uploads/_MG_4058.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4061.JPG"><img src="uploads/_MG_4061.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4066.JPG"><img src="uploads/_MG_4066.JPG" width="100" height="100" /></a>
<a href="uploads/_MG_4070.JPG"><img src="uploads/_MG_4070.JPG" width="100" height="100" /></a>
</div>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 4,
                tabTitle: 'Event Recap',
                tabContent: `
<h2>Event Recap: Shanghai Interop Dev Days 2015</h2>
<p>Traditionally, the Open Specifications team holds Plugfests to help developers learn about Microsoft protocols, access Microsoft protocol test suites, and collaborate with Microsoft engineers. With the continued success of Open Specifications events, the concept of the Plugfest evolved and Interop Dev Days was created.</p>
<h4>Subject Matter Experts</h4>
<img src="uploads/3225.110515_0128_EventRecapS1.jpg" />
<p>The Microsoft Extensibility team held an Interop Dev Days event to highlight the opportunities of developing with Office 365. In addition to familiar topics such as O365 development and Open Specifications, OData played a crucial role in this year’s Dev Days, illustrating the value in creating and using interoperable RESTful APIs. The event offered a full range of presentations, live demonstrations, and Q&A sessions. Attendees also received one-on-one assistance and <a href="http://dev.office.com/devprogram">a free Microsoft developer account</a>.</p>
<h4>O365 Developer Brainstorm Session</h4>
<img src="uploads/1665.110515_0128_EventRecapS2.jpg" />
<p>After showing attendees how to sign up for their Microsoft developer account, the Microsoft team led an open, interactive Office Add-in brainstorm session. Attendees were encouraged to think of new Office Add-ins and share their ideas in an open discussion. Participants’ creativity and openly shared ideas helped inspire the entire group to begin thinking of new ways to develop with Office 365.</p>
<h4>Hack Sessions</h4>
<img src="uploads/2766.110515_0128_EventRecapS3.jpg" />
<p>After sparking creativity during the O365 brainstorm session, attendees began developing their Add-ins! Microsoft engineers were eager to sit down and work with developers to make their Office Add-ins a reality. With Microsoft experts readily available, attendees received immediate, personalized assistance, which led to a faster and more successful development process.</p>
<h4>Certificate of Completion</h4>
<p>As part of Shanghai Interop Dev Days, each attendee who completed an Office Add-in hack session received a Certificate of Completion. Attendees who completed both a hack session and an Office Add-in received a certificate and were announced on stage by the Microsoft team. Additionally, attendees were rewarded for their hard work at a post-event mingle with beverages and food.</p>
<p>The combination of O365 development, OData, and the traditional protocol implementation allowed for Interop Dev Days to reach a new audience, introduce fresh content, and explore a different event structure. Shanghai Interop Dev Days gave attendees a well-rounded experience from brainstorming, to building, to completing a product. Engaged, enthusiastic attendees actively developed with Office 365, created tangible results, and built stronger relationships with Microsoft.</p>
<p>Are you interested in attending a future Open Specifications event? Stay up to date on our blog or send an email to <a href="mailto:plugfests@microsoft.com">plugfests@microsoft.com</a>.</p>
<p>Event Resources: <a href="http://blogs.msdn.com/b/officeinteroperability/default.aspx?wa=wsignin1.0">Blog</a> / <a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests">Event Videos</a> / <a href=mailto:"plugfests@microsoft.com">Email</a> / <a href="http://www.meetup.com/Shanghai-Interop-Dev-Days-2015/">Meetup</a> / <a href="https://twitter.com/OSpecifications">Twitter</a></p>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 1,
                tabTitle: 'Venue',
                tabContent: `<h3>Shanghai Marriott Hotel City Centre</h3>
<p>555 Xi Zang Road (Middle)</p>
<p>Huangpu District  Shanghai  200003  China</p>
<img src="uploads/shamc_main01.jpg" />`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 6,
                tabTitle: 'About',
                tabContent: `<h3>Paris 2017</h3>
									<p>After the success of the Extend Conference in 2016, we decided to come back for 2017. If you're interesed in attending our Paris 2017 event. Please email <a href="mailto:plugfests@microsoft.com">plugfests@microsoft.com</a>.</p>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 1,
                tabTitle: 'About',
                tabContent: `<h3>DevDays Asia 2017 @ Taipei</h3>
									<p>Microsoft established the Internet of Things (IoT) Industry Development Center in October of 2015 to integrate global and local partners from the ecosystem, accelerating the process of developing IoT solutions for the manufacturing, financial, health care, transportation, and retailing industries.</p>
									<p>As part of our commitment to helping developers create the next generation of technologies, we're returning to Taipei in 2017 with a team of Microsoft developers from the US to deliver lectures, host workshops, and interact with developers to generate amazing ideas and solutions to real-world problems.</p>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 1,
                tabTitle: 'About',
                tabContent: `<h3>Redmond Protocol Plugfest 2017</h3>
									<p>Microsoft subject matter experts from both the support organization and the product team gather at the Plugfest to present protocol updates, to answer questions, and to debug with customers. Please email <a href="mailto:plugfests@microsoft.com">plugfests@microsoft.com</a>.</p>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabTitle: 'About',
                tabContent: `
					<p>Presentations are only part of what is going on at the SNIA’s 2016 <a href="http://www.storagedeveloper.org/">Storage Developer Conference</a>., September 19-22 in Santa Clara, CA.  The SNIA SMB3 Plugfest is also an integral part of the program.</p>
					<p>Microsoft is happy to announce that once again this year we are under-writing the 2016 SMB3 Plugfest in partnership with NetApp. The purpose of this Plugfest is for vendors to bring their implementations of SMB3 to test, identify, and fix bugs in a collaborative setting with the goal of providing a forum in which companies can develop interoperable products. The SNIA provides and supports networks and infrastructure for the Plugfest, creating a collaborative framework for testing.  The participants of the Plugfest work together to define the testing process, assuring that objectives are accomplished. </p>
					<p>For complete details on how to participate please visit: <a href="http://www.snia.org/events/storage-developer/plugfest">http://www.snia.org/events/storage-developer/plugfest</a></p>
					<p>If you have any additional questions, please contact <a href="mailto:prana@microsoft?subject=SNIA%20SMB3%20Plugfest:">Prakash Narayanan</a> or Arnold Jones, SNIA Technical Council Managing Director, at 407-574-7273 or <a href="mailto:arnold@snia.org">arnold@snia.org</a>.`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabTitle: 'About',
                tabNumber: 1,
                tabContent: `
				<a href="/beijing2016cn" class="btn btn-success float-right" role="button">汉语</a>
				<a class="btn btn-primary float-right" role="button" style="margin-right:10px;" href="http://www.aka.ms/devdaysbeijing2016">Register</a>
				<h2>DevDays Asia 2016 @ Beijing</h2>
				<h4>October 21-23, 2016</h4>
				<h4>Beijing, China</h4>
				<h4>For: Developers, ISVs, students, tech startups, and businesses</h4>
				<h4>Cost: Free</h4>
				<p>Microsoft Office 365 and Open Specifications present DevDays Asia 2016 @Beijing - an extension of the <a href=http://www.prnewswire.com/news-releases/microsoft-launches-the-biggest-developer-event-in-asia-taking-iot-development-in-taiwan-to-new-heights-300253810.html">Biggest Developer Event in Asia,"</a> DevDays Asia @ Taipei. Join DevDays Asia 2016 @Beijing from October 21-23, 2016 at Microsoft Beijing West Campus for technical presentations, hands on workshops, interactive sessions, and a hackathon! The event will include 20+ technical sessions with hands-on experience, experts 1:1, and direct access to Microsoft engineers. You can also come bring current Office 365 projects to the 48 hours Hackathon, fine tune your solution with Microsoft experts support, also get the chance to win a prize!</p>
				<p>We encourage developers, students, ISVs and businesses to attend DevDays Asia @Beijing to learn about the advantages of developing within Microsoft Office. In addition, DevDays Asia @Beijing will include a track dedicated to Microsoft's commitment to interoperability including Open Specifications and protocol content. As always, the event will host a team of Microsoft engineers who are eager to provide their expertise and answer your questions</p>
				<p><strong>DevDays Asia 2016</strong> includes 2 major parts: The full day <strong>Developer Technical Summit (9am-6pm on Oct. 22) </strong> and a <strong>48 hours Office 365 Developer Hackathon (from 5pm Oct. 21 to 5pm Oct 23)</strong>, you can choose to opt-in the Developer Hackathon while you registering the DevDays Asia 2016.</p>
				<p class="blue-border"><span class="bg-primary">DevDays Asia 2016 Developer Summit&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;Oct. 22 9:00-18:00</p>
				 
				<p>We will introduce the wide opportunity of Microsoft Office 365, and deep dive into details of Office 365 development. In addition, DevDays Asia @Beijing will include an additional track dedicated to Microsoft's commitment to interoperability including Open Specifications and protocol content. As always, the event will host our Microsoft team will be onsite to work with you.</p>
				<p>Some of the topics will include during the event are:</p>
				<ul>
					<li>Microsoft Office Add-ins for Word, Excel, PowerPoint, and Outlook</li>
					<li>Microsoft Graph: The easiest way to call Microsoft APIs to access data, intelligence, insights, users, files, mail, calendar, contacts, and folders</li>
					<li>Microsoft SQL Server</li>
					<li>OData: Building and consuming RESTful APIs</li>
					<li>Office File Formats</li>
					<li>Office, SharePoint, or Exchange Protocols</li>
					<li>Open Specifications for Microsoft Office and Data Platform</li>
					<li>Windows Interoperability and Test Suites</li>

				</ul>
				<p class="blue-border"><span class="bg-primary">Office 365 Hackathon&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;Oct. 21 17:00 – Oct. 23 17:00</p>
				<p>The fast growing trend of Office 365 brings huge opportunity to ISV, Enterprises, Startups and Developers. Office 365 based application and solution brought new productivity even innovation in many industries and scenarios.</p>
				<p>17:00 Oct. 21 to 23, come with your ideas, your projects and your whole team, join our 48 hours Developer Hackathon, compete with teams from all around the country, face the product team engineers, resolve any problems you met, accelerate and polish your project.</p>
				<p>We will provide 360 degree logistic services, food & beverage, nap or entertainment, all of these to ensure to build your fantastic project in the powerful 48 hours. The most important – we prepared lots of attractive prizes, to reward the outstanding winners:</p>
				<img src="uploads/things-beijing-2016.png" class="centered" title="images of laptop, drone, virtual reality goggles, and scooter" alt="images of laptop, drone, virtual reality goggles, and scooter">
				<hr>
				<a href="http://www.aka.ms/devdaysbeijing2016"><img src="uploads/RegisterNowEN.png" class="centered" title="registration button" alt="registration link"></a>
				<p class="small">* Prizes displayed are not final and are subject to change.</p>
				<p class="small">* Contact <a href="mailto:plugfests@microsoft.com">plugfests@microsoft.com</a> with questions.</p>

				`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabTitle: 'Accommodations',
                tabContent: `<h2>Silver Cloud Inn and Hotels</H2>
				<p>The rate is at $159 for either a King room or a Two Queen guest bedroom. Amenities include hot breakfast, parking and in-room Wi-Fi</p>
				<p>To book online, please go to: www.silvercloud.com</p>
				<p>Under ‘MAKE A RESERVATION’ is ‘Destination’, click onto the tab and select Redmond, enter your arrival/departure date, enter number adults/children, click on ‘CHECK AVAILABILITY’, and under ‘Corporate or Group Login, Group ID: <span style="color:red">RDPIOLAB</span>; Password: <span style="color:red">RDPIOLAB</span> and click on ‘LOG IN’, then click on ‘reserve’ tab and follow the instructions until done.</p>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabTitle: 'Hackathon Resources',
                tabNumber: 5,
                tabContent: `
				<a href="/beijing2016cn" class="btn btn-success float-right" role="button">汉语</a>
				<a class="btn btn-primary float-right" role="button" style="margin-right:10px;" href="http://www.aka.ms/devdaysbeijing2016">Register</a>
				<h4>Resources are listed below for attendees to prepare for the hackathon.</h4>
					<ul>
						<li><h5><a target="_self" href="#prereqsHeader" du-smooth-scroll>Prerequisites</a></h5></li>
						<li><h5><a target="_self" href="#more-resources-header" du-smooth-scroll>More resources</a></h5></li>
						<li><h5><a target="_self" href="#tutorials-header" du-smooth-scroll>Tutorials</a> </h5>
							<ul>
								<li><a target="_self" href="#taipei2016-curriculum-registration-en" target="_self">Registration</a></li>
								<li><a target="_self" href="#taipei2016-curriculum-publishing-en" target="_self">Publish an Office add-in and submit it to Office Store</a></li>
							</ul>
					</li>
					</ul>
					<h3 id="prereqsHeader">Prerequisites</h3>
					<ul>
						<li>
							If you don't already have Office, sign up with <a href="http://dev.office.com/devprogram">Office Dev Center</a> by clicking Dev Program sign up to get an Office 365 developer account and receive a one-year, free subscription for an Office 365 Development instance. 
							<br>
							For the d	etailed step-by-step instruction, watch this <a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/DevDays-Asia--Taipei-2016/Office-365-Developer-Program-sign-up--Training">Channel 9 video</a> on Office 365 Developer Program sign up training or follow the Registration tutorial for similar info.
						</li>
						<li>
						 	<a href="http://dev.office.com/getting-started">Getting started</a>
							<br>
							Getting started has info on IDEs for your development.
							<br>
							Note: If you choose to use Visual Studio as your IDE to develop your Office add-ins, there’s a <a href="https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx">free community version</a> available for download. You will also need <a href="https://www.visualstudio.com/features/office-tools-vs">Office Developer Tools</a>.
						</li>
					</ul>
					<h3 id="more-resources-header">More resources</h3>
					<h4>Starting points for Office app development</h4>
					<ul>
						<li><a href="http://dev.office.com">Office Dev Center</a></li>
						<li><a href="http://graph.microsoft.io/en-us/">Microsoft Graph</a></li>
						<li><a href="http://graph.microsoft.io/en-us/app-registration">App registration</a></li>
						<li><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Shanghai-Interop-Dev-Days/Office-365-APIs">Office 365 API</a></li>
						<li><a href="https://channel9.msdn.com/Search?term=pui%20leung#ch9Search">Office 365 developer experience</a></li>
						<li><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Shanghai-Interop-Dev-Days/The-World-of-Connected-APIs ">The world of connected APIs</a></li>
						<li><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Microsoft-Extend-Paris-2016/Office-Add-ins-Intro-and-Development?ocid=player">Office Add-ins intro and development</a></li>
						<li><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests">Videos from Open Specifications Plugfests and Interop Dev Days</a></li>
					</ul>
					<h4>Code samples</h4>
					<ul>
						<li><a href="https://github.com/OfficeDev">Office Developer on GitHub</a></li>
					</ul>
					<h3 id="tutorials-header">Tutorials</h3>
					<ul>
						<li><a target="_self" href="#taipei2016-curriculum-registration-en" target="_self">Registration</a></li>
						<li><a target="_self" href="#taipei2016-curriculum-publishing-en" target="_self">Publish an Office add-in and submit it to Office Store</a></li>
					</ul>
					
					
					
					<h2 id="taipei2016-curriculum-registration-en" >Registration</h2>
					<h3>Topics</h3>
					<ol>
					<li><a target="_self" href="#taipei2016-sign-up-at-office-dev-cenbter-en">Sign up with Office Dev Center</a></li>
					<li><a target="_self" href="#taipei2016-join-dev-program-en">Get an Office 365 developer account</a></li>
					<li><a target="_self" href="#taipei2016-access-your-office-365-en">Access your Office 365</a></li>
					<li><a target="_self" href="#taipei2016-assign-office-365-license-en">Assign Office 365 license</a></li>
					<li><a target="_self" href="#taipei2016-registration-resources-en">Resources</a></li>
					</ol>
					<h3 id="taipei2016-sign-up-at-office-dev-cenbter-en">Sign up with Office Dev Center</h3>
					<p>Sign up with <a href="http://dev.office.com/devprogram">Office Dev Center</a> to get a free Office 365 developer account and receive a one-year, free subscription for an Office 365 Development instance.  </p>
					<figcaption>Figure 1. Office 365 Dev Program</figcaption>
					 <img src="../uploads/office-web-curriculum-taipei-en-5.png" />
					<h3 id="taipei2016-join-dev-program-en">Get an Office 365 developer account</h3>
					<ol>
					<li>You will receive an email from the Office 365 Developer Program. Scroll down the email, click on the provided link to sign up for a free Office 365 developer account.</li>
					<li>The first page (not shown) of the signup form is self-explanatory. Just supply the information about yourself that is requested and choose <strong>Next</strong>.</li>
					<li>On the second page, shown in Figure 2, specify a user ID for the administrator of the subscription. </li>
					</ol>
					<figcaption>Figure 2. Office 365 Developer Site domain name</figcaption>
					<img src="../uploads/office-web-curriculum-taipei-en-6.png" />
					<p>4. Create a subdomain of <strong>.onmicrosoft.com</strong></p>
					<p class="indentP"> After signup, you have to use the resulting credentials (in the format <a href="mailto:UserID@yourdomain.onmicrosoft.com">UserID@yourdomain.onmicrosoft.com</a>) to sign in to your Office 365 portal site where you administer your account. Your SharePoint Online Developer Site is provisioned at your new domain: http://yourdomain.sharepoint.com.</p>
					<p>5. Choose <strong>Next</strong> and fill out the final page of the form. If you choose to provide a telephone number to obtain a confirmation code, you can provide a mobile or land line telephone number, but not a VoIP (Voice over Internet Protocol) number.</p>
					<table class="tableWithBorders tableFirstRowBold">
					<tr><th>Note</tj></tr>
					<tr><td><p>If you’re logged on to another Microsoft account when you try to sign up for a developer account, you might get this message: "Sorry, that user ID you entered didn’t work. It looks like it’s not valid. Be sure you enter the user ID that your organization assigned to you. Your user ID usually looks like <i>someone@example.com</i> or <i>someone@example.onmicrosoft.com</i>."</p>
					<p>If you see this message, log out of the Microsoft account you were using and try again. If you still get the message, clear your browser cache or switch to InPrivate Browsing and then fill out the form.</p>
					</td></tr>
					</table>
					<p>Once your account is created, you will receive another email that contains a link to access your Office 365.</p>
					<h3 id="taipei2016-access-your-office-365-en">Access your Office 365</h3>
					<p>Your browser will open the Office 365 installation page. Choose the Admin icon to open the admin center page.</p>
					<figcaption>Figure 3. Office 365 admin center page</figcaption>
					<img src="../uploads/office-web-curriculum-taipei-en-7.png" />
					<ol>
					<li>You’ll have to wait for your Developer Site to finish provisioning. After provisioning is complete, refresh the admin center page in your browser.</li>
					<li>Then, choose the Build Add-ins link to open your Developer Site. You should see a site that looks like the one in Figure 4. There is an Add-ins in Testing list on the page. This confirms that the website was made with SharePoint\'s Developer Site template. If you see a regular team site instead, wait a few minutes and launch your site again.<br />If you do not have the development tool, you will be directed to Add the Napa Office 365 Development Tools. You can use Napa to develop your add-ins on this site.</li>
					<li>Make a note of the URL of the site. It is used when you create SharePoint Add-ins projects in Visual Studio.</li>
					</ol>
					<figcaption>Figure 4. Your Developer Site home page with the Add-ins in Testing list</figcaption>
					 <img src="../uploads/office-web-curriculum-taipei-en-8.png" />
					<h3 id="taipei2016-assign-office-365-license-en">Assign Office 365 license</h3>
					<p>To assign Office 365 license for yourself, the active user. Click on the “waffle” icon > Admin icon located on the top left.</p>
					<figcaption>Figure 5. Office 365 landing page</figcaption>
					<img src="../uploads/office-web-curriculum-taipei-en-10.png" />
					<p class="indentP">In the left navigation panel, select <strong>Users</strong> > <strong>Active Users</strong> </p>
					<p class="indentP">Select yourself by clicking on the checkbox. Your profile will be shown on the right. Click <strong>Edit</strong> under the item: <strong>Assigned license</strong></p>
					<figcaption>Figure 6. Office 365 admin center > Active Users</figcaption>
					<img src="../uploads/office-web-curriculum-taipei-en-11.png" />
					<p class="indentP">3. Select your location in the <strong>Set user location</strong> combo box. And select <strong>Microsoft Office 365 Developer</strong>. Click <strong>Save</strong> to finish assigning the license.</p>
					<figcaption>Figure 7: Assign license for the active user profile</figcaption>
					<img src="../uploads/office-web-curriculum-taipei-en-12.png">
					<p class="indentP">4. After you’re finished, return to the Office 365 homepage. The page will display the products that are available to you, including the Office web apps. Pull down the page to see the full display.</p>
					<figcaption>Figure 8. Office 365</figcaption>
					<img src="../uploads/office-web-curriculum-taipei-en-13.png" />
					<p>To navigate back to the developer site, click on the “waffle” icon (located in the top-left corner) > <strong>Admin</strong> > <strong>Build Apps</strong>.</p>
					<h3 id="taipei2016-registration-resources-en">Resources</h3>
					<p><a href="https://msdn.microsoft.com/en-us/library/office/dn467914.aspx">Office developer documentation</a></p>
					<p><a href="https://msdn.microsoft.com/en-us/library/office/fp179924.aspx#o365_signup">Set up for an Office 365 Developer Site</a></p>
					</div>
					<div id="taipei2016-curriculum-napa-en" class="tab-content" style="display: none;">
					<h2>Napa Office 365 Development Tools</h2>
					<h3>Topics</h3>
					<ul>
					<li> <a target="_self" href="#taipei2016-prerequisites-napa-en">Prerequisites</a></li>
					<li><a target="_self" href="#taipei2016-create-office-addins-with-napa-en">Create Office Add-ins with Napa on an Office 365 Developer Site</a></li>
					<li><a target="_self" href="#taipei2016-create-excel=addin-with-napa-en">Create a content add-in for Excel with Napa Office 365 Development Tool </a></li>
					<li><a target="_self" href="#taipei2016-debug-your-addin-napa-en">Debug your add-in in Internet Explorer </a></li>
					<li><a target="_self" href="#taipei2016-resources-napa-en">Resources</a></li>
					</ul>
					<h3 id="taipei2016-prerequisites-napa-en">Prerequisites</h3>
					<p>Join the <a href="http://dev.office.com/devprogram">Office 365 Developer Program</a>. See <a class="welcomeTab" data-tabId="taipei2016-curriculum-registration-en-tab">Registration</a></p>
					<table class="tableWithBorders tableFirstRowBold">
					<tr><th>Note</th></tr>
					<tr><td>If you have Office 365, there\'s an alternate version of <a href="https://www.napacloudapp.com/Getting-Started">Napa</a> that doesn\'t use or require an Office 365 Developer Site. That version supports creating only Office Add-ins using your personal <a href="https://www.microsoft.com/en-us/account/default.aspx">Microsoft account</a>. </td></tr>
					</table>
					<h3 id="taipei2016-create-office-addins-with-napa-en">Create Office Add-ins with Napa on an Office 365 Developer Site</a></h3>
					<p>Napa is a great way to get started building Office Add-ins right in a browser window. You don\'t need to install any tools such as Visual Studio.  All you need is an Office 365 account and a supported browser. (Firefox is the recommended browser for Mac users.)</p>
					<p>To get started, sign up for an Office 365 Developer Site. Then, install Napa on your developer site and you are ready to create Office Add-ins.</p>
					<ol>
					<li>If you’ve completed the steps in Registration, you will have access to the Office 365 Developer Site. Sign in with your credential created in Registration at <a href="http://www.portal.office.com/">www.portal.office.com</a> > Click on <strong>Admin</strong> > <strong>Build Apps</strong> to access your developer site.<br />If you do not have the development tool, you will be directed to <strong>Add</strong> the Napa Office 365 Development Tools.</li>
					<li>Click on <strong>Build Apps</strong> on the developer site to open the Napa Office 365 Development Tools web app in your browser.<br /><h3 style="margin-left: -25px" id="taipei2016-create-excel=addin-with-napa-en">Create a content add-in for Excel with Napa Office 365 Development Tool </h3></li>
					<li>Open the Napa Office 365 Development Tools web app in your browser and choose the <strong>Add New Project</strong> tile. (The Add New Project tile appears only if you have created other projects.)</li>
					<li>Try the tutorial: <a href="https://msdn.microsoft.com/EN-US/library/office/jj220065.aspx">Create a content add-in for Excel with Napa Office 365 Development Tools</a></li>
					</ol>
					<h3 id="taipei2016-debug-your-addin-napa-en">Debug your add-in in Internet Explorer</h3>
					<p>If you start your add-in in Excel Online, and you use Internet Explorer (IE), you can use F12 developer tools to debug the JavaScript, HTML, and Cascading Style Sheets (CSS) of your content add-in. See <a href="https://msdn.microsoft.com/library/bg182326(v=vs.85)">Using the F12 developer tools</a> for more information. If you use a browser other than Internet Explorer, search your browser documentation.</p>
					<h3 id="taipei2016-resources-napa-en">Resources</h3>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj220038.aspx">Create Office Add-ins with Napa on an Office 365 Developer Site</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn974046.aspx">Create Office Add-ins with Napa Office 365 Development Tools</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj554660.aspx">Create a task pane add-in with Napa Office 365 Development Tools</a></p>
					</div>
					<div id="taipei2016-curriculum-vs2015-en" class="tab-content" style="display: none;">
					<h2>Visual Studio Community 2015</h2>
					<h3>Topics</h3>
					<ul>
					<li><a target="_self" href="#taipei2016-vs-2015-prerequisites-en">Prerequisites</a></li>
					<li><a target="_self" href="#taipei2016-vs-2015-setup-en">Set up your free Visual Studio Community 2015</a></li>
					<li><a target="_self" href="#taipei2016-vs-2015-hello-world-en">Build your first Hello World task pane add-in with Visual Studio</a></li>
					<li><a target="_self" href="#taipei2016-vs-2015-build-first-excel-addin-en">Build your first Excel add-in</a></li>
					<li><a target="_self" href="#taipei2016-vs-2015-debuging-en">Debug in Visual Studio</a></li>
					<li><a target="_self" href="#taipei2016-vs-2015-resources-ens-en">Resources</a></li>
					</ul>
					<h3 id="taipei2016-vs-2015-prerequisites-en">Prerequisites</h3>
					<ul>
					<li><a href="https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx">Visual Studio community 2015 (free version)</a></li>
					<li><a href="https://www.visualstudio.com/features/office-tools-vs">Office Developer Tools</a></li>
					<li>Excel 2013 or later and Word 2013 or later for "Build your first Hello World" and extend on your "Hello World" add-in</li>
					<li>Excel 2016, Excel Online for "Build your first Excel add-in" (The new API released with Office 2016 has additional functionalities, but works with the latest version of Office or the online version.) </li>
					</ul>
					<h3 id="taipei2016-vs-2015-setup-en">Set up your free Visual Studio Community 2015</h3>
					<p class="indentP">1. If you don\'t have Visual Studio, download <a href="https://go.microsoft.com/fwlink/?LinkId=532606&clcid=0x409">Visual Studio 2015 Community Edition</a> along with <a href="https://www.visualstudio.com/features/office-tools-vs">Office Developer Tools</a>. </p>
					<img src="../uploads/office-web-curriculum-taipei-14.png" />
					<table class="tableWithBorders tableFirstRowBold">
					<tr><th>Note</strong></th>
					<tr><td>When you develop and debug an add-in in Visual Studio, Visual Studio deploys and runs your add-in\'s webpage files locally with IIS Express, and doesn\'t require an additional web server. Similarly, when you develop and debug with Napa in the browser, it deploys and runs your add-in\'s webpage files from storage associated with the account you used to sign into Napa.</td></tr>
					</table>
					<p class="indentP">2. Choose <strong>File</strong> > <strong>New</strong> > <strong>Project</strong>.</p>
					<p class="indentP">3. In the <strong>New Project</strong> dialog, choose <strong>Templates</strong> > <strong>Visual C#</strong> > <strong>Office/SharePoint</strong> > <strong>Office Add-in</strong> (or App for Office).</p>
					<img src="../uploads/office-web-curriculum-taipei-15.png" />
					<p class="indentP">4. Name the project <strong>HelloWorld</strong>, and then choose <strong>OK</strong>.</p>
					<p class="indentP">5. Select <strong>Task</strong> pane as the app type and then <strong>Next</strong>.</p>
					<p class="indentP">6.  Select <strong>Excel</strong> as the Office application that you want to host your add-in. You can select multiple options, and your add-in will run in any of the selected applications.</p>
					<p class="indentP">Visual Studio creates the project, and its files appear in Solution Explorer. The default Home.html page opens in Visual Studio.</p>
					<p>If you prefer to use an editor other than Visual Studio, keep in mind you can <a href="https://msdn.microsoft.com/library/office/mt628821.aspx">create an Office add-in using any editor.</a>
					<h3 id="taipei2016-vs-2015-hello-world-en">Build your first Hello World task pane add-in with Visual Studio</h3>
					<p>Try this tutorial: <a href="https://msdn.microsoft.com/en-us/library/office/fp142161.aspx">Create a task pane or content add-in with Visual Studio</a></p>
					<h3 id="taipei2016-vs-2015-build-first-excel-addin-en">Build your first Excel add-in</h3>
					<p>Try this tutorial: <a href="https://msdn.microsoft.com/EN-US/library/office/mt616491.aspx">Build your first Excel add-in</a></p>
					<p>The new Excel add-in JavaScript API interacts with Excel 2016, and Excel online. If you use Excel 2013 to run your add-in, you will see this error:</p>
					<table class="tableWithBorders tableFirstRowBold">
					<tr><td>0x800a1391 - JavaScript runtime error: \'Excel\' is undefined</td></tr>
					</table>
					<p>If you do not have Excel 2016, login to your Office 365 Developer Site, see <a class="welcomeTab" data-tabId="taipei2016-curriculum-registration-en-tab">Registration</a>.  Use the Napa development tool and run your add-in using Excel Online.</p>
					<h3 id="taipei2016-vs-2015-debuging-en">Debug in Visual Studio</h3>
					<p>Add breakpoints and click <strong>Start Debugging</strong> or press <strong>F5</strong> to start debugging.</p>
					<h3 id="taipei2016-vs-2015-resources-en">Resources</h3>
					<p><a href="https://dev.office.com/">Office Dev Center</a></p>
					</div>
					<div id="taipei2016-curriculum-api-en" class="tab-content" style="display: none;">
					<h2>API tutorial </h2>
					<h3>Topics</h3>
					<ul>
					<li><a target="_self" href="#taipei2016-api-programming-overview-en">Programming overview</a></li>
					<li><a target="_self" href="#taipei2016-api-reference-en">API reference</a></li>
					<li><a target="_self" href="#taipei2016-api-samples-en">Samples</a></li>
					<li><a target="_self" href="#taipei2016-api-exercises-en">Exercises</a></li>
					<li><a target="_self" href="#taipei2016-api-resources-en">Resources</a></li>
					</ul>
					<h3 id="taipei2016-api-programming-overview-en">Programming overview</h3>
					<p>Before you begin writing your add-in, it may be helpful to review <a href="https://msdn.microsoft.com/en-us/library/office/fp160953.aspx">Understanding the JavaScript API for Office</a> and the programming overview for the different types of Office add-in.</p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/mt616487.aspx">Excel</a></p>
					<p><a href="http://dev.office.com/docs/add-ins/word/word-add-ins-programming-overview">Word</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/fp161015.aspx">Outlook</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn610884.aspx">PowerPoint</a></p>
					<p>Note that if you make use of JavaScript APIs that are only available in some versions of Office; for example, you might use the new JavaScript APIs for Excel in an add-in that runs in Excel 2016, make sure you have Excel 2016 or Excel Online during development and <a href="http://dev.office.com/docs/add-ins/testing/testing-and-troubleshooting">testing</a>. </p>
					<p>To ensure that your add-in works as expected, see <a href="https://msdn.microsoft.com/EN-US/library/office/dn535871.aspx">Specify Office hosts and API requirements</a>.</p>
					<h3 id="taipei2016-api-reference-en">API reference</h3>
					<p>Explore the <a href="https://dev.office.com/reference/add-ins/javascript-api-for-office">JavaScript API for Office reference</a> – or <a href="https://dev.office.com/docs/add-ins/excel/excel-add-ins-javascript-api-reference">Excel add-ins JavaScript API reference</a> for example – along with the code samples may expedite the learning.</p>
					<h3 id="taipei2016-api-samples-en">Samples</h3>
					<p><a href="https://dev.office.com/blogs/Add-in-Samples-Have-Moved-To-GitHub">Add-in samples have moved to GitHub</a></p>
					<p><a href="https://github.com/OfficeDev">Office Developer on GitHub</a></p>
					<p><a href="https://dev.office.com/code-samples">Office Dev Center  </a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/mt616484.aspx">Excel add-in code samples </a></p>
					<p><a href="https://github.com/OfficeDev/Word-Add-in-ClauseLibrary-Code-Sample">Word-Add-in-ClauseLibrary-Code-Sample</a></p>
					<p><a href="https://github.com/OfficeDev/office-js-docs">Office JavaScript APIs on GitHub</a></p>
					<p><a href="https://dev.outlook.com/MailAppsGettingStarted/GetStarted">Get Started with Outlook add-ins for Office 365</a></p>
					<h3 id="taipei2016-api-exercises-en">Exercises</h3>
					<p>Try using the Excel add-in JavaScript API with the <a href="../uploads/ColorizerVS.zip">Excel Colorizer Add-in for Excel 2016</a>.</p>
					<p>Use the following tasks as a guide on how you may extend the basic Colorizer:</p>
					<ol>
					<li>Add another pattern option called Square Waves.  The wave amplitude and cycle are controlled by the existing <strong>Pattern Contrast %</strong> and <strong>Pattern Waves</strong> controls. This task consists of the following:
					<ol type="a">
					<li>Adjust the UI combo box for the pattern type.</li>
					<li>Adjust the existing JavaScript code that determines the visibility for the contrast and cycle controls.</li>
					<li>Add the necessary code to generate square waves.</li>
					</ol>
					</li>
					<li>Add a new feature to enumerate the leftmost column in a table. When enabled, consecutive numbers in the leftmost column are added to the selected range starting with the first row after the header. The numbers are black and in bold. This task consists of the following:
					<ol type="a">
					<li>Add a new checkbox control to enable this new functionality.</li>
					<li>Use the <a href="https://msdn.microsoft.com/EN-US/library/office/mt616490.aspx">Excel add-ins JavaScript API</a> to overwrite the cells’ text values with the right numbers.</li>
					<li>Use the <a href="https://msdn.microsoft.com/EN-US/library/office/mt616490.aspx">Excel add-ins JavaScript API</a> to format the cells correctly so that fonts are black and in bold.</li>
					</ol>
					</li>
					<li>Add a new feature to create borders for the given selection. This tasks requires a new combo box with the following options: None, Outer, Inner, Outer and Inner. Make the outer border twice as thick as the inner borders. This task consists of the following:
					<ol type="a">
					<li>Add new combo box with the right values. “None” is selected as default.</li>
					<li>Add the required code to create a table based on the specified choice using the <a href="https://msdn.microsoft.com/EN-US/library/office/mt616490.aspx">Excel add-ins JavaScript API</a>.</li>
					</ol>
					</li>
					</ol>
					<h3 id="taipei2016-api-resources-en">Resources </h3>
					<p><a href="https://dev.office.com/docs/add-ins/testing/debug-add-ins-using-f12-developer-tools-on-windows-10">Testing</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/mt484317.aspx">Design guidelines for Office Add-ins</a></p>
					</div>
					<h2 id="taipei2016-curriculum-publishing-en">Publishing</h2>
					<p>This tutorial shows the steps to publish the Excel Colorizer Add-in for Excel 2016 from the west U.S. for distribution in Office Store. Visual Studio Community 2015 is the IDE of choice. Microsoft Azure is the web hosting platform for the Colorizer.  </p>
					<p>To publish your add-in using other methods that are specific to your scenario, please see resources on <a href="http://dev.office.com/docs/add-ins/publish/publish">publishing</a>.</p>
					<h3>Topics</h3>
					<ol>
					<li><a target="_self" href="#taipei2016-publishing-decide-end-point-en">Decide on the Office Add-ins distribution end-points</a></li>
					<li><a target="_self" href="#taipei2016-publishing-set-up-dev-computer-en">Set up your development computer with Azure SDK for .NET, an Azure subscription, and Office 2016</a></li>
					<li><a target="_self" href="#taipei2016-publishing-create-azure-website-en">Create a website in Azure</a></li>
					<li><a target="_self" href="#taipei2016-publishing-publish-add-in-azure-en">Publish your Office Add-in to the Azure website</a></li>
					<li><a target="_self" href="#taipei2016-publishing-edit-addin-manifest-en">Edit the add-in manifest file to point to the Office Add-in on Azure</a></li>
					<li><a target="_self" href="#taipei2016-publishing-run-addin-en">Run the add-in in the Office client application</a></li>
					<li><a target="_self" href="#taipei2016-publishing-submit-to-office-store-en">Submit your add-in to the Office Store</a></li>
					<li><a target="_self" href="#taipei2016-publishing-publishing-resources-en">Resources</a></li>
					</ol>
					<h3 id="taipei2016-publishing-decide-end-point-en">Decide on the Office Add-ins distribution end-points</h3>
					<p>Decide on the distribution end-points to publish your Office Add-ins:</p>
					<ol type="a">
					<li>Office Store </li>
					<li>Office Add-ins catalog on SharePoint </li>
					<li>Exchange catalog</li>
					<li>Network shared folder add-in catalog</li>
					</ol>
					<p>This tutorial uses <a href="http://dev.office.com/docs/add-ins/publish/host-an-office-add-in-on-microsoft-azure">Microsoft Azure</a> to host the add-in and <a href="https://msdn.microsoft.com/en-us/library/office/jj220037.aspx">submit the add-ins to the Office Store for publishing</a>.</p>
					<h3 id="taipei2016-publishing-set-up-dev-computer-en">Set up your development computer with Azure SDK for .NET, an Azure subscription, and Office 2016</h3>
					<ol>
					<li>Install the Azure SDK for .NET from the <a href="http://azure.microsoft.com/en-us/downloads/">Azure downloads page</a>. This tutorial uses the free <a href="https://www.microsoft.com/en-us/download/details.aspx?id=48146">Microsoft Visual Studio Community 2015</a>.</a>
					<ol type="a">
					<li>Under <strong>Languages</strong>, choose <strong>.NET</strong>.</li>
					<li>Choose the version of the Azure .NET SDK that matches your version of Visual Studio, if you already have Visual Studio installed.</li>
					<li>When you’re asked whether to run or save the installation executable, choose <strong>Run</strong>.</li>
					<li>In the Web Platform Installer window, choose <strong>Install</strong>.</li>
					</ol>
					</li>
					<li>Install Office 2016. (The Colorizer add-in works only in Excel 2016 or Excel Online.)
					<br />
					<table class="tableWithBorders tableFirstRowBold">
					<tr><th>Note</strong></th>
					<tr><td><a href="https://products.office.com/en-us/try?legRedir=true&WT.intid1=ODC_ENUS_FX101785584_XT104056786&CorrelationId=cae9f0f9-caf0-411f-b512-426d951c2259">You can get a trial version of Office for one month.</a></td></tr>
					</table>
					</li> 
					<li>Get your Azure account. 
					<br />
					<table class="tableWithBorders tableFirstRowBold">
					<tr><th>Note</strong></th>
					<tr><td>If you’re a Microsoft Developer Network (MSDN) subscriber, <a href="http://www.windowsazure.com/en-us/pricing/member-offers/msdn-benefits/">you get an Azure subscription as part of your MSDN subscription</a>.</a></td></tr>
					<tr><td>If you\'re not an MSDN subscriber, you can still <a href="https://azure.microsoft.com/en-us/pricing/free-trial/">get a free trial of Azure at the Windows Azure website</a>.</td></tr>
					</table>
					</li> 
					</ol>
					<h3 id="taipei2016-publishing-create-azure-website-en">Create a website in Azure</h3>
					<p>There are a couple of ways you can create an empty Azure website. If you\'re using Visual Studio 2015 or the free community version, follow the steps below to create an Azure website from within the Visual Studio IDE.</p>
					<p><strong>Using Visual Studio Community 2015 </strong></p>
					<ol>
					<li>In Visual Studio, in the <strong>View</strong> menu choose <strong>Server Explorer</strong>. Right click <strong>Azure</strong> and choose <strong>Connect to Microsoft Azure subscription</strong>. Follow the instructions for connecting to your Azure subscription.</li>
					<li>In Visual Studio, in <strong>Server Explorer</strong>, expand <strong>Azure</strong>, right-click <strong>App Service</strong>, and then choose <strong>Create New App Service</strong>.</li>
					<li>In the <strong>Create Web App on Windows Azure</strong> dialog box, provide this information: 
					<ul>
					<li>Enter a unique <strong>Web App name</strong> for your site. Azure verifies that the site name is unique across the azurewebsites.net domain.</li>
					<li>Choose the <strong>App Service plan</strong> you\'re using to authorize creating this website. If you create a new plan, you also need to name it. </li>
					<li>Choose the <strong>Resource group</strong> for your site. If you create a new group, you also need to name it.</li>
					<li>Choose a geographical <strong>Region</strong> appropriate for you.</li>
					<li><strong>For Database server</strong>: accept the default of No database and then choose <strong>Create</strong>.</li>
					<li class="noStyleUL">The new website appears under the chosen resource group under <strong>App Service</strong> under <strong>Azure</strong> in <strong>Server Explorer</strong>.</li>
					</ul>
					</li>
					<li>Right-click the new website, and then choose <strong>View in Browser</strong>. Your browser opens and displays a webpage with the message "This web site has been successfully created."</li>
					<li>In the browser address bar, change the URL for the website so that it uses HTTPS and press <strong>Enter</strong> to confirm that the HTTPS protocol is enabled. The Office Add-in model requires add-ins to use the HTTPS protocol. </li>
					<li>In Visual Studio 2015, right-click the new website in <strong>Server Explorer</strong>, choose <strong>Download Publish Profile</strong> and then save the profile to your computer. The publish profile contains your credentials and enables you to publish your Office Add-in to the Azure website.</li>
					</ol>
					<h3 id="taipei2016-publishing-publish-add-in-azure-en">Publish your Office Add-in to the Azure website</h3>
					<ol>
					<li>With your add-in open in Visual Studio, expand the solution node in <strong>Solution Explorer</strong> so that you see both projects for the solution. </li>
					<li>Right-click the web project, and then choose <strong>Publish</strong>. 
					<br />
					The web project contains Office Add-in website files so this is the project that you publish to Azure.</li>
					<li>In <strong>Publish Web</strong>, choose <strong>Import</strong>. </li>
					<li>In <strong>Import Publish Settings</strong>, choose <strong>Browse</strong>, and then browse to the place where you saved your publish profile earlier in this topic. Choose <strong>OK</strong> to import your profile.</li>
					<li>In <strong>Publish Web</strong>, on the <strong>Connection tab</strong>, accept the defaults and choose <strong>Next</strong>. 
					<br />
					Choose <strong>Next</strong> > again to accept the default settings.</li>
					<li>On the <strong>Preview</strong> tab, choose <strong>Start Preview</strong>. The preview shows you all the files in the web project that will be published to the Azure website.</li>
					<li>Choose <strong>Publish</strong>. Visual Studio publishes the web project for your Office Add-in to your Azure Web Site. </li>
					<li>When Visual Studio finishes publishing the web project, your browser opens and shows a webpage with the text "This web app has been successfully created." This is the current default page for the website.
					<br />
					To see the webpage for your add-in, change the URL to use https: and add the path of your add-in\'s default HTML page. For example, the changed URL should look like https://YourDomain.azurewebsites.net/Addin/Home/Home.html. This confirms that your add-in\'s website is now hosted on Azure. Copy this URL because you\'ll need it when you edit the add-in manifest file later in this topic. </li>
					</ol>
					<h3 id="taipei2016-publishing-edit-addin-manifest-en">Edit the add-in manifest file to point to the Office Add-in on Azure</h3>
					<ol>
					<li>In Visual Studio with the Office Add-in open in <strong>Solution Explorer</strong>, expand the solution so that both projects are shown.</li>
					<li>Open the add-in manifest XML file.</li>
					<li>For <strong>Source Location</strong>: enter the URL for the add-in\'s main HTML page that you copied in the previous step after you published the add-in, for example, https://YourDomain.azurewebsites.net/Addin/Home/Home.html. </li>
					<li class="noStyleUL">Save the manifest file.</li>
					</ol>
					<h3 id="taipei2016-publishing-run-addin-en">Run the add-in in the Office client application</h3>
					<p>By now, your source location has changed from the local server for the testing environment to the website URL in Azure. </p>
					<p>Run your add-in in the Office client and test that the add-in is working.</p>
					<h3 id="taipei2016-publishing-submit-to-office-store-en">Submit your add-in to the Office Store</h3>
					<h4>The recommended reading for submitting your add-in to the Office Store is as follows:</h4>
					<p><a href="https://msdn.microsoft.com/en-us/library/office/jj220037.aspx">Submit Office and SharePoint Add-ins and Office 365 web apps to the Office Store</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn356576.aspx">Checklist for submitting Office and SharePoint Add-ins and Office 365 web apps to the Seller Dashboard </a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj591603.aspx">Office Store app and add-in submission FAQ</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj220035.aspx">Validation policies for apps and add-ins submitted to the Office Store (version 1.9)</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/fp161044.aspx#O15AgaveManifestOverview_Samplev1_1">Office Add-ins XML manifest</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn535869.aspx">Update the version of your JavaScript API for Office and manifest schema files</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn221992.aspx">Referencing the JavaScript API for Office library from its content delivery network (CDN)</a></p>
					<h4>To publish the Excel Colorizer Add-in for Excel 2016, the following tasks are performed:</h4>
					<ol>
					<li>To include your app or add-in in the Office Store, submit it to the <a href="https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=12&ct=1434731402&rver=6.4.6456.0&wp=MBI_SSL_SA&wreply=https://sellerdashboard.microsoft.com/Wlid/AfterLogin?returnUrl=https://sellerdashboard.microsoft.com/?culture=en-US&lc=1033&id=284543">Microsoft Seller Dashboard</a>. 
					<br />
					Create an individual or company account and, if applicable, add payout information. To open an account, see <a href="https://sellerdashboard.microsoft.com/Registration">Create a seller account and add payout information</a>.
					<br />
					For this tutorial, an individual account is created to publish the add-in. Because the add-in is free, no payout information is provided.
					<br />
					Fill out the account profile, submit, and wait for the approval. </li>
					<li>An icon, App logo, screenshots, and .html files containing privacy and support statements are prepared before the submission. Follow the specifications for the image dimensions in the <a href="https://msdn.microsoft.com/EN-US/library/office/dn356576.aspx">Checklist for submitting Office and SharePoint Add-ins and Office 365 web apps to the Seller Dashboard</a>.</li>
					<li>Publish the icon, privacy and support statements to your Azure account.</li>
					<li>In the manifest file, add the IconUrl, SupportUrl, and the Requirements elements in addition to the default elements. (The Excel Colorizer uses the new Excel add-in JavaScript APIs that runs in Excel 2016 or Excel Online). The manifest schema version is 1.1.
					<br /><table class="tableWithBorders tableFirstRowBold">
					<tr><th>Note</strong></th>
					<tr><td>Every add-in is different, to ensure that your add-in works as expected, see <a href="https://msdn.microsoft.com/EN-US/library/office/dn535871.aspx">Specify Office hosts and API requirements</a>  and <a href="https://msdn.microsoft.com/EN-US/library/office/mt590206.aspx">Office add-in requirement sets</a>.</td></tr>
					</table>
					</li>
					<li><a href="https://msdn.microsoft.com/en-us/library/dn221992.aspx">Reference the Microsoft hosted Office.js file from its CDN URL</a>. Don\'t include a copy of the Office.js file in your add-in. <a href="https://msdn.microsoft.com/en-us/library/jj591603.aspx">See Office Store app and add-in submission FAQ</a> > How do I reference the JavaScript APIs for Office in my add-ins?</li>
					<li>If you’re using Visual Studio, validate the manifest by clicking on <strong>Build</strong> > <strong>Publish</strong> > <strong>Perform Validation Check</strong></li>
					<li>Login to the Microsoft Seller Dashboard to add the App. 
					<ul>
					<li>Enter the version number. The version number submitted via the Seller Dashboard must be the same as that in the add-in manifest. For example:
					<br />Seller Dashboard: 1.0.0.0
					<br />Add-in Manifest: 1.0.0.0</li>
					<li>Upload the screenshots and the App logo.</li>
					<li>Upload the app package (i.e. the manifest XML file). </li>
					<li>Supply the Support and Privacy Statement URL. Include your contact information in the Support Statement URL or alternatively within your add-in. This can be any or all of the following: email address, phone number, contact form, valid social media link (e.g. a URL to your contact page on Facebook or Twitter), or comments form.</li>
					</ul>
					</li>
					<li>Submit the app and wait for the approval.</li>
					<li>After your add-in is submitted, a Validation Test Results report will be returned to you if the add-in is not approved by the Office Store. The validation test is performed based on <a href="https://msdn.microsoft.com/en-us/library/office/jj220035.aspx">Validation policies for apps and add-ins submitted to the Office Store (version 1.9)</a>, and lists the required changes. Make the changes and resubmit your add-in. </li>
					</ol>
					<h3 id="taipei2016-publishing-publishing-resources-en">Resources</h3>
					<p><a href="http://dev.office.com/docs/add-ins/publish/publish">Publishing</a></p>
					<p><a href="http://dev.office.com/docs/add-ins/publish/host-an-office-add-in-on-microsoft-azure">Host an Office Add-in on Microsoft Azure</a></p>
					<p><a href="https://msdn.microsoft.com/en-us/library/office/jj220037.aspx">Submit Office and SharePoint Add-ins and Office 365 web apps to the Office Store</a></p>
					
					<h2 id="taipei2016-curriculum-publishing-en">Publishing</h2>
					<p>This tutorial shows the steps to publish the Excel Colorizer Add-in for Excel 2016 from the west U.S. for distribution in Office Store. Visual Studio Community 2015 is the IDE of choice. Microsoft Azure is the web hosting platform for the Colorizer.  </p>
					<p>To publish your add-in using other methods that are specific to your scenario, please see resources on <a href="http://dev.office.com/docs/add-ins/publish/publish">publishing</a>.</p>
					<h3>Topics</h3>
					<ol>
					<li><a target="_self" href="#taipei2016-publishing-decide-end-point-en">Decide on the Office Add-ins distribution end-points</a></li>
					<li><a target="_self" href="#taipei2016-publishing-set-up-dev-computer-en">Set up your development computer with Azure SDK for .NET, an Azure subscription, and Office 2016</a></li>
					<li><a target="_self" href="#taipei2016-publishing-create-azure-website-en">Create a website in Azure</a></li>
					<li><a target="_self" href="#taipei2016-publishing-publish-add-in-azure-en">Publish your Office Add-in to the Azure website</a></li>
					<li><a target="_self" href="#taipei2016-publishing-edit-addin-manifest-en">Edit the add-in manifest file to point to the Office Add-in on Azure</a></li>
					<li><a target="_self" href="#taipei2016-publishing-run-addin-en">Run the add-in in the Office client application</a></li>
					<li><a target="_self" href="#taipei2016-publishing-submit-to-office-store-en">Submit your add-in to the Office Store</a></li>
					<li><a target="_self" href="#taipei2016-publishing-publishing-resources-en">Resources</a></li>
					</ol>
					<h3 id="taipei2016-publishing-decide-end-point-en">Decide on the Office Add-ins distribution end-points</h3>
					<p>Decide on the distribution end-points to publish your Office Add-ins:</p>
					<ol type="a">
					<li>Office Store </li>
					<li>Office Add-ins catalog on SharePoint </li>
					<li>Exchange catalog</li>
					<li>Network shared folder add-in catalog</li>
					</ol>
					<p>This tutorial uses <a href="http://dev.office.com/docs/add-ins/publish/host-an-office-add-in-on-microsoft-azure">Microsoft Azure</a> to host the add-in and <a href="https://msdn.microsoft.com/en-us/library/office/jj220037.aspx">submit the add-ins to the Office Store for publishing</a>.</p>
					<h3 id="taipei2016-publishing-set-up-dev-computer-en">Set up your development computer with Azure SDK for .NET, an Azure subscription, and Office 2016</h3>
					<ol>
					<li>Install the Azure SDK for .NET from the <a href="http://azure.microsoft.com/en-us/downloads/">Azure downloads page</a>. This tutorial uses the free <a href="https://www.microsoft.com/en-us/download/details.aspx?id=48146">Microsoft Visual Studio Community 2015</a>.</a>
					<ol type="a">
					<li>Under <strong>Languages</strong>, choose <strong>.NET</strong>.</li>
					<li>Choose the version of the Azure .NET SDK that matches your version of Visual Studio, if you already have Visual Studio installed.</li>
					<li>When you’re asked whether to run or save the installation executable, choose <strong>Run</strong>.</li>
					<li>In the Web Platform Installer window, choose <strong>Install</strong>.</li>
					</ol>
					</li>
					<li>Install Office 2016. (The Colorizer add-in works only in Excel 2016 or Excel Online.)
					<br />
					<table class="tableWithBorders tableFirstRowBold">
					<tr><th>Note</strong></th>
					<tr><td><a href="https://products.office.com/en-us/try?legRedir=true&WT.intid1=ODC_ENUS_FX101785584_XT104056786&CorrelationId=cae9f0f9-caf0-411f-b512-426d951c2259">You can get a trial version of Office for one month.</a></td></tr>
					</table>
					</li> 
					<li>Get your Azure account. 
					<br />
					<table class="tableWithBorders tableFirstRowBold">
					<tr><th>Note</strong></th>
					<tr><td>If you’re a Microsoft Developer Network (MSDN) subscriber, <a href="http://www.windowsazure.com/en-us/pricing/member-offers/msdn-benefits/">you get an Azure subscription as part of your MSDN subscription</a>.</a></td></tr>
					<tr><td>If you\'re not an MSDN subscriber, you can still <a href="https://azure.microsoft.com/en-us/pricing/free-trial/">get a free trial of Azure at the Windows Azure website</a>.</td></tr>
					</table>
					</li> 
					</ol>
					<h3 id="taipei2016-publishing-create-azure-website-en">Create a website in Azure</h3>
					<p>There are a couple of ways you can create an empty Azure website. If you\'re using Visual Studio 2015 or the free community version, follow the steps below to create an Azure website from within the Visual Studio IDE.</p>
					<p><strong>Using Visual Studio Community 2015 </strong></p>
					<ol>
					<li>In Visual Studio, in the <strong>View</strong> menu choose <strong>Server Explorer</strong>. Right click <strong>Azure</strong> and choose <strong>Connect to Microsoft Azure subscription</strong>. Follow the instructions for connecting to your Azure subscription.</li>
					<li>In Visual Studio, in <strong>Server Explorer</strong>, expand <strong>Azure</strong>, right-click <strong>App Service</strong>, and then choose <strong>Create New App Service</strong>.</li>
					<li>In the <strong>Create Web App on Windows Azure</strong> dialog box, provide this information: 
					<ul>
					<li>Enter a unique <strong>Web App name</strong> for your site. Azure verifies that the site name is unique across the azurewebsites.net domain.</li>
					<li>Choose the <strong>App Service plan</strong> you\'re using to authorize creating this website. If you create a new plan, you also need to name it. </li>
					<li>Choose the <strong>Resource group</strong> for your site. If you create a new group, you also need to name it.</li>
					<li>Choose a geographical <strong>Region</strong> appropriate for you.</li>
					<li><strong>For Database server</strong>: accept the default of No database and then choose <strong>Create</strong>.</li>
					<li class="noStyleUL">The new website appears under the chosen resource group under <strong>App Service</strong> under <strong>Azure</strong> in <strong>Server Explorer</strong>.</li>
					</ul>
					</li>
					<li>Right-click the new website, and then choose <strong>View in Browser</strong>. Your browser opens and displays a webpage with the message "This web site has been successfully created."</li>
					<li>In the browser address bar, change the URL for the website so that it uses HTTPS and press <strong>Enter</strong> to confirm that the HTTPS protocol is enabled. The Office Add-in model requires add-ins to use the HTTPS protocol. </li>
					<li>In Visual Studio 2015, right-click the new website in <strong>Server Explorer</strong>, choose <strong>Download Publish Profile</strong> and then save the profile to your computer. The publish profile contains your credentials and enables you to publish your Office Add-in to the Azure website.</li>
					</ol>
					<h3 id="taipei2016-publishing-publish-add-in-azure-en">Publish your Office Add-in to the Azure website</h3>
					<ol>
					<li>With your add-in open in Visual Studio, expand the solution node in <strong>Solution Explorer</strong> so that you see both projects for the solution. </li>
					<li>Right-click the web project, and then choose <strong>Publish</strong>. 
					<br />
					The web project contains Office Add-in website files so this is the project that you publish to Azure.</li>
					<li>In <strong>Publish Web</strong>, choose <strong>Import</strong>. </li>
					<li>In <strong>Import Publish Settings</strong>, choose <strong>Browse</strong>, and then browse to the place where you saved your publish profile earlier in this topic. Choose <strong>OK</strong> to import your profile.</li>
					<li>In <strong>Publish Web</strong>, on the <strong>Connection tab</strong>, accept the defaults and choose <strong>Next</strong>. 
					<br />
					Choose <strong>Next</strong> > again to accept the default settings.</li>
					<li>On the <strong>Preview</strong> tab, choose <strong>Start Preview</strong>. The preview shows you all the files in the web project that will be published to the Azure website.</li>
					<li>Choose <strong>Publish</strong>. Visual Studio publishes the web project for your Office Add-in to your Azure Web Site. </li>
					<li>When Visual Studio finishes publishing the web project, your browser opens and shows a webpage with the text "This web app has been successfully created." This is the current default page for the website.
					<br />
					To see the webpage for your add-in, change the URL to use https: and add the path of your add-in\'s default HTML page. For example, the changed URL should look like https://YourDomain.azurewebsites.net/Addin/Home/Home.html. This confirms that your add-in\'s website is now hosted on Azure. Copy this URL because you\'ll need it when you edit the add-in manifest file later in this topic. </li>
					</ol>
					<h3 id="taipei2016-publishing-edit-addin-manifest-en">Edit the add-in manifest file to point to the Office Add-in on Azure</h3>
					<ol>
					<li>In Visual Studio with the Office Add-in open in <strong>Solution Explorer</strong>, expand the solution so that both projects are shown.</li>
					<li>Open the add-in manifest XML file.</li>
					<li>For <strong>Source Location</strong>: enter the URL for the add-in\'s main HTML page that you copied in the previous step after you published the add-in, for example, https://YourDomain.azurewebsites.net/Addin/Home/Home.html. </li>
					<li class="noStyleUL">Save the manifest file.</li>
					</ol>
					<h3 id="taipei2016-publishing-run-addin-en">Run the add-in in the Office client application</h3>
					<p>By now, your source location has changed from the local server for the testing environment to the website URL in Azure. </p>
					<p>Run your add-in in the Office client and test that the add-in is working.</p>
					<h3 id="taipei2016-publishing-submit-to-office-store-en">Submit your add-in to the Office Store</h3>
					<h4>The recommended reading for submitting your add-in to the Office Store is as follows:</h4>
					<p><a href="https://msdn.microsoft.com/en-us/library/office/jj220037.aspx">Submit Office and SharePoint Add-ins and Office 365 web apps to the Office Store</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn356576.aspx">Checklist for submitting Office and SharePoint Add-ins and Office 365 web apps to the Seller Dashboard </a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj591603.aspx">Office Store app and add-in submission FAQ</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/jj220035.aspx">Validation policies for apps and add-ins submitted to the Office Store (version 1.9)</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/fp161044.aspx#O15AgaveManifestOverview_Samplev1_1">Office Add-ins XML manifest</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn535869.aspx">Update the version of your JavaScript API for Office and manifest schema files</a></p>
					<p><a href="https://msdn.microsoft.com/EN-US/library/office/dn221992.aspx">Referencing the JavaScript API for Office library from its content delivery network (CDN)</a></p>
					<h4>To publish the Excel Colorizer Add-in for Excel 2016, the following tasks are performed:</h4>
					<ol>
					<li>To include your app or add-in in the Office Store, submit it to the <a href="https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=12&ct=1434731402&rver=6.4.6456.0&wp=MBI_SSL_SA&wreply=https://sellerdashboard.microsoft.com/Wlid/AfterLogin?returnUrl=https://sellerdashboard.microsoft.com/?culture=en-US&lc=1033&id=284543">Microsoft Seller Dashboard</a>. 
					<br />
					Create an individual or company account and, if applicable, add payout information. To open an account, see <a href="https://sellerdashboard.microsoft.com/Registration">Create a seller account and add payout information</a>.
					<br />
					For this tutorial, an individual account is created to publish the add-in. Because the add-in is free, no payout information is provided.
					<br />
					Fill out the account profile, submit, and wait for the approval. </li>
					<li>An icon, App logo, screenshots, and .html files containing privacy and support statements are prepared before the submission. Follow the specifications for the image dimensions in the <a href="https://msdn.microsoft.com/EN-US/library/office/dn356576.aspx">Checklist for submitting Office and SharePoint Add-ins and Office 365 web apps to the Seller Dashboard</a>.</li>
					<li>Publish the icon, privacy and support statements to your Azure account.</li>
					<li>In the manifest file, add the IconUrl, SupportUrl, and the Requirements elements in addition to the default elements. (The Excel Colorizer uses the new Excel add-in JavaScript APIs that runs in Excel 2016 or Excel Online). The manifest schema version is 1.1.
					<br /><table class="tableWithBorders tableFirstRowBold">
					<tr><th>Note</strong></th>
					<tr><td>Every add-in is different, to ensure that your add-in works as expected, see <a href="https://msdn.microsoft.com/EN-US/library/office/dn535871.aspx">Specify Office hosts and API requirements</a>  and <a href="https://msdn.microsoft.com/EN-US/library/office/mt590206.aspx">Office add-in requirement sets</a>.</td></tr>
					</table>
					</li>
					<li><a href="https://msdn.microsoft.com/en-us/library/dn221992.aspx">Reference the Microsoft hosted Office.js file from its CDN URL</a>. Don\'t include a copy of the Office.js file in your add-in. <a href="https://msdn.microsoft.com/en-us/library/jj591603.aspx">See Office Store app and add-in submission FAQ</a> > How do I reference the JavaScript APIs for Office in my add-ins?</li>
					<li>If you’re using Visual Studio, validate the manifest by clicking on <strong>Build</strong> > <strong>Publish</strong> > <strong>Perform Validation Check</strong></li>
					<li>Login to the Microsoft Seller Dashboard to add the App. 
					<ul>
					<li>Enter the version number. The version number submitted via the Seller Dashboard must be the same as that in the add-in manifest. For example:
					<br />Seller Dashboard: 1.0.0.0
					<br />Add-in Manifest: 1.0.0.0</li>
					<li>Upload the screenshots and the App logo.</li>
					<li>Upload the app package (i.e. the manifest XML file). </li>
					<li>Supply the Support and Privacy Statement URL. Include your contact information in the Support Statement URL or alternatively within your add-in. This can be any or all of the following: email address, phone number, contact form, valid social media link (e.g. a URL to your contact page on Facebook or Twitter), or comments form.</li>
					</ul>
					</li>
					<li>Submit the app and wait for the approval.</li>
					<li>After your add-in is submitted, a Validation Test Results report will be returned to you if the add-in is not approved by the Office Store. The validation test is performed based on <a href="https://msdn.microsoft.com/en-us/library/office/jj220035.aspx">Validation policies for apps and add-ins submitted to the Office Store (version 1.9)</a>, and lists the required changes. Make the changes and resubmit your add-in. </li>
					</ol>
					<h3 id="taipei2016-publishing-publishing-resources-en">Resources</h3>
					<p><a href="http://dev.office.com/docs/add-ins/publish/publish">Publishing</a></p>
					<p><a href="http://dev.office.com/docs/add-ins/publish/host-an-office-add-in-on-microsoft-azure">Host an Office Add-in on Microsoft Azure</a></p>
					<p><a href="https://msdn.microsoft.com/en-us/library/office/jj220037.aspx">Submit Office and SharePoint Add-ins and Office 365 web apps to the Office Store</a></p>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabTitle: 'Hackathon 参赛准备资料',
                tabNumber: 3,
                tabContent: `
				<a href="/beijing2016" class="btn btn-info float-right" role="button">English</a>
				<a href="http://www.aka.ms/devdaysbeijing2016"><img src="/uploads/RegisterNowCN.png" style="height: 37px; margin-right: 10px;" class="float-right" title="registration button" alt="registration link"></a>
				<p >请参考以下 Hackathon 参赛准备资料。熟悉这些内容将在活动中帮助您，并会有利于您在 Hackathon 中的表现。</p>
<h3>资料主题</h3>
<ul>
<li><a target="_self" href="#hackathonHashcn1">必要条件 </a></li>
<li><a target="_self" href="#hackathonHashcn2">更多资源</a></li>
<li><a target="_self" href="#hackathonHashcn3">有关教程</a></li>
</ul>
<h3 id="hackathonHashcn1">必要条件 </h3>
<ul>
<li>如果您没有Office，请在 <a href="http://dev.office.com/devprogram">Office开发中心</a> 的网站上报名及填写单表（详细步骤，请参考<a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/DevDays-Asia--Taipei-2016/Office-365-Developer-Program-sign-up--Training">九频道的视频</a> 或有关教程<a target="_self" href="#_报名注册">报名注册</a>）。通过Office 365 的开发人员计划，您能拿到免费的Office 365的开发人员账户及为期一年的Office 365 的订阅。</li>
<li>入门</p>
<p>您可以找到有关开发工具的信息与内容：</p>
<p><a href="http://dev.office.com/getting-started">Office Dev Center 入门</a></p>
<p><a href="https://github.com/Microsoft/Office-js-docs_zh-cn/tree/master/docs/get-started">Microsoft Office js docs_zh-cn</a></p>
<p><strong>提示</strong>：若选用Visual Studio 来开发Office 外接程序, 您可用<a href="https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx">Visual Studio Community 201 5 （免费版）</a>和 <a href="https://www.visualstudio.com/features/office-tools-vs">Office开发者工具</a></li>
</ul>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">回到本文开头</button>
<h3 id="hackathonHashcn2">更多资源 </h3>
<h4 id="开发office应用程序起点">开发Office应用程序起点</h4>
<h4 id="英文内容">英文内容</h4>
<ul>
<li><a href="http://dev.office.com/">Office Dev Center</a></p>
<p>Office 开发中心的英文首页涵盖关于以Office 作为平台进行开发的信息与内容。</li>
<li><a href="http://graph.microsoft.io/en-us/getting-started">Microsoft Graph</a></p>
<p>Microsoft Graph (旧称 “Office 365 统一API”) ：Microsoft Graph 是访问 Microsoft 云服务中数据、商务消息、用户、文件、邮件、日历、联系人 及文件夹最轻松简易的方式。了解如何在您的平台上通过微软 Graph 访问 Office 365 数据。</li>
</ul>
<ul>
<li><a href="http://graph.microsoft.io/en-us/app-registration">App registration</a></p>
<p>注册您的应用调用微软Graph</li>
<p>微软Build 2016年开发者大会九频道视频</p>
<p>以Office作为平台进行开发概述：</p>
<li><a href="https://channel9.msdn.com/Events/Build/2016/B866">Make your solution a native part of Office on every platform</a></li>
<li><a href="https://channel9.msdn.com/Events/Build/2016/B872">Office platform overview</a></li>
<p>以Office 365作为平台进行开发技术细节， 比如怎样访问 Office 服务来构建应用及关于调用微软Graph的技术内容。</p>
<li><a href="https://channel9.msdn.com/Events/Build/2016/T617">Build cool apps with Microsoft Graph, tap into the intelligence and reach millions of&nbsp;users</a></li>
<li><a href="https://channel9.msdn.com/events/Build/2016/B820">Build smarter apps by connecting to Office&nbsp;services</a></li>
<li><a href="https://channel9.msdn.com/Events/Build/2016/P568">Connecting to Outlook Direct Endpoint with Azure AD Auth&nbsp;v2</a></li>
<li><a href="https://channel9.msdn.com/Events/Build/2016/P555">WebHooks in the Microsoft&nbsp;Graph</a></li>
<p>有关构建Office 外接程序的内容, 比如怎样通过新的Word 或JavaScript APIs来构建Office 外接程序，怎样使用任何编辑器创建 Office 外接程序, 以及在 Office 外接程序中使用 Office UI 结构等。</p>
<li><a href="https://channel9.msdn.com/Events/Build/2016/P549">What&rsquo;s new in Word JavaScript APIs</a></li>
<li><a href="https://channel9.msdn.com/Events/Build/2016/P552">Build Office Add-ins with any code editor and Office&nbsp;Online</a></li>
<li><a href="https://channel9.msdn.com/Events/Build/2016/P554">Office Add-ins in Office for&nbsp;Mac</a></li>
<li><a href="https://channel9.msdn.com/Events/Build/2016/P557">What&rsquo;s new in Excel JavaScript APIs v.1.2 in Office&nbsp;Add-ins</a></li>
<li><a href="https://channel9.msdn.com/Events/Build/2016/T641">Getting to know Office UI Fabric</a></li>
</ul>
<h4 id="中文内容">中文内容</h4>
<ul>
<li><a href="https://msdn.microsoft.com/zh-cn/office/aa905340.aspx">Office 开发人员文档登陆首页</a></p>
<p>Office 开发人员的中文文档涵盖关于以Office 作为平台进行开发的信息与内容。从此页您能连接中英文文档以及有关页面。</li>
<li><a href="https://msdn.microsoft.com/zh-cn/library/office/dn467914.aspx">Office 开发人员文档</a></p>
<p>在此查找开发解决方案和自定义 Office 桌面（客户端）应用程序以及服务器产品和技术、服务与工具的操作方法内容、示例代码、SDK 和 API 文档、VBA 参考、培训和技术文章。</li>
<li><a href="https://msdn.microsoft.com/ZH-CN/library/office/jj220082.aspx">Office 加载项平台概述</a></p>
<p>您若决定开发Office 外接程序，请首先参考概述。</li>
<li><a href="https://graph.microsoft.io/zh-cn/docs/overview/overview">Microsoft Graph (旧称 “Office 365 统一API”) 使用 Microsoft Graph API 的常见查询</a></p>
<p>您若决定在您的平台上通过微软Graph访问Office 365数据及进行有关应用开发， 请参考此中文页面。</li>
<li><a href="https://graph.microsoft.io/zh-cn/app-registration">Office 365 应用注册工具</a></p>
<p>注册您的应用调用微软Graph</li>
<li><a href="https://msdn.microsoft.com/ZH-CN/library/office/fp123515.aspx">发布Office 外接程序</a></p>
<p>构建Office 外接程序之后， 您有几种发布方式。请参考此页。</li>
<li><a href="https://msdn.microsoft.com/zh-cn/library/office/jj220037.aspx">将 Office 与 SharePoint 外接程序和 Office 365 Web 应用提交到 Office 应用商店</a></p>
<p>若有兴趣提交您的应用至Office 应用商店，请参考此页及<a target="_self" href="#hackathonHashcn3"">有关教程</a>。</li>
</ul>
<h4 id="代码范例">代码范例</h4>
<h4 id="英文内容-1">英文内容</h4>
<ul>
<li><a href="https://github.com/OfficeDev">Office Developer on GitHub</a></p>
<p>英文版的Office 开发代码范例</li>
</ul>
<h4 id="中文内容-1">中文内容</h4>
<ul>
<li><a href="https://github.com/Microsoft/Office-js-docs_zh-cn/tree/master">外接程序 GitHub 存储库中提供了此 Office 外接程序帮助的最新版本</a></p>
<p>中文版的Office 开发代码范例</li>
</ul>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">回到本文开头</button>
<h3 id="hackathonHashcn3">有关教程 </h3>
<ul>
<li><h4 id="报名注册"><a target="_self" href="#_报名注册">报名注册</a> </h4></li>
<li><h4 id="发布office-外接程序及提交到office-应用商店"><a target="_self" href="#发布office-外接程序及提交到office-应用商店-1">发布Office 外接程序及提交到Office 应用商店</a> </h4></li>
</ul>
<h3 id="报名注册-1"><span id="_报名注册" class="anchor"><span id="_报名注册" class="anchor"></span></span>报名注册 </h3>
<p>本文内容</p>
<ol style="list-style-type: decimal">
<li><a target="_self" href="#在office-dev-center网站上报名">在Office Dev Center网站上报名</a></li>
<li><a target="_self" href="#获取office-365开发人员账户">获取Office 365开发人员账户</a></li>
<li><a target="_self" href="#登入office-365">登入Office 365</a></li>
<li><a target="_self" href="#分配office-365许可证">分配Office 365许可证</a></li>
<li><a target="_self" href="#资源">资源</a></li>
</ol>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">回到本文开头</button>
<h3 id="在office-dev-center网站上报名">在Office Dev Center网站上报名</h3>
<p>在<a href="http://dev.office.com/devprogram">Office Dev Center</a>的网站上报名及填写单表。通过 Office 365 开发人员计划，您能拿到免费的Office 365开发人员账户及为期一年Office 365的订阅。</p>
<p><strong>图 1: Office 365 Dev Program</strong></p>
<img src="uploads/office-web-curriculum-taipei-5.png">
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">回到本文开头</button>
<h3 id="获取office-365开发人员账户">获取Office 365开发人员账户</h3>
<ol style="list-style-type: decimal">
<li>完成上个环节后您将收到一封来自Office 365 Developer Program的电子邮件。在电子邮件里，请点击连接以便注册免费的 Office 365 开发人员帐户。</li>
<li>在第一页 的注册表格上请提供有关自己的资讯，选择[下一步]。</li>
<li>在第二页上(图 2), 指定订阅管理员的使用者识别码。</li>
<p><strong>图 2. Office 365 开发人员网站网域名称</strong></p>
<img src="uploads/office-web-curriculum-taipei-6.png">
<li>建立 <strong>.onmicrosoft.com</strong> 的子网域。注册之后，您必须使用所产生的认证 (格式为 UserID@yourdomain.onmicrosoft.com) 登入您在其中管理帐户的 Office 365 入口网站。 SharePoint Online 开发人员网站会布建于您的新网域中：http://yourdomain.sharepoint.com。</li>
<li>选择 [下一步]，并填写单表的最后一页。如果您选择用电话号码来取得确认码，则可以提供行动电话或地面通讯电话号码，但不是 VoIP 号码。</li>
<table >
<thead>
<tr class="header">
<th align="left">注意事项</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>如果您尝试注册开发人员帐户时已登入另一个Microsoft 帐户，可能会收到此讯息“抱歉，您输入的使用者识别码无法运作。它看起来无效。请务必输入组织分配给您的使用者识别码。您的使用者识别码通常看起来像是someone@example.com 或someone@example.onmicrosoft.com。” 如果您看到此讯息，请退出原本使用的Microsoft 帐户然后再试一次。如果仍然收到此讯息，请清除浏览器缓存，或切换到 [InPrivate 浏览]，然后填写单表。</td>
</tr>
</tbody>
</table>
<p>一旦创建了您的帐户，您将收到另一封电子邮件，请连接<a href="http://portal.office.com/">Office 365</a>。</p>
</ol>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">回到本文开头</button>
<h3 id="登入office-365">登入Office 365</h3>
<p>您的浏览器会开启 Office 365 安装页面。请选择 [管理] 图示，以开启管理中心页面。</p>
<p><strong>图 3：Office 365 管理中心页面</strong></p>
<img src="uploads/office-web-curriculum-taipei-7.png">
<ol style="list-style-type: decimal">
<li>您必须等待 开发人员网站准备完成。准备完成之后，请在浏览器中刷新 管理中心页面。</li>
<li>然后在页面上选择 [建置外接程序]来开启您开发人员网站。您应该会看到像图 4 中的网站。在页面有测试外接程序清单。这会确认网站是否符合SharePoint开发人员网站模板。如果您看到的是普通的小组网站，请稍候几分钟并重新启动您的网站。如果您还没有开发工具，请点击[添加] &quot;Napa&quot; Office 365 开发工具。您即可在此网站上使用Napa及开发Office 外接程序。</li>
<li>记下网站 URL。在 Visual Studio 中建立 SharePoint Add-ins 专案时会用到它。</li>
</ol>
<p><strong>图4：开发人员网站的首页与测试清单中的外接程序</strong></p>
<img src="uploads/office-web-curriculum-taipei-8.png">
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">回到本文开头</button>
<h3 id="分配office-365许可证">分配Office 365许可证</h3>
<p><strong>提示</strong>: 若 Office 365首面已经显示了可用的 Office 的产品 （参考图8）， 您可立即进行下载及跳过以下步骤。以下步骤是通过旧的 Office 365 管理中心页面版本来分配 Office 365 开发者 许可证。若要按照以下步骤来继续此课程，请选择旧的 Office 365 管理中心页面版本。</p>
<p>分配给自己 （活跃用户）Office 365 许可证。点击 &quot;华夫格&quot; &gt; [管理员] 图示。</p>
<p><strong>图5： Office 365首页</strong></p>
<img src="uploads/office-web-curriculum-taipei-10.png">
<p>1. 在左侧導航面板中，选择 [用戶] > [活躍用戶]</p>
<p>2. 在核取方块内选择自己。您的个人资料会显示在右边。点击下方的项目编辑：给自己分配许可证</p>
<p><strong>图 6：Office 365 管理中心页面 &gt; 活跃用户</strong></p>
<img src="uploads/office-web-curriculum-taipei-11.png">
<p>3. 在[用户位置]的组合框设置您的地点。并选择Microsoft Office 365的开发。点击[保存]完成分配的许可证。</p>
<p><strong>图7：分配活跃用户许可证</strong></p>
<img src="uploads/office-web-curriculum-taipei-12.png">
<p>4. 在完成后，回到 Office 365 的主页。页面将显示可用的 Office 的产品。拉下页面，可以看到完整的显示。</p>
<p><strong>图8：Office 365 首页</strong></p>
<img src="uploads/office-web-curriculum-taipei-13.png">
<p>如要回到开发者网站，点击在左上角的&quot;华夫格&quot;&gt; [管理] &gt; [构建的应用程式]。</p>
<h3 id="资源">资源</h3>
<p><a href="https://msdn.microsoft.com/zh-cn/office/aa905340.aspx">Office 开发人员文档</a></p>
<p><a href="https://msdn.microsoft.com/zh-cn/library/office/fp179924.aspx#Anchor_1">注册 Office 365 开发人员网站</a></p>
<h3 id="发布office-外接程序及提交到office-应用商店-1">发布Office 外接程序及提交到Office 应用商店 </h3>
<p>本案例演示从美国西岸来发布 Excel Colorizer Add-in for Excel 2016 外接程序及提交至Office 应用商店的步骤， 使用的开发工具是<a href="https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx">Visual Studio Community 201 5 （免费版</a>）和 <a href="https://www.visualstudio.com/features/office-tools-vs">Office开发者工具</a>。微软 Azure 为承载 Excel Colorizer 的主机平台。</p>
<p>如果您要按照自己的情况来发布您的Office外接程序，请参阅MSDN 资源 &gt; <a href="https://msdn.microsoft.com/ZH-CN/library/office/fp123515.aspx">发布</a>。</p>
<h3 id="本文内容">本文内容</h3>
<ol style="list-style-type: decimal">
<li><a target="_self" href="#决定发布office-外接程序的通讯端点">决定发布Office 外接程序的通讯端点</a></li>
<li><a target="_self" href="#为开发而设定电脑安装.net-的azure-sdk-英文订阅azure账户-及使用office-2016">为开发而设定电脑：安装.NET 的Azure SDK (英文)，订阅Azure账户， 及使用Office 2016</a></li>
<li><a target="_self" href="#在azure中建立网站">在Azure中建立网站</a></li>
<li><a target="_self" href="#office外接程序发布到azure的网站">Office 外接程序发布到 Azure 网站</a></li>
<li><a target="_self" href="#使外接程序资讯清单档案指向在azure中的office外接程序">使外接程序资讯清单档案指向在Azure的Office 外接程序</a></li>
<li><a target="_self" href="#在-office-客户端应用程序里运行office外接程序">在Office客户端应用程序里运行Office外接程序</a></li>
<li><a target="_self" href="#把外接程序提交至office应用商店">把外接程序提交到Office应用商店</a></li>
<li><a target="_self" href="#资源2">资源</a></li>
</ol>
<h3 id="决定发布office-外接程序的通讯端点">决定发布Office 外接程序的通讯端点</h3>
<ol style="list-style-type: lower-alpha">
<li>Office 应用商店</li>
<li>SharePoint 上的 Office 外接程序目录</li>
<li>Exchange 目录</li>
<li>网路共用的资料夹外接程序目录</li>
</ol>
<p>本案例演示如何将Office外接程序<a href="https://msdn.microsoft.com/ZH-CN/library/office/dn622055.aspx">发布到微软 Azure</a>，然后<a href="https://msdn.microsoft.com/zh-cn/library/office/jj220037.aspx">提交至Office 应用商店</a>。</p>
<h3 id="为开发而设定电脑安装.net-的azure-sdk-英文订阅azure账户-及使用office-2016">为开发而设定电脑：安装.NET 的Azure SDK (英文)，订阅Azure账户， 及使用Office 2016</h3>
<ol style="list-style-type: decimal">
<li>在<a href="http://azure.microsoft.com/zh-cn/downloads/">Azure 下载页面</a>安装为.NET 的Azure SDK (英文) 。本案例使用免费的<a href="https://www.microsoft.com/en-us/download/details.aspx?id=48146">Microsoft Visual Studio Community 2015</a>。</li>

	<ol style="list-style-type: lower-alpha">
		<li>在 [语言]，选择[.NET]。</li>
		<li>如果您已安装的Visual Studio ，选择符合您的Visual Studio版本的Azure .NET SDK 版本。</li>
		<li>当询问您是否要执行或储存安装可执行档时，请选择 [执行]。</li>
		<li>在 Web 平台 Installer 视窗中，选择 [安装]。</li>
	</ol>
<li>安装Office 2016或更新Office 2013 。 Excel Colorizer 外接程序只限于在Excel 2016上运行。</li>
<table>
<thead>
<tr class="header">
<th align="left">注意事项</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>您可以取得<a href="http://office.microsoft.com/zh-cn/try/?WT.intid1=ODC_ENUS_FX101785584_XT104056786">1 个月的Office试用版本</a>。</td>
</tr>
</tbody>
</table>
<li>取得Azure的帐户。</li>
<table>
<thead>
<tr class="header">
<th align="left">注意事项</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>如果您是 Microsoft Developer Network (MSDN) 订阅者<a href="http://azure.microsoft.com/zh-cn/pricing/member-offers/msdn-benefits/">Azure的 订阅是MSDN订阅的一部分</a>。</td>
</tr>
<tr class="even">
<td>如果您不是 MSDN 订阅者，您仍然可以在<a href="https://azure.microsoft.com/zh-cn/pricing/free-trial/">Windows Azure网站上取得免费Azure试用版</a>。</td>
</tr>
</tbody>
</table>
</ol>

<h3 id="在azure中建立网站">在Azure中建立网站</h3>
<p>建立空白的Azure的网站有几种方式。如果您使用是Visual Studio Community 2015，请遵循从Visual Studio IDE中建立的Azure网站的步骤。</p>
<p>使用Visual Studio 2015或免费版本来建立空白的Azure的网站。</p>
<ol style="list-style-type: decimal">
<li>在Visual Studio中的[检视]功能表中选择 [伺服器档案总管]，按一下滑鼠右键[Azure]并选择[连接到微软Azure订阅]。遵循指示连线您的Azure的订阅。</li>
<li>在Visual Studio，[伺服器档案总管] 中展开Azure，滑鼠右键按一下[应用程式服务]，然后选择 [建立新的网页应用程式]。</li>
<li>在 [Windows Azure的上建立的Web应用程式] 对话方块中，提供此资讯：</li>
<ul>
<li>输入您网站的唯一的[网络应用程式名称] .Azure验证azurewebsites.net是网域内唯 一的网站名称。</li>
<li>选择您使用授权建立此网站的[应用程式服务计划]。如果您建立新的计划，您也需要命名它。</li>
<li>选择您的网站之[资源群组]。如果您建立新的群组，您也需要命名它。</li>
<li>选择适合您的 [地理区域]。</li>
<li>针对 [资料库伺服器] ：接受预设值 [没有资料库]，然后选择 [建立]。</p>
<p>新的网站会出现在被选择的资源群组下：从 [伺服器总管] 进入&gt; [Azure] &gt; [应用程式服务。</li>
</ul>
<li>滑鼠右键按一下新增的网站，然后选择 [浏​​览器中的检视]。浏览器中开启并显示网页及此讯息“此网站已成功建立”。</li>
<li>在浏览器网址列中，更变网站的URL让其使用HTTPS，按 [Enter] 键，并确认已启用HTTPS通讯协定.Office外接程序模型需要外接程序使用HTTPS通讯协定。</li>
<li>在Visual Studio 2015中，以滑鼠右键按一下 [伺服器档案总管] 中的新网站，并选择[下载发布设定档]，然后将该设定档储存到电脑。发布设定档有您的认证并可让您在Azure的网站上发布您的 Office外接程序。</li>
</ol>

<h3 id="office外接程序发布到azure的网站">Office外接程序发布到Azure的网站</h3>
<ol style="list-style-type: decimal">
<li>把外接程序在Visual Studio中开启，展开[方案总管中] 的解决方案节点，您会看到两个专案的解决方案。</li>
<li>以滑鼠右键按一下网站专案，然后选择 [发布]。</p>
<p>Web专案会有厅外接程序网站档案，所以这是您发布到Azure的专案。</li>
<li>在[发布网站]，选择 [汇入]。</li>
<li>[汇入发布设定] 中选择[浏览]，然后浏览至您储存发布设定档本主题中前面的地方。选择[确定]以汇入您的设定档。</li>
<li>在[发布网站]，[连线]索引标签中接受预设值并选择 [下一步]。</p>
<p>再一次选择 [下一步]&gt;接受预设设定。</li>
<li>在[预览]标签上选择[启动预览]。预览会显示所有将发布至Azure的网站的网页专案及其档案。</li>
<li>选择 [发布] 。Visual Studio将Office外接程序的网络专案发布到Azure的网站。</li>
<li>在Visual Studio中完成发布网络专案后，浏览器中开启并显示网页及文字“此网页应用程式已成功建立。”这是网站目前的预设的页面。</p>
<p>若要查看外接程序的网页，更变URL及使用HTTPS：并加上外接程序的预设HTML页面的路径。例如，更变的URL看起来应类似https://YourDomain.azurewebsites.net/Addin/Home/ Home.html。这会确认外接程序的网站现在已装载于Azure。拷贝此URL，因为编辑外接程序资讯清单档案时会需要它。</li>
</ol>
<h3 id="使外接程序资讯清单档案指向在azure中的office外接程序">使外接程序资讯清单档案指向在Azure中的Office外接程序</h3>
<ol style="list-style-type: decimal">
<li>在Visual Studio中把Office外接程序打开，在[方案总管中]展开解决方案以便显示这两个专案。</li>
<li>打开外接程序资讯清单。</li>
<li>针对[来源位置]：输入外接程序的主要HTML页面上的URL例如在发布外接程序之后，在上一个步骤中拷贝的URL <a href="https://YourDomain.azurewebsites.net/Addin/Home/Home.html" class="uri">https://YourDomain.azurewebsites.net/Addin/Home/Home.html</a> 。储存此咨询清单。</li>
</ol>
<h3 id="在-office-客户端应用程序里运行office外接程序">在 Office 客户端应用程序里运行Office外接程序</h3>
<p>您的源位置已经从本地服务器的测试环境转变成在Azure中的网站网址。运行的Office外接程序及进行测试。本Colorizer外接程序只限于在Excel 2016，Excel Online中运行。</p>
<h3 id="把外接程序提交至office应用商店">把外接程序提交至Office应用商店</h3>
<p>一般在提交外接程序之前，请参阅以下关于提交Office应用商店的文章：</p>
<p><a href="https://msdn.microsoft.com/zh-cn/library/office/jj220037.aspx">将Office与SharePoint外接程序和Office 365 Web 应用提交到Office 应用商店</a></p>
<h4 id="发布-excel-colorizer-add-in-for-excel-2016进行了以下事项">发布 Excel Colorizer Add-in for Excel 2016进行了以下事项:</h4>
<ol style="list-style-type: decimal">
<li>把外接程序送至 Office 应用商店，请使用 <span id="_Hlk461704539" class="anchor"></span><a href="https://msdn.microsoft.com/zh-cn/library/office/jj220033.aspx">Microsoft卖家面板。</a></li>

<p>如您将需要创建个人或公司帐户，（如适用）添加支出信息。有关详细信息，请参阅：</p>

<ul>
<li><a href="https://dev.windows.com/zh-cn/programs/join">注册成为应用开发人员</a>。创建您的帐户后，便经历审批过程。</li>
<li><a href="https://msdn.microsoft.com/zh-cn/library/office/jj220033.aspx">使用卖家面板将您的应用或外接程序提交到 Office 应用商店</a>。</p>
</ul>
<p>提示：本演示创建了个人帐户来发布Office外接程序。因为外接程序为免费，买方账户没有建立。</p>
<p>填写账户信息， 提交并等待批准。</li>
<li>提交准备图示、应用程式 (外接程序) 徽标、 萤幕截图、 隐私和支援语句的HTML 文件。</li>
<p>图像的尺寸，参阅 <a href="https://msdn.microsoft.com/zh-cn/library/office/dn356576.aspx">将 Office 和 SharePoint 外接程序和 Office 365 Web 应用程序提交到卖家面板的清单</a> 。</p>
<li>图示、 隐私和支援的声明 (.html 文件) 发布到 Azure 帐户。</li>
<li>清单中, 除了预设元素，Excel Colorizer 外接程序添加了 IconUrl、 SupportUrl 和必须要求的元素（Excel Colorizer 外接程序使用Excel 新的API, 并且只限于在Excel 2016 或上线版本中运行）。清单架构档的版本为1.1。</li>

<table>
<thead>
<tr class="header">
<th align="left">注意事项</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>每个外接程序都不同， 为确保外接程序按预期方式工作，请参阅 <a href="https://msdn.microsoft.com/ZH-CN/library/office/dn535871.aspx">指定 Office 主机和 API 需求</a>和<a href="https://msdn.microsoft.com/ZH-CN/library/office/mt590206.aspx">Office 外接程序 要求集</a> 。</td>
</tr>
</tbody>
</table>

<li>如果在外接程序中使用 Office JavaScript API，您必须参照<a href="https://msdn.microsoft.com/ZH-CN/library/office/dn221992.aspx">从 适用于 Office 的 JavaScript API 的内容传送网络 (CDN) 引用 适用于 Office 的 JavaScript API 库</a>。不要在外接程序中包含 Office.js 档案的复本或参照其它地方主控之档案的复本。</li>
<li>在Visual Studio中，验证外接程序资讯清单， 点击组建 &gt; [发布] &gt; [执行验证检查] 。</li>
<li>登入 Microsoft 卖方仪表板并添加应用程式（外接程序）。</li>

<ul>
<li>输入版本编号。在卖方仪表板中提交的版本编号必须与外接程序资讯清单里的版本编号相同。例如:</p>
<p>卖方仪表板: 1.0.0.0</p>
<p>外接程序资讯清单：1.0.0.0</li>
<li>上传截图和 App 徽标。</li>
<li>上传应用程式套装软体，也就是应用程式（外接程序）的资讯清单。</li>
<li>提供支援和隐私的 URL。支援语句里并有联络信息（联络信息也可以在外接程序里）。联络信息可以是以下任何一项或全部: 电子邮件地址、 电话号码、 连络人单表，有效的社会媒体连接 (例如Facebook 或 Twitter 上和您接触的 URL) 或其它评论交流形式。</li>
</ul>

<li>交您的应用程式 (外接程序)，并等待批准。</li>
<li>提交了外接程序之后，如果它没有通过Office 应用商店的批准，您将会收到一份说明哪些项目需要更改的验证测试报告。这份验证测试报告是根据<a href="https://msdn.microsoft.com/zh-cn/library/office/jj220035.aspx">提交到 Office 应用商店的应用和外接程序的验证策略（版本 1.9）</a>而进行的测试。在进行更改后，您可再次提交外接程序。</li>
</ol>
<h3 id="资源2">资源</h3>
<ul>
<li><a href="https://msdn.microsoft.com/ZH-CN/library/office/fp123515.aspx">发布 Office 外接程序</a></li>
<li><a href="https://msdn.microsoft.com/ZH-CN/library/office/dn622055.aspx">发布到微软 Azure</a></li>
<li><a href="https://msdn.microsoft.com/zh-cn/library/office/jj220037.aspx">将 Office 与 SharePoint 外接程序和 Office 365 Web 应用提交到 Office 应用商店</a></li>
</ul>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">回到本文开头</button>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabTitle: 'Agenda',
                tabNumber: 2,
                tabContent: `<p><a class="btn btn-success float-right" href="beijing2016cn#3575831243">汉语</a> <a class="btn btn-primary float-right" style="margin-right: 10px;" href="http://www.aka.ms/devdaysbeijing2016">Register</a></p>
										<h2>DevDays Asia 2016 @ Beijing Agenda</h2>
										<h4>September 26, 2016: Hackathon opens!</h4>
										<h4>October 21, 2016: Hackathon Official Kick Off</h4>
										<h5>Location: Microsoft Beijing West / 5 Danling St, Haidian, Beijing, China, 100080</h5>
										<div class="table-responsive">
										<table class="table table-bordered">
										<thead>
										<tr>
										<th>
										<h5>Time</h5>
										</th>
										<th>
										<h5>Session</h5>
										</th>
										</tr>
										</thead>
										<tbody>
										<tr>
										<th scope="row">17:00</th>
										<td>Welcome participants</td>
										</tr>
										<tr class="active">
										<th scope="row">18:00</th>
										<td>Dinner</td>
										</tr>
										<tr>
										<th scope="row">19:00-21:00</th>
										<td>Team building + hacking</td>
										</tr>
										</tbody>
										</table>
										</div>
										<h4>October 22, 2016: DevDays Asia 2016 @ Beijing Conference Begins and Hackathon Continues</h4>
										<h5>Location: Microsoft Beijing West / 5 Danling St, Haidian, Beijing, China, 100080</h5>
										<div class="table-responsive">
										<table class="table table-bordered">
										<thead>
										<tr style="height: 95px;">
										<th style="height: 95px;">
										<h5>Time</h5>
										</th>
										<th style="height: 95px;">
										<h5>Office Developer Track</h5>
										</th>
										<th style="height: 95px;">
										<h5>Interoperability Track</h5>
										</th>
										</tr>
										</thead>
										<tbody>
										<tr style="height: 64px;">
										<th style="height: 64px;" scope="row">9:00-9:15</th>
										<td style="height: 64px;" colspan="2">Welcome Speech</td>
										</tr>
										<tr style="height: 64px;">
										<th style="height: 64px;" scope="row">9:15-10:00</th>
										<td style="height: 64px;" colspan="2">&nbsp;<a title="Keynote" href="uploads/1477100293774-Keynote - DevDays Asia-China.pdf" target="_self">Keynote</a></td>
										</tr>
										<tr style="height: 64px;">
										<th style="height: 64px;" scope="row">10:00-10:45</th>
										<td style="height: 64px;"><a title="Introducing the Modern Office Platform" href="uploads/1477102910066-Introducing the Modern Office Platform.pdf" target="_self">Introducing the Modern Office Platform</a></td>
										<td style="height: 64px;"><a title="Introducing Microsoft&rsquo;s commitment to interoperability  (Office, Windows, and SQL)" href="uploads/1477127699476-Introducing Microsoft's Commitment to Interoperabilty.pdf" target="_blank">Introducing Microsoft&rsquo;s commitment to interoperability (Office, Windows, and SQL)</a></td>
										</tr>
										<tr class="active" style="height: 64px;">
										<td style="height: 64px;">10:45-11:00</td>
										<td style="height: 64px;" colspan="2">Break</td>
										</tr>
										<tr style="height: 64px;">
										<th style="height: 64px;" scope="row">11:00-11:45</th>
										<td style="height: 64px;"><a title="Make your solution a native part of Office with Office Add-ins" href="uploads/1477105171322-Make your solution a native part of Office with Office Add-ins.pdf" target="_self">Make your solution a native part of Office with Office Add-ins</a></td>
										<td style="height: 64px;"><a title="Windows Protocol Test Suites" href="uploads/1477105189652-Windows Protocol Test Suites.pdf" target="_self">Windows Protocol Test Suites</a></td>
										</tr>
										<tr style="height: 80px;">
										<th style="height: 80px;" scope="row">11:45-12:30</th>
										<td style="height: 80px;"><a title="Discover Microsoft Graph: The easiest way to call Microsoft APIs (including Gallatin, examples, case studies, etc.)" href="uploads/1477107132706-Discover Microsoft Graph.pdf" target="_self">Discover Microsoft Graph: The easiest way to call Microsoft APIs (including Gallatin, examples, case studies, etc.)</a></td>
										<td style="height: 80px;"><a title="Discover Exchange Protocols &amp; advancements in ActiveSync, Exchange Web Services, and MAPI" href="uploads/1477139821077-Discover Exchange Protocols.pdf" target="_self">Discover Exchange Protocols &amp; advancements in ActiveSync, Exchange Web Services, and MAPI</a></td>
										</tr>
										<tr class="active" style="height: 64.8px;">
										<td style="height: 64.8px;">12:30-13:30</td>
										<td style="height: 64.8px;" colspan="2">Lunch</td>
										</tr>
										<tr style="height: 64px;">
										<th style="height: 64px;" scope="row">13:30-14:15</th>
										<td style="height: 64px;"><a title="Navigate Dev.Office.com and create an Office Developer account" href="uploads/1477122404214-Navigate Dev.Office.com and create an Office Developer account.pdf" target="_blank">Navigate Dev.Office.com and create an Office Developer account</a></td>
										<td style="height: 64px;"><a title="OData Overview and Demo" href="uploads/1477122643006-OData Overview.pdf" target="_blank">OData Overview and Demo</a></td>
										</tr>
										<tr style="height: 80px;">
										<th style="height: 80px;" scope="row">14:15-15:00</th>
										<td style="height: 80px;"><a title="Intro to Office 365 China Instance" href="uploads/1477122452281-Intro to Office 365 China Instance.pdf" target="_blank">Intro to Office 365 China Instance</a></td>
										<td style="height: 80px;"><a title="OData Validator, a tool for OData service authors to ensure that their service interoperates well with any OData client" href="uploads/1477122669384-OData Validator.pdf" target="_blank">OData Validator, a tool for OData service authors to ensure that their service interoperates well with any OData client</a></td>
										</tr>
										<tr style="height: 80px;">
										<th style="height: 80px;" scope="row">15:00-15:45</th>
										<td style="height: 80px;"><a title="Leverage Microsoft Graph through Office Add-ins" href="uploads/1477122488460-Leverage Microsoft Graph through Office Add-Ins.pdf" target="_blank">Leverage Microsoft Graph through Office Add-ins</a></td>
										<td style="height: 80px;"><a title="Introduction to &quot;Model first-tool&quot;, a methodology for producing a highly consistent API definition from the resource model" href="uploads/1477122691437-Model First Intro.pdf" target="_blank">Introduction to "Model first-tool", a methodology for producing a highly consistent API definition from the resource model</a></td>
										</tr>
										<tr class="active" style="height: 64px;">
										<td style="height: 64px;">15:45-16:00</td>
										<td style="height: 64px;" colspan="2">Break</td>
										</tr>
										<tr style="height: 64px;">
										<th style="height: 64px;" scope="row">16:00-16:45</th>
										<td style="height: 64px;"><a title="Build Intelligent mail, contacts and calendar apps using the Outlook REST APIs " href="uploads/1477139724321-Build Intelligent mail, contacts and calendar apps using the Outlook REST APIs.pdf" target="_blank">Build Intelligent mail, contacts and calendar apps using the Outlook REST APIs </a></td>
										<td style="height: 64px;"><a title="Office Online and SharePoint" href="uploads/1477137345948-Office Online and Sharepoint Protocols.pdf" target="_blank">Office Online and SharePoint</a></td>
										</tr>
										<tr style="height: 64px;">
										<th style="height: 64px;" scope="row">16:45-17:30</th>
										<td style="height: 64px;"><a title="Use Office UI Fabric to design applications that blend seamlessly into Microsoft Office" href="uploads/1477126571436-Use Office UI Fabric to design applications that blend seamlessly into Office.pdf" target="_blank">Use Office UI Fabric to design applications that blend seamlessly into Microsoft Office</a></td>
										<td style="height: 64px;"><a title="Learn about the most commonly used file formats supported by Microsoft Office applications" href="uploads/1477126591368-Office File Formats.pdf" target="_blank">Learn about the most commonly used file formats supported by Microsoft Office applications</a></td>
										</tr>
										<tr style="height: 80px;">
										<th style="height: 80px;" scope="row">17:30-18:15</th>
										<td style="height: 80px;"><a title="Publishing your app to the Office Store" href="uploads/1477127611155-Publishing your app to the Office Store.pdf" target="_blank">Publishing your app to the Office Store</a></td>
										<td style="height: 80px;">Utilize Message Analyzer &amp; Fiddler to parse Office, Exchange, and SharePoint traffic <a title="(including SQL parsers)" href="uploads/1477127656117-Message Analyzer Parsers for SQL.pdf" target="_blank">(including SQL parsers)</a></td>
										</tr>
										<tr class="active" style="height: 64px;">
										<td style="height: 64px;">18:15-19:15</td>
										<td style="height: 64px;" colspan="2">Dinner</td>
										</tr>
										<tr style="height: 64px;">
										<th style="height: 64px;" scope="row">19:15-19:30</th>
										<td style="height: 64px;">Source Control (Managing your project)</td>
										</tr>
										<tr style="height: 64px;">
										<th style="height: 64px;" scope="row">20:00-20:15</th>
										<td style="height: 64px;"><a title="Existing Open Source Projects" href="uploads/1477135279521-Existing Open Source Projects.pdf" target="_blank">Existing Open Source Projects</a></td>
										</tr>
										<tr class="active" style="height: 64px;">
										<td style="height: 64px;">22:00-22:30</td>
										<td style="height: 64px;">Late Night Snack</td>
										</tr>
										<tr class="active" style="height: 47px;">
										<td style="height: 47px;">0:00</td>
										<td style="height: 47px;">Venue Closes</td>
										</tr>
										</tbody>
										</table>
										</div>
										<p>*The hackathon will occur all day Saturday at the venue with onsite help from Microsoft engineers.</p>
										<h4>October 23, 2016: Hackathon continues</h4>
										<h5>Location: Microsoft Beijing West / 5 Danling St, Haidian, Beijing, China, 100080</h5>
										<div class="table-responsive">
										<table class="table table-bordered">
										<thead>
										<tr style="height: 95px;">
										<th style="height: 95px;">
										<h5>Time</h5>
										</th>
										<th style="height: 95px;">
										<h5>Session</h5>
										</th>
										</tr>
										</thead>
										<tbody>
										<tr style="height: 47px;">
										<th style="height: 47px;" scope="row">9:00</th>
										<td style="height: 47px;">Venue opens for breakfast</td>
										</tr>
										<tr style="height: 47px;">
										<th style="height: 47px;" scope="row">9:00-12:00</th>
										<td style="height: 47px;">Work on hackathon projects</td>
										</tr>
										<tr class="active" style="height: 47px;">
										<th style="height: 47px;" scope="row">12:00</th>
										<td style="height: 47px;">Lunch</td>
										</tr>
										<tr style="height: 48px;">
										<th style="height: 48px;" scope="row">13:00-15:00</th>
										<td style="height: 48px;">Work on hackathon projects</td>
										</tr>
										<tr style="height: 47px;">
										<th style="height: 47px;" scope="row">15:00</th>
										<td style="height: 47px;">All hackathon projects completed and submitted / <a title="Hackathon Template PDF" href="uploads/1477192653883-Hackathon%20Template.pdf" target="_blank">Hackathon Template&nbsp;PDF</a> or <a title="PPT" href="uploads/1477192667327-Hackathon Template.pptx" target="_blank">PPT</a></td>
										</tr>
										<tr style="height: 47px;">
										<th style="height: 47px;" scope="row">15:15 &ndash; 17:00</th>
										<td style="height: 47px;">First round of evaluations of all teams</td>
										</tr>
										<tr style="height: 47px;">
										<th style="height: 47px;" scope="row">17:00-18:00</th>
										<td style="height: 47px;">Finalists present to panel of judges</td>
										</tr>
										<tr style="height: 47px;">
										<th style="height: 47px;" scope="row">18:15</th>
										<td style="height: 47px;">Hackathon awards and closing</td>
										</tr>
										</tbody>
										</table>
										</div>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabTitle: 'Hackathon 规则与制度',
                tabNumber: 3,
                tabContent: `
				<a href="/beijing2016#hackathon" class="btn btn-info float-right" role="button">English</a>
				<a href="http://www.aka.ms/devdaysbeijing2016"><img src="/uploads/RegisterNowCN.png" style="height: 37px; margin-right: 10px;" class="float-right" title="registration button" alt="registration link"></a>
				<h2>黑客马拉松活动规则与制度</h2>
<pre class="text-align-center"><span><a target="_self" href="#beijing2016Heading1"> 黑客马拉松项目概述</a> | <a target="_self" href="#beijing2016Heading2">如何参加？</a>| <a target="_self" href="#beijing2016Heading3">黑客马拉松项目需求</a> | <a target="_self" href="#beijing2016Heading4">我的项目将被如何使用？</a>| <a target="_self" href="#beijing2016Heading5"> 我的项目将如何评估？</a>| <a target="_self" href="#beijing2016Heading6"> 黑客马拉松条款和条件</a></span></pre>
<h4>DevDays Asia 2016 @ Beijing 是微软举办的一场免费活动，主要包含两部分内容：</h4>
<ol>
 	<li>为期一天的现场技术活动课程（2016 年 10 月 22 日 9am-6pm）</li>
 	<li>Microsoft Office 365 黑客马拉松活动<strong>（黑客马拉松活动将于 2016 年 9 月 26 日启动报名，并于 2016 年 10 月 21 日 5:00pm 正式开幕</strong>评选和颁奖将于 2016 年 10 月 23 日 DevDays Asia 2016 @ Beijing 活动现场举行）。<a target="_blank" href="/beijing2016cn#3575831243">详情请查阅完整议程安排</a>。</li>
</ol>
&nbsp;
<h4 id="beijing2016Heading1">黑客马拉松项目概述</h4>

<p>Microsoft Office 是全球最受欢迎的生产力工具，拥有超过12 亿的用户。Microsoft Office 365 团队现邀请开发者参与 DevDays Asia 2016 @ Beijing 黑客马拉松活动，基于 Microsoft Office 创建能帮助用户提高生产力的项目。

Microsoft 以<em>予力全球每一人、每一组织，成就不凡作为公司的全新使命。这是一个很宏伟的目标，而</em> Microsoft Graph 和丰富的加载项工具已经在通过一种全新的方式让生产力大幅飞跃变为现实。

财务、社交媒体、旅行计划、工作安排…… 生活中方方面面的生产力都存在改善空间，我们邀请您通过黑客马拉松项目将这一切变为可能。生产力的提升潜力是无穷的！另外我们还为黑客马拉松活动的冠军准备了丰厚的奖品。</p>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">回到本文开头</button>
<h4 id="beijing2016Heading2">如何参加？</h4>
<ul>
	<li>首先以个人参赛者身份<a target="_blank" href="http://aka.ms/DevDaysBeijing2016">在线注册 DevDays Asia 2016 @ Beijing</a> 活动，在问及是否参加黑客马拉松活动时请选择“是”。</li>
	<li>免费注册 <u><a target="_blank" href="http://dev.office.com/devprogram"><u>Microsoft </u><u>开发者帐户</u></a></u>。</li>
	<li>. 访问<a target="_self" href="#hackathon214423618720934227913616426009">资源页 </a>获取有关 Microsoft Graph 和加载项文档、教程，以及应用创意的链接。</li>
</ul>

<p>您也可以将自己的黑客马拉松项目注册至某一团队，或在活动现场注册项目并组建团队。</p>

<p>若要参加黑客马拉松竞赛：</p>
<ul>
 	<li>每位团队成员均<a href="http://aka.ms/DevDaysBeijing2016">须注册本次活动</a>。</li>
 	<li>每个成员只允许提交一（1）个作品。对于因为任何原因导致未能收到的作品，或虽已收到但由于任何原因无法判读的作品，我们不承担任何责任。</li>
 	<li>您的黑客马拉松团队需要有一位领队负责联络事务。如果在黑客马拉松活动正式开始前您希望以其他团队成员身份参赛，须将原团队和新团队信息记录在黑客马拉松团队注册名单中。</li>
 	<li>参加黑客马拉松的每个团队必须至少包含 2 位参与者，最多可包含 4 位参与者。</li>
 	<li>Microsoft <span>员工以及与</span> Microsoft <span>签署了用工合同的承包商员工禁止参加黑客马拉松。</span></li>
</ul>

<p>存在下列情况的作品将被自动取消：</p>
<ul>
 	<li>不完整或难以判读的作品； 以及</li>
 	<li>虽已收到，但超出上文所述注册限制的作品。</li>
</ul>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">回到本文开头</button>
<h4 id="beijing2016Heading3">黑客马拉松项目需求</h4>

<strong>主要需求：</strong>提交能帮助用户改善生产力的应用程序。限全新开发的 <a target="_blank" href="https://msdn.microsoft.com/ZH-CN/library/office/jj220082.aspx">Microsoft Office 365 加载项</a> （扩展）或使用了 <a target="_blank" href="http://graph.microsoft.io/en-us/getting-started">Microsoft Graph</a> 的作品可以获奖。

<p>黑客马拉松的项目和代码编写工作最早可于 2016 年 9 月 26 日启动。黑客马拉松将于 2016 年 10 月 21 日正式开幕<a target="_self" href="/beijing2016cn#hackathon3526821017199822104624230">完整议程安排请参阅这里。</a></p>
<p>补充需求：</p>
<ul>
 	<li>您提交的作品必须是自己的原创成果；并且</li>
 	<li>您所提交的作品必须已获得所有必要的同意、批准，或许可；并且</li>
 	<li>您的作品不能包含任何第三方商标（徽标、名称）或有版权材料（音乐、图片、视频、可辨识的人物），除非您已获得使用这些材料的许可。您可以在作品中包含 Microsoft <span>的商标、徽标以及设计，</span>Microsoft <span>将为您提供受限制的许可，该许可仅允许您出于参与本次竞赛的目的，在自己的作品中使用这些材料。</span></li>
 	<li>活动现场提供了可以与您合作的开发专家，您可以与他们一起讨论并审查自己的项目。指定给您的专家不会将您的创意告知其他团队。</li>
 	<li>黑客马拉松团队不允许使用 Office Store 中提供的任何代码、产品或工作成果。</li>
 	<li>您可以在竞赛开始前先行对开发工作进行构思和规划，DevDays Asia 2016 @Beijing 活动允许您使用曾在其他任何黑客马拉松活动中提交或获奖的代码、产品或工作成果。</li>
</ul>
<p>作品严禁包含下列任何内容：</p>
<ul>
 	<li>色情；暴力；或对任何民族、种族、性别、宗教、职业或年龄段的贬低；亵渎或淫秽的内容；</li>
 	<li>宣传酗酒、毒品或违禁药物、烟草、枪支/<span>武器（或对任何暴力的使用）或任何特定的政治意图；</span></li>
 	<li>淫秽的或冒犯性的内容；</li>
 	<li>诽谤、曲解其他个人或公司，或包含蔑视的言论；</li>
 	<li>和/<span>或任何违法内容；</span></li>
</ul>
<p>活动组织方和黑客马拉松评委保留拒绝任何作品的权利，并有权确定作品是否满足上述要求。</p>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">回到本文开头</button>
<h4 id="beijing2016Heading4">我的项目将被如何使用？</h4>

<p>除了下列陈述，我们对您的作品不主张任何所有权。提交作品意味着您：</p>
<ul>
<li>同意授予我们免版税、全球可用的权利和许可，以供我们：(i) 审查、评估、测试，以及分析您在竞赛中提交的作品中所包含的全部内容；以及 (ii) 通过所有媒体在本次竞赛的营销、销售，或促销工作中使用您的作品及其包含的内容；</li>
<li>同意并签署用于公关等上述用途所要求的任何必要文件；</li>
<li>理解：除了正式规则中描述的内容，您不会因为自己作品的使用而获得任何补偿或荣誉。</li>
</ul>
<p>请注意，本次竞赛结束后，您的作品可能会发布至我们选择的一个网站，并供该网站的访客查看。对于网站访客未经授权使用您作品的行为，我们不承担任何责任。</p>
<p>参加此次黑客马拉松意味着您同意：</p>
<ul>
<li>遵守这些正式规则；并且</li>
<li>为免受损害，对因您参赛或获奖而产生的任何类型的责任、伤害、损失或损害，Microsoft 及其合作伙伴、子公司、分支机构、员工以及代理人员不承担任何责任。</li>
<li>接受奖品意味着，Microsoft 可以在在线媒体、印刷品或其他任何媒体中使用您与本次竞赛有关的专有名称和居住国家信息，且无须向您付款或提供补偿，除非法律禁止这样做。</li>
</ul>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">回到本文开头</button>
<h4 id="beijing2016Heading5">我的项目将如何评估？</h4>

<p><strong>黑客马拉松评审标准</strong></p>
<p>DevDays Asia 2016 @ Beijing 活动期间提交的黑客马拉松作品将按照下表所示评分标准进行评审。对于所提交的所有黑客马拉松项目，将选出 5 个团队参与最终的第一、第二和第三名角逐。每个团队须通过一场 5 分钟的演讲向评委会展示自己的项目，其中将预留 2 分钟回答评委的问题。评委将使用黑客马拉松评分标准选出获得第一、第二和第三名的项目。</p>

<p>黑客马拉松评委将使用下列标准对每个作品进行评审。</p>
<table>
<tbody>
<tr>
<td>概念</td>
<td>30%</td>
</tr>
<tr>
<td>影响力</td>
<td>40%</td>
</tr>
<tr>
<td>执行情况</td>
<td>30%</td>
</tr>
</tbody>
</table>
<ul>
 	<li>第一轮评估过程中，所有黑客马拉松选手均有机会向黑客马拉松组委会团队介绍自己的项目。为了向评委介绍自己的项目，黑客马拉松团队将获得一个固定格式的演示文稿模板。</li>
 	<li>第一轮评估中，组委会将选出排名前五位的项目。这五个项目的成员将通过相同时长的演讲向黑客马拉松评委介绍自己的项目。</li>
 	<li>黑客马拉松评委将根据马拉松评审标准选出前三名获胜者。</li>
 	<li>组委会保留审查参赛者资格的权利。</li>
 	<li>黑客马拉松评委不会由于年龄、家世、肤色、病事假、性别认同或表现、遗传信息、婚姻状况、身体健康状况、国籍、身体或心智残障、政治立场、退伍军人与否、种族、宗教、性别（包括孕期）、性取向，或受到所适用本地法规、制度以及条例保护的其他特征而区别对待参赛者。</li>
</ul>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">回到本文开头</button>
<h4 id="beijing2016Heading6">黑客马拉松条款和条件</h4>
<ol>
 	<li>为得到主办方提供的奖项，参赛选手必须全程参与黑客马拉松活动。</li>
 	<li>由于相关税法产生的税务须由获奖者负责。黑客马拉松组委会不承担由于奖品产生的任何税务责任。获奖者同意由黑客马拉松组委会代缴或支付相关税款（若有）。</li>
 	<li>获奖者无权将奖品折现或进行其他形式的交换。如若奖品遗失、失窃或损毁，黑客马拉松赞助商不应提供任何额外的奖励或赔偿（无论实物或现金）。</li>
 	<li>黑客马拉松组委会保留收回任何未兑现奖品的权利，若使用价值相等的其他物品取代原定奖品，恕不另行通知。</li>
 	<li>参赛者提交的数据必须真实准确，不允许进行任何伪造或篡改。参赛者不应将自己的个人信息提供给任何第三方，并由第三方代为参赛，此种行为将被认定为欺诈或盗窃。参赛者的行为不得违背法律。</li>
 	<li>评审团对于黑客马拉松活动每个阶段的选手和获奖者有最终决定权。</li>
 	<li>竞赛的开发过程中，您可以在自己桌前打盹小憩，或在休息区域休息。</li>
 	<li>每个团队成员只允许加入一个团队。</li>
 	<li>黑客马拉松的组委会以及活动执行人员有权复制、编辑、转换、分发、公开传输、公开执行、公开呈现、公开广播、公开口头披露、引用、摘录，以及通过其他任何必要行为，在全球范围内的营销活动、促销活动、慈善活动，以及相关媒体，包括出版物、信息、提案、促销材料、宣传册和网站中，无限次数地使用竞赛作品以及参赛者的基本信息，包括但不限于姓名、肖像和照片（下文统称为“竞赛数据”）。</li>
 	<li>根据组委会评判，如选手针通对本次黑客马拉松活动的评选（包括竞赛注意事项）、制度、黑客马拉松活动本身或其网站采取不公平、欺骗和欺诈的行为，进而打断黑客马拉松活动，干扰其他参赛选手，通过非法活动参与此次黑客马拉松活动，或违反其他公共秩序，他/她同意组委会立刻撤销他/她的黑客马拉松参会或获奖资格（并退回黑客马拉松组委会提供的奖金、证书和奖杯）。他/她应承担造成的任何法律责任，并为这些损失对活动组织者、赞助商、执行人员，及其管理层、总监、监管人及员工造成的任何损失和费用承担赔偿责任。</li>
 	<li>参赛选手须知，任何试图破坏活动网站或黑客马拉松活动进展的团队或个人将触犯相关民法和刑法。在相关制度允许的范围内，针对这些个人造成的损失，活动组织者、赞助商，以及活动执行人员保留索赔的权利。</li>
 	<li>活动组织者保留在不事先通知的情况下更改黑客马拉松活动项目的权利。黑客马拉松的参与者一旦参加或注册，意味着同意受到此项目约束。任何未尽事宜将由组织者进行增补，并发布至活动网站。</li>
 	<li>如若存在舞弊情况，或遭遇无法合理预期或控制的病毒、Bug、自动化程序、灾难性事件，或任何其他无法预见或意外的事件（即“不可抗力”）影响到本次竞赛的公平性和/或完整性，我们保留取消、更改或暂停本次竞赛的权利。无论活动因为人为或技术故障导致，我们均将保留这些权利。如果无法妥善恢复竞赛的完整性，我们保留在取消、更改或暂停本次竞赛前收到的所有符合资格要求的作品中评选出获胜者的权利。</li>
 	<li>如果您试图，或我们有充分的理由相信您通过作弊、黑客行为、创建机器人或其他自动化程序、或通过任何方式舞弊，进而威胁到本次竞赛的完整性或活动的合理运作，我们将在法律允许的最大范围内向您追偿。此外我们可能会撤销您的资格，禁止您参与我们未来举行的任何竞赛活动，请务必公平竞争。</li>
</ol>
<h4>隐私条款</h4>
<p>Microsoft 致力于保护您的隐私。Microsoft 会使用您提供的信息通知获奖者，并在您要求的情况下将您的信息发送至其他 Microsoft 产品和服务。未经您的允许，Microsoft 不会将您提供的信息共享给第三方，除非这样做是完成服务所必须的，或是您自己或法律要求的。Microsoft 承诺为您的个人信息提供安全保护。我们会使用多种安全技术和规程保护您的个人信息防范未经授权的访问、使用，或披露。除上文列出的情况外，未经您的批准，您的个人信息绝不会泄露到公司之外。</p>

<p>如果您认为 Microsoft 未能遵守这些条款，请告知我们，您可以发送邮件至 <a href="mailto:VSIPENG@microsoft.com">VSIPENG@microsoft.com</a>，或发送传统纸质信件至 VSIP Engineering, Microsoft Privacy, Microsoft Corporation, One Microsoft Way, Redmond, WA 98052 USA，我们将采取商业上合理的努力解决您遇到的问题。</p>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">回到本文开头</button>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabTitle: 'Venue / 会场',
                tabNumber: 4,
                tabContent: `<p><a class="btn btn-success float-right" href="beijing2016cn#venue472025022330">汉语</a> <a class="btn btn-primary float-right" style="margin-right: 10px;" href="http://www.aka.ms/devdaysbeijing2016">Register</a> <br /><br /> <a class="btn btn-info float-right" href="beijing2016#venue472025022330">English</a> <a href="http://www.aka.ms/devdaysbeijing2016"><img class="float-right" style="height: 37px; margin-right: 10px;" title="registration button" src="uploads/RegisterNowCN.png" alt="registration link" /></a></p>
										<h2>Microsoft Asia-Pacific R &amp; D Group Headquarters</h2>
										<h2>微软亚太研发集团总部</h2>
										<p><img class="m-x-auto" src="uploads/ms-building-2-haidian.jpg" alt="Microsoft Asia-Pacific R &amp; D Group Headquarters" /></p>
										<p><strong>Building 1, No. 5 Dan Ling Street,</strong></p>
										<p>Haidian District,</p>
										<p>Beijing , 100080</p>
										<p>China</p>
										<h4>Telephone</h4>
										<p>(86-10) 5917-8888</p>
										<p>*More specific directions are coming soon!</p>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabNumber: 3,
                tabTitle: 'Hackathon',
                tabContent: `<p><a class="btn btn-success float-right" href="beijing2016cn#hackathon3526821017199822104624230">汉语</a> <a class="btn btn-primary float-right" style="margin-right: 10px;" href="http://www.aka.ms/devdaysbeijing2016">Register</a></p>
<p><a title="My title" href="uploads/1476480479187-_AAA_test.pptx" target="_self">1476480479187-_AAA_test.pptx</a></p>
<h2>Hackathon Rules and Regulations</h2>
<pre class="text-align-center"><a href="#hackathonProjectOverviewBeijing2016" target="_self">Hackathon Project Overview</a> | <a href="#howCanIEnterBeijing2016" target="_self">How can I enter?</a> | <a href="#hackathonProjectReqsBeijing2016" target="_self">Hackathon Project Requirements</a> | <a href="#howWillMyProjecBeUsedBeijing2016" target="_self">How will my project be used?</a> | <a href="#howWillMyProjectBeEvalueatedBeijing2016" target="_self">How will my project be evaluated?</a> | <a href="#hackathonTermsBeijing2016" target="_self">Hackathon Terms + Conditions</a></pre>
<h3>DevDays Asia 2016 @ Beijing: Hackathon Rules and Regulations</h3>
<p id="majorPartsLabel"><strong>DevDays Asia 2016 @ Beijing is a free Microsoft event that includes 2 major parts:</strong></p>
<ol role="list" aria-labelledby="majorPartsLabel">
<li role="listitem">An onsite event with a full day technical tracks (9am-6pm on October 22, 2016)</li>
<li role="listitem">A Microsoft Office 365 Hackathon (<strong>Hackathon opens September 26, 2016. Official kick off begins onsite on October 21, 2016 at 5:00pm.</strong> Judging and awards occur onsite at DevDays Asia 2016 @ Beijing on October 23, 2016). <a href="http://interopevents.com/beijing2016#agenda">See full agenda for details.</a></li>
</ol>
<h4 id="hackathonProjectOverviewBeijing2016">Hackathon Project Overview</h4>
<p>With 1.2 billion users, Microsoft Office is the world&rsquo;s most popular set of productivity tools. The Microsoft Office 365 team is challenging developers to boost productivity by creating a project within Microsoft Office at the DevDays Asia 2016 @ Beijing hackathon.</p>
<p>Microsoft&rsquo;s company mission is: <em>to empower every person and every organization on the planet to achieve more. </em>It may seem like a big job, but Microsoft Graph and Add-in tools make hacking productivity possible in a whole new way.</p>
<p>We invite you to submit a hackathon project that increases productivity in any aspect of your life or enterprise&ndash; from your line of business applications to complete packaged applications. The possibilities for productivity improvements are endless! Plus, we have some pretty cool prizes for the hackathon winners.</p>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">Back to top</button>
<h4 id="howCanIEnterBeijing2016">How can I enter?</h4>
<ol role="list" aria-labelledby="howCanIEnterBeijing2016">
<li role="listitem">First, <a href="https://www.microsoftevents.com/profile/form/index.cfm?PKformID=0x6209970001">register online with DevDays Asia 2016 @ Beijing</a> as an individual contestant. Select &ldquo;Yes&rdquo; when asked if you will participate in the hackathon.</li>
<li role="listitem">Sign up for your free </strong><a href="http://dev.office.com/devprogram">Microsoft Developer Account.</li>
<li role="listitem">Visit the </strong><a href="http://interopevents.com/beijing2016cn#hackathon214423618720934227913616426009">Resources page</a> for links to Microsoft Graph and Add-in documentation, tutorials, and app ideas.</li>
</ol>
<p>You may also register your hackathon project with a team or register your idea and form a team at the event.</p>
<p id="completeHachathonUl">In order to compete in the hackathon:</p>
<ul role="list" aria-labelledby="completeHachathonUl">
<li role="listitem">Each member of the team must also be <a href="https://www.microsoftevents.com/profile/form/index.cfm?PKformID=0x6209970001">registered for the event.</a></li>
<li role="listitem">We will only accept one (1) entry per entrant. We are not responsible for entries that we do not receive for any reason, or for entries that we receive but are not decipherable for any reason.</li>
<li role="listitem">You need to have a hackathon team leader to be your hackathon affairs liaison. If you change which group you want to compete with before the hackathon officially begins, it must be recorded on the official hackathon group signup sheet of both the original and new teams.</li>
<li role="listitem">Each hackathon team must have a minimum of 2 participants and a maximum of 4 participants to compete.</li>
<li role="listitem">Employees of Microsoft and contractors currently under contract work for Microsoft are not eligible to enter the hackathon.</li>
</ul>
<p id="disqualifyLabel">We will automatically disqualify:</p>
<ul role="list" aria-labelledby="disqualifyLabel">
<li role="listitem">Any incomplete or illegible entry; and</li>
<li role="listitem">Any entries that we receive from you that exceed the entry limit described above.</li>
</ul>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">Back to top</button>
<h4 id="hackathonProjectReqsBeijing2016">Hackathon Project</h4>
<p><strong>Main Requirement: </strong>Submit an application that will help users increase their productivity. To be eligible for prizes, submissions must be a new <a href="https://dev.office.com/getting-started/addins">Microsoft Office 365 Add-in</a> (extension) <strong>or </strong>utilize <a href="https://graph.microsoft.io/en-us/getting-started">Microsoft Graph.</a></p>
<p>Hackathon projects and coding may start as early as September 26, 2016. The hackathon will kick off onsite on October 21, 2016. <a href="#agenda">See full agenda here.</a></p>
<p id="inAdditionLabel">In addition:</p>
<ul role="list" aria-labelledby="inAdditionLabel">
<li role="listitem">Your entry must be your own original work; and</li>
<li role="listitem">You must have obtained any and all consents, approvals or licenses required for you to submit your entry; and</li>
<li role="listitem">Your entry may not include any third-party trademarks (logos, names) or copyrighted materials (music, images, video, recognizable people) unless you have obtained permission to use the materials. You may include Microsoft trademarks, logos, and designs, for which Microsoft grants you a limited license to use for the sole purposes of submitting an entry into this Contest.</li>
<li role="listitem">There will be development experts on site at the event who can work with you. You can discuss and review your projects with them. Designated experts are not allowed share your ideas with other teams.</li>
<li role="listitem">Hackathon teams may not use any code, product, or work available in the Office Store.</li>
<li role="listitem">Works for the contest may be shaped and planned for development beforehand. Any code, product, or work available that was awarded or submitted to any other hackathon is allowed in the DevDays Asia 2016 @Beijing</li>
</ul>
<p id="restrictionsLabel">Entries may NOT contain, as determined by Microsoft event coordinators, in our sole and absolute discretion, any content that:</p>
<ul role="list" aria-labelledby="restrictionsLabel">
<li role="listitem">is sexually explicit, unnecessarily violent or derogatory of any ethnic, racial, gender, religious, professional or age group; profane or pornographic;</li>
<li role="listitem">promotes alcohol, illegal drugs, tobacco, firearms/weapons (or the use of any of the foregoing) or a particular political agenda;</li>
<li role="listitem">is obscene or offensive;</li>
<li role="listitem">defames, misrepresents or contains disparaging remarks about other people or companies;</li>
<li role="listitem">communicates messages or images inconsistent with the positive images and/or good will to which we wish to associate; and/or violates any law;</li>
</ul>
<p>Microsoft event coordinators and hackathon judges reserve the right to reject any entry, in our sole and absolute discretion, that we determine does not meet the above criteria.</p>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">Back to top</button>
<h4 id="howWillMyProjecBeUsedBeijing2016">How will my project be used?</h4>
<p id="submittingYourEntry">Other than what is set forth below, we are not claiming any ownership rights to your entry. However, by submitting your entry, you:</p>
<ul role="list" aria-labelledby="submittingYourEntry">
<li role="listitem">are granting us an irrevocable, royalty-free, worldwide right and license to: (i) use, review, assess, test and otherwise analyze your entry and all its content in connection with this Contest; and (ii) feature your entry and all content in connection with the marketing, sale, or promotion of this Contest (including but not limited to internal and external sales meetings, conference presentations, tradeshows, and screen shots of the Contest entry in press releases) in all media (now known or later developed);</li>
<li role="listitem">agree to sign any reasonable documentation that may be required for us and our designees to make use of the rights you grant above;</li>
<li role="listitem">understand and acknowledge that the Sponsor(s) may have developed or commissioned materials similar or identical to your submission and you waive any claims you may have resulting from any similarities to your entry;</li>
<li role="listitem">understand that we cannot control the incoming information you will disclose to our representatives during the course of entering, or what our representatives will remember about your entry. You also understand that we will not restrict work assignments of representatives who have had access to your entry. By entering this Contest, you agree that use of information in our representatives' unaided memories in the development or deployment of our products or services does not create liability for Microsoft under this agreement or by way of copyright or trade secret law;</li>
<li role="listitem">understand that you will not receive any compensation or credit for use of your entry, other than what is described in these Official Rules</li>
</ul>
<p>Please note that following the end of this Contest your entry may be posted on a website selected by us for viewing by visitors to that website. We are not responsible for any unauthorized use of your entry by visitors to this website. While we reserve these rights, we are not obligated to use your entry for any purpose, even if it has been selected as a winning entry.</p>
<p id="contestAgreementBeijing2016">By entering this Contest you agree:</p>
<ul role="list" aria-labelledby="contestAgreementBeijing2016">
<li role="listitem">To abide by these Official Rules; and</li>
<li role="listitem">To release and hold harmless Microsoft and its respective parents, subsidiaries, affiliates, employees and agents from all liability, injury, loss or damage of any kind arising from, or in connection with this Contest or any prize won; and</li>
<li role="listitem">That by accepting a prize, Microsoft may make use of your proper name and state of residence, photos taken at the event, and any feedback that you may provide in conjunction with the event, online and in print, or in any other media, in connection with this Contest, without payment or compensation to you, except where prohibited by law.</li>
</ul>
<p>If you do not want to grant us these rights to your entry, do not enter this Contest.</p>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">Back to top</button>
<h4 id="howWillMyProjectBeEvalueatedBeijing2016">How will my project be evaluated?</h4>
<ul role="list" aria-labelledby="howWillMyProjectBeEvalueatedBeijing2016">
<li role="listitem">All hackathon contestants are given the opportunity to present their project to a team of hackathon organizers in the first round of evaluations. Hackathon teams will be given a preformatted presentation template to present to the judges.</li>
<li role="listitem">Organizers will select the top five projects from the first round of evaluations. The top five projects will be given an equal amount of time to present their projects to the hackathon judges.</li>
<li role="listitem">The hackathon judges will select the top three winners of the hackathon based on the Contest criteria contained herein.</li>
<li role="listitem">Organizers reserve the right to review your qualifications.</li>
<li role="listitem">Hackathon judges will not discriminate against competitors based on age, ancestry, color, family or medical care leave, gender identity or expression, genetic information, marital status, medical condition, national origin, physical or mental disability, political affiliation, protected veteran status, race, religion, sex (including pregnancy), sexual orientation, or any other characteristic protected by applicable local laws, regulations, and ordinances.</li>
</ul>
<p><strong>Hackathon Judging Criteria</strong></p>
<p>Hackathon submissions during DevDays Asia 2016 @ Beijing are evaluated by the ranking criteria listed in the table below. From all hackathon project submissions, 5 teams will be chosen for the finals to compete for first, second, and third place. Each team will exhibit their projects with a 5-minute presentation to the review panel and 2 minutes reserved for questions. Hackathon judges will use the hackathon ranking criteria to choose the projects to be awarded first, second, and third place.</p>
<table class="table table-bordered">
	<thead>
		<tr>
			<th>Concept</th>
			<th>Impact</th>
			<th>Execution</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>30%</td>
			<td>40%</td>
			<td>30%</td>
		</tr>
	</tbody>
</table>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">Back to top</button>
<h4 id="hackathonTermsBeijing2016">Hackathon Terms and Conditions</h4>
<ol role="list" aria-labelledby="hackathonTermsBeijing2016">
<li role="listitem">Contestants are required to go through the entire hackathon to get the participation award provided by the sponsor. Partial participation will not receive the participation award.</li>
<li role="listitem">Award winners is responsible for any tax(es) subject to the relevant tax laws. The hackathon organizer shall be in no case held liable to any tax levied due to the award. The award winner consents that the hackathon organizer&rsquo;s withholding or pay the relevant taxes (if any).</li>
<li role="listitem">Award winners have no right to exchange their awards for cash or other forms. Hackathon sponsors shall not give any extra awards (either goods or cash) in case the previous one is lost, stolen, or damaged.</li>
<li role="listitem">Hackathon organizers reserve the rights to take care of any awards left un-awarded and replace the said awards with other goods with equivalent values without any notice in advance.</li>
<li role="listitem">Data submitted by contestants must be true and correct without any forgery or alterations. Contestants shall not provide personal data to any third party in lieu of their own by means of fraud or theft. Contestants shall have no violations against the law.</li>
<li role="listitem">The review panel has the final say on the finalists and winners at each stage of this hackathon.</li>
<li role="listitem">You may take a rest by napping on the table or in your own sleeping bag at the refreshment zone during the development session of the contest.</li>
<li role="listitem">Individual team members may not compete on more than one team.</li>
<li role="listitem">Hackathon organizers, sponsors and its execution agents have the rights in reproducing, editing, converting, distributing, publicly transmitting, publicly performing, publicly presenting, publicly broadcasting, publicly verbal disclosing, referencing, or excerpting, and any other act required for using contest works by and basic data of contestants, including but not limited to name, portraits and photos, (hereafter referred to as &ldquo;contest data&rdquo;) unlimited number of times in their worldwide marketing activities, promotional activities, charity activities, and relevant media including publications, information, proposals, promotional materials, brochures and websites.</li>
<li role="listitem">In case contestants took actions against measures of this hackathon (including notes on the contests), regulations, the hackathon itself or its website, actions aimed at interrupting this hackathon or interfering with other contestants or participating this hackathon in illegal activities or against the public order and good morals and manner including unfair, deceptive and fraudulent practices, subject to the organizer&rsquo;s judgment, he/she agrees to the organizer&rsquo;s immediate removal of his/her hackathon or award winning qualifications (including recovering the award cash, certificate and trophy by the hackathon organizer). He/she shall be held liable for any legal responsibility and held liable for compensating the organizer, sponsor, execution agent and their executives, directors, supervisors and employees for any of their loss and expenses due to these damages.</li>
<li role="listitem">The contestants have learnt that any one of them or any individual attempting to compromise the web site or the progress of this hackathon would breach relevant civil or criminal laws. The organizer, sponsors and their execution agents shall reserve the right in requesting compensation, to the extent permitted by the relevant regulations, against damage by these individuals.</li>
<li role="listitem">The organizer shall reserve the right to change the program of this hackathon with a written notice in advance to registered participants. Hackathon attendees, once participating in or registering to it, shall consent to be bound by this program. Any matter not covered herein shall be supplemented and publicized on the web site of this hackathon by the organizer.</li>
<li role="listitem">If someone cheats, or a virus, bug, bot, catastrophic event, or any other unforeseen or unexpected event that cannot be reasonably anticipated or controlled, (also referred to as force majeure) affects the fairness and / or integrity of this Contest, we reserve the right to cancel, change or suspend this Contest.&nbsp; This right is reserved whether the event is due to human or technical error. If a solution cannot be found to restore the integrity of the Contest, we reserve the right to select winners from among all eligible entries received before we had to cancel, change or suspend the Contest.&nbsp;&nbsp;</li>
<li role="listitem">If you attempt or we have strong reason to believe that you have compromised the integrity or the legitimate operation of this Contest by cheating, hacking, creating a bot or other automated program, or by committing fraud in ANY way, we may seek damages from you fully permitted by law.&nbsp; Further, we may disqualify you, and ban you from participating in any of our future Contests, so please play fairly.&nbsp;</li>
</ol>
<h5>PRIVACY STATEMENT</h5>
<p>At Microsoft, we are committed to protecting your privacy.&nbsp; Microsoft uses the information you provide to notify prize winners, and to send you information about other Microsoft products and services, if requested by you.&nbsp; Microsoft will not share the information you provide with third parties without your permission except where necessary to complete the services or transactions you have requested, or as required by law.&nbsp; Microsoft is committed to protecting the security of your personal information.&nbsp; We use a variety of security technologies and procedures to help protect your personal information from unauthorized access, use, or disclosure. Your personal information is never shared outside the company without your permission, except under conditions explained above.</p>
<p>If you believe that Microsoft has not adhered to this statement, please notify us by sending email to VSIPENG@microsoft.com or postal mail to VSIP Engineering, Microsoft Privacy, Microsoft Corporation, One Microsoft Way, Redmond, WA 98052 USA, and we will use commercially reasonable efforts to remedy the situation.&nbsp;</p>
<button type="button" class="btn btn-sm" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');">Back to top</button>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabTitle: '议程',
                tabNumber: 2,
                tabContent: `<p><a class="btn btn-info float-right" href="beijing2016#agenda">English</a> <a href="http://www.aka.ms/devdaysbeijing2016"><img class="float-right beijingRegistration2016Button" style="height: 37px; margin-right: 10px;" title="registration button" src="uploads/RegisterNowCN.png" alt="registration link" /></a></p>
								<h4>2016 年九月二十六日: Hackathon 开始!</h4>
								<h4>2016 年十月二十一日: Hackathon 正式开幕</h4>
								<p>会场：微软亚太研发集团</p>
								<p>北京市海淀区丹棱街5号</p>
								<p>邮编：100080</p>
								<div class="table-responsive">
								<table class="table table-bordered">
								<thead>
								<tr>
								<th>
								<h5>时间</h5>
								</th>
								<th>
								<h5>环节内容</h5>
								</th>
								</tr>
								</thead>
								<tbody>
								<tr>
								<th scope="row">17:00</th>
								<td>欢迎参赛者</td>
								</tr>
								<tr class="active">
								<th scope="row">18:00</th>
								<td>晚餐</td>
								</tr>
								<tr>
								<th scope="row">19:00-21:00</th>
								<td>建立团队 + 编写程序和应用</td>
								</tr>
								</tbody>
								</table>
								</div>
								<p><strong>2016 年十月二十二日: DevDays Asia 2016 @ Beijing 会议开始与 Hackathon继续进行</strong></p>
								<p>会场：微软亚太研发集团</p>
								<p>北京市海淀区丹棱街5号</p>
								<p>邮编：100080</p>
								<div class="table-responsive">
								<table class="table table-bordered">
								<thead>
								<tr style="height: 97px;">
								<th style="height: 97px;">
								<h5>时间</h5>
								</th>
								<th style="height: 97px;">
								<h5>Office 开发者环节</h5>
								</th>
								<th style="height: 97px;">
								<h5>互操作环节</h5>
								</th>
								</tr>
								</thead>
								<tbody>
								<tr style="height: 66px;">
								<th style="height: 66px;" scope="row">9:00-9:15</th>
								<td style="height: 66px;" colspan="2">欢迎致词</td>
								</tr>
								<tr style="height: 66px;">
								<th style="height: 66px;" scope="row">9:15-10:00</th>
								<td style="height: 66px;" colspan="2"><a title="会议主旨" href="uploads/1477100667698-Keynote - DevDays Asia-China.pdf" target="_self">会议主旨</a></td>
								</tr>
								<tr style="height: 66px;">
								<th style="height: 66px;" scope="row">10:00-10:45</th>
								<td style="height: 66px;"><a title="介绍现代 Office 平台" href="uploads/1477102799774-Introducing the Modern Office Platform.pdf" target="_self">介绍现代 Office 平台</a></td>
								<td style="height: 66px;"><a title="介绍微软对互操作之承诺(Office, Windows, and SQL)" href="uploads/1477102973672-Introducing Microsoft's Commitment to Interoperabilty.pdf" target="_self">介绍微软对互操作之承诺(Office, Windows, and SQL)</a></td>
								</tr>
								<tr class="active" style="height: 66px;">
								<td style="height: 66px;">10:45-11:00</td>
								<td style="height: 66px;" colspan="2">休息</td>
								</tr>
								<tr style="height: 66px;">
								<th style="height: 66px;" scope="row">11:00-11:45</th>
								<td style="height: 66px;"><a title="通过Office 外接程序使您的解決方案成为 Office 本体的一部分" href="uploads/1477105047495-Make your solution a native part of Office with Office Add-ins.pdf" target="_self">通过Office 外接程序使您的解決方案成为 Office 本体的一部分</a></td>
								<td style="height: 66px;"><a title="Windows 协议测试组件" href="uploads/1477105069786-Windows Protocol Test Suites.pdf" target="_self">Windows 协议测试组件</a></td>
								</tr>
								<tr style="height: 66px;">
								<th style="height: 66px;" scope="row">11:45-12:30</th>
								<td style="height: 66px;"><a title="探讨Microsoft Graph (旧称 &ldquo;Office 365 统一API&rdquo;) 是访问 Microsoft 云服务中数据最轻松简易的方式（内容包括Gallatin、 范例、实例等）。" href="uploads/1477107201387-Discover Microsoft Graph.pdf" target="_self">探讨Microsoft Graph (旧称 &ldquo;Office 365 统一API&rdquo;) 是访问 Microsoft 云服务中数据最轻松简易的方式（内容包括Gallatin、 范例、实例等）。</a></td>
								<td style="height: 66px;"><a title="发掘 Exchange 协议 和有关 ActiveSync, Exchange Web 服务及 MAPI方面的进步" href="uploads/1477107220483-Discover Exchange Protocols &amp; advancements in ActiveSync, Exchange Web Services, and MAPI.pdf" target="_blank">发掘 Exchange 协议 和有关 ActiveSync, Exchange Web 服务及 MAPI方面的进步</a></td>
								</tr>
								<tr class="active" style="height: 66px;">
								<td style="height: 66px;">12:30-13:30</td>
								<td style="height: 66px;" colspan="2">午餐</td>
								</tr>
								<tr style="height: 66px;">
								<th style="height: 66px;" scope="row">13:30-14:15</th>
								<td style="height: 66px;"><a title="探索Dev.Office.com及通过报名注册拿到Office 开发人员账户" href="uploads/1477121648782-Navigate Dev.Office.com and create an Office Developer account.pdf" target="_blank">探索Dev.Office.com及通过报名注册拿到Office 开发人员账户</a></td>
								<td style="height: 66px;"><a title="开放数据协议（OData）概述及演示" href="uploads/1477121830645-OData Overview.pdf" target="_blank">开放数据协议（OData）概述及演示</a></td>
								</tr>
								<tr style="height: 66px;">
								<th style="height: 66px;" scope="row">14:15-15:00</th>
								<td style="height: 66px;"><a title="介绍Office 365 China Instance" href="uploads/1477121736210-Intro to Office 365 China Instance.pdf" target="_blank">介绍Office 365 China Instance</a></td>
								<td style="height: 66px;"><a title="开放数据协议（OData）验证工具: 验证以OData 开发的服务能否与 OData客户端正常操作" href="uploads/1477122292779-OData Validator.pdf" target="_blank">开放数据协议（OData）验证工具: 验证以OData 开发的服务能否与 OData客户端正常操作</a></td>
								</tr>
								<tr style="height: 66px;">
								<th style="height: 66px;" scope="row">15:00-15:45</th>
								<td style="height: 66px;"><a title="在Office 外接程序内发掘微软Graph的优势" href="uploads/1477121758460-Leverage Microsoft Graph through Office Add-Ins.pdf" target="_blank">在Office 外接程序内发掘微软Graph的优势</a></td>
								<td style="height: 66px;"><a title="介绍&ldquo;模型第一工具&rdquo;，一种从资源模型中产生高度一致的 API 的方法" href="uploads/1477121933006-Model First Intro.pdf" target="_blank">介绍&ldquo;模型第一工具&rdquo;，一种从资源模型中产生高度一致的 API 的方法</a></td>
								</tr>
								<tr class="active" style="height: 66px;">
								<td style="height: 66px;">15:45-16:00</td>
								<td style="height: 66px;" colspan="2">休息</td>
								</tr>
								<tr style="height: 66px;">
								<th style="height: 66px;" scope="row">16:00-16:45</th>
								<td style="height: 66px;"><a title="通过 Outlook REST APIs 创建智慧的邮件、联系人、日历应用" href="uploads/1477139267732-Outlook REST APIs.pdf" target="_self">通过 Outlook REST APIs 创建智慧的邮件、联系人、日历应用</a></td>
								<td style="height: 66px;"><a title="了解SharePoint 协议，包括 Office合著者 (FSSHTTP) 和 Office Online (WOPI)" href="uploads/1477137074641-Office Online and Sharepoint Protocols.pdf" target="_blank">了解SharePoint 协议，包括 Office合著者 (FSSHTTP) 和 Office Online (WOPI)</a></td>
								</tr>
								<tr style="height: 66px;">
								<th style="height: 66px;" scope="row">16:45-17:30</th>
								<td style="height: 66px;"><a title="通过Office UI Fabric来设计应用使您的体验外观和感觉与 Office 相似" href="uploads/1477126688447-Use Office UI Fabric to design applications that blend seamlessly into Office.pdf" target="_blank">通过Office UI Fabric来设计应用使您的体验外观和感觉与 Office 相似</a></td>
								<td style="height: 66px;"><a title="了解微软 Office应用程序所支持的最常用Office文件格式" href="uploads/1477126735376-Office File Formats.pdf" target="_blank">了解微软 Office应用程序所支持的最常用Office文件格式</a></td>
								</tr>
								<tr style="height: 66px;">
								<th style="height: 66px;" scope="row">17:30-18:15</th>
								<td style="height: 66px;"><a title="发布您的应用至Office 商店" href="uploads/1477127782465-Publishing your app to the Office Store.pdf" target="_blank">发布您的应用至Office 商店</a></td>
								<td style="height: 66px;">利用Message Analyzer 和 Fiddler 解析器来解析Office, Exchange, and SharePoint 协议消息的内容 (<a title="包括SQL Parsers" href="uploads/1477127809566-Message Analyzer Parsers for SQL.pdf" target="_blank">包括SQL Parsers</a>)</td>
								</tr>
								<tr class="active" style="height: 66px;">
								<td style="height: 66px;">18:15-19:15</td>
								<td style="height: 66px;" colspan="2">晚餐</td>
								</tr>
								<tr style="height: 66px;">
								<th style="height: 66px;" scope="row">19:15-19:30</th>
								<td style="height: 66px;">源代码管理（管理您的项目）</td>
								</tr>
								<tr style="height: 66px;">
								<th style="height: 66px;" scope="row">20:00-20:15</th>
								<td style="height: 66px;"><a title="现有的开源项目" href="uploads/1477135401737-Existing Open Source Projects.pdf" target="_self">现有的开源项目</a></td>
								</tr>
								<tr class="active" style="height: 66px;">
								<td style="height: 66px;">22:00-22:30</td>
								<td style="height: 66px;">夜宵</td>
								</tr>
								<tr class="active" style="height: 49px;">
								<td style="height: 49px;">0:00</td>
								<td style="height: 49px;">会场关闭</td>
								</tr>
								</tbody>
								</table>
								</div>
								<p>*Hackathon将于周六全天进行，现场有微软工程师的帮助和指导。</p>
								<p><strong>2016 年十月二十三日: Hackathon 继续进行</strong></p>
								<p>会场：微软亚太研发集团</p>
								<p>北京市海淀区丹棱街5号</p>
								<p>邮编：100080</p>
								<div class="table-responsive">
								<table class="table table-bordered">
								<thead>
								<tr>
								<th>
								<h5>时间</h5>
								</th>
								<th>
								<h5>环节内容</h5>
								</th>
								</tr>
								</thead>
								<tbody>
								<tr>
								<th scope="row">9:00</th>
								<td>会场开放，提供早餐</td>
								</tr>
								<tr>
								<th scope="row">9:00-12:00</th>
								<td>编写程序和应用</td>
								</tr>
								<tr class="active">
								<th scope="row">12:00</th>
								<td>午餐</td>
								</tr>
								<tr>
								<th scope="row">13:00-15:00</th>
								<td>编写程序和应用</td>
								</tr>
								<tr>
								<th scope="row">15:00</th>
								<td>完成程序和应用及提交 /<a title="DevDays Beijing Hackathon Template PDF" href="uploads/1477192078955-Hackathon Template.pdf" target="_self">Hackathon Template PDF</a>&nbsp;- <a title="Hackathon Template PPT" href="uploads/1477192118399-Hackathon Template.pptx" target="_blank">Hackathon Template PPT</a></td>
								</tr>
								<tr>
								<th scope="row">15:15 &ndash; 17:00</th>
								<td>第一轮评估参赛团队</td>
								</tr>
								<tr>
								<th scope="row">17:00-18:00</th>
								<td>参加决赛的团队向评审团展示成果</td>
								</tr>
								<tr>
								<th scope="row">18:15</th>
								<td>Hackathon 颁奖及闭幕</td>
								</tr>
								</tbody>
								</table>
								</div>`
            });
        })
        .then(function() {
            return EventTab.create({
                isPublished: true,
                tabTitle: '关于',
                tabNumber: 1,
                tabContent: `
				<a href="/beijing2016" class="btn btn-info float-right" role="button">English</a>
				<a href="http://www.aka.ms/devdaysbeijing2016"><img src="uploads/RegisterNowCN.png" style="height: 37px; margin-right: 10px;" class="float-right beijingRegistration2016Button" title="registration button" alt="registration link"></a>
				<h2>DevDays Asia 2016 @ Beijing</h2>
				<h4>10/21-10/23，2016</h4>
				<h4>中国北京市</h4>
				<h4>活动对象︰ 开发人员、 独立软件供应商、 学生、 科技创业、 企业</h4>
				<h4>费用：免费</h4>
				<p>微软Office 365与开放文档团队将在中国北京市举办 DevDays Asia 2016 @Beijing。此次北京的活动是自DevDays Asia @Taipei（<a href="http://www.prnewswire.com/news-releases/microsoft-launches-the-biggest-developer-event-in-asia-taking-iot-development-in-taiwan-to-new-heights-300253810.html">亚州最大的开发者活动</a>）以来另一次延伸性的活动。快来参加在北京微软亚太研发集团召开的技术研讨。 日期为2016年10月21日至23日。内容包括演示、现场实践与操作、互动与交流、还有hackathon! 这是一场属于开发人员的技术盛宴，我们将围绕Office 365，数据平台以及开放文档等技术话题，为您带来丰富的技术内容。您将在本次活动中聆听来自微软产品团队工程师带来的技术演讲，参与动手实验，与研发工程师直接一对一互动。您还可以带着您的Office 365项目参与48小时应用开发马拉松活动，在技术专家的指导下加速完善您的项目，更有机会赢得Windows平板电脑、无人机、VR眼镜、平衡车等精彩大礼！</p>
				<p><strong>DevDays Asia 2016</strong>活动分为两个部分： <strong>DevDays Asia 2016北京技术峰会</strong>(10月22日 9:00-17:00)以及<strong>Office 365应用开发马拉松</strong>(10月21日17:00-10月23日17:00)。您可以在注册DevDays Asia 2016北京技术峰会时选择是否参与应用开发马拉松活动。</p>
				<p class="blue-border"><span class="bg-primary">DevDays Asia 2016开发者高峰 会&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;10月22日 9:00 – 18:00</p>
				 
				<p>您将在活动中详细了解到Microsoft Office 365的广阔市场机会，以及以Office 365作为平台进行开发的技术细节。此外我们还将向您介绍微软对互操作之重视与承诺。大会技术课程将涵盖以下内容： </p>
				<ul>
					<li>内置在 Word、 Excel、PowerPoint、Outlook中的Microsoft Office 外接程序</li>
					<li>Microsoft Graph (旧称 “Office 365 统一API”) ：Microsoft Graph是访问 Microsoft 云服务中数据、商务消息、用户、文件、邮件、日历、联系人 及文件夹最轻松简易的方式。</li>
					<li>Microsoft SQL Server</li>
					<li>开放数据（OData）： 构建及使用RESTful APIs</li>
					<li>Office文件格式</li>
					<li>Office, SharePoint, or Exchange 协议</li>
					<li>Microsoft Office与数据平台的开放文档</li>
					<li>Windows 互操作</li>
					<li>Windows 协议测试组件</li>
				</ul>
				<p class="blue-border"><span class="bg-primary">Office 365 应用开发马拉松 (Hackathon)&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;10月21日 17:00 - 10月23日 17:00</p>
				<p>Office 365强劲的增长势头为ISV、企业、初创公司以及开发者都带来了无限的机会，基于Office 365构建的应用解决方案为诸多行业和场景带来了新的效率和革新。10月21日17点至10月23日17点，带上您的创意、项目和团队，参与48小时的Office 365应用开发马拉松，在现场与来自各地的开发团队同场竞技，面对面交流微软产品组技术专家，解决开发过程中遇到的问题，并在技术指导下不断加速和完善您的项目。
				我们会为您提供完善的后勤保障服务，餐食茶点、休息娱乐，以确保您能够在48小时内最大程度地完善您的项目。我们还为您准备了丰厚的奖品，以激励您的极致创意和出色的项目成果：</p>
				<img src="uploads/things-beijing-2016.png" class="centered" title="images of laptop, drone, virtual reality goggles, and scooter" alt="images of laptop, drone, virtual reality goggles, and scooter">
				<hr>
				<a href="https://www.microsoftevents.com/profile/form/index.cfm?PKformID=0x6209970001"><img src="uploads/RegisterNowCN.png" class="centered" title="现在就注册吧" alt="现在就注册吧！"></a>
				<p class="small">* 请在注册页面中选择参与应用开发马拉松选项，报名参与Office 365应用开发马拉松需先提交项目信息，具体规则将在审核后通过邮件及网站公布。</p>
				<p class="small">* 更多奖品将陆续公布，请以最终公布规则及奖励说明中的描述为准。 </p>
				<p class="small">*问题和帮助</p>

				`
            });
        })
        .then(() => {
            return EventTab.create({
                isPublished: true,
                tabTitle: 'Agenda',
                tabNumber: 1,
                tabContent: `<h4>All other times not listed below are devoted to testing</h4>
<table class="table table-responsive table-bordered">
	<thead>
		<tr>
			<th scope="col"><h5><strong>Date</strong></h5></th>
			<th scope="col"><h5><strong>Time</strong></h5></th>
			<th scope="col"><h5><strong>Session</strong></h5></th>
			<th scope="col"><h5><strong>Speaker</strong></h5></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th rowspan="4" scope="row"><h5><strong>Nov 1</strong></h5></th>
			<td>8 AM</td>	
			<td colspan="2">Event begins</td>
		</tr>
		<tr>
			<td style="overflow:hidden; white-space: nowrap;">9:30 – 10:00 AM</td>
			<td>Kick-off presentation <a href="/uploads/Welcome_and_kickoff.pptx" target="_self">Download Presentation</a></td>
			<td>Prakash Narayanan</td>
		</tr>
		<tr>
			<td style="overflow:hidden; white-space: nowrap;">11:00 – 12:00 PM</td>
			<td>RDP Test Suites: Open Source and Updates <br><a href="/uploads/Windows-Test-Suite-Open-Source.pptx" target="_self">Download Vivian Tian Presentation</a>, <a href="/uploads/RDP-Protocol-Test-Suite.pptx" target="_self">Download Jessie Liu Presentation</a></td>
			<td>Vivian Tian and Jessie Liu</td>
		</tr>
		<tr>
			<td style="overflow:hidden; white-space: nowrap;">5:30 PM</td>
			<td colspan="2">Dinner (Thai)</td>
		</tr>
		<tr>
			<th scope="row" rowspan="3"><h5><strong>Nov 2</strong></h5></th>
			<td>9:00 – 10:00 AM</td>
			<td>RDS state of the union</td>
			<td>Scott Manchester</td>
		</tr>
		<tr>
			<td style="overflow:hidden; white-space: nowrap;">11:00 – 12:00 PM</td>
			<td>USB direction, easy print, hardware redirection</td>
			<td>Ivan Mladenov</td>
		</tr>
		<tr>
			<td style="overflow:hidden; white-space: nowrap;">5:30 PM</td>
			<td colspan="2">Social event at Board Walk commons</td>
		</tr>
		<tr>
			<th scope="row" rowspan="3"><h5><strong>Nov 3</strong></h5></th>
			<td>11:00 – 12:00 PM</td>
			<td>CredSSP and What’s new in decrypting RDP traffic <br><a href="/uploads/CredSSP-Presentation.pptx" target="_self">Download Sreekanth Nadendla Presentation</a>, <br>Download Bryan Burgin Presentations<br><a href="/uploads/2013-RDP-Plugfest-On-the-Wire-UPDATED_2016_10.pptx" target="_self">RDP on the Wire</a>, <a href="/uploads/2014-RDP-Plugfest-Decryption-Using-MA-UPDATED_2016_10.pptx" target="_self">Decrypting RDP Traffic with Message Analyzer</a>, and <a href="/uploads/2014-RDP-Plugfest-MS-RDPEUSB.pptx" target="_self">USB Device Redirection</a></td>
			<td>Sreekanth Nadendla and Bryan Burgin</td>
		</tr>
		<tr>
			<td style="overflow:hidden; white-space: nowrap;">5:30 PM</td>
			<td colspan="2">Dinner (Pizza)</td>
		</tr>
		<tr>
			<td>7:00 PM</td>
			<td colspan="2">Event ends</td>
		</tr>
	</tbody>				
</table>`
            });
        })
        ////////////////////////////////////Speaker placeholder/////////////////////////////////////

    .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Michael',
                lastName: 'Bowman',
                newsletterSubscription: true,
                speakerDescription: 'Michael Bowman is a Senior Program Manager on the Microsoft Office Interoperability team. He leads the delivery and release efforts for interoperability events and test tools for the Microsoft Office Division, including SharePoint, Exchange Server, and Office. Prior to joining Microsoft, Michael spent the first part of his career in an engineering role at Hewlett Packard, focusing on developing new industry standard server technologies.<br><br>He graduated from the University of Washington with a Bachelor of Science degree in Computer Science and a Master of Business Administration degree from the Foster School of Business at the University of Washington.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 1,
                msTeamTitle: 'Senior Program Manager, Office Interoperability Team',
                showOnHomePage: true,
                headShot: 'michael-bowman-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Kwabena (K.B.)',
                lastName: 'Badu-Antwi',
                newsletterSubscription: true,
                speakerDescription: 'K.B. Badu-Antwi is a Senior Program Manager, responsible for the interoperability initiative spanning the entire Data Group (including SQL Server). He has been at Microsoft for over ten years and currently leads cross-functional domestic and international teams that are responsible for defining, delivering, and monitoring engineering/antitrust compliance and interoperability requirements. <br /><br />Prior to joining the Data Group, K.B. served as the Program Manager on the Xbox Platform team. He graduated from Seattle Pacific University with a Bachelor of Science degree in Computer Science and a Master of Science degree in Information System Management.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 2,
                msTeamTitle: 'Senior Program Manager, Cloud and Enterprise Division',
                showOnHomePage: true,
                headShot: 'kb-badu-antwi.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false

            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Prakash',
                lastName: 'Narayanan',
                newsletterSubscription: true,
                speakerDescription: 'Prakash Narayanan is a Program Manager in the Enterprise Cloud Group. He has been with Microsoft for almost ten years and works on interoperability events for partners who use Windows Protocols. He drives the coordination of those events, reimagining the future engagements and information sharing with the partners. <br /><br />Prior to this event role, Prakash was a Software Engineer across different teams in SharePoint, Microsoft Office, and Office 365 before becoming a Program Manager in the Office 365/Exchange division. In that role, he drove the engineering team\'s responsiveness to address product issues that affect the customers who run Exchange themselves or consume Office 365 from the Microsoft cloud. He graduated from the University of Kentucky with a Master of Science degree in Computer Science.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 3,
                msTeamTitle: 'Program Manager, Enterprise Cloud Group',
                showOnHomePage: false,
                headShot: 'prakash-narayanan-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Diane',
                lastName: 'Larsen',
                speakerDescription: 'Diane Larsen is a Senior Program Manager in the Enterprise Cloud Group. She has been with Microsoft since 2000, and has been working on protocol interoperability initiatives for Windows and Windows Server since 2008. Prior to this role, she wrote documentation for SQL Server, managed a content publishing team, and managed web development projects.<br /><br />Diane graduated from the University of Washington with a Bachelor of Science degree in Technical Communication. She spends as much time as possible outdoors, watches movies, takes classes, and travels to warmer places during the really rainy season.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 4,
                msTeamTitle: 'Senior Program Manager, Enterprise Cloud Group',
                headShot: 'diane-larsen-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: false,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Rich',
                lastName: 'McLain',
                newsletterSubscription: true,
                speakerDescription: 'Rich McLain is a Lead Program Manager on the Microsoft Office Interoperability team. Rich has been with Microsoft for fourteen years, and he leads the Compliance, Interoperability and Standards Program Management efforts across the Microsoft Office Division. His responsibilities include all work centering on tools, production, testing and partner engagements for Office, SharePoint, Exchange and Lync protocols as well as Microsoft Office’s engagement with the OOXML, ODF and PDF standards.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 5,
                msTeamTitle: 'Senior Lead Program Manager, Office Interoperability Team',
                showOnHomePage: true,
                headShot: 'rich-mclain-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Donny',
                lastName: 'Luu',
                newsletterSubscription: true,
                speakerDescription: 'Donny is a Software Engineering Manager on the Office Developer Experience team. He leads the development and release efforts for interoperability tools, documentation, and events for the Microsoft Office Division, including SharePoint, Exchange Server, and Office. The mission of the Developer Experience team is to provide Office 365 developers and IT admins a good on-ramp experience in developing, deploying, and migrating their solutions and documents on Office 365 releases. He strives toward uniting the Office 365 developer communities, helping them discover, learn, build, migrate, and measure the success of their applications. <br /><br />Prior to joining the Office Developer Experience team, Donny was the test director of the Microsoft Analytics and Presentation Services team where he led the testing and release efforts of Excel, PowerBI, and PowerPoint. In earlier Office releases, Donny was the software test manager for the Office Programmability team where he led the integration, testing, and release of VBA, COM-Addin, and PIA. He graduated from the University of Washington with a Bachelor of Science degree in Computer Science and Engineering.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 6,
                msTeamTitle: 'Principal Software Engineer Manager',
                showOnHomePage: true,
                headShot: 'donny-luu-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Bailey',
                lastName: 'Chauner',
                newsletterSubscription: true,
                speakerDescription: 'Bailey Chauner is the new Event Coordinator for the Office Interoperability team. Bailey graduated from the University of Montana with a Bachelor of Science degree in Marketing and a Minor in Media Arts. She chose to begin her career in Seattle because of the balance between startups, established companies, and her love for the Northwest. <br /><br />Bailey grew up in Montana enjoying the small town life, spending days on the lake, and skiing.  In her free time, she enjoys playing tennis, blogging, and finding new places to eat.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 7,
                msTeamTitle: 'Event Coordinator',
                showOnHomePage: true,
                headShot: 'bailey-chauner-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Andrew',
                lastName: 'Davidoff',
                newsletterSubscription: true,
                speakerDescription: 'Andrew Davidoff is a Senior Software Test Engineer on the Microsoft Office Interoperability team. He drives Interoperability testing and Test Suites across the Exchange family of Open Specifications and other Office Open Specifications. <br /><br />Prior to joining Office Interoperability team, Andrew has served in the event role  of Senior Test Engineer and Senior Test Lead on the Exchange team at Microsoft. He was responsible for testing major components of Exchange Server for a number of releases. He graduated from the Moscow Aviation Institute, Russia with a bachelor’s degree in Computer Science.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 8,
                msTeamTitle: 'Senior Software Test Engineer, Office Interoperability Team',
                showOnHomePage: true,
                headShot: 'andrew-davidoff-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Jinghui',
                lastName: 'Zhang',
                newsletterSubscription: true,
                speakerDescription: 'Jinghui Zhang is a Software Engineer on the Microsoft Office Extensibility team. She is a developer of dev.office.com and graph.microsoft.io. She also drives the development for the new Office Add-ins, SharePoint and Exchange Test Suites, and Office Open XML and Uniform Office Format interoperability tools.<br /><br />She gives talks on Office Add-in, Protocol Test Suites, and more at the Microsoft Interop events. She also participates in the hack sessions that lead developers to reach their hack success. Her favorite part of the events is the brainstorm and hack session. <br /><br />She graduated from Beijing University of Aeronautics & Astronautics, China with a bachelor’s degree in Information Management and Information Systems.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 9,
                msTeamTitle: 'Software Engineer, Office Extensibility Team, Microsoft Corporation',
                showOnHomePage: false,
                headShot: 'jinghui-zhang-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Pui',
                lastName: 'Leung',
                newsletterSubscription: true,
                speakerDescription: 'Pui Leung is a Software Engineer on the Microsoft Office Extensibility team. He is responsible for Interoperability test suites and test tools development and release testing for the Microsoft Office Division, including SharePoint, Exchange Server, and Office.<br /><br />Prior to joining Microsoft, Pui worked as a System Software Engineer on the latest types of software projects, including Windows kernel device driver and server management software at Compaq and Hewlett Packard. He graduated from Oregon State University with a Bachelor of Science degree in Computer Science.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                meetTheTeamPageOrder: 10,
                msTeamTitle: 'Software Engineer, Office Extensibility Team',
                showOnHomePage: true,
                headShot: 'pui-leung-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Tom',
                lastName: 'Jebo',
                newsletterSubscription: true,
                speakerDescription: 'Tom Jebo is a Senior Escalation Engineer on the Microsoft Developer Support Open Specifications team. His primary responsibilities are helping customers implement solutions using WOPI, Exchange RPC/MAPI, ActiveSync, Web Services, Lync/Skype protocols, and Office Open XML and binary formats. Before joining the Open Specifications team, Tom helped customers with Microsoft\'s developer tools, C/C++ languages and COM technologies.<br /><br />Before Microsoft, Tom developed architectural simulation software at Amdhal Corporation in Sunnyvale, California. Tom graduated from Boston University with a bachelor’s degree in Computer Science and currently lives in Seattle Washington.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 11,
                msTeamTitle: 'Senior Escalation Engineer, Developer Support Open Specifications Team',
                showOnHomePage: true,
                headShot: 'tom-jebo-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Jingyu',
                lastName: 'Shao',
                newsletterSubscription: true,
                speakerDescription: 'Jingyu Shao is a Software Engineer on the Microsoft Office Extensibility team. She works as a web developer for the Office developer portal: dev.office.com and Microsoft Graph portal: graph.microsoft.io. Jingyu has also developed several Office Add-ins with the new Office JavaScript API. In addition, she drives the development of interoperability tools, such as Fiddler Inspectors which parses Exchange, SharePoint, and WOPI online traffic. <br /><br />Jingyu graduated from Zhejiang University China with a master’s degree in Electronic Information Engineering.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 12,
                msTeamTitle: 'Software Engineer, Office Extensibility Team',
                showOnHomePage: false,
                headShot: 'jingyu-shao-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Jinlin',
                lastName: 'Xu',
                newsletterSubscription: true,
                speakerDescription: 'Jinlin Xu is a Software Engineer on the Microsoft Office Interoperability team. He is responsible for Interoperability tool development and fixes the Interoperability document issues of SharePoint Server, Lync Server and Exchange Server. <br /><br />Prior to joining Microsoft, Jinlin spent one year as a Network Engineer at Huawei focusing on developing software on city routers, and two years as a Software Test Engineer focusing on Lync Server test suites development. He graduated from Nankai University with a bachelor’s degree in Computer Science.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 13,
                msTeamTitle: 'Software Engineer, Office Extensibility Team',
                showOnHomePage: false,
                headShot: 'jinlin-xu-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Christine',
                lastName: 'Huang',
                newsletterSubscription: true,
                speakerDescription: 'Christine Huang is a Principal Test Manager on the Microsoft Windows Server and Cloud Interoperability team. She manages the Microsoft Windows Server Interoperability team in China and owns the development and release efforts of test tools for interoperability events for Microsoft Windows Server Division. <br /><br />Prior to joining the Windows Server team, Christine worked in an event role as a Senior Engineer and Manager across several Microsoft products, including Bing and Office. Prior to joining Microsoft, she worked as a Senior Software Developer in the industry. She earned a bachelor’s degree in Business Administration from National Taiwan University, and a master’s degree in Computer Science from Georgia State University.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 14,
                msTeamTitle: 'Principal Test Manager, Windows Server Interoperability & Tools',
                showOnHomePage: false,
                headShot: 'christine-huang.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Tarun',
                lastName: 'Chopra',
                newsletterSubscription: true,
                speakerDescription: 'Tarun Chopra is a presently a Senior Escalation Engineer on the Microsoft Office Developer Support Open Specifications team. His primary responsibilities include helping customers implement solutions using WOPI, Exchange RPC/MAPI, ActiveSync, Web Services, Lync/Skype protocols, and Office Open XML and binary formats. Before joining Office Open Specifications team, Tarun played a vital role in helping customers to implement Windows protocols. He represented Microsoft at several Plugfest/Interop global events. Authentication, LYNC/RDP, File Sharing protocols are some of his strengths.<br /><br />Prior to Microsoft, Tarun worked as a Development Lead in Developing Test Suites for Validation of Windows Open Specification and has vast experience in developing distributed systems. He played a key role in developing Parking Management Solutions for a Japanese firm and Verification of Ticketing System for Japanese Rail Network. He received a bachelor’s degree in Electronics and Telecommunication from a university in India.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 15,
                msTeamTitle: 'Senior Escalation Engineer, Office Developer Support Open Specifications Team',
                showOnHomePage: false,
                headShot: 'tarun-chopra-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Tom',
                lastName: 'Devey',
                newsletterSubscription: true,
                speakerDescription: 'Tom Devey is a Supportability Program Manager on the Microsoft Windows Interoperability team. He leads the Windows Open Specification Partner support and events. Events that include Windows Protocol Plugfests are delivered at Microsoft regularly to Microsoft partners who implement Active Directory, File Sharing and Remote Desktop, and other Microsoft protocols. <br /><br />Prior to joining the Windows Interoperability team, Tom served in a similar event role in the Microsoft Office division, working with partners who developed Exchange, SharePoint, Open XML, and the Office Binary formats solutions.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 16,
                msTeamTitle: 'Escalation Engineer, Open Specification Support Team',
                showOnHomePage: false,
                headShot: 'tom-devey-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Hector',
                lastName: 'Sandino',
                newsletterSubscription: true,
                speakerDescription: 'Hector Sandino is a Quality Assurance Manager in the Microsoft Office Interoperability team. He leads the development and release efforts for interoperability test tools and events for the Microsoft Office Division, including SharePoint, Exchange Server, and Office. <br /><br />Prior to joining the Office Interoperability team, Hector worked as a Software Developer Engineer across several products of the Microsoft Office brand, including: Outlook, PowerPoint, Visio, Excel, and Word. He graduated from the Pontificia Universidad Javeriana with a Bachelor of Science degree in Industrial Engineering and a Master of Science degree in Industrial Engineering from the University of Puerto Rico.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Quality Assurance Manager, Office Interoperability Team',
                showOnHomePage: false,
                headShot: 'hector-sandino-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Bryan S.',
                lastName: 'Burgin',
                newsletterSubscription: true,
                speakerDescription: 'Bryan Burgin is a Senior Escalation Engineer, responsible for support of Microsoft’s open specifications (protocol documents). He primarily works with third-party protocol implementers to address questions and issues related to the open specifications and to champion interoperability with Microsoft platforms. He works extensively with the RDP/RDS and File sharing (SMB2&3) protocol groups and along with his team, supports 500+ on-the-wire Windows protocols. He has been in this event role for three years and at Microsoft for thirteen. <br /><br />Prior to this event role, Bryan supported Kernel driver developers, specializing in network (NDIS) driver development. Prior to joining Microsoft, Bryan spent many years developing products that integrated Wang VS minicomputers with PC networks (terminal emulation, file system redirection, and print redirection).',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 17,
                msTeamTitle: 'Senior Escalation Engineer, Developer Support, Open Specifications/Protocols/Interoperability',
                showOnHomePage: false,
                headShot: 'bryan-burgin-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Feng',
                lastName: 'Han',
                newsletterSubscription: true,
                speakerDescription: 'Feng Han is a Software Engineer on Windows Server Interoperability & Tools team in Shanghai, China. He has worked on the development and support of test tools for Windows interoperability for four years, especially on the Remote Desktop Protocol family.<br /><br />He graduated from Zhejiang University with a bachelor’s degree and graduated from Shanghai Jiao Tong University with a master’s degree in Software Engineering. Prior to joining Microsoft, Feng worked as a Software Development Engineer for three years at a startup company.<br /><br />His role in Interop events is to present and support synthetic test suites, and helping partners to use these test tools to identity their product issues.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 18,
                msTeamTitle: 'Software Engineer, Windows Server Interoperability & Tools Team, Microsoft (China) Corporation',
                showOnHomePage: false,
                headShot: 'feng-han-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Guozhao',
                lastName: 'Wu',
                newsletterSubscription: true,
                speakerDescription: 'Guozhao Wu is a Software Test Engineer in the Microsoft Office Interoperability team. He drives Test Suites development across the Exchange family of Open Specification and Interoperability tool development for Office OPN parsers. <br /><br />Prior to joining Microsoft, Guozhao worked as a Software Development Engineer in Hangzhou Tiantu focusing on developing System for Highway Emergency. He graduated from the Zhejiang University with bachelor\'s degree & master\'s degree in Software Engineering.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Software Engineer in Test, Office Interoperability Team',
                showOnHomePage: false,
                headShot: 'guozhao-wu-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Obaid',
                lastName: 'Farooqi',
                newsletterSubscription: true,
                speakerDescription: 'Obaid Farooqi is an Escalation Engineer on the Microsoft Developer Support, Open Specifications/Protocols/Interoperability team. <br /><br />Obaid is responsible for the support of Microsoft Open Specifications (protocol documentation). He earned a Master of Computer Science degree from University of Texas at Arlington. He primarily works with third-party protocol implementers to address questions and issues related to the open specifications. He works extensively with the Authentication, File sharing (SMB2&3) and Mobile Device Management (MDM) protocols, but is capable of supporting any of the 500+ on-the-wire Windows protocols. He has been in this event role for six years at Microsoft and in the telecommunications industry as a developer for twelve years.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 19,
                msTeamTitle: 'Escalation Engineer, Developer Support',
                showOnHomePage: false,
                headShot: 'obaid-farooqi-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Guqing',
                lastName: 'Fang',
                newsletterSubscription: true,
                speakerDescription: 'Guqing Fang is a Software Development Engineer in Test on the Microsoft Windows Server and Cloud Interoperability team in Shanghai, China. He owns the development and support efforts for the Remote Desktop Protocol family and Mobile Device Management test suites for Microsoft Windows Server Division. <br /><br />Prior to joining the team in Shanghai, Guqing worked as a Software Development Engineer in Test for five years, focusing on testing the model based testing tool Spec Explorer. Guqing graduated from Zhejiang University in Hangzhou, China with a bachelor’s degree in Instrument Engineering.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 20,
                msTeamTitle: 'Software Development Engineer in Test, Windows Server Interoperability Team',
                showOnHomePage: false,
                headShot: 'guqing-fang-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Mai-Ing',
                lastName: 'Cheng',
                newsletterSubscription: true,
                speakerDescription: 'Mai-Ing Cheng is a Senior Program Manager Lead in the Microsoft Windows Server and Cloud Interoperability team. She manages and owns the Microsoft Windows Protocol Compliance related efforts.  She also manages the delivery and release efforts for Spec Explorer. She is also involved in managing in the area of specification languages, compilers, and message monitor and analyzer for interoperability technologies. <br /><br />Prior to joining Microsoft, Mai-Ing was a Research Engineer at RR Donnelley focusing on developing software solution for real-time digital commercial letiable printing. She also worked as Senior Software Engineer at a Network company focusing developing firmware for network devices. She graduated from Feng Chia University, Taiwan with bachelor\'s degree in Business Administration and a master\'s degree Computer Science from DePaul University.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Principal Program Manager Lead, Windows Server Interoperability Team',
                showOnHomePage: false,
                headShot: 'mai-ing-cheng-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Yuqing',
                lastName: 'Zhao',
                newsletterSubscription: true,
                speakerDescription: 'Yuqing Zhao is a Software Development Engineer in Test in the Microsoft Windows Server and Cloud Interoperability team in Shanghai, China. He owns the development and support efforts for Identity protocol family and OMI test suites for Microsoft Windows Server Division. <br /><br />Prior to joining the team in Shanghai, Yuqing worked as a Software Development Engineer for 4 years, focusing on SaaS development and protocol engineering. Yuqing graduated from Nanjing University of Postage and Telecommunications, Nanjing China, with a bachelor\'s degree in Information Engineering.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Software Development Engineer in Test, Windows Server Interoperability Team',
                showOnHomePage: false,
                headShot: 'yuqing-zhao-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Michelle',
                lastName: 'Hammond',
                newsletterSubscription: true,
                speakerDescription: 'Michelle has been involved in technical communication and developer community support for more than 20 years. The teams and projects she has been a part of at Microsoft during that time include the TechNet and MSDN feedback teams, the TechNet webcast program, content management for major Microsoft developer conferences, and extensive technical editing work on a wide range of topics. She has been part of the Office Interoperability team for nearly six years, first as a programmer writer and most recently as a release coordinator covering Open Specifications for Office, SharePoint, Exchange, and Skype for Business. Michelle is also an avid and passionate supporter of video games as a medium for artistic expression, social commentary, and powerful storytelling.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Release Manager, Office Content Team',
                showOnHomePage: false,
                headShot: 'michelle-hammond-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'David',
                lastName: 'Robinson',
                msTeamTitle: 'Principal Group SW Eng Mgr',
                speakerDescription: 'David Robinson is the Director of Engineering for Cortina Intelligence China within Cloud and Enterprise Computing. He is responsible for the global Azure Data Movement services, SSIS, and OData protocols. David Robinson relocated from the United States to Shanghai, China and has spoken at previous Microsoft Interoperability Events.',
                headShot: 'darobins.jpg',
                showOnMeetTheTeamPage: false,
                eventRole: 'speaker'
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Congyong',
                lastName: 'Su',
                msTeamTitle: 'Senior Software Eng Mgr',
                headShot: 'cysu.jpg',
                eventRole: 'speaker'
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Baoming',
                lastName: 'Yu',
                msTeamTitle: '',
                headShot: '',
                eventRole: 'speaker'
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Layla',
                lastName: 'Liu',
                msTeamTitle: 'Software Engineer II ',
                headShot: '',
                eventRole: 'speaker'
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Dong',
                lastName: 'Liu',
                msTeamTitle: 'Software Engineer',
                headShot: 'doliu.jpg',
                eventRole: 'speaker'
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Challen',
                lastName: 'He',
                msTeamTitle: 'Software Engineer II ',
                headShot: '',
                eventRole: 'speaker'
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Ted',
                lastName: 'Way',
                newsletterSubscription: true,
                speakerDescription: 'Ted Way is a Program Manager on the Azure Machine Learning engineering team.  The Azure Machine Learning service enables you to quickly create a predictive model and use it in production.  He focuses on insights derived from telemetry and metrics from the service, and he also works on enabling BI analysts to go from hindsight to foresight by integrating Excel, Power BI, and other tools with Azure ML web services.  He received BS degrees in electrical engineering and computer engineering, MS degrees in electrical engineering and biomedical engineering, and a PhD in biomedical engineering, all from the University of Michigan – Ann Arbor.  His PhD dissertation was on "spell check for radiologists," a computer-aided diagnosis (CAD) system that uses image processing and machine learning to estimate lung cancer malignancy on chest CT scans.  Ted was born in Taiwan, grew up in Arizona, and went to high school in Hsin-chu.  While working for Microsoft, he took a leave of absence to fulfill his military service requirement, serving as an Alternative Military Serviceman at the Ministry of Foreign Affairs (MOFA) from 2010-2011.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: ' Program Manager, Azure Machine Learning Engineering Team',
                showOnHomePage: false,
                headShot: 'ted-way-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Darwin',
                lastName: 'Schweitzer',
                newsletterSubscription: true,
                speakerDescription: 'Darwin is a Senior Program Manager at Microsoft focused on Cortana Analytics, Big Data, and Data Science tools and education.  He is part of the Algorithms and Data Science group in Information Management and Machine Learning.  His data experience has been gained through a number of diverse roles at Microsoft as well as at other technology companies like IBM and Business Objects.  Roles have included program manager, instructor, practitioner, data architect, technical lead, consultant, and teaching assistant and he has worked for companies in a letiety of industries (technology, healthcare, financial services, insurance, pharmaceuticals, travel, education, non-profit, and utilities) including local Pacific Northwest organizations like the University of Washington, Washington Mutual, Expedia, and Snohomish County PUD.  The one commonality in his career has been Data and Education.  Darwin is an aspiring Data Engineer/Data Scientist and dedicated lifelong learner who contributes to continuing education as a <a href="https://na01.safelinks.protection.outlook.com/?url=http%3a%2f%2fwww.pce.uw.edu%2fcertificates%2fcloud-data-management-analytics.html&data=01%7c01%7cdarsch%40microsoft.com%7cd7779071e89248487b7508d2c618fd40%7c72f988bf86f141af91ab2d7cd011db47%7c1&sdata=cYAHBivwx5vMq95E5iA1Lw9nNaf7IOJKEnXnDaJATGA%3d">Cloud Data Management & Analytics</a> instructor at the University of Washington and as a volunteer teaching assistant at Henry M. Jackson High School in Millcreek, WA where he helps students learn Java and prepare for the AP Computer Science exam  <a href="http://tealsk12.org">http://tealsk12.org</a> .  In his spare time he likes to travel, hike, read (technology or books about US Presidents), listen to Blues and Jazz, and enjoy an occasional round of golf.  Darwin hopes to help drive Big Data and Data Science education and increase the broad adoption of Data Science products and services like Cortana Analytics and build Data Science community.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Senior Program Manager',
                showOnHomePage: false,
                headShot: 'darwin-schweitzer-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Seth',
                lastName: 'Mottaghinejad',
                newsletterSubscription: false,
                speakerDescription: 'Seth is a data scientist with the Azure Machine Learning team at Microsoft, where his primary focus is on Microsoft R Server and its integration with other Microsoft products.  Prior to joining Microsoft, Seth worked as a consultant at Revolution Analytics, an big data platform for analytics using the R programming language.  In his consulting role, Seth helped customers replace their legacy analytics products (such as SAS) with R, integrate R with Hadoop or other distributed platforms, and develop R products or optimize their performance.  He joined Microsoft in 2015 when Microsoft acquired Revolution Analytics, opening the way for MRS (Microsoft R Server).  Seth also worked at American Express and Saks Fifth Avenue, primarily in marketing analytics and retail analytics roles.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Data Scientist',
                showOnHomePage: false,
                headShot: 'seth-mottaghinejad-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: true,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Mark',
                lastName: 'Stafford',
                speakerDescription: 'Mark Stafford is a Program Manager at Microsoft contributing to the future of the OData protocol. Mark has a unique perspective on data access technologies given his many years of pre-Microsoft experience building and deploying real-world applications, managing developers and directing a business intelligence team.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: true,
                meetTheTeamPageOrder: 21,
                msTeamTitle: 'Principal PM Manager ',
                showOnHomePage: false,
                headShot: 'mark-stafford-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: false,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Jamie',
                lastName: 'Olson',
                speakerDescription: 'Jamie Olson is a Senior Data Scientist at Microsoft, where he works with customers and partners to build advanced analytics application, designing and developing end-to-end data pipelines across the entire range of Cortana Analytics products.  He has more than 10 years of experience with the R programming language, the last four of which have focused on using R inside Big Data platforms like Hadoop. Jamie’s expertise in computer science, machine learning and big data allows customers to quickly and easily transition and scale their advanced analytics projects with Microsoft technologies.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Senior Data Scientist',
                showOnHomePage: false,
                headShot: 'jaime-olson.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: false,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Vivek',
                lastName: 'Gupta',
                speakerDescription: 'Vivek Gupta is a Senior Data Scientist at Microsoft. He works with customers to understand their analytical business problems and how to use the Cortana Intelligence Suite to help solve them. Most recently, Vivek was part of Nokia’s Smart Devices division where he worked on applying data analytics solution to problems in the areas of understanding user behavior around location information, photography and application usage. Prior to joining Nokia, Vivek worked in a variety of industries designing and building backend services.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Senior Data Scientist',
                showOnHomePage: false,
                headShot: 'vivek-gupta.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: false,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Tristan',
                lastName: 'Davis',
                speakerDescription: 'Tristan Davis is the Group Program Manager of the APIs & Extensions team within Office Extensibility. His team is responsible for improvements to the Office 365 APIs, the new Apps for Office client extensibility model, as well as all existing flavors of Office programmability. Prior to joining the team, he was a member of the Word program management team from Office 2003 through Office 2013.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Group Program Manager',
                showOnHomePage: false,
                headShot: 'Tristan-Davis.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: false,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Jos',
                lastName: ' de Bruijn',
                speakerDescription: 'Jos de Bruijn is a Senior Program Manager in the Database Systems team. He works on in-memory technologies in SQL Server. His main focus is on query processing, programmability, and transaction semantics. In a previous life, he obtained a PhD in knowledge representation and semantic web technology, and worked in academia for several years as an assistant professor.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Senior Program Manager, Database Systems Team',
                showOnHomePage: false,
                headShot: 'jodebrui-photo-web.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: false,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Kevin',
                lastName: 'Farlee',
                speakerDescription: 'Kevin Farlee has over 30 years in the industry, in both database as well as storage management software. In his current role as a Senior Program Manager on the Microsoft SQL Server team, he is responsible for the SQL Server High Availability roadmap, as well as the high performance OLTP and Analytics features within the SQL Server product.',
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Senior Program Manager, SQL Server Team',
                showOnHomePage: false,
                headShot: 'kevin-farlee-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: false,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Lu',
                lastName: 'Chen',
                speakerDescription: `<p>Lu Chen is a Software Engineer on Windows Server Interoperability & Tools team in Shanghai, China. She has worked on the development and support of test tools for Windows interoperability, specifically on the File Server Protocol family and BranchCache Protocol family. She has joined several interoperability events, supporting synthetic test suites and helping partners to use Windows test tools to identify their product issues.</p>
				<p>She graduated from Shanghai TongJi University with a master’s degree in Software Engineering. Prior to joining Microsoft as a full-time employee, Lu worked as an intern on the Microsoft’s System Center 				Atlanta team.</p>`,
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Software Engineer, Windows Server Interoperability & Tools Team, Microsoft (China) Corporation',
                showOnHomePage: false,
                headShot: 'lu-chen-headshot.jpg',
                company: 'Microsoft',
                country: 'China',
                allowNotifications: false,
                allowPersonalInfoSharing: false

            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Sam',
                lastName: 'Xu',
                speakerDescription: `<p>Sam Xu is a Software Engineer II from OData Team & SSIS Team in Shanghai, China. He has been working on the design and the development of implementation for OData V4 spec, especially on the Web API OData for three years. Before joining the OData Shanghai team, Sam had worked as a Software Engineer II in the Commerce group for half a year and focused on the Mobile Phone pay. Prior to Microsoft, Sam had developed Location Based Service (LBS) software at Telenav Corp for three years. </p>
					<p>He graduated from Northwestern Polytechnical University with a master’s degree in Aeronautics and Astronautics Manufacturing Engineering and from Shanghai JiaoTong University with a doctor’s degree in Automotive Engineering.</p>`,
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Software Engineer II, OData Team & SSIS Team, Microsoft (China) Corporation',
                showOnHomePage: false,
                headShot: 'sam-xu-headshot-2016-09-29.jpg',
                company: 'Microsoft',
                country: 'China',
                allowNotifications: false,
                allowPersonalInfoSharing: false

            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Arthur',
                lastName: 'Jin',
                speakerDescription: `<p>Arthur Jin is a Principle Program Manager on the Office 365 team. He leads the effort of landing Office 365 services and features in China, focusing on feature development and development planning and implementation. Arthur has worked at Microsoft for twenty years, covering many product and services including Windows, Office and MSN. Prior to Microsoft, Arthur worked at two other software companies developing business software. Arthur has a master’s degree from Bowling Green State University in Ohio with a focus in technical communication and computer science.</p>`,
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Principal Program Manager for Office 365',
                showOnHomePage: false,
                headShot: 'arthur-jin-headshot-2.jpg',
                company: 'Microsoft',
                country: 'China',
                allowNotifications: false,
                allowPersonalInfoSharing: false

            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Raymond',
                lastName: 'Xue',
                speakerDescription: `<p>Raymond is a Principal Software Engineering Manager on the Office China Incubation team. His team focuses on promoting Microsoft productivity services (Office 365) to the Chinese customers through local social network platform such as WeChat. Applications developed by Raymond’s team involve using a wide variety of Office 365 API, Microsoft Graph API, OneDrive for Business, AAD. Raymond has worked at Microsoft for more than fifteen years. Before the current project, he has worked on other products including Visual Studio, Ads Platform, Lync and Skype for Business. He graduated from the University of Auckland (New Zealand) with a master’s degree in computer engineering.</p>`,
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Principal Software Engineering Manager',
                showOnHomePage: false,
                headShot: 'raymond-xue-headshot.jpg',
                company: 'Microsoft',
                country: 'China',
                allowNotifications: false,
                allowPersonalInfoSharing: false
            });
        })
        .then(function() {
            return Speaker.create({
                isPublished: true,
                firstName: 'Jim',
                lastName: 'Maurer',
                speakerDescription: `<p>Jim is a Principal Manager leading the Open Specifications documentation, delivery, and release efforts for interoperability with Windows, Windows Server, and SQL Server.  Jim has worked in various engineering and customer support management roles for the past ten years.  Before joining Microsoft he held senior and executive positions related to electric power systems control, aircraft heavy maintenance, and governmental reengineering projects.</p>
				<p>Jim graduated with an electrical engineering degree from the University of Idaho with specializations in electronics and computer architecture.</p>`,
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Director Content Publishing, Interop and Protocols',
                showOnHomePage: false,
                headShot: 'jim-maurer-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: false,
                allowPersonalInfoSharing: false
            });
        })
        .then(() => {
            return Speaker.create({
                isPublished: true,
                firstName: 'Jonathan',
                lastName: 'Tang',
                speakerDescription: `<p>Jonathan joined Microsoft in Redmond in 2002 from Silicon Valley and worked in various groups including Visual Studio, Microsoft Business Solutions, and Office.  Relocated back to Microsoft Beijing in 2013, Johnathan is currently the Principal Group Engineer Manager for the Office Ecosystem team. His team mainly focuses on making the Office Extensibility an open platform, so ISVs and developers can extend Office everywhere to consume Office 365 services.</p>`,
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Principal Group Engineer Manager, Office',
                showOnHomePage: false,
                headShot: 'jontang-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: false,
                allowPersonalInfoSharing: false
            });
        })
        .then(() => {
            return Speaker.create({
                isPublished: true,
                firstName: 'Wenbo',
                lastName: 'Shi',
                speakerDescription: `<p>Wenbo Shi is a Principal Software Engineering Manager in Office Ecosystem team, leading the Office Online API and features development effort to enable Office developers to provide their solutions via Office add-ins. Wenbo has worked at Microsoft for eight years as engineering manager for various projects in Lync, Skype and Office. Prior to joining Microsoft, Wenbo has worked at VMware and Oracle for many years leading software engineering effort.</p>
				<p>Wenbo graduated with an electrical engineering master degree from Xi’an Jiaotong University (China).</p>`,
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Principal Software Engineering Manager',
                showOnHomePage: false,
                headShot: 'wenbo-shi-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: false,
                allowPersonalInfoSharing: false
            });
        })
        .then(() => {
            return Speaker.create({
                isPublished: true,
                firstName: 'Yihua',
                lastName: 'Xiong',
                speakerDescription: `<p>Yihua has worked in Microsoft’s Office Division for more than 10 years in Redmond, Washington. He is a Senior Software Engineer working now on the Office Extensibility Platform projects.  In the past a few years, Yihua has made major contributions to the Web Add-ins in Word.  Before that, he worked on various projects such as Word Office Art Graphics, PDF/XPS, Word Arts Fonts, Publisher, and VBA enhancement.</p>
				<p>Before joining Microsoft, Yihua worked in the avionics industry in the Seattle area. He graduated from the University of Washington Graduate School.</p>`,
                eventRole: 'speaker',
                showOnMeetTheTeamPage: false,
                msTeamTitle: 'Principal Software Engineer',
                showOnHomePage: false,
                headShot: 'yihua-xiong-headshot.jpg',
                company: 'Microsoft',
                country: 'USA',
                allowNotifications: false,
                allowPersonalInfoSharing: false
            });
        });
};