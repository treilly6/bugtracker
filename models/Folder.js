const mongoose = require('mongoose');

const FolderSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    project_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project',
        required : true,
    },
    path : {
        type : String,
    },
    managers : [{
        type : String,
        ref : 'User',
    }],
});

module.exports = mongoose.model("Folder", FolderSchema);
