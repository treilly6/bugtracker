const express = require('express');
const app = express();
const mongoose = require('mongoose');

// eventually separate the route
// require('./routes/routes')(app)

require("dotenv/config");

// Import Models
let Ticket = require('./models/Ticket')

// Routes
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

app.get("/about", (req,res) => {
    console.log("HERE WE GO");
    console.log("SERVER ON THE BACKEND ABOIUT THIS SHEIT YALL");
});

// Connect to DB
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
