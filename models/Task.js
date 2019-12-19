const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    date : {
        created : {
            type : Date,
            default : Date.now,
        },
        completed : {
            type : Date,
            default : Date.now,
        }
    },
    project_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project',
        required : true,
    },
    path : {
        type : String,
    },
    completed : {
        type : Boolean,
        default : false,
    },
});

module.exports = mongoose.model("Task", TaskSchema);
