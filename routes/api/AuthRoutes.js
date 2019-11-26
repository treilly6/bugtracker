const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

router.post('/', (req, res) => {
    console.log("Auth ROUTE CHECK");
    console.log(req.session);
    try {
        if (req.session.passport.user) {
            console.log("Yes authenticate");
            return res.json("authenticated");
        } else {
            console.log("No authenticate");
            return res.json("");
        }
    } catch {
        console.log("No authenticate");
        return res.json("");
    }
    console.log("END");
})

module.exports = router;
