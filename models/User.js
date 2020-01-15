const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username : { type : String},
    name : { type : String},
    password : {
        type : String,
    },
    googleId : String,
});

module.exports = mongoose.model("User", UserSchema);
