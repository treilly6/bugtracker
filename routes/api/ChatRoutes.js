const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

let Chat = require('../../models/Chat');
let User = require('../../models/User');
const { makeUTC } = require('../../tools/dateFormat');

// create a new chat
router.post('/newChat', (req, res) => {
    console.log("/api/chats/newChat Request ");
    console.log(req.body);


    console.log(req.user.username);

    // set the recipients variable
    const recipients = req.body;

    // if recipients is empty
    if(recipients.length === 0) {
        console.log("THERE ARE NOT RECIPIENTS");
        return res.json({error : {message : "Must include users to create a chat"}})
    } else if(!recipients.includes(req.user.username)) {
        // if req user is not in the recipients add them to the array
        console.log("USERNAME NOT IN RECIPIENTS");
        recipients.push(req.user.username);
    } else if(recipients.includes(req.user.username) && recipients.length === 1) {
         // if the requesting user is in the recipeients but no other user are
        console.log("ONLY THE CURRENT USER IS IN RECIPIENTS");
        return res.json({error : {message : "Chat cannot only include self"}})
    }

    // init a new chat obj
    var newChat = new Chat();

    // init the valid and invalid username arrays
    var validUserNames = [];
    var invalidUserNames = [];

    // filter the valid and invalid usernames into their arrays
    const checkRecipients = async () => {
        console.log("IN CHECK RECIPT ASYN AWAIT")
        console.log("HERE ARE THE RECIPIENTS ", recipients, typeof(recipients))

        // check to see if the chat already exists
        let chatCheck = await Chat.find({"users.username" : {$all : recipients}, "users" : {$size : recipients.length}}, (err, chat) => {
            if(chat.length > 0) {
                console.log("THIS CHAT ALREADY EXISTS ")
                console.log(chat);
                console.log(chat.users);
                console.log("END OF THE ALREADY EXISTING CHAT");
                // Return success with the existing chat obj
                res.json({success : {chatObj : chat[0], repeat : true}});
            }
        })

        console.log("HERE IS THE CHAT CHECK VALUE ", chatCheck);

        // return out of function if the above query yields an existing chat
        if(chatCheck.length > 0) {
            console.log("CHAT is a repeat");
            return
        }

        // check if the usernames are valid or invalid
        for (username of recipients) {
            await User.findOne({username : username}, (err, user) => {
                console.log("HERE THE USENAME USED ", username);
                console.log("HERE THE QUERY RES ", user, "\n", "\n");
                if(user) {
                    validUserNames.push({userId : user._id, username : user.username});
                } else {
                    invalidUserNames.push(username)
                }
            })
        }



        console.log("IN THE COMPLETED CHAK RECIPIENTS MAN ");
        console.log("REAL END OF THE ROUTE SHIT");
        console.log(validUserNames);
        console.log(invalidUserNames);

        if(invalidUserNames.length === 0) {
            // Add the user's ids to the chat object
            validUserNames.forEach(userObj => {
                console.log("HERE IS THE FOR EACH ON THE USER ID's ", userObj, typeof(userObj), "\n", "\n");
                newChat.users.push(userObj);
            })

            newChat.save((err) => {
                if(err) {
                    res.json({error : {type : save}});
                } else {
                    console.log("SAVING THE CHAT ");
                    console.log(typeof(newChat.users[0].id));
                    // Return success with the new chat object
                    res.json({success : {message : "Success : New Chat Created", chatObj : newChat, repeat : false}});
                }
            })


        } else {
            // Return an error with an array containing the invalid usernames
            res.json({error : {type : "usernames", usernames : invalidUserNames}});
        }

    };

    // call the function created above
    checkRecipients();

    console.log("HERE IS THEN END AFTER THE ASYNC ", validUserNames, invalidUserNames);
    console.log("END OF THE ROUTE");

});

// get the chats the user is in
router.get('/', (req, res) => {
    console.log("IN THE GET REQ");

    const userId = req.session.passport.user;

    console.log(req.user._id, "HERE THE REQ USER");
    console.log(typeof(userId), typeof(req.user._id));

    console.log("HERE IS THE USERS ID");

    // find the chats a user is in
    Chat.find({"users.userId" : req.user._id})
        .then(chats => {
            console.log("HERE THE CHATS ON THE SERVER QUERY");
            console.log(chats);
            // Return the chats
            res.json({chats : chats});


        })
        .catch(err => {
            console.log(err)
        })
});

