const mongoose = require('mongoose');

const FolderSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
});

module.exports = mongoose.model("Folder", TicketSchema);
