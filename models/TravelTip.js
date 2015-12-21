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

var TravelTip = module.exports = sql.define('TravelTip', {
  eventId: Sql.INTEGER,
  tipHeading: Sql.TEXT,
  tipParagraph: Sql.TEXT
})


// force creation of table if it doesn't exist already
TravelTip.sync({force: true})
.then(function () {
    return TravelTip.create({
      eventId: 1,
      tipHeading: 'Baseball!',
      tipParagraph: 'Full count extra innings yankees tigers slider hardball passed ball glove. Rubber game dead ball era series scorecard forkball, strike zone runs. Designated hitter tossed rainout tossed relay run cracker jack fair balk. Warning track double switch slider bush league field extra innings good eye airmail basehit. Blue on deck cork cracker jack rubber team contact knuckleball grand slam. Series basehit disabled list interleague crooked number earned run dead ball era runs.'
    })
  })
  .then(function () {
    return TravelTip.create({
      eventId: 1,
      tipHeading: 'Baseball ipsum dolor sit amet',
      tipParagraph: 'Bullpen bandbox slugging error base, tigers arm. Fair baltimore chop arm pinch hitter hey batter chin music good eye. Double play second base take sacrifice bunt outside batter\'s box tag off-speed 1-2-3. Mendoza line catcher gap crooked number gap assist hitter. Assist bunt foul line interleague batter\'s box dead red helmet. Pickoff slugging extra innings pickoff national pastime ground rule double backstop friendly confines plate.'
    })
  })
/*  .then(function () {
    return TravelTip.create({
      eventId: 2,
      tipHeading: 'Inning season home gold glove',
      tipParagraph: 'Center field nubber yankees bench small ball bunt pinch runner. Gapper runs wrigley loss foul second baseman first base inside. Loss defensive indifference ejection small ball tapper appeal squeeze sacrifice bunt passed ball. Pull walk off sacrifice steal rotation, left field all-star. Defensive indifference sport pinch hit center fielder dead ball era mitt wild pitch right fielder grounder. Tossed first base rope designated hitter petey cellar league'
    })
  })
  .then(function () {
    return TravelTip.create({
      eventId: 2,
      tipHeading: 'No decision mustard',
      tipParagraph: 'Sacrifice bunt gap plunked streak sport unearned run squeeze doubleheader baseball card. Blue slugging triple-A chin music base bandbox series club. Southpaw center fielder tag scorecard pitchout, error triple play outfielder. Baseball card in the hole inning pennant no-hitter blue tapper team base. Loss national pastime chin music right fielder bat crooked number flyout batter\'s box diamond. Cycle third baseman no decision good eye pinch hitter wild pitch away wrigley corner.'
    })
  })*/
  .then(function () {
    return TravelTip.create({
      eventId: 3,
      tipHeading: 'Inning season home gold glove',
      tipParagraph: 'Center field nubber yankees bench small ball bunt pinch runner. Gapper runs wrigley loss foul second baseman first base inside. Loss defensive indifference ejection small ball tapper appeal squeeze sacrifice bunt passed ball. Pull walk off sacrifice steal rotation, left field all-star. Defensive indifference sport pinch hit center fielder dead ball era mitt wild pitch right fielder grounder. Tossed first base rope designated hitter petey cellar league'
    })
  })
  .then(function () {
    return TravelTip.create({
      eventId: 3,
      tipHeading: 'No decision mustard',
      tipParagraph: 'Sacrifice bunt gap plunked streak sport unearned run squeeze doubleheader baseball card. Blue slugging triple-A chin music base bandbox series club. Southpaw center fielder tag scorecard pitchout, error triple play outfielder. Baseball card in the hole inning pennant no-hitter blue tapper team base. Loss national pastime chin music right fielder bat crooked number flyout batter\'s box diamond. Cycle third baseman no decision good eye pinch hitter wild pitch away wrigley corner.'
    })
  })
