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
        res.redirect("/projects");
});

router.get('/github', passport.authenticate("github"));

router.get('/github/callback', passport.authenticate("github"), (req, res) => {
    console.log("SERVER GITHUB CALLBACK");
    // console.log(req.session);
    // add the type of login to the session
    req.session.passport.loginType = "github";
    // console.log("")
    // console.log(req.session);
    res.redirect("/projects");
});




module.exports = router;
