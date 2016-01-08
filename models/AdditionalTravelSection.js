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
var AdditionalTravelSection = module.exports = sql.define('AdditionalTravelSection', {
  eventId: Sql.INTEGER,
  additionalHeading: Sql.TEXT,
  additionalParagraph: Sql.TEXT,
})


// force creation of table if it doesn't exist already
AdditionalTravelSection.sync({force: false})
/*.then(function () {
    return AdditionalTravelSection.create({
      eventId: 1,
      additionalHeading: 'Siphon café au lait shop aroma est',
      additionalParagraph: 'A extra americano sweet variety sweet extraction. Wings affogato at cinnamon cup con panna milk. At, body percolator and, grinder, beans frappuccino irish pumpkin spice fair trade. Organic froth, filter, a café au lait foam sit mug espresso kopi-luwak chicory to go. Dark flavour, skinny cappuccino espresso foam strong.'
    })
  })
  .then(function () {
    return AdditionalTravelSection.create({
      eventId: 1,
      additionalHeading: 'Cup flavour latte organic trifecta',
      additionalParagraph: 'Half and half, decaffeinated, est, to go and mazagran et cinnamon eu crema. Espresso, at, trifecta siphon qui skinny instant caffeine. Sweet as cinnamon sugar macchiato plunger pot white siphon ristretto.'
    })
  })
  .then(function () {
    return AdditionalTravelSection.create({
      eventId: 2,
      additionalHeading: 'Crema est, dripper, galão latte',
      additionalParagraph: 'Con panna sweet cortado lungo dripper lungo medium redeye. Pumpkin spice a body, beans rich cream coffee, arabica dripper extra organic aftertaste. Spoon that brewed body, aromatic medium half and half to go milk steamed grounds steamed. Rich java at est filter ut cinnamon variety.'
    })
  })
  .then(function () {
    return AdditionalTravelSection.create({
      eventId: 2,
      additionalHeading: 'Flavour est café au lait percolator plunger pot',
      additionalParagraph: 'Spoon, extraction, fair trade affogato, ristretto, flavour fair trade caffeine breve foam. Wings caffeine, breve steamed galão spoon robust americano mocha strong. Affogato americano single shot extraction whipped arabica froth blue mountain viennese. Brewed, kopi-luwak, that mug that foam, con panna body caffeine percolator brewed.'
    })
  })
  .then(function () {
    return AdditionalTravelSection.create({
      eventId: 3,
      additionalHeading: 'Organic variety, aged shop café au lait',
      additionalParagraph: 'Robusta milk galão, to go spoon cinnamon caffeine single shot shop café au lait. Dripper cinnamon, strong and irish crema espresso mocha cream trifecta black americano. Crema, milk mocha shop wings pumpkin spice ristretto. Espresso siphon redeye, seasonal rich caramelization cultivar beans.'
    })
  })
  .then(function () {
    return AdditionalTravelSection.create({
      eventId: 3,
      additionalHeading: 'Siphon extra coffee ristretto chicory macchiato',
      additionalParagraph: 'Barista, fair trade, cappuccino, con panna body froth cultivar acerbic siphon affogato milk. Fair trade seasonal percolator, eu, lungo, blue mountain, cream cortado organic wings chicory foam.'
    })
  })*/

