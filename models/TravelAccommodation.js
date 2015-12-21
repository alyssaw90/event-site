'use strict';

var Sql = require('sequelize');
/*var sql = new Sql('events_page', 'eventsUser', 'p@ssw0rd1', {
  host: 'localhost',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
var sql = new Sql('InteropEventsDBTest', 'EventAdmin@interopeventstestserver', 'Event.4ever!', {
  host: 'interopeventstestserver.database.windows.net',
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
/*var sql = new Sql('Driver={SQL Server Native Client 11.0};Server=tcp:interopeventstestserver.database.windows.net,1433;Database=InteropEventsDBTest;Uid=EventAdmin@interopeventstestserver;Pwd={Event.4ever!};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;', {
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
/*var sql = new Sql('InteropEventsDBTest', 'EventAdmin', 'Event.4ever!', {
  host: 'interopeventstestserver.database.windows.net',
  dialect: 'mssql',
  port: 1433,
  driver: 'tedious',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/

var TravelAccommodation = module.exports = sql.define('TravelAccommodation', {
  eventId: Sql.INTEGER,
  accommodationName: Sql.TEXT,
  accommodationDesc: Sql.TEXT,
  accommodationUrl: Sql.STRING,
  accommodationPhone: Sql.STRING,
  accommodationEmail: Sql.STRING
})


// force creation of table if it doesn't exist already
TravelAccommodation.sync({force: true})
.then(function () {
    return TravelAccommodation.create({
      eventId: 1,
      accommodationName: 'Baseball!',
      accommodationDesc: 'Full count extra innings yankees tigers slider hardball passed ball glove. Rubber game dead ball era series scorecard forkball, strike zone runs. Designated hitter tossed rainout tossed relay run cracker jack fair balk. Warning track double switch slider bush league field extra innings good eye airmail basehit. Blue on deck cork cracker jack rubber team contact knuckleball grand slam. Series basehit disabled list interleague crooked number earned run dead ball era runs.',
      accommodationUrl: 'http://buckinghampalace.londonpass.com/',
      accommodationPhone: '2015551212',
      accommodationEmail: 'hotel1@example.com'
    })
  })
  .then(function () {
    return TravelAccommodation.create({
      eventId: 1,
      accommodationName: 'Baseball ipsum dolor sit amet',
      accommodationDesc: 'Bullpen bandbox slugging error base, tigers arm. Fair baltimore chop arm pinch hitter hey batter chin music good eye. Double play second base take sacrifice bunt outside batter\'s box tag off-speed 1-2-3. Mendoza line catcher gap crooked number gap assist hitter. Assist bunt foul line interleague batter\'s box dead red helmet. Pickoff slugging extra innings pickoff national pastime ground rule double backstop friendly confines plate.',
      accommodationUrl: 'http://en.chateauversailles.fr/homepage',
      accommodationPhone: '2028675309'
    })
  })
  .then(function () {
    return TravelAccommodation.create({
      eventId: 2,
      accommodationName: 'Shanghai Marriott Hotel City Centre',
      accommodationDesc: 'The best of Shanghai awaits both inside and outside of the doors of the Shanghai Marriott Hotel City Centre. Our new luxury property is situated in the heart of the city\'s downtown area, only minutes away from the Bund, Nanjing Road, and the People\'s Square. While exploring Shanghai is easy to do, we\'ve made settling in equally as compelling. Our 720 guest rooms and suites boast expansive city views and include 42-inch LCD TVs and plush designer bedding. If you\'re staying in an Executive Level suite, enjoy perks like complimentary snacks and beverages, plus access to our business facilities. Other on-site amenities include a full fitness center with an indoor pool and our signature Luxury Spa. And be sure to experience a meal at one of our five innovative restaurants, where you can savor everything from authentic Cantonese cuisine to made-to-order afternoon tea. Come see why the Shanghai Marriott Hotel City Centre presents guests with an unparalleled downtown experience.',
      accommodationUrl: 'http://www.marriott.com/hotels/travel/shamc-shanghai-marriott-hotel-city-centre/',
      accommodationPhone: '+86-21-2312 9888'
    })
  })
  .then(function () {
    return TravelAccommodation.create({
      eventId: 3,
      accommodationName: 'Inning season home gold glove',
      accommodationDesc: 'Center field nubber yankees bench small ball bunt pinch runner. Gapper runs wrigley loss foul second baseman first base inside. Loss defensive indifference ejection small ball tapper appeal squeeze sacrifice bunt passed ball. Pull walk off sacrifice steal rotation, left field all-star. Defensive indifference sport pinch hit center fielder dead ball era mitt wild pitch right fielder grounder. Tossed first base rope designated hitter petey cellar league',
      accommodationUrl: 'http://www.dpm.org.cn/index1024768.html',
      accommodationPhone: '2069998888',
      accommodationEmail: 'hotel3@example.com'
    })
  })
  .then(function () {
    return TravelAccommodation.create({
      eventId: 3,
      accommodationName: 'No decision mustard',
      accommodationDesc: 'Sacrifice bunt gap plunked streak sport unearned run squeeze doubleheader baseball card. Blue slugging triple-A chin music base bandbox series club. Southpaw center fielder tag scorecard pitchout, error triple play outfielder. Baseball card in the hole inning pennant no-hitter blue tapper team base. Loss national pastime chin music right fielder bat crooked number flyout batter\'s box diamond. Cycle third baseman no decision good eye pinch hitter wild pitch away wrigley corner.',
      accommodationUrl: 'http://www.hobbitontours.com/',
      accommodationPhone: '2014441313',
      accommodationEmail: 'hotel4@example.com'
    })
  })
