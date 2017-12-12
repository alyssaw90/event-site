'use strict';

require('dotenv').load();
const express = require('express');
const app = express();
const passport = require('passport');
const clc = require('cli-color');
const compression = require('compression');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
const models = require('./models');
const bodyParser = require('body-parser');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const adminRoutes = express.Router();
// const apiRoutes = express.Router();
const authRoutes = express.Router();
const catchAllRoutes = express.Router();
const auth = express.Router()
const consumerRoutes = express.Router()
process.env.SECRET_KEY = process.env.SECRET_KEY || 'change this change this change this!!!';
let port = process.env.PORT || 3000;
let time = new Date();
let secretKeyReminder = process.env.SECRET_KEY === 'change this change this change this!!!' ? clc.black.bgRed(`process.env.SECRET_KEY is not secure, change your SECRET_KEY!!!`) : clc.black.bgGreen(`Your SECRET_KEY is secure. You don't need to change your SECRET_KEY`);
console.log(secretKeyReminder);
// TODO: Uncomment to enable admin-routes
require('./routes/admin-routes')(adminRoutes);
// require('./routes/api-routes')(apiRoutes);
require('./routes/auth.js')(auth, passport)
require('./routes/consumer-routes.js')(consumerRoutes);
require('./routes/catch-all-routes.js')(catchAllRoutes);

// Configure requests parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(compression());
// app.use(cookieParser(process.env.SESSION_SECRET))
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     maxAge: 1000*60*60*8,
//     unset: 'destroy',
//     store: new SequelizeStore({
//         db: models.sql
//     }),
//     proxy: true
// }))

// Pull in the Azure AD bearer passport strategy
const OIDCBearerStrategy = require('passport-azure-ad').BearerStrategy;

// This object is used for in-memory data storage, instead of database.
// Each time you run the server, you will get a fresh, empty list.
var tasks = [];

// Load passport and configure it to use Azure AD Bearer auth
app.use(passport.initialize());
passport.use(new OIDCBearerStrategy({
    "identityMetadata": process.env.AZURE_METADATA,
    "clientID": process.env.AZURE_CLIENT_ID,
    "validateIssuer": false,
}, function(token, done) {
    return done(null, token, null);
}));

// set header to prevent Clickjacking and Cross-Site Request Forgery (CSRF) attacks
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    return next();
});
// use the root directory as the source of static files
app.use(express.static(__dirname + '/'));
// use the apiRoutes with /api/ as its root
// app.use('/api/', apiRoutes);
// use the adminRoutes with /api/ as its root
app.use('/admin/', adminRoutes);
app.use('/consumer/', consumerRoutes);
//use the root for the catch all route, this must be the last routes file in the list above
app.use('/', catchAllRoutes);
// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// listen to the port and log when the server has started
app.listen(port, () => {
    console.log(clc.cyanBright('server started on port ' + port + ' at ' + time));
});