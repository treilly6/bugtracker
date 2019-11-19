const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

let User = require('../../models/User');

router.post('/login', (req, res, next) => {
    console.log("In user login passport stuff");
    console.log(req.body);
    // res.json({"yah":"yeert", "nice" : "legti"});
    passport.authenticate('local', (err, user, info) => {
        console.log("here the user");
        console.log(user);
        console.log(err);
        console.log(info);
        if (err) {
            console.log("issa an error");
            console.log(err);
            res.json({"error" : err})
            return
        }
        if (!user) {
            console.log("thers no user mane");
            res.json({"error" : "Invalid Username or Password"});
            return
        }
        console.log("theres no error or user issues so i guess do the login")
        req.logIn(user, (err) => {
            if (err) {
                res.json({"error":`User ${req.body.username} failed log in`, "error_msg" : err});
            }
            res.json({"success":`User ${req.body.username} is logged in`, "redirect" : "/projects"});
        });

    })(req, res, next);
});

router.post('/signup', async (req, res) => {
    console.log("in the use signup");
    console.log(req.body)

    // ***** Need to add password check and validation to username ************ //
    // ** Also need to check for if the username already exists ****** //

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    console.log("here theencryptions stuff");
    console.log(salt);
    console.log(hashPassword);

    const newUser = new User({
        "username" : req.body.username,
        "password" : hashPassword,
    });

    newUser.save()
        .then((user) => {
            res.json({
                "success" : `${newUser.username} successfully created`,
                "redirect" : "/projects",
            });
        })
        .catch(err => {
            console.log(err);
            err.json();
        });

});

router.get('/logout', (req, res, next) => {
    console.log("IN the logout");
    if (req.isAuthenticated()) {
        const username = req.user.username;
        req.logout();
        res.json({"success":`${username} successfully logged out`, "redirect" : "/"});
    } else {
        res.json({"error":"there is no user logged in atm"});
    }

});

module.exports = router;
