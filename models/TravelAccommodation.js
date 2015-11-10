'use strict';

var Sql = require('sequelize');
var sql = new Sql('events_page', 'eventsUser', 'p@ssw0rd1', {
  host: 'localhost',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var TravelAccommodation = module.exports = sql.define('TravelAccommodation', {
  eventId: Sql.INTEGER,
  accommodationName: Sql.TEXT,
  accommodationDesc: Sql.TEXT,
  accommodationUrl: Sql.STRING,
  accommodationPhone: Sql.INTEGER,
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
      accommodationPhone: 2015551212,
      accommodationEmail: 'hotel1@example.com'
    })
  })
  .then(function () {
    return TravelAccommodation.create({
      eventId: 1,
      accommodationName: 'Baseball ipsum dolor sit amet',
      accommodationDesc: 'Bullpen bandbox slugging error base, tigers arm. Fair baltimore chop arm pinch hitter hey batter chin music good eye. Double play second base take sacrifice bunt outside batter\'s box tag off-speed 1-2-3. Mendoza line catcher gap crooked number gap assist hitter. Assist bunt foul line interleague batter\'s box dead red helmet. Pickoff slugging extra innings pickoff national pastime ground rule double backstop friendly confines plate.',
      accommodationUrl: 'http://en.chateauversailles.fr/homepage',
      accommodationPhone: 2028675309,
      accommodationEmail: 'hote2@example.com'
    })
  })
/*  .then(function () {
    return TravelAccommodation.create({
      eventId: 2,
      accommodationName: 'Inning season home gold glove',
      accommodationDesc: 'Center field nubber yankees bench small ball bunt pinch runner. Gapper runs wrigley loss foul second baseman first base inside. Loss defensive indifference ejection small ball tapper appeal squeeze sacrifice bunt passed ball. Pull walk off sacrifice steal rotation, left field all-star. Defensive indifference sport pinch hit center fielder dead ball era mitt wild pitch right fielder grounder. Tossed first base rope designated hitter petey cellar league',
      accommodationUrl: 'http://www.dpm.org.cn/index1024768.html',
      accommodationPhone: 2069998888,
      accommodationEmail: 'hotel3@example.com'
    })
  })
  .then(function () {
    return TravelAccommodation.create({
      eventId: 2,
      accommodationName: 'No decision mustard',
      accommodationDesc: 'Sacrifice bunt gap plunked streak sport unearned run squeeze doubleheader baseball card. Blue slugging triple-A chin music base bandbox series club. Southpaw center fielder tag scorecard pitchout, error triple play outfielder. Baseball card in the hole inning pennant no-hitter blue tapper team base. Loss national pastime chin music right fielder bat crooked number flyout batter\'s box diamond. Cycle third baseman no decision good eye pinch hitter wild pitch away wrigley corner.',
      accommodationUrl: 'http://www.hobbitontours.com/',
      accommodationPhone: 2014441313,
      accommodationEmail: 'hotel4@example.com'
    })
  })*/
  .then(function () {
    return TravelAccommodation.create({
      eventId: 3,
      accommodationName: 'Inning season home gold glove',
      accommodationDesc: 'Center field nubber yankees bench small ball bunt pinch runner. Gapper runs wrigley loss foul second baseman first base inside. Loss defensive indifference ejection small ball tapper appeal squeeze sacrifice bunt passed ball. Pull walk off sacrifice steal rotation, left field all-star. Defensive indifference sport pinch hit center fielder dead ball era mitt wild pitch right fielder grounder. Tossed first base rope designated hitter petey cellar league',
      accommodationUrl: 'http://www.dpm.org.cn/index1024768.html',
      accommodationPhone: 2069998888,
      accommodationEmail: 'hotel3@example.com'
    })
  })
  .then(function () {
    return TravelAccommodation.create({
      eventId: 3,
      accommodationName: 'No decision mustard',
      accommodationDesc: 'Sacrifice bunt gap plunked streak sport unearned run squeeze doubleheader baseball card. Blue slugging triple-A chin music base bandbox series club. Southpaw center fielder tag scorecard pitchout, error triple play outfielder. Baseball card in the hole inning pennant no-hitter blue tapper team base. Loss national pastime chin music right fielder bat crooked number flyout batter\'s box diamond. Cycle third baseman no decision good eye pinch hitter wild pitch away wrigley corner.',
      accommodationUrl: 'http://www.hobbitontours.com/',
      accommodationPhone: 2014441313,
      accommodationEmail: 'hotel4@example.com'
    })
  })
