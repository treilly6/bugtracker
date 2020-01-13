const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

// let Project = require('../../models/Project');
// let Folder = require('../../models/Folder');

// google login
router.get('/google', (req, res) => {
    console.log("GOOGLE AUTH LOGIN");
    // handle with Passport
});

module.exports = router;
