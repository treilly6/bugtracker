const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

let Project = require('../../models/Project');
let Folder = require('../../models/Folder');
let Ticket = require('../../models/Ticket');
let Task = require('../../models/Task');

// Method for getting the projects a user is involved in
router.get('/', (req, res) => {
    // get the string of the user's mongodb user id
    const userId = req.session.passport.user;

    // query for projects where the user is a contributor
    query = {"contributors": `${userId}`};
    Project.find(query, (err, projects) => {
        if (err) {
            console.log(err);
        } else {
            console.log("HERE THE PROJECTS");
            console.log(projects);
            // add the projects into the response object
            res.json(projects);
        }
    });
});


// Method used to get the specific project item based on the url
// This can be either a project item (if on the highest level) or a folder item (if in a nested level)
router.get('/:projectId/:folderPath*', async (req, res) => {
    console.log("In Projects API REq");
    console.log(req.params);
    // current project chldren folder path
    var fullPath = req.params.folderPath + req.params["0"];
    var folderPath = fullPath.split("/");
    // folder title
    console.log("CURRENT ITEM NAME");
    // get the current name of the folder
    var folderTitle = folderPath[folderPath.length - 1];
    console.log(folderTitle);
    // get the folder path leading up to but not including the folderTitle
    folderPath = folderPath.slice(0, folderPath.length - 1).join("/");
    console.log("HERE FOLDER PATH");
    console.log(folderPath);
    var queriesComplete = false;
    console.log("HERE THE CHILD FOLDER PATH");
    console.log(fullPath);

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

    var query = {"_id": objID};
    console.log("HERE IS THE QUERY");
    console.log(query);
    var data = {};
    // Validate the project exists
    await Project.findOne(query, (err, project) => {
        if (err) {
            console.log(err);
            console.log("ERROR IN PROJETS");
        } else {
            console.log(project);
            if (project) {
                data.project = project;
            } else {
                res.json({"message" : "Error : Project does not exist"});
            }
        }
    });

    // CHECK FOR IF THE CURRENT PROJECT ITEM EXISTS (can be a project or a folder)
    if (folderTitle == 'undefined') {
        // the current ittem is the root folder of project
        data.currentItem = data.project;
    } else {
        await Folder.findOne({"project_id" : objID, "path" : folderPath, "title" : folderTitle}, (err, projectItem) => {
            if (err) {
                console.log("ERROR IN THE FIND ONE PROJECT ITEM");
            } else {
                console.log("HERE THE PROJECT ITEM");
                if (!projectItem) {
                    console.log("NO ITEM IS PRESENT HERE");
                    return res.json({"message":"Error : This path of the project does not exist"});
                } else {
                    console.log(projectItem);
                    data.currentItem = projectItem;
                }
            }
        });
    }

    console.log("ABUT TO RETURN FROM PROJECT ROUTE");
    console.log(data);
    return res.json(data);
});


// Post method for createing a new project
router.post('/', (req, res) => {
    console.log("Posting a new project...");
    console.log(req.body.title);

    // get the string value of the user's mongodb id
    const userId = req.session.passport.user;

    // create new project instance
    var newProject = new Project({
        title : req.body.title,
        creator : userId,
        contributors : [userId],
        managers : [userId],
    });

    // save the project
    newProject.save(err => {
        if (err) {
            console.log(err);
            res.json({message : "Error : Server Error"});
        } else {
            res.json({addedProject:newProject, message : `Success : ${newProject.title} created`});
        }
    })
});


// Route to delete a project -- currently not used
// may remove this method to prevent project from being deleted
// Or only allow the creator of the project to delete the project
// Maybe could add a method which allows contributors to leave a project
router.delete('/', (req, res) => {
    console.log("IN THE DELETE AREA");
    console.log(req.body);
    console.log("body should be above");
    const id = req.body.id;
    query = {_id : req.body.id};
    Project.deleteOne(query)
        .then((result) => {
            console.log("SUCCESS Delete");
            console.log(result);
            console.log(id);
            res.json(id);
        })
            .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
