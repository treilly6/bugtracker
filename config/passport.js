const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require("dotenv/config");

const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField : 'username'}, (username, password, done) => {
            // Find the user
            User.findOne({username : username})
                .then(user => {
                    // look for user
                    if (!user) {
                        return done(null, false, { message : "User is not registered"});
                    }
                    // check the password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) {
                            throw err;
                        }
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { "message" : "Incorrect Password"});
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.use(
        new GoogleStrategy({
            // options for strategy
            callbackURL : "/authLogin/google/redirect",
            clientID: process.env.CLIENT_ID,
            clientSecret : process.env.CLIENT_SECRET,
        }, () => {
            // call back function
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

}
