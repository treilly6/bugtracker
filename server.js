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
const Chats = require('./routes/api/ChatRoutes');
const UnreadMessages = require('./routes/api/UnreadMessages');

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
app.use('/api/chats', Chats);
app.use('/api/unreadMessages', UnreadMessages);

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
const server = app.listen(port, () => console.log(`Server started at port ${port}`));

// Socket config
const socket = require('socket.io');
const io = socket(server);

// make a dict to map socket connections
const socketMap = {};

// Socket Connections Files
// const SocketRoutes = require('./sockets/SocketRoutes');


io.on('connection', (socket) => {
    console.log("Server socket connection...");

    // when a ticket comment is passed
    socket.on('ticket comments', (updatedTicketItem) => {
        console.log("HERE IS updated ticket item ", updatedTicketItem);
        console.log("HERE IS THE ID OF THE TICKET ", updatedTicketItem._id)
        // io.emit('ticket comments', updatedTicketItem);

        // send to all of the sockets connected to that ticket's Id
        io.emit(`${updatedTicketItem._id}`, updatedTicketItem);
    });

    // when new chat is made
    socket.on('new chat', (chatObj) => {
        console.log("HERE IS THE CHAT OBJ ON SERVER SIDE new chat socket ", chatObj);

        // emit to all the userIds that are in the new chat
        if(chatObj.users) {
            for (const user of chatObj.users) {
                console.log("SERVER USER ", user);
                io.emit(`new chat ${user.userId}`, chatObj);
            }
        }

    });

    // on new chat message
    socket.on('new chat message', (messageObj, chatObj) => {
        console.log("SERVER SIDE HER TEH MESSAGE OBJ ");
        console.log(messageObj);
        console.log(messageObj.chatId);

        console.log("SUPER IMPRTOANT SEVRER SIDFE SSHSHSHSHSHSHHSHSHFSDKFKASDJFASDFSDAF");
        console.log(chatObj);

        for (const userObj of chatObj.users) {
            console.log("ITERATOR HERE ");
            console.log(userObj);

            // emit to the nav bar socket (look at nav.js)
            io.emit(`alerts chat message ${userObj.userId}`, chatObj._id);
        }

        // // emit to clients of the chatId the new message (ChatContacts.js)
        io.emit(`new chat message ${messageObj.chatId}`, messageObj.message);

        // // emit to the chat window of that chat Obj (ChatWindow.js)
        io.emit(`chat window ${messageObj.chatId}`, messageObj.message);

    });

    // when a user is typing
    socket.on('typing', (obj) => {
        // destructure the object to get variables chatId and username
        const { chatId, username, typing } = obj;

        // emit that the user is typing
        socket.broadcast.emit(`user typing ${chatId}`, {username, typing});
    })

    // socket that will listen for an event of new mail message
    // and will broadcast to client sockets so that the
    // mail status notification will be updated accordingly
    // socket.on(`new mail message ${}`)
});
