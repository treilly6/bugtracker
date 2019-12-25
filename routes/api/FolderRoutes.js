const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;
const express = require("express");
const router = express.Router();

let Ticket = require('../../models/Ticket');
let Folder = require('../../models/Folder');

router.get('/:projectId/:folderPath*', (req,res) => {
    console.log("HERE IS THE GET REQUEST FOR THE FOLDERS");
    console.log(req.params);

    var folderPath = (req.params.folderPath == "undefined" ? '' : req.params.folderPath + req.params["0"]);

    console.log("HERE THE Folder PATH");
    console.log(folderPath);

    var valid = true;
    var objID;

    try {
        objID = new ObjectId(req.params.projectId)
    }
    catch {
        valid = false
    }

    if(!valid) {
        return res.json({"message":"Error : Project Does Not Exist"});
    }

    Folder.find({"project_id" : objID, "path" : folderPath}, (err, folders) => {
        if (err) {
            console.log(err);
            console.log("Error on the folder query");
            res.json({"message" : "Error : Folders Not Found"});
        } else {
            console.log("IN ELSE");
            console.log(folders);
            res.json({folders : folders});
            console.log("END OF QUERY OF THE FOLDERS");
        }
    });

});

// THINK I NEED TO ADD THE * to folderPath
router.post('/:projectId/:folderPath*', (req,res) => {
    console.log("IN THE FOLDER ROUTES POST REQ");
    console.log(req.body);
    console.log(req.params);
    const folderPath = (req.params.folderPath == 'undefined' ? '' : req.params.folderPath + req.params["0"]);
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
            res.json({folder, message : `Success : ${folder.title} folder added to project`});
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
