const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;
const express = require("express");
const router = express.Router();

let Ticket = require('../../models/Ticket');
let Folder = require('../../models/Folder');

router.get('/:projectId/:folderPath', (req,res) => {
    console.log("HERE IS THE GET REQUEST FOR THE FOLDERS");
    console.log(req.params);
    res.json();
});

// THINK I NEED TO ADD THE * to folderPath
router.post('/:projectId/:folderPath*', (req,res) => {
    console.log("IN THE FOLDER ROUTES POST REQ");
    console.log(req.body);
    console.log(req.params);
    const folderPath = (req.params.folderPath == 'undefined' ? req.body.title : req.params.folderPath + req.params["0"] + req.body.title);
    console.log("FOLDER PATH AFTER TERNERY");
    console.log(folderPath);
    var objId = new ObjectId(req.params.projectId);
    var newFolder = new Folder({
        title : req.body.title,
        project_id : objId,
        path : folderPath,
    })
    newFolder.save()
        .then((folder) => {
            console.log("saved the folder");
            res.json(folder);
        })
        .catch((err) => {
            console.log("THER AN ERR");
            console.log(err.name);
            if (err.name == 'ValidationError') {
                res.json({"error" : "Validation Error, a required field was mishandled"})
            } else {
                res.json(err);
            }
        });
})

module.exports = router;
