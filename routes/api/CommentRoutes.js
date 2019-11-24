const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

let Ticket = require('../../models/Ticket');

router.post('/:ticketId', (req, res) => {
    console.log("POSTING A COMMENT TO THETICKET SHIT");
    console.log(req.params);
    console.log(req.body);

    var valid = true;
    try {
        var objId = new ObjectId(req.params.ticketId);
    } catch {
        res.json({"error":"Invalid Ticket Item"});
        valid = false;
    }

    if(!valid) {
        return
    }
    console.log("ITS VALUD");
    Ticket.findOne({"_id" : objId}, (err, ticket) => {
        if(err) {
            console.log("ERROR IN THE COMMENTS ROUTE SHIT");
        } else {
            console.log("COMMENT ROUTE IS GOOD");
            console.log(ticket);
            console.log("HERE THE BODY");
            console.log(req.body);
            ticket.comments.push(req.body);
            console.log(ticket);
            ticket.save((err => {
                if(err) {
                    console.log("ERROR WHEN SAVING THE TIFKET COMMENTROUTES.js");
                }
            }))
            res.json(req.body);
        }
    })
})

module.exports = router;
