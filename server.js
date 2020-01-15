const express = require('express');
const mongoose = require('mongoose');
require("dotenv/config");

// Importing Route Files
const Ticket = require('./routes/api/TicketRoutes');
const SingleTicket = require('./routes/api/SingleTicketRoutes');
const Project = require('./routes/api/ProjectRoutes');
const User = require('./routes/api/UserRoutes');
const Folder = require('./routes/api/FolderRoutes');
const Comment = require('./routes/api/CommentRoutes');
const Auth = require('./routes/api/AuthRoutes');
const MailBox = require('./routes/api/MailBoxRoutes');
const Task = require('./routes/api/TaskRoutes');
const AuthLogin = require('./routes/api/AuthLoginRoutes');

const passport = require('passport');

// Not sure if i actually need these
const session = require('express-session');
// const flash = require('flash');

const app = express();

// passport config
require('./config/passport')(passport);

// Body parser
app.use(express.json());

// Express Session
app.use(session({
    secret : "secret",
    resave : true,
    saveUninitialized : true,
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/tickets', Ticket);
app.use('/api/projects', Project);
app.use('/api/user', User);
app.use('/api/folders', Folder);
app.use('/api/comments', Comment);
app.use('/api/auth', Auth);
app.use('/api/singleTicket', SingleTicket);
app.use('/api/mailBox', MailBox);
app.use('/api/tasks', Task);
app.use('/authLogin', AuthLogin);

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser : true }, (err) =>
    {
        if (err) {
            console.log("ERROR IN CONNETION");
            console.log(err);
        } else {
            console.log("SUCCESSSUFL CONNECTION");
        }
    }
);

const port = 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
