const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
var ObjectId = require('mongodb').ObjectId;

let User = require('../../models/User');
let MailBox = require('../../models/MailBox');

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
            res.json({"error" : err})
            return
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
            const objId = new ObjectId(user._id);
            const newMailBox = new MailBox({"user" : objId, "messages":[]});
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
                const userId = new ObjectId(user._id);
                // send message to that users inbox
                MailBox.findOne({"user":userId})
                    .then(mailbox => {
                        console.log("IN THEN OF THE MAILBOX");
                        console.log(mailbox);
                        var message = {
                            title : "Project Invitation",
                            body : `You've been invited to join the ${req.body.projectTitle}  project!`,
                            date : "4/20/69",
                        }
                        console.log("HERE MESSAGE");
                        console.log(message);
                        mailbox.messages.push(message);
                        console.log(mailbox);
                        mailbox.save((err) => {
                            if(err) {
                                res.json({"message" : "Error : There was an an error when sending invitation"});
                            } else {
                                res.json({"message" : `Success : User ${req.body.inviteUser} Invited`});
                            }
                        });
                    })
                    .catch(err => console.log(err));
            } else {
                console.log("NO USER");
                // return a error message that the user dont exist
            }
        })
        .catch(err => console.log(err))
})

module.exports = router;
