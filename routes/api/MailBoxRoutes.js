const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;
const express = require("express");
const router = express.Router();

let MailBox = require('../../models/MailBox');

// Get the users mailbox
router.get('/', (req,res) => {
    console.log("HERE IS THE GET REQUEST FOR Mailbox");
    console.log(req.params);
    console.log(req.user);
    MailBox.findOne({"user" : req.user._id}, (err, mailbox) => {
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

// Get a specific piece of mail
router.get('/:mailId', async (req,res) => {
    console.log("HERE THE GET MAIL ID ROUTE");
    const mailId = req.params.mailId;
    console.log("HERE THE MAIL ID ", mailId);
    var mailItem;

    await MailBox.findOne({"user" : req.user._id})
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
});

// update a mails read status
router.put('/:mailId', async (req,res) => {
    const mailId = req.params.mailId;
    var mailItem;

    await MailBox.findOne({"user" : req.user._id})
        .then(mailbox => {
            mailItem = mailbox.messages.find(mail => mail._id.toString() === mailId);
            console.log("HERE IS THE maikItem");
            console.log(mailItem);
            if(mailItem != undefined) {
                mailItem.read = !mailItem.read;
                mailbox.save()
                    .then(item => {
                        res.json({mailId : mailItem._id, read : mailItem.read});
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }

        })
        .catch(err => {
            console.log(err);
        })
});

// delete a piece of mail
router.delete('/:mailId', async (req,res) => {
    const mailId = req.params.mailId;
    var mailItem;

    await MailBox.findOne({"user" : req.user.username})
        .then(mailbox => {
            // set the length of mailbox before delete
            var mailLength = mailbox.messages.length;
            // filter out the requested mail id
            var updatedMessages = mailbox.messages.filter(mail => mail._id.toString() !== mailId);
            // set length of new array
            var newMailLength = updatedMessages.length;
            console.log(mailLength, newMailLength);
            // If the differnce is 1 i.e the filter removed the requested mailId
            if((mailLength - newMailLength) === 1) {
                mailbox.messages = updatedMessages;
                mailbox.save()
                    .then(item => {
                        res.json({deleted : true});
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({deleted : false});
                    })
            }

        })
        .catch(err => {
            console.log(err);
            res.json({deleted : false});
        })

});

// used to chnage the read status of mail (specifically, this route is used by the web socket in the nav bar to update the mail notification)
router.post('/mailMessage', (req,res) => {
    console.log("HERE THE MESSAGE COUNT HEHEHEHE HAHAHA");
    console.log("extra important \n \n \n \n \n \n \n")

    // if there is not an authenticated user
    if(!req.user) {
        console.log("THERE IS NO USER");
        return res.json({error : "No user exists"});
    }

    // pull the variables out of the req.body
    const { mailId, readStatus } = req.body;

    MailBox.findOne({"user" : req.user._id})
        .then(mailbox => {
            console.log("HERE IS THE MAILBOCX FOUND MAAAAN ");
            console.log(mailbox);
            console.log("\n", "\n", "\n");
            if(mailbox) {
                mailItem = mailbox.messages.find(mail => mail._id.toString() === mailId);

                if(mailItem != undefined) {
                    // init the change variable
                    var change;

                    // if already the same value
                    if(mailItem.read === req.body.readStatus) {
                        change = 0;
                    } else if(mailItem.read) {
                        // if mail item is read and the read status in request is false
                        mailItem.read = req.body.readStatus;
                        change = 1;
                    } else if(!mailItem.read) {
                        // if mail item is  not read and the read status in request is true
                        mailItem.read = req.body.readStatus;
                        change = -1;
                    }

                    mailbox.save()
                        .then(item => {
                            res.json({success : {change}});
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
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
