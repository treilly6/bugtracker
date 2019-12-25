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
    console.log("IN THE POST A TICKET PATH");
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
            console.log(ticket);
            res.json({addedTicket : ticket, message : `Success : Created Ticket`});
        })
        .catch(err => {
            console.log("theres an error in post ticket route save attempt");
            console.log(err);
        });
});

router.put('/eval/:ticketId', (req,res) => {
    // flagged - need to add manager evaluation
    // and data validation
    console.log("IN PUT REQ");
    console.log(req.user.username);
    console.log(req.body);
    console.log(req.params);
    var ticketId = new ObjectId(req.params.ticketId);
    // flagged - need to add some kind of filter on the ticket to find the comment that made the request
    Ticket.findOne({"_id" : ticketId}, (err, ticket) => {
        if(err) {
            console.log("THERE IS AN ERROR ON QUERY FOR PUT REQ TICKETS")
        } else {
            console.log("HERE ALL tHe COMMentS");
            console.log(ticket.comments);
            var commentFilter = (comment) => {return comment.completedRequest.request === true && comment.completedRequest.approved === false && comment.completedRequest.rejected === null};
            console.log("ABOVE IS THE FILTERED COMMENT RESULT");
            if(req.body.command === "approve") {
                console.log("APPROVING THE TICKET");
                ticket.closed = true;
                ticket.pending = false;
                ticket.approved.user = req.user.username;
                ticket.approved.date = new Date();
                ticket.comments.find(commentFilter).completedRequest.approved = true;
            } else if(req.body.command === "reject") {
                console.log("REJECTING THE TICKET");
                ticket.closed = false;
                ticket.pending = false;
                ticket.comments.find(commentFilter).completedRequest.rejected = true;
            }
            ticket.save(err => {
                if(err) {
                    console.log("ERROR ON SAVE OF PUT");
                } else {
                    console.log("SUCCESS SAVE OF THE TICKET");
                    return res.json({savedTicket : ticket});
                }
            });
            console.log("HERE THECOMMETNS AFET THE SAVE");
            console.log(ticket.comments);
        }
    })
});

module.exports = router;
