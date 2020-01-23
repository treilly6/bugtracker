const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ChatSchema = Schema({
    users : [{
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
        },
        username : {
            type: String,
        }

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