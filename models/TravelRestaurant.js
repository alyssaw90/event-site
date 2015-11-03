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

var TravelRestaurant = module.exports = sql.define('TravelRestaurant', {
  eventId: Sql.INTEGER,
  restaurantName: Sql.TEXT,
  restaurantDesc: Sql.TEXT,
})


// force creation of table if it doesn't exist already
TravelRestaurant.sync({force: false})
/*.then(function () {
    return TravelRestaurant.create({
      eventId: 1,
      restaurantName: 'Siphon café au lait shop aroma est',
      restaurantDesc: 'A extra americano sweet variety sweet extraction. Wings affogato at cinnamon cup con panna milk. At, body percolator and, grinder, beans frappuccino irish pumpkin spice fair trade. Organic froth, filter, a café au lait foam sit mug espresso kopi-luwak chicory to go. Dark flavour, skinny cappuccino espresso foam strong.'
    })
  })
  .then(function () {
    return TravelRestaurant.create({
      eventId: 1,
      restaurantName: 'Cup flavour latte organic trifecta',
      restaurantDesc: 'Half and half, decaffeinated, est, to go and mazagran et cinnamon eu crema. Espresso, at, trifecta siphon qui skinny instant caffeine. Sweet as cinnamon sugar macchiato plunger pot white siphon ristretto.'
    })
  })
  .then(function () {
    return TravelRestaurant.create({
      eventId: 2,
      restaurantName: 'Crema est, dripper, galão latte',
      restaurantDesc: 'Con panna sweet cortado lungo dripper lungo medium redeye. Pumpkin spice a body, beans rich cream coffee, arabica dripper extra organic aftertaste. Spoon that brewed body, aromatic medium half and half to go milk steamed grounds steamed. Rich java at est filter ut cinnamon variety.'
    })
  })
  .then(function () {
    return TravelRestaurant.create({
      eventId: 2,
      restaurantName: 'Flavour est café au lait percolator plunger pot',
      restaurantDesc: 'Spoon, extraction, fair trade affogato, ristretto, flavour fair trade caffeine breve foam. Wings caffeine, breve steamed galão spoon robust americano mocha strong. Affogato americano single shot extraction whipped arabica froth blue mountain viennese. Brewed, kopi-luwak, that mug that foam, con panna body caffeine percolator brewed.'
    })
  })
  .then(function () {
    return TravelRestaurant.create({
      eventId: 3,
      restaurantName: 'Crema est, dripper, galão latte',
      restaurantDesc: 'Con panna sweet cortado lungo dripper lungo medium redeye. Pumpkin spice a body, beans rich cream coffee, arabica dripper extra organic aftertaste. Spoon that brewed body, aromatic medium half and half to go milk steamed grounds steamed. Rich java at est filter ut cinnamon variety.'
    })
  })
  .then(function () {
    return TravelRestaurant.create({
      eventId: 3,
      restaurantName: 'Flavour est café au lait percolator plunger pot',
      restaurantDesc: 'Spoon, extraction, fair trade affogato, ristretto, flavour fair trade caffeine breve foam. Wings caffeine, breve steamed galão spoon robust americano mocha strong. Affogato americano single shot extraction whipped arabica froth blue mountain viennese. Brewed, kopi-luwak, that mug that foam, con panna body caffeine percolator brewed.'
    })
  })
*/