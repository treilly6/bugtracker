const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;
const express = require("express");
const router = express.Router();

let MailBox = require('../../models/MailBox');

// used to get the number of unread messages for a user
router.get('/', (req,res) => {
    console.log("HERE THE MESSAGE COUNT HEHEHEHE HAHAHA");
    console.log("extra important \n \n \n \n \n \n \n")

    // if there is not an authenticated user
    if(!req.user) {
        console.log("THERE IS NO USER");
        return res.json({error : "No user exists"});
    }

    MailBox.findOne({"user" : req.user._id})
        .then(mailbox => {
            console.log("HERE IS THE MAILBOCX FOUND MAAAAN ");
            console.log(mailbox);
            console.log("\n", "\n", "\n");
            if(mailbox) {
                console.log("There is a mailbox in here ");

                // find the number of unread messages in the mailbox
                const messageCount = mailbox.messages.reduce((count, mailItem) => {
                    if(!mailItem.read) {
                        count++;
                    }
                    return count;
                }, 0);


                console.log("JUST BEFORE THE MAIL RETURN ");
                console.log(messageCount);
                console.log("\n","\n");

                return res.json({ messageCount });
            } else {
                return res.json({ error : "Failed to find mailbox"});
            }
        })
        .catch(err => {
            console.log("UH OH SPAGHETTI OHS");
            console.log(err);
        })
});

module.exports = router;
