const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

let User = require('../../models/User');

router.post('/login', (req, res) => {
    console.log("In user login API REq");
    console.log(req.body);
    res.json(req.body);
});

router.post('/signup', (req, res) => {
    console.log("in the use signup");
    console.log(req.body)

    // NEED TO ADD THE HASHING HERE
    // const salt = bcrypt.genSalt();
    // const hashPassword = bcrypt.hash(req.body.password, salt);
    // const newUser = {username : req.body.username, password : hashPassword};
    // console.log(salt);

    const newUser = new User({
        "username" : req.body.username,
        "password" : req.body.password,
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
