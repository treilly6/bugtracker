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
        res.json({"success":"did not fial the err or !user block", "redirect" : "/home"});
    })(req, res, next);
});

router.post('/signup', async (req, res) => {
    console.log("in the use signup");
    console.log(req.body)

    // NEED TO ADD THE HASHING HERE - think i need to use async / await for the hash
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
            res.json(user);
        })
        .catch(err => console.log(err));

});

router.get('/logout', (req, res) => {
    console.log("IN the logout");
});

module.exports = router;
