const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/users/google/callback",
    },
    async (token, tokenSecret, profile, done) => {
      const { id, displayName, emails } = profile;
      const email = emails[0].value;
      try {
        let user = await User.findOne({ googleId: id });
        if (!user) {
          user = await User.create({ googleId: id, name: displayName, email });
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  User.findById(id, (err, user) => done(err, user))
);
