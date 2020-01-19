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
    res.json({user : req.user, freshLogin : req.session.freshLogin});
    if(req.session.freshLogin) {
        console.log("SESSION BEFORE DELETE " , req.session, "\n","\n");
        req.session.freshLogin = false;
        console.log("SESSION AFTER DELETE " , req.session, "\n","\n");
        req.session.save();
    }
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

        // Login user
        req.logIn(user, (err) => {
            if (err) {
                return res.json({"error":`User ${req.body.username} failed log in`, "message" : err});
            }
            res.json({"message" : `Welcome back ${req.body.username}!`, "redirect" : "/projects"});
            console.log("LOGGING THE USER HERE SOME LINES " , req.session, "\n", "\n", "\n");
            req.session.freshLogin = true;
            req.session.save();
            console.log("LOGGING THE USER end lines " , req.session, "\n", "\n", "\n");
        });

    })(req, res, next);
});

// method used for local signups
router.post('/signup', async (req, res) => {
    console.log("in the use signup");
    console.log(req.body)

    const reqUsername = req.body.username.trim();
    const password = req.body.password.trim();
    const password2 = req.body.password2.trim();

    // PW VALIDATION
    if(password.length < 5) {
        // password empty
        return res.json({"message" : "Error : Password must be at least 5 characters long"});
    } else if (password !== password2) {
        // passwords dont match
        return res.json({"message" : "Error : Passwords do not match"});
    }

    // Check if username exists //
    User.find({"username" : new RegExp(`${reqUsername}`, 'i')})
        .then(users => {
            console.log("HERE ARE THE USERS LOOKING FOR THIS SHIT ", users, users.length);
            // if username is already used
            if(users.length > 0) {
                return res.json({"message" : `Error : ${reqUsername} is already in use`})
            } else {
                // if username is available

                // create salt for hash
                bcrypt.genSalt((err, salt) => {
                    // encrypt the password
                    bcrypt.hash(password, salt, (err, hashPassword) => {
                        // create a new user instance
                        const newUser = new User({
                            "username" : reqUsername,
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
                                        res.json({
                                            "message" : `Success : User ${newUser.username} Created`,
                                            "redirect" : "/projects",
                                        });
                                    })
                                    .catch(err => {
                                        console.log("ERROR WHEN SAVING MAILBOX");
                                        console.log(err);
                                    })

                                // login the new user
                                req.login(user, (err) => {
                                    if(err) {
                                        console.log("ERROR ON THE LOGIN FROM SIGNUP ", err);
                                    }
                                    req.session.freshSignup = true;
                                    req.session.save();
                                });

                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                });
            }
        })
        .catch(err => console.log(err));
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
                // Finding the mailbox using user id
                MailBox.findOne({"user":user._id})
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
                return res.json({"message" : `Success : You've been added to ${project.title}`, redirect : `/projects/${project._id}`});
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

    const reqUsername = req.body.username.trim();

    User.findOne({username : new RegExp(`${reqUsername}`, 'i')})
        .then(user => {
            if(!user) {
                User.findOne({_id : req.user._id})
                    .then(user => {
                        console.log("HERE IS THE USER FROM QUERY ", user);
                        user.username = reqUsername;
                        user.save()
                            .then(savedUser => {
                                console.log("LIVE RN HERE ", savedUser);
                                res.json({success : true, savedUsername : savedUser.username, message : `Success : Set username to ${savedUser.username}`});
                            })
                            .catch(err => console.log(err, "Error on save in post setname route"));
                    })
                    .catch(err => console.log(err));
            } else {
                console.log("USERNAME ALREADY in USE");
                res.json({success : false, savedUsername : null, usernameInUse : true, message : `Error : ${reqUsername} is already in user`});
            }
        })
        .catch(err => console.log(err));

});

module.exports = router;
