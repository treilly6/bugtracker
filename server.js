const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv/config");

// Import Models
let Ticket = require('./models/Ticket')

app.get('/api/tickets', (req,res) => {
    console.log("HERE THE REQ");
    // let query = { author : "Bobis Poleni"};
    let query = {};
    Ticket.find(query, function(err, tickets) {
        if (err) {
            console.log("ERROR ON THE TICKETS API");
        } else {
            console.log("ALL GOOD")
            res.json(tickets);
        }
    }).limit(3);
});

// Connect to DB
// mongoose.connect(url to the db);
// mongoose.connect(process.env.DB_CONNECTION)
// can use dotenv to hide the username and password
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser : true }, (err) =>
    {
        if (err) {
            console.log("ERROR IN CONNETION");
            console.log(err);
        } else {
            console.log("SUCCESSSUFL CONNECTION");
            console.log(err);
        }
    }
);

const port = 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
