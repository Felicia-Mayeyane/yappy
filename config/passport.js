const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await User.findOne({ googleId: profile.id });
                if (user) {
                    return done(null, user);
                } else {
                    const newUser = new User({
                        googleId: profile.id
                    });
                    await newUser.save();
                    return done(null, newUser);
                }
            } catch (err) {
                console.error(err);
                return done(err);
            }
        })
    );

    passport.use(
        new FacebookStrategy({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: '/auth/facebook/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await User.findOne({ facebookId: profile.id });
                if (user) {
                    return done(null, user);
                } else {
                    const newUser = new User({
                        facebookId: profile.id
                    });
                    await newUser.save();
                    return done(null, newUser);
                }
            } catch (err) {
                console.error(err);
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
