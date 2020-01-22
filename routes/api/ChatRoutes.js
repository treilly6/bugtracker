const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

let Chat = require('../../models/Chat');
let User = require('../../models/User');


router.post('/newChat', (req, res) => {
    console.log("/api/chats/newChat Request ");
    console.log(req.body);

    // set the recipients variable
    const recipients = req.body;

    // init a new chat obj
    var newChat = new Chat();

    var validUserNames = [];
    var invalidUserNames = [];

    var checkRecipients = new Promise((resolve, reject) => {
        const promiseArray = [];
        recipients.forEach(username => {
            promiseArray.push(new Promise((resolve, reject) => {
                console.log("IN THE FOR EACH HERE THE USERNAME", username);
                User.findOne({username : username})
                    .then(user => {
                        console.log("HERE IS QUERY RESULT HERE ", user)
                        if(user) {
                            validUserNames.push(username);
                        } else {
                            invalidUserNames.push(username)
                        }
                        resolve();
                    })
                    .catch(err => {
                        console.log(err, "THERE AN ERROR IN THSI FOR EACH")
                    })
            }));
        });

        Promise.all(promiseArray)
            .then(() => {
                console.log("RESOLVING THE CONTAINER PROMISE");
                resolve();
            })
    });


    checkRecipients.then(() => {
        console.log("IN THE COMPLETED CHAK RECIPIENTS MAN ");
        console.log("REAL END OF THE ROUTE SHIT");
        console.log(validUserNames);
        console.log(invalidUserNames);

        if(invalidUserNames.length === 0){
            res.json({success : "Will create chat"});
        } else {
            res.json({success : "Will NOT create chat"});
        }
    });

    console.log("END OF THE ROUTE");

})

module.exports = router;
