const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    creator : {
        type : String,
        required : true,
    },
    contributors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }]
});

module.exports = mongoose.model("Project", ProjectSchema);
