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
    project_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project',
        required : true,
    },
    path : {
        type : String,
    },
    closed : {
        type : Boolean,
        default : false,
    },
    pending : {
        type : Boolean,
        default : false,
    },
    comments : [{body : String,
                date : Date,
                completedRequest : {
                    request : Boolean,
                    approved : Boolean,
                    rejected : {type : String, default : null},
                },
    }],
    approved : {
        user : {type : String, ref: "User"},
        date : Date,
    }
});


module.exports = mongoose.model("Ticket", TicketSchema);
