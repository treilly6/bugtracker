const mongoose = require('mongoose');

const MailBoxSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    messages : [
        {
            title : String,
            body : String,
            date : Date,
            meta : {
                messageType : String,
                projectId : String,
            },
        }
    ],
});

module.exports = mongoose.model("MailBox", MailBoxSchema);
