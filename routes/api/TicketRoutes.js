const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

let Ticket = require('../../models/Ticket');

router.get('/:projectId/:folderPath*', (req,res) => {
    console.log("HERE THE REQ");
    console.log("COOL TICKET ROUTES");
    console.log(req.params);
    var fullPath = req.params.folderPath + req.params["0"];
    console.log(fullPath);
    // let query = { author : "Bobis Poleni"};
    try {
        objID = new ObjectId(req.params.projectId)
    }
    catch {
        valid = false
    }

    let query = {"project_id":objID, "path":fullPath};

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
