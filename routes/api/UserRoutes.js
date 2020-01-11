const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
var ObjectId = require('mongodb').ObjectId;

let User = require('../../models/User');
let MailBox = require('../../models/MailBox');
let Project = require('../../models/Project');

router.post('/login', (req, res, next) => {
    console.log("In user login passport stuff");
    console.log(req.session);
    console.log("ABOVE IT THE SEESIOM");
    console.log(req.body);
    // res.json({"yah":"yeert", "nice" : "legti"});
    passport.authenticate('local', (err, user, info) => {
        console.log("here the user");
        console.log(user);
        console.log(err);
        console.log(info);
        if (err) {
            console.log("issa an error");
            console.log(err);
            return res.json({"error" : err});
        }
        if (!user) {
            console.log("thers no user mane");
            return res.json({"message" : "Error : Invalid Username or Password"});
        }
        console.log("theres no error or user issues so i guess do the login")
        req.logIn(user, (err) => {
            if (err) {
                return res.json({"error":`User ${req.body.username} failed log in`, "message" : err});
            }
            res.json({"message":`Success : User ${req.body.username} logged in`, "redirect" : "/projects"});
        });

    })(req, res, next);
});

router.post('/signup', async (req, res) => {
    console.log("in the use signup");
    console.log(req.body)

    // PW VALIDATION
    if(req.body.password.length < 5) {
        // password empty
        res.json({"message" : "Error : Password must be at least 5 characters long"});
        return;
    } else if (req.body.password !== req.body.password2) {
        // passwords dont match
        res.json({"message" : "Error : Passwords do not match"});
        return;
    }

    // Check if username exists //
    var validUser = true;
    await User.find({"username" : req.body.username}, (err, users) => {
        if(err){
            console.log(err);
            console.log("Error on the user route checking for username already used");
        } else {
            console.log("INNA ELSE");
            console.log(users);
            if(users.length !== 0) {
                res.json({"message" : `Error : The username ${req.body.username} is already taken`});
                validUser = false;
            }
        }
    });

    if(!validUser) {
        return;
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    console.log("here theencryptions stuff");
    console.log(salt);
    console.log(hashPassword);

    const newUser = new User({
        "username" : req.body.username,
        "password" : hashPassword,
    });

    newUser.save()
        .then((user) => {
            console.log(user);
            console.log("ABOVE IS USER AFTER SAVE");
            // flagged - need consistency for references to user for the mailbox and managers
            // const objId = new ObjectId(user._id);
            const newMailBox = new MailBox({"user" : user.username, "messages":[]});
            newMailBox.save()
                .then((mailbox) => {
                    console.log("HERE IS THE MAILBOX");
                    console.log(mailbox);
                    res.json({
                        "message" : `Success : ${newUser.username} successfully created`,
                        "redirect" : "/projects",
                    });
                })
                .catch(err => {
                    console.log("ERROR WHEN SAVING MAILBOX");
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
            err.json();
        });

});

router.get('/logout', (req, res, next) => {
    console.log("IN the logout");
    if (req.isAuthenticated()) {
        const username = req.user.username;
        req.logout();
        res.json({"success":`${username} successfully logged out`, "redirect" : "/"});
    } else {
        res.json({"error":"there is no user logged in atm"});
    }

});

router.post('/invite', (req, res) => {
    console.log("INVITE API");
    console.log(req.body);
    console.log("ABOVE IS THE DATA");
    User.findOne({username : req.body.inviteUser})
        .then(user => {
            console.log("IN THEN");
            console.log(user);
            if (user) {
                console.log("IS USER");
                // const userId = new ObjectId(user._id);
                // send message to that users inbox
                // Finding the mailbox using username
                MailBox.findOne({"user":req.body.inviteUser})
                    .then(mailbox => {
                        console.log("IN THEN OF THE MAILBOX");
                        console.log(mailbox);
                        var message = {
                            title : "Project Invitation",
                            body : `You've been invited to join the ${req.body.projectTitle}  project!`,
                            date : new Date(),
                            meta : {
                                messageType : "Invite",
                                projectId : req.body.projectId,
                            }
                        }
                        console.log("HERE MESSAGE");
                        console.log(message);
                        mailbox.messages.push(message);
                        console.log(mailbox);
                        mailbox.save((err) => {
                            if(err) {
                                console.log(err);
                                console.log("ERR ABOVE");
                                res.json({"message" : "Error : There was an an error when sending invitation"});
                            } else {
                                res.json({"message" : `Success : ${req.body.inviteUser} invited to contribute to ${req.body.projectTitle}`});
                            }
                        });
                    })
                    .catch(err => console.log(err));
            } else {
                console.log("NO USER");
                // return a error message that the user dont exist
                res.json({"message": `Error : User ${req.body.inviteUser} does not exist`});
            }
        })
        .catch(err => console.log(err))
})

router.post('/acceptInvite', (req,res) => {
    console.log("ACCEPTING THE INVITE API");
    console.log(req.body);
    console.log(req.user.username);
    try {
        var projId = new ObjectId(req.body.projectId);
    } catch {
        return res.json({"message" : "Error : Cannot find Project"})
    }

    Project.findOne({"_id" : projId})
        .then(project => {
            project.contributors.push(req.user.username)
            project.save(err => {
                if(err) {
                    console.log("ERROR ON SAVE");
                    console.log(err);
                    return res.json({"message" : "Error : Issue when saving"});
                }
                return res.json({"message" : `Success : You've been added to ${project.title}`});
            })
        })
        .catch(err => {
            console.log("ERROR ON FINDING PROJECT ACCEPT INVITE API");
            console.log(err);
        })
})

module.exports = router;
