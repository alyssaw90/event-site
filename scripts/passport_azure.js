'use strict';
const jwt = require(`jwt-simple`);

const AzureOAuth2Strategy  = require(`passport-azure-oauth2`);

function AzureOAuthStrategy(passport) {
    passport.use(`provider`, new AzureOAuth2Strategy({
      clientID: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_SECRET,
      callbackURL: `/auth/.auth/login/aad/callback`,
      resource: `https://interopevents.com`,
      tenant: process.env.AZURE_TENANT_ID,
      prompt: 'consent',
      state: true
    },
    function (accessToken, refreshtoken, params, profile, done) {
        console.log(clc.green.bgWhite('accessToken :: '), accessToken, `\nrefreshtoken :: `,  refreshtoken, `\nparams :: `, params, `\nprofile :: `, profile);
        let user = jwt.decode(params.id_token, "", true);
      done(null, user);
    }));

    /*passport.serializeUser(function(user, done) {
        console.log(`profile : `, user);
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        console.log(`profile : `, user);
        done(null, user);
    });*/
}

module.exports = AzureOAuthStrategy;