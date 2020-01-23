const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

let Chat = require('../../models/Chat');
let User = require('../../models/User');

// create a new chat
router.post('/newChat', (req, res) => {
    console.log("/api/chats/newChat Request ");
    console.log(req.body);


    console.log(req.user.username);

    // set the recipients variable
    const recipients = req.body;

    if(!recipients.includes(req.user.username)) {
        console.log("USERNAME NOT IN RECIPIENTS");
        recipients.push(req.user.username);
    }

    // init a new chat obj
    var newChat = new Chat();

    var validUserNames = [];
    var invalidUserNames = [];

    const checkRecipients = async () => {
        console.log("IN CHECK RECIPT ASYN AWAIT")
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
                    res.json({success : {message : "Success : New Chat Created", chatObj : newChat}});
                }
            })


        } else {
            // Return an error with an array containing the invalid usernames
            res.json({error : {type : "usernames", usernames : invalidUserNames}});
        }

    };

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

    const { chatId, message } = req.body;

    console.log("HERE THE DESTRUCTED SHIT ", chatId, message);

    Chat.findOne({_id : chatId})
        .then(chat => {
            console.log("HERE THE SERVER CHAT ", chat);
            if(chat) {
                console.log("HERE THE SAVE MSG TO THE CHATOBJ");

                // push the new message into the array of messages
                chat.messages.push(message);

                chat.save(err => {
                    if(err) {
                        console.log(err, "Error on chat save post new message route ");
                        res.json({error : {message : "Error : Failed to properly save. Refresh page and try again"}});
                    } else {
                        res.json({success : {message : "Success : Message Sent"}});
                    }
                })
            }
        })
        .catch(err => {
            res.json({error : {message : "Error : Failed to save message properly. Try refreshing the page"}})
        });
})

module.exports = router;
