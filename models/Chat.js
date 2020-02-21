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
        },
        unreadMessages : {
            type : Boolean,
            default : false,
        }
    }],
    messages : [{
        body : String,
        author : {
            userId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
            },
            username : {
                type : String,
            }
        },
        date : {
            type : Date,
        },
    }],
});

module.exports = mongoose.model("Chat", ChatSchema);
