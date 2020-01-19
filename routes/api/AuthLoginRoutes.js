const express = require("express");
const router = express.Router();
const passport = require('passport');
var ObjectId = require('mongodb').ObjectId;

// let Project = require('../../models/Project');
// let Folder = require('../../models/Folder');

// google login
// need to figure out how react can redirect to the google consent page
router.get('/google', passport.authenticate("google", {
        scope:['profile']
}));

router.get('/google/callback', passport.authenticate("google"), (req, res) => {
        console.log("CALLBACK GOOGLE URI HERE NICE JOB MAN");
        // add login type to the session
        req.session.passport.loginType = "google";
        req.session.freshLogin = true;

        // this is where i want to figure out how to have the passport authenticate method manipulate the req object
        // and add freshSignup to the session, then have a conditional redirect
        // if freshSignup {res.redirect("/profile")} else {res.redirect("/projects")}
        // and do the same for all passport strategies except local strategy
        res.redirect("/projects");
});

router.get('/github', passport.authenticate("github"));

router.get('/github/callback', passport.authenticate("github"), (req, res) => {
    console.log("SERVER GITHUB CALLBACK");

    // add the type of login to the session
    req.session.passport.loginType = "github";
    req.session.freshLogin = true;
    res.redirect("/projects");
});




module.exports = router;
