'use strict';

var Sql = require('sequelize');
/*var sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
var sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  }
});

var fs = require('fs');
var path = require('path');

var Contact = module.exports = sql.define('Contact', {
  firstName: Sql.STRING,
  lastName: Sql.STRING,
  email: {
    type: Sql.STRING,
    // unique: true,
    validate: {
      isEmail: true
    }
  },
  newsletterSubscription: Sql.BOOLEAN,
  contactDescription: Sql.TEXT,
  msTeamMember: Sql.BOOLEAN,
  msTeamTitle: Sql.STRING,
  showOnHomePage: Sql.BOOLEAN,
  headShot: Sql.TEXT,
  company: Sql.STRING,
  address: Sql.STRING,
  country: Sql.STRING,
  interestId: Sql.INTEGER,
  allowNotifications: Sql.BOOLEAN,
  allowPersonalInfoSharing: Sql.BOOLEAN
},
{
  getterMethods   : {
    divId: function () {
      var theDate = new Date();
      if (!this.firstName && !this.lastName) {
        this.firstName = '';
      }
      if (!this.lastName) {
        this.lastName = '';
      }
      return this.firstName.toLowerCase() + '-' + this.lastName.toLowerCase() + '-' + Date.parse(theDate);
    }
  },

  setterMethods   : {
    /*fullName: function(value) {
      console.log(  'VALUE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  ', value);
        var names = value.split('-');
        this.setDataValue('firstName', names.slice(0, -1).join(' '));
        this.setDataValue('lastName', names.slice(-1).join(' '));
    }*/
  }
});

// Contact.sync({force: false});

// create table if it doesn't already exist ```({force: true})``` will cause the table to be deleted and created regardless of if it exists already

