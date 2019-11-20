const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let Ticket = require('../../models/Ticket');

router.get('/:projectId/:folderPath', (req,res) => {
    console.log("HERE IS THE GET REQUEST FOR THE FOLDERS");
    console.log(req.params);
    res.json();
});

router.post('/:projectId/:folderPath', (req,res) => {
    console.log("IN THE FOLDER ROUTES POST REQ");
    console.log(req.body);
    console.log(req.params);
    res.json();
})

module.exports = router;
