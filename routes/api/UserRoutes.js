const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// let User = require('../../models/User');

router.post('/login', (req, res) => {
    console.log("In user login API REq");
});

router.post('/signup', (req, res) => {
    console.log("in the use signup");
});

router.get('/logout', (req, res) => {
    console.log("IN the logout");
});

module.exports = router;