// Table created
Contact.sync({force: true})
.then(function () {
  console.log(sql.databaseVersion());
})
.then(function () {
  return Contact.create({
    firstName: 'Michael',
    lastName: 'Bowman',
    newsletterSubscription: true,
    contactDescription: 'Michael Bowman is a Program Manager in the Microsoft Office Interoperability team. He leads the delivery and release efforts for interoperability events and test tools for the Microsoft Office Division, including SharePoint, Exchange Server, and Office.Prior to joining Microsoft, Michael spent the first part of his career in an engineering eventRole at Hewlett Packard focusing on developing new industry standard server technologies.  <br /><br />He graduated from the University of Washington with a Bachelor’s of Science degree in Computer Science and a Masters of Business Administration from the Foster School of Business at the University of Washington.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Senior Program Manager, Office Interoperability Team',
    showOnHomePage: true,
    headShot: 'michael-bowman-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Kwabena (K.B.)',
    lastName: 'Badu-Antwi',
    newsletterSubscription: true,
    contactDescription: 'KB Badu-Antwi is Senior Program Manager responsible for the interoperability initiative spanning the entire Data Group (including SQL Server). He has been at Microsoft for over 10 years and currently leads cross-functional domestic and international teams responsible for defining, delivering, and monitoring engineering/antitrust compliance and interoperability requirements. <br />Prior to joining the Data Group, KB served in the of Program Manager on the Xbox Platform team. He graduated from Seattle Pacific University with a Bachelor’s of Science degree in Computer Science and a Master’s of Science degree in Information System Management.',
    eventRole: 'speaker',
    msTeamMember: true,
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
  return Contact.create({
  firstName: 'Prakash',
  lastName: 'Narayanan',
  newsletterSubscription: true,
  contactDescription: 'Prakash Narayanan is a Program Manager in the Enterprise Cloud Group Project Engineering Team. He has been with Microsoft almost 10 years and works on interoperability events for the partners using Windows Protocols, driving the coordination of those events and reimagining the future engagements and information sharing with the partners.<br /><br />Prior to this event role, Prakash was a Software Engineer across different teams in SharePoint, Microsoft Office and Office 365 before transitioning into a Program Manager in the Office 365/Exchange division where he drove the engineering team\'s responsiveness to address product issues affecting the customers who run Exchange themselves or consume Office 365 from the Microsoft cloud. He graduated from University of Kentucky with a Master\'s of Science degree in Computer Science.',
  eventRole: 'speaker',
  msTeamMember: true,
  msTeamTitle: 'Program Manager, Enterprise Cloud Group Project Engineering Team',
  showOnHomePage: false,
  headShot: 'prakash-narayanan-headshot.jpg',
  company: 'Microsoft',
  country: 'USA',
  allowNotifications: true,
  allowPersonalInfoSharing: false
  })
})
.then(function () {
  return Contact.create({
    firstName: 'Rich',
    lastName: 'McLain',
    newsletterSubscription: true,
    contactDescription: 'Rich McLain is a Lead Program Manager in the Microsoft Office Interoperability team. Rich has been with Microsoft for 14 years, and he leads the Compliance, Interoperability and Standards Program Management efforts across the Microsoft Office Division. Responsibilities include all work centering on tools, production, testing and partner engagements for Office, SharePoint, Exchange and Lync protocols as well as Microsoft Office’s engagement with the OOXML, ODF and PDF standards.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Senior Lead Program Manager, Office Interoperability Team',
    showOnHomePage: true,
    headShot: 'rich-mclain-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Donny',
    lastName: 'Luu',
    newsletterSubscription: true,
    contactDescription: 'Donny is the software engineering manager of the Office Developer Experience team. He leads the development and release efforts for interoperability tools, documentation, and events for the Microsoft Office Division, including SharePoint, Exchange Server, and Office. The mission of the Developer Experience team is to provide Office365 developers and IT admins a good on ramp experience in developing, deploying, and migrating their solutions and documents on Office365 releases.  Our goals are to unite the Office365 developer communities where they can discover, learn, build, migrate, and measure the success of their applications.<br /><br />Prior to joining the Office Developer Experience team, Donny was the test director of the Microsoft Analytics and Presentation Services team where he leaded the testing and release efforts of Excel, PowerBI, and PowerPoint. In earlier Office releases, Donny was the software test manager for the Office Programmability team where he leaded the integration, testing, and release of VBA, COM-Addin, and PIA. He graduated from the University of Washington with a Bachelor of Science degree in Computer Science and Engineering.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Software Engineering Manager, Office Developer Experience Team',
    showOnHomePage: true,
    headShot: 'donny-luu-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Bailey',
    lastName: 'Chauner',
    newsletterSubscription: true,
    contactDescription: 'Bailey Chauner is the new Event Coordinator for the Office Interoperability team. Bailey graduated from the University of Montana with a Bachelor’s of Science degree in Marketing and a minor in Media Arts. She chose to begin her career in Seattle because of the balance between startups, established companies, and her love for the Northwest. <br /><br />Bailey grew up in Montana with her skiing, spending days on the lake, and enjoying small town life. In her free time, she enjoys playing tennis, blogging, and finding new places to eat.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Event Coordinator',
    showOnHomePage: true,
    headShot: 'bailey-chauner-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Andrew',
    lastName: 'Davidoff',
    newsletterSubscription: true,
    contactDescription: 'Andrew Davidoff is a Senior Software Test Engineer in the Microsoft Office Interoperability team.   He drives Interoperability testing and Test Suites across the Exchange family of Open Specifications, and other Office Open Specifications. <br /><br />Prior to joining Office Interoperability team, Andrew has served in the eventRole of Senior Test Engineer and Senior Test Lead in Exchange team at Microsoft.  He was responsible for testing of major components of Exchange Server for a number of releases. He graduated from the Moscow Aviation Institute, Russia with a Bachelor’s degree in Computer Science.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Senior Software Test Engineer, Office Interoperability Team',
    showOnHomePage: true,
    headShot: 'andrew-davidoff-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Jinghui',
    lastName: 'Zhang',
    newsletterSubscription: true,
    contactDescription: 'Jinghui Zhang is a Software Engineer in the Microsoft Office Extensibility team. She is a developer of dev.office.com and graph.microsoft.io. She also drives development for new Office Add-ins, SharePoint and Exchange Test Suites, and Office Open XML and Uniform Office Format interoperability tools.<br /><br />She gives talks about Office Add-in, Protocol Test Suites, etc. in the Microsoft Interop Events. And she also participates in the hack sessions to lead developers to reach their hack success. Her favorite part of the events is the brain storm and hack session.<br /><br />She graduated from Beijing University of Aeronautics & Astronautics, China with a Bachelor’s degree in Information Management and Information Systems.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Software Engineer, Office Extensibility Team, Microsoft Corporation',
    showOnHomePage: false,
    headShot: 'jinghui-zhang-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Pui',
    lastName: 'Leung',
    newsletterSubscription: true,
    contactDescription: 'Pui Leung is a Software Engineer in the Microsoft Office Extensibility team. . He is responsible for Interoperability test suites and test tools development and release testing for the Microsoft Office Division, including SharePoint, Exchange Server, and Office.<br /><br />Prior to joining Microsoft, Pui worked as a System Software Engineer on various types of software projects including Windows kernel device driver and server management software at Compaq and Hewlett Packard. He graduated from the Oregon State University with a Bachelor’s of Science degree in Computer Science.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Software Engineer, Office Extensibility team',
    showOnHomePage: true,
    headShot: 'pui-leung-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Tom',
    lastName: 'Jebo',
    newsletterSubscription: true,
    contactDescription: 'Tom Jebo is a Senior Escalation Engineer in the Microsoft Developer Support Open Specifications team. His primary responsibilities are helping customers implement solutions using WOPI, Exchange RPC/MAPI, ActiveSync, Web Services, Lync/Skype protocols, and Office Open XML and binary formats. Before joining the Open Specifications team, Tom helped customers with Microsoft\'s developer tools, C/C++ languages and COM technologies.<br /><br />Before Microsoft, Tom developed architectural simulation software at Amdhal Corporation in Sunnyvale, California. Tom graduated from Boston University with a bachelors in Computer Science and currently lives in Seattle Washington.',
    eventRole: 'speaker',
    msTeamMember: true,
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
  return Contact.create({
  firstName: 'Jingyu',
  lastName: 'Shao',
  newsletterSubscription: true,
  contactDescription: 'Jingyu Shao is a Software Engineer in the Microsoft Office Extensibility team. She works as web developer for Office developer portal: dev.office.com and Microsoft Graph portal: graph.microsoft.io. Jingyu also has developed several Office Add-ins with the new Office JavaScript API. She also drives development of interoperability tools, like Fiddler Inspectors to parse Exchange, SharePoint and WOPI online traffic. <br /><br />Jingyu graduated from Zhejiang University China with a master degree in Electronic Information Engineering.',
  eventRole: 'speaker',
  msTeamMember: true,
  msTeamTitle: 'Software Engineer, Office Extensibility Team',
  showOnHomePage: false,
  headShot: 'jingyu-shao-headshot.jpg',
  company: 'Microsoft',
  country: 'USA',
  allowNotifications: true,
  allowPersonalInfoSharing: false
  })
})
.then(function () {
  return Contact.create({
    firstName: 'Jinlin',
    lastName: 'Xu',
    newsletterSubscription: true,
    contactDescription: 'Jinlin Xu is a Software Engineer in the Microsoft Office Interoperability team. He is responsible for Interoperability tool development and fixing the Interoperability document issues of SharePoint Server, Lync Server and Exchange Server. <br /><br />Prior to joining Microsoft, Jinlin spent 1 year as a Network Engineer at Huawei focusing on developing software on city router and 2 years as a Software Test Engineer focusing on Lync Server test suites development .He graduated from the Nankai University with a Bachelor’s degree in Computer Science.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Software Engineer, Office Extensibility Team',
    showOnHomePage: false,
    headShot: 'jinlin-xu-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Christine',
    lastName: 'Huang',
    newsletterSubscription: true,
    contactDescription: 'Christine Huang is a Principal Test Manager in the Microsoft Windows Server and Cloud Interoperability team.   She manages the Microsoft Windows Server Interoperability team in China and owns the development and release efforts of test tools for interoperability events for Microsoft Windows Server Division. <br /><br />Prior to joining the Windows Server team, Christine worked as the eventRole of Senior Engineer and Manager across several Microsoft products including Bing and Office, and prior to joining Microsoft she worked as a senior Software Developer in industry.  She graduated from National Taiwan University, Taiwan with a Bachelor’s degree in Business Administration and a Master’s degree in Computer Science from Georgia State University, USA.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Principal Test Manager, Windows Server Interoperability & Tools',
    showOnHomePage: false,
    headShot: 'christine-huang.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Tarun',
    lastName: 'Chopra',
    newsletterSubscription: true,
    contactDescription: 'Tarun Chopra is a presently a Sr.Escalation Engineer in the Microsoft Office Developer Support Open Specifications team. His primary responsibilities include helping customers implement solutions using WOPI, Exchange RPC/MAPI, ActiveSync, Web Services, Lync/Skype protocols, and Office Open XML and binary formats. Before joining Office Open Specifications team, Tarun played a vital role in helping customers in implementing Windows protocols and represented Microsoft in couple of Plugfest/Interop events organized globally. Authentication, LYNC/RDP, File Sharing protocols are some of his strengths.<br /><br />Prior to Microsoft, Tarun worked as a Development Lead in Developing Test Suites for Validation of Windows Open Specification and has vast experience in developing distributed systems. He played a key role in developing Parking Management Solutions for Japenese Firm and Verification of Ticketing System for Japanese Rail Network. He received a Bachelors Degree in Electronis and Telecommunication from University in India.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Senior Escalation Engineer, Office Developer Support Open Specifications Team',
    showOnHomePage: false,
    headShot: 'tarun-chopra-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Tom',
    lastName: 'Devey',
    newsletterSubscription: true,
    contactDescription: 'Tom Devey is a Supportability Program Manager in the Microsoft Windows Interoperability team.   He leads the Windows Open Specification Partner support and events. Events including Windows Protocol Plugfests are delivered at Microsoft regularly to Microsoft Partners implementing Active Directory, File Sharing and Remote Desktop, and other Microsoft protocols. <br /><br />Prior to joining the Windows Interoperability team, Tom served a similar eventRole in the Microsoft Office division working with partners who were developing Exchange, SharePoint, Open XML, and the Office Binary formats solutions.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Escalation Engineer, Open Specification Support Team',
    showOnHomePage: false,
    headShot: 'tom-devey-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Hector',
    lastName: 'Sandino',
    newsletterSubscription: true,
    contactDescription: 'Hector Sandino is a Quality Assurance Manager in the Microsoft Office Interoperability team. He leads the development and release efforts for interoperability test tools and events for the Microsoft Office Division, including SharePoint, Exchange Server, and Office. <br /><br />Prior to joining the Office Interoperability team, Hector worked as a Software Developer Engineer across several products of the Microsoft Office brand, including: Outlook, PowerPoint, Visio, Excel, and Word. He graduated from the Pontificia Universidad Javeriana with a Bachelor’s of Science degree in Industrial Engineering and a Master of Science degree in Industrial Engineering from the University of Puerto Rico.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Quality Assurance Manager, Office Interoperability Team',
    showOnHomePage: false,
    headShot: 'hector-sandino-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Bryan S.',
    lastName: 'Burgin',
    newsletterSubscription: true,
    contactDescription: 'Bryan Burgin is a Senior Escalation Engineer responsible for support of Microsoft’s open specifications (protocol documents).  He primarily works with third-party protocol implementers to address questions and issues related to the open specifications and to champion interoperability with Microsoft platforms.  He works extensively with the RDP/RDS and File sharing (SMB2&3) protocol groups.  However, along with his team, support 500+ on-the-wire Windows protocols.  He has been in this eventRole for three years and at Microsoft for 13.  <br /><br />Prior to this eventRole, Bryan supported Kernel driver developers, specializing in network (NDIS) driver development. Prior to joining Microsoft, Bryan spent many years developing products that integrated Wang VS minicomputers with PC networks (terminal emulation, file system redirection, print redirection).',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Senior Escalation Engineer, Developer Support, Open Specifications/Protocols/Interoperability',
    showOnHomePage: false,
    headShot: 'bryan-burgin-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
    return Contact.create({
      firstName: 'Feng',
      lastName: 'Han',
      newsletterSubscription: true,
      contactDescription: 'Feng Han is a software engineer in Windows Server Interoperability & Tools team in Shanghai, China. He has worked on the development and support of test tools for Windows interoperability for 4 years, especially on Remote Desktop protocol family.<br /><br />He graduated from the Zhejiang University with Bachelor’s degree and graduated from Shanghai Jiaotong University with Master’s degree in Software Engineering. Prior to joining Microsoft, Feng worked as a Software Development Engineer for 3 years in a startup company.<br /><br />His role on Interop Events is to present and support synthetic test suites, help partners to use these test tools to identity their product issue.',
      eventRole: 'speaker',
      msTeamMember: true,
      msTeamTitle: 'Software Engineer, Windows Server Interoperability & Tools Team, Microsoft (China) Corporation',
      showOnHomePage: false,
      headShot: 'feng-han-headshot.jpg',
      company: 'Microsoft',
      country: 'USA',
      allowNotifications: true,
      allowPersonalInfoSharing: false
    });
})
.then(function () {
  return Contact.create({
    firstName: 'Guozhao',
    lastName: 'Wu',
    newsletterSubscription: true,
    contactDescription: 'Guozhao Wu is a Software Test Engineer in the Microsoft Office Interoperability team. He drives Test Suites development across the Exchange family of Open Specification and Interoperability tool development for Office OPN parsers. <br /><br />Prior to joining Microsoft, Guozhao worked as a Software Development Engineer in Hangzhou Tiantu focusing on developing System for Highway Emergency. He graduated from the Zhejiang University with Bachelor’s degree & Master’s degree in Software Engineering.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Software Engineer in Test, Office Interoperability Team',
    showOnHomePage: false,
    headShot: 'guozhao-wu-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Obaid',
    lastName: 'Farooqi',
    newsletterSubscription: true,
    contactDescription: 'Obaid Farooqi is an Escalation Engineer on the Microsoft Developer Support, Open Specifications/Protocols/Interoperability team. <br /><br />Obaid is responsible for support of Microsoft’s open specifications (protocol documents).  He earned his Master Computer Science degree from University of Texas at Arlington. He primarily works with third-party protocol implementers to address questions and issues related to the open specifications.  He works extensively with the Authentication, File sharing (SMB2&3) and Mobile Device Management (MDM) protocols but is capable of supporting any of the 500+ on-the-wire Windows protocols.  He has been in this eventRole for six years at Microsoft and in the telecommunications industry as a developer for 12 years.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Escalation Engineer, Developer Support',
    showOnHomePage: false,
    headShot: 'obaid-farooqi-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Guqing',
    lastName: 'Fang',
    newsletterSubscription: true,
    contactDescription: 'Guqing Fang is a Software Development Engineer in Test in the Microsoft Windows Server and Cloud Interoperability team in Shanghai, China. He owns the development and support efforts for Remote Desktop protocol family and Mobile Device Management test suites for Microsoft Windows Server Division. <br /><br />Prior to joining the team in Shanghai, Guqing worked as a Software Development Engineer in Test for 5 years, focusing on testing the model based testing tool SpecExplorer. Guqing graduated from Zhejiang University, Hangzhou China, with a Bachelor’s degree in Instrument Engineering.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Software Development Engineer in Test, Windows Server Interoperability Team',
    showOnHomePage: false,
    headShot: 'guqing-fang-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Mai-Ing',
    lastName: 'Cheng',
    newsletterSubscription: true,
    contactDescription: 'Mai-Ing Cheng is a Senior Program Manager Lead in the Microsoft Windows Server and Cloud Interoperability team. She manages and owns the Microsoft Windows Protocol Compliance related efforts.  She also manages the delivery and release efforts for Spec Explorer. She is also involved in managing in the area of specification languages, compilers, and message monitor and analyzer for interoperability technologies. <br /><br />Prior to joining Microsoft, Mai-Ing was a Research Engineer at RR Donnelley focusing on developing software solution for real-time digital commercial variable printing. She also worked as Senior Software Engineer at a Network company focusing developing firmware for network devices. She graduated from Feng Chia University, Taiwan with Bachelor’s degree in Business Administration and a Master’s degree Computer Science from DePaul University.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Principal Program Manager Lead, Windows Server Interoperability Team',
    showOnHomePage: false,
    headShot: 'mai-ing-cheng-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Yuqing',
    lastName: 'Zhao',
    newsletterSubscription: true,
    contactDescription: 'Yuqing Zhao is a Software Development Engineer in Test in the Microsoft Windows Server and Cloud Interoperability team in Shanghai, China. He owns the development and support efforts for Identity protocol family and OMI test suites for Microsoft Windows Server Division. <br /><br />Prior to joining the team in Shanghai, Yuqing worked as a Software Development Engineer for 4 years, focusing on SaaS development and protocol engineering. Yuqing graduated from Nanjing University of Postage and Telecommunications, Nanjing China, with a Bachelor’s degree in Information Engineering.',
    eventRole: 'speaker',
    msTeamMember: true,
    msTeamTitle: 'Software Development Engineer in Test, Windows Server Interoperability Team',
    showOnHomePage: false,
    headShot: 'yuqing-zhao-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Michelle',
    lastName: 'Hammond',
    newsletterSubscription: true,
    contactDescription: 'Michelle has been involved in technical communication and developer community support for more than 20 years. The teams and projects she has been a part of at Microsoft during that time include the TechNet and MSDN feedback teams, the TechNet webcast program, content management for major Microsoft developer conferences, and extensive technical editing work on a wide range of topics. She has been part of the Office Interoperability team for nearly six years, first as a programmer writer and most recently as a release coordinator covering Open Specifications for Office, SharePoint, Exchange, and Skype for Business. Michelle is also an avid and passionate supporter of video games as a medium for artistic expression, social commentary, and powerful storytelling.',
    eventRole: 'speaker',
    msTeamMember: false,
    msTeamTitle: 'Release Manager, Office Content Team',
    showOnHomePage: false,
    headShot: 'michelle-hammond-headshot.jpg',
    company: 'Microsoft',
    country: 'USA',
    allowNotifications: true,
    allowPersonalInfoSharing: false
  });
})
.then(function () {
  return Contact.create({
    firstName: 'David',
    lastName: 'Robinson',
    msTeamTitle: 'Principal Group SW Eng Mgr',
    headShot: 'darobins.jpg',
    eventRole: 'speaker'
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Congyong',
    lastName: 'Su',
    msTeamTitle: 'Senior Software Eng Mgr',
    headShot: 'cysu.jpg',
    eventRole: 'speaker'
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Baoming',
    lastName: 'Yu',
    msTeamTitle: '',
    headShot: '',
    eventRole: 'speaker'
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Layla',
    lastName: 'Liu',
    msTeamTitle: 'Software Engineer II ',
    headShot: '',
    eventRole: 'speaker'
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Dong',
    lastName: 'Liu',
    msTeamTitle: 'Software Engineer',
    headShot: 'doliu.jpg',
    eventRole: 'speaker'
  });
})
.then(function () {
  return Contact.create({
    firstName: 'Challen',
    lastName: 'He',
    msTeamTitle: 'Software Engineer II ',
    headShot: '',
    eventRole: 'speaker'
  });
})
