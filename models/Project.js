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
        ref : 'User',
    }]
});

module.exports = mongoose.model("Project", ProjectSchema);
