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

router.get('/:mailId', async (req,res) => {
    console.log("HERE THE GET MAIL ID ROUTE");
    const mailId = req.params.mailId;
    console.log("HERE THE MAIL ID ", mailId);
    var mailItem;

    await MailBox.findOne({"user" : req.user.username})
        .then(mailbox => {
            console.log("HERE THE MAILBOX");
            console.log(mailbox);
            console.log("ABOVE IS THE TYPES");
            mailItem = mailbox.messages.find(mail => mail._id.toString() === mailId);
            console.log("HERE IS THE maikItem");
            console.log(mailItem);
        })
        .catch(err => {
            console.log(err);
        })

    console.log("ABOUT TO RETURN");
    console.log(mailItem);
    res.json({mailItem : mailItem});
})

module.exports = router;