// post a new chat message
router.post('/newMessage', (req, res) => {
    console.log("IN THE POST NEW MESSAHE ROUTE ");
    console.log(req.body);

    var { chatId, message } = req.body;

    console.log("HERE IS THE USER SHIT ", req.user);

    console.log("HERE THE DESTRUCTED SHIT ", chatId, message);

    Chat.findOne({_id : chatId})
        .then(chat => {
            console.log("HERE THE SERVER CHAT ", chat);
            if(chat) {
                console.log("HERE THE SAVE MSG TO THE CHATOBJ");

                console.log(message, "START");

                // init author obj
                message.author = {};

                // assign user Id to the author obj
                message.author.userId = req.user.id;

                // add the username to the author obj
                message.author.username = req.user.username;

                // get the current utc date
                var utcDate = makeUTC();

                console.log("HERE UTC DATE ");
                console.log(utcDate);
                console.log(typeof(utcDate));

                // save the utc date
                message.date = utcDate;

                console.log("HERE IS THE MESSAHE BEFORE THE SAVE OF THE CHAT ", message);

                // push the new message into the array of messages
                chat.messages.push(message);

                chat.save(err => {
                    if(err) {
                        console.log(err, "Error on chat save post new message route ");
                        res.json({error : {message : "Error : Failed to properly save. Refresh page and try again"}});
                    } else {
                        res.json({success : {message : "Success : Message Sent", savedMessage : message}});
                    }
                })
            }
        })
        .catch(err => {
            res.json({error : {message : "Error : Failed to save message properly. Try refreshing the page"}})
        });
});

// used to toggle the read status of users in the chat
router.post('/toggleRead', (req, res) => {
    console.log("IN THE TOGGLE READ API CALL ");
    console.log(req.body);

    console.log("HERE IS THE USER ", req.user);
    console.log("HERE IS THE BODY ", req.body);

    try {
        var chatId = new ObjectId(req.body.chatId);
    } catch {
        return res.json({error : {message : "Invalid chat Id"}})
    }

    Chat.findOne({_id : chatId})
        .then(chat => {
            console.log("HERE IS THE CHAT FORM THE QUERY ");
            console.log(chat);
            console.log("IT IS MUTHA TRUCK LIT OUT HER");
            const objIndex = chat.users.findIndex(elem => elem.username === req.user.username);

            console.log("HERE IS THE INDEX OF THE OBJ INDEX ");
            console.log(objIndex);

            // change the read status
            chat.users[objIndex].unreadMessages = req.body.unreadStatus;

            chat.save(err => {
                if(err) {
                    console.log("ERROR ON SAVE OF CHAT");
                    res.json({error : "error on save chat"});
                } else {
                    res.json({success : {message : "Saved the chat", chatObj : chat}});
                }
            })
        })
        .catch(err => console.log(err))
});


// used to get the number of chats with an unread message
router.get('/unreadChatCount', (req,res) => {
    console.log("HERE THE chat count");

    // if there is not an authenticated user
    if(!req.user) {
        return res.json({error : "No user exists"})
    }

    Chat.find({"users.userId" : req.user._id})
        .then(chats => {
            if(chats.length) {
                console.log("There are chats ");

                // find the number of unread messages in the mailbox
                const chatCount = chats.reduce((countDict, chatObj) => {
                    console.log("HERE IS THE CHAT OBJ's USERS ");
                    console.log(chatObj.users);
                    // find the user obj in the chat users array
                    const userObj = chatObj.users.find((userObj) => {
                        if(userObj.username === req.user.username) {
                            return userObj;
                        }
                    });

                    if(userObj && userObj.unreadMessages) {
                        // increment the count in the dict
                        countDict.chatCount++;
                    }

                    return countDict
                }, {chatCount : 0});

                console.log("JUST BEFORE THE RETURN HERE IS THE CHAT COUNT ");
                console.log(chatCount);
                console.log("\n","\n");

                // return the chatCount
                // no need for curly braces b/c chatCount is already an object
                return res.json(chatCount);
            } else {
                return res.json({ chatCount : 0});
            }
        })
});

module.exports = router;
