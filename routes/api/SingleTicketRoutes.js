const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

let Ticket = require('../../models/Ticket');

router.get('/:projectId/:folderPath*', (req,res) => {
    console.log("HERE THE SINGLE TICKET REQ");
    console.log(req.params);
    var fullPath = (req.params.folderPath == 'undefined' ? '' : req.params.folderPath + req.params["0"]);
    console.log("HERE IS THE FULL PATH FOR TICKET ");
    console.log(fullPath);
    console.log(fullPath.split("ticket/"));
    var folderPath = fullPath.split("ticket/")[0];
    var ticketName = fullPath.split("ticket/")[1];
    console.log("IMPORTANT QUERY STUFF HERE");
    console.log(folderPath);
    console.log(ticketName);

    console.log("Index checking that shoit ", folderPath[folderPath.length - 1]);

    // if there is a trailing slash remove it b/c ticket folder paths do not save trailing slashes, so the query will fail if not removed
    if(folderPath[folderPath.length - 1] === "/") {
        folderPath = folderPath.slice(0, folderPath.length - 1);
        console.log("HERE IS THE FODLER PATH AFTER THE TURM ", folderPath);
    }

    var valid = true;

    try {
        objID = new ObjectId(req.params.projectId)
    }
    catch {
        valid = false
    }

    if(!valid) {
        return res.json({"error":"This project does not exist"});
    }

    let query = {"project_id":objID, "path":folderPath, "title":ticketName};

    Ticket.findOne(query, (err, ticket) => {
        if (err) {
            console.log("ERROR ON THE TICKETS API");
        } else {
            console.log("ALL GOOD");
            console.log(ticket);
            if(ticket === null) {
                return res.json({ticket : null, message : `Error : Ticket named ${ticketName} does not exist in this project`});
            }
            return res.json({ticket, message : null});
        }
    });
});

module.exports = router;
