const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;
const express = require("express");
const router = express.Router();

let MailBox = require('../../models/MailBox');

router.get('/', (req,res) => {
    console.log("HERE IS THE GET REQUEST FOR Mailbox");
    console.log(req.params);
    console.log(req.user);
    MailBox.findOne({"user" : req.user.username}, (err, mailbox) => {
        if(err) {
            console.log(err);
            console.log("ERR ON THE FIND MAILBOX");
        } else {
            if(mailbox) {
                console.log(mailbox);
                console.log("THERE IS A MAILBOX");
                res.json({"mailbox" : mailbox, "message" : ""});
            } else {
                console.log("NO MAILBOX");
                res.json({"mailbox" : {}, "message" : "Error : No Mailbox Found"});
            }
        }
    });
});

module.exports = router;
