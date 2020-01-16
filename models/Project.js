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
        type : String,
    }],
    managers : [{
        type : String,
    }],
});

module.exports = mongoose.model("Project", ProjectSchema);
