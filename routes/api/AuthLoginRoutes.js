const express = require("express");
const router = express.Router();
const passport = require('passport');
var ObjectId = require('mongodb').ObjectId;

// let Project = require('../../models/Project');
// let Folder = require('../../models/Folder');

// google login
router.get('/google', (req, res) => {
    console.log("TRYING THE GOOGLE AUTH ROUTE");
    passport.authenticate("google",{
        scope:['profile']
    })
});

module.exports = router;
