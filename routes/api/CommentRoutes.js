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
    Ticket.findOne({"_id" : objId}, (err, ticket) => {
        if(err) {
            console.log("ERROR IN THE COMMENTS ROUTE SHIT");
        } else {
            console.log("COMMENT ROUTE IS GOOD");
            console.log(ticket);
            console.log("HERE THE BODY");
            console.log(req.body);
            ticket.comments.push(req.body);


            if(req.body.markCompleted === true) {
                console.log("IS COMPLETED");
                ticket.closed = true;
            } else {
                console.log("IS NOT COMPLETED");
            }

            // flagged - need to add some kind of mail fucntion that sends completed request to the managers
            Project.findOne({"_id":new ObjectId(ticket.project_id)}, "managers", (err,project) => {
                if(err) {
                    console.log("ERROR ON PROJECT QUERY IN COMMENT POST ROUTE");
                    console.log(err)
                    return
                }
                console.log("HERE RESULT OF QUERY");
                console.log(project);
                console.log(project.managers);
                MailBox.find({"user":{"$in" : project.managers}}, (err, mailboxes) => {
                    if(err) {
                        console.log("FUCKUP ON MAILBOX QUERY COMMENT POST ROUTE");
                        console.log(err);
                    } else {
                        console.log("SUCCESS");
                        console.log(mailboxes);
                        mailboxes.map((mailbox) => {
                            console.log("MAP THE MAILBOX");
                            console.log(mailbox);
                            const message = {
                                title : "Ticket Completion Request",
                                body : `${req.user.username} has created a completion request that needs manager approval`,
                                date : "4/20/69",
                                meta : {
                                    messageType : "ticketReq",
                                    projectId : `${project._id}`,
                                },
                            }
                            mailbox.messages.push(message);
                            mailbox.save(err => {
                                if(err) {
                                    console.log(err);
                                    console.log("ERROR ON THE SAVE OF THE MAILBOX WHEN MESSAGING MANAGERS");
                                } else {
                                    console.log("SUCCESSFUL SAVE");
                                }
                            })
                        });
                    }
                })
                // ADD A QUERY OF THE MAILBOXES OF THOSE MANAGEERS
            })


            console.log(ticket);
            ticket.save((err => {
                if(err) {
                    console.log("ERROR WHEN SAVING THE TIFKET COMMENTROUTES.js");
                }
            }))
            res.json({"savedComment" : req.body, "ticketSaved":ticket});
        }
    })
})

module.exports = router;
