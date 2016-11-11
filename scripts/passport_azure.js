'use strict';
const jwt = require(`jwt-simple`);
const clc = require('cli-color');

const AzureOAuth2Strategy  = require(`passport-azure-oauth2`);

function AzureOAuthStrategy(passport) {
    passport.use(`provider`, new AzureOAuth2Strategy({
      clientID: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_SECRET,
      callbackURL: `/auth/.auth/login/aad/callback`,
      resource: `00000002-0000-0000-c000-000000000000`,
      tenant: process.env.AZURE_TENANT_ID,
      prompt: 'consent',
      state: false
    },
    function (accessToken, refreshtoken, params, profile, done) {
        let user = jwt.decode(params.id_token, "", true);
        done(null, user);
    }));

}

module.exports = AzureOAuthStrategy;