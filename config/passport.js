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
            callbackURL : "/authLogin/google/callback",
            clientID: process.env.CLIENT_ID,
            clientSecret : process.env.CLIENT_SECRET,
        }, (accessToken, refreshToken, profile, done) => {
            // call back function
            console.log("GOOGLE STRATEGY CALLBACK");
            const googleName = profile.displayName;
            const googleId = profile.id;
            console.log(googleName, googleId);
            // check if user already exists
            User.findOne({googleId : googleId})
                .then(currentUser => {
                    if(currentUser) {
                        // user exists
                        console.log("GOOGLE USER ALREADY EXISTS", currentUser);
                        done(null, currentUser);
                    } else {
                        // user does not exist
                        console.log("NEW GOOGLE USER", currentUser)
                        const newUser = new User({
                            name : googleName,
                            googleId : googleId,
                        })
                        newUser.save()
                            .then(user => {
                                console.log("NEW USER CREATED");
                                console.log(user);
                                done(null, user);
                            });
                    }
                })
            })
            // console.log(cb);
            // return done(null, profile);
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user);
            });
    });

}
