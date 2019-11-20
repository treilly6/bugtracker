const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let Ticket = require('../../models/Ticket');

router.get('/', (req,res) => {
    console.log("HERE IS THE GET REQUEST FOR THE FOLDERS");
    res.json();
});

module.exports = router;
