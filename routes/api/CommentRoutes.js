const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

let Ticket = require('../../models/Ticket');
let Project = require('../../models/Project');
let MailBox = require('../../models/MailBox');

router.post('/:ticketId', (req, res) => {
    console.log("POSTING A COMMENT TO THETICKET SHIT");
    console.log(req.params);
    console.log(req.body);

    try {
        var objId = new ObjectId(req.params.ticketId);
    } catch {
        return res.json({"error":"Invalid Ticket Item"});
    }

    console.log("ITS VALUD");
    // check for the ticket
    Ticket.findOne({"_id" : objId}, (err, ticket) => {
        if(err) {
            console.log(err);
            console.log("ERROR IN THE COMMENTS ROUTE SHIT");
        } else {
            console.log("COMMENT ROUTE IS GOOD");
            console.log(ticket);
            console.log("HERE THE Comment");
            console.log(req.body.comment);
            ticket.comments.push(req.body.comment);


            if(req.body.comment.completedRequest.request === true) {
                console.log("IS COMPLETED");
                // flagged - need to add some kind of mail fucntion that sends completed request to the managers
                // Get the managers of the project
                Project.findOne({"_id":new ObjectId(ticket.project_id)}, "managers", (err,project) => {
                    if(err) {
                        console.log("ERROR ON PROJECT QUERY IN COMMENT POST ROUTE");
                        console.log(err)
                        return
                    }
                    console.log("HERE RESULT OF QUERY");
                    console.log(project);
                    console.log(project.managers);
                    // Get the managers mailboxes
                    MailBox.find({"user":{"$in" : project.managers}}, (err, mailboxes) => {
                        if(err) {
                            console.log("FUCKUP ON MAILBOX QUERY COMMENT POST ROUTE");
                            console.log(err);
                        } else {
                            console.log("SUCCESS");
                            console.log(mailboxes);
                            // Send all managers a message
                            mailboxes.map((mailbox) => {
                                console.log("MAP THE MAILBOX");
                                console.log(mailbox);
                                const message = {
                                    title : "Ticket Completion Request",
                                    body : `${req.user.username} has created a completion request that needs manager approval`,
                                    date : new Date(),
                                    meta : {
                                        messageType : "ticketReq",
                                        projectId : `${project._id}`,
                                        path : req.body.path,
                                    },
                                }
                                console.log("HERE THE MESSAGE");
                                console.log(message);
                                mailbox.messages.push(message);
                                // Save the mailboxes
                                mailbox.save(err => {
                                    if(err) {
                                        console.log(err);
                                        console.log("ERROR ON THE SAVE OF THE MAILBOX WHEN MESSAGING MANAGERS");
                                    } else {
                                        console.log("SUCCESSFUL SAVE");
                                    }
                                });
                            });
                        }
                    })
                    // Mark the ticket item as pending
                    ticket.pending = true;
                    console.log(ticket);
                    console.log("ABOVE IS TICKET IN THE PENDING APPROVAL");
                    ticket.save(err => {
                        if(err) {
                            console.log(err);
                            console.log("ERROR WHEN SAVING PENDING TO TICKET");
                        }
                    });
                    return res.json({"savedComment" : req.body.comment, "ticketSaved":ticket});
                })
            } else {
                console.log("IS NOT COMPLETED");
                console.log(ticket);
                console.log("ABOVE IS TICKET in no pending request")
                ticket.save((err => {
                    if(err) {
                        console.log("ERROR WHEN SAVING THE TIFKET COMMENTROUTES.js");
                    }
                }))
                return res.json({"savedComment" : req.body.comment, "ticketSaved":ticket});
            }
        }
    })
})

module.exports = router;
