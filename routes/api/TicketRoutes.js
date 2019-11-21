const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

let Ticket = require('../../models/Ticket');

router.get('/:projectId/:folderPath*', (req,res) => {
    console.log("HERE THE REQ");
    console.log("COOL TICKET ROUTES");
    console.log(req.params);
    const fullPath = (req.params.folderPath == 'undefined' ? '' : req.params.folderPath + req.params["0"]);
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

router.post('/:projectId/:folderPath*', (req, res) => {
    console.log("IN THE POST FOLDER PATH");
    const fullPath = (req.params.folderPath == 'undefined' ? '' : req.params.folderPath + req.params["0"]);
    console.log(req.user);
    console.log(req.params);
    console.log(req.body);
    console.log(fullPath);
    newTicket = new Ticket({
        title : req.body.title,
        description : req.body.description,
        author : req.user.username,
        project_id : new ObjectId(req.params.projectId),
        path : fullPath,
    });

    newTicket.save()
        .then(ticket => {
            console.log("saved the ticket");
            res.json(ticket);
        })
        .catch(err => {
            console.log("theres an error in post ticket route save attempt");
            console.log(err);
        });
})

module.exports = router;
