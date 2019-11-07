const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now,
    },
    closed : {
        type : Boolean,
        default : false,
    }
});


module.exports = mongoose.model("Ticket", TicketSchema);
