const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    users : [{
        type : String,
        ref : 'User',
    }],
    messages : [{
        body : String,
        author : {
            type : String,
            ref : 'User',
        }
    }]
});

module.exports = mongoose.model("Chat", ChatSchema);
