const mongoose = require('mongoose');

const MailBoxSchema = mongoose.Schema({
    user : {
        // type : mongoose.Schema.Types.ObjectId,
        type : String,
        ref : "User"
    },
    messages : [
        {
            title : String,
            body : String,
            date : Date,
            read : {
                type : Boolean,
                default : false,
            },
            meta : {
                messageType : String,
                projectId : String,
                path : String,
            },
        }
    ],
});

module.exports = mongoose.model("MailBox", MailBoxSchema);
