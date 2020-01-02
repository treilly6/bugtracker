const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;
const express = require("express");
const router = express.Router();

let Ticket = require('../../models/Ticket');
let Folder = require('../../models/Folder');
let Project = require('../../models/Project');

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

router.put('/:projectId/:folderPath*', async (req,res) => {
    // USED TO ADD MANAGERS TO FOLDER PATH
    console.log("IN THE PUT FOLDER REQ");
    console.log(req.body);
    console.log(req.params);
    const user = req.body.user;
    var folderPath = (req.params.folderPath == 'undefined' ? '' : req.params.folderPath + req.params["0"]);
    console.log("FOLDER PATH AFTER TERNERY");
    console.log(folderPath);

    var splitPath = folderPath.split("/");
    var folderTitle = splitPath.pop();
    if(splitPath.length === 1) {
        folderPath = splitPath[0];
    } else {
        folderPath = splitPath.join("/");
    }

    console.log("HERE IS THE FOLDER PATH ", folderPath);
    var objId = new ObjectId(req.params.projectId);
    var message = {message : ''}
    var valid;

    // CHECK TO SEE IF THE USER IS A COLLABORATOR ON THE PROJECT
    await Project.findOne({"_id" : objId})
        .then(project => {
            console.log("HERE THE PROJECT");
            console.log(project);
            if(project.contributors.includes(user)) {
                console.log("THE USER IS A COLLABORATOR");
                valid = true;
            } else {
                console.log("NOT A CONTIRUBSDFJG");
                valid = false;
            }
        })
        .catch(err => {
            console.log(err);
        });


    console.log("HERE VALID AFTER PROJECT CHECK ", valid);

    if(valid){
        message.message = await Folder.findOne({project_id : objId, path : folderPath})
            .then(folder => {
                console.log("HERE FOLDER RESULT");
                folder.managers = [...folder.managers, user];
                return folder.save()
                    .then(savedFolder => {
                        console.log("HERE THE SAVED FOLDER");
                        console.log(savedFolder);
                        return (`Success : Assigned Manager Privileges to ${user}`);
                    })
                    .catch(err => {
                        console.log("ERROR ON SAVE PUT FOLDER");
                        console.log(err);
                        return (`Error : Failed to invite ${user} to be a manager`);
                    })
            })
            .catch(err => {
                console.log("THERE AN ERROR");
                console.log(err);
            });
    } else {
        message.message = `Error : Must invite ${user} to project before assigning Manager Privileges`;
    }

    console.log("ABOUT TO RETURN");
    console.log(message);
    return res.json(message);
})

module.exports = router;
