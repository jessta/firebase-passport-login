exports.setup = function (passport, config) {
    var FoursquareStrategy = require('passport-foursquare').Strategy;

    passport.use(new FoursquareStrategy({
        clientID: config.FOURSQUARE_CLIENT_ID,
        clientSecret: config.FOURSQUARE_CLIENT_SECRET,
        callbackURL: config.FOURSQUARE_CALLBACK_URL
      },
      function(accessToken, refreshToken, profile, done) {
            var user = {
                refreshToken: refreshToken,
                provider: profile.provider,
                accessToken: accessToken,
                id: profile.id,
                uid: profile.provider + ':' + profile.id,
                displayName: profile.name.givenName + ' ' + profile.name.familyName,
                thirdPartyUserData: profile._json
            };
            return done(0, user);
      }
    ));

    return {
        options: {
        }
    };
};
