const express = require('express');
const app = express();
const mongoose = require('mongoose');

// eventually separate the route
// require('./routes/routes')(app)

require("dotenv/config");

const Ticket = require('./routes/api/TicketRoutes');
const Project = require('./routes/api/ProjectRoutes');

// Import Models
// let Ticket = require('./models/Ticket');
// let Project = require('./models/Project');

// Routes
app.use('/api/tickets', Ticket);
app.use('/api/projects', Project);




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
