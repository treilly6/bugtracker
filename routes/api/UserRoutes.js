const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
var ObjectId = require('mongodb').ObjectId;

let User = require('../../models/User');
let MailBox = require('../../models/MailBox');
let Project = require('../../models/Project');

// Get the current user object
router.get('/', (req, res) => {
    console.log("IN THE USER GET REQ");
    console.log(req.session);
    console.log(req.session.passport.user);
    console.log(req.user);
    res.json({user : req.user});
});

// method for local passport login
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

// method used for local signups
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

    // encrypt the password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    console.log("here theencryptions stuff");
    console.log(salt);
    console.log(hashPassword);

    // create a new user instance
    const newUser = new User({
        "username" : req.body.username,
        "password" : hashPassword,
    });

    // Save the user
    newUser.save()
        .then((user) => {

            // Get the user's string of id
            const userId = user._id.toString();

            // create new mailbox
            const newMailBox = new MailBox({"user" : userId, "messages":[]});

            // save mailbox
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

// method for logging out users
router.get('/logout', (req, res, next) => {
    console.log("IN the logout");
    if (req.isAuthenticated()) {
        const username = req.user.username;

        // destroy the session (holds passport.js info of user)
        req.session.destroy();
        res.json({"success":`${username} successfully logged out`, "redirect" : "/"});
    } else {
        res.json({"error":"there is no user logged in atm"});
    }

});

// method for inviting user to projects
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


// method for accepting an invite to a project
router.post('/acceptInvite', (req,res) => {
    console.log("ACCEPTING THE INVITE API");
    console.log(req.body);
    console.log(req.user.username);

    // get the user's id
    const userId = req.session.passport.user;

    try {
        var projId = new ObjectId(req.body.projectId);
    } catch {
        return res.json({"message" : "Error : Cannot find Project"})
    }

    // find the project
    Project.findOne({"_id" : projId})
        .then(project => {
            // add user to contributors
            project.contributors.push(userId)
            // save project
            project.save(err => {
                if(err) {
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
});


// used to set the username from profile
router.post('/setName', (req, res) => {
    console.log("HERE IS THE NAME FOR THE REQ ", req.body.username, req.user);

    User.findOne({_id : req.user._id})
        .then(user => {
            console.log("HERE IS THE USER FROM QUERY ", user);
            user.username = req.body.username;
            user.save()
                .then(savedUser => {
                    console.log("LIVE RN HERE ", savedUser);
                    res.json({success : true, savedUsername : savedUser.username});                   
                })
                .catch(err => console.log(err, "Error on save in post setname route"));
        })
        .catch(err => console.log(err));
});

module.exports = router;
