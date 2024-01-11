const passport = require('passport')
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
// import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
require("dotenv").config({ path: 'config/config.env' });
const User = require('../models/Usermodel')

// const serverUrl = process.env.NODE_ENV === 'production' ? process.env.SERVER_URL_PROD : process.env.SERVER_URL_DEV;

// google strategy
console.log(process.env.CLIENT_ID)
console.log(process.env.CLIENT_SECRET)
const googleLogin = new OAuth2Strategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `/auth/google/callback`,
    proxy: true,
    scope: ['profile', 'email'],
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    try {
      const oldUser = await User.findOne({ email: profile.email });
      if (oldUser) {
        return done(null, oldUser);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      const newUser = await new User({
        provider: 'google',
        googleId: profile.id,
        email: profile.email,
        name: profile.displayName,
      }).save();
      done(null, newUser);
    } catch (err) {
      console.log(err);
    }
  },
);

passport.serializeUser((user,done)=>{
  done(null,user);
})

passport.deserializeUser((user,done)=>{
  done(null,user);
});

passport.use(googleLogin);