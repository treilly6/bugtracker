const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let Ticket = require('../../models/Ticket');

router.get('/', (req,res) => {
    console.log("HERE THE REQ");
    console.log("COOL TICKET ROUTES");
    // let query = { author : "Bobis Poleni"};
    let query = {};
    Ticket.find(query, (err, tickets) => {
        if (err) {
            console.log("ERROR ON THE TICKETS API");
        } else {
            console.log("ALL GOOD");
            res.json({"tickets" : tickets});
        }
    });
});

module.exports = router;
