const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

let Project = require('../../models/Project');
let Folder = require('../../models/Folder');
let Ticket = require('../../models/Ticket');
let Task = require('../../models/Task');


router.get('/', (req, res) => {
    console.log("In Projects API REq no extra url stuff");
    console.log(req.user);
    // PROB WANNA CHANGE THE AUTHOR QUERY HERE TO BE A ID AND ALSO INCLUDE IF
    // NOT JUST A CRAEATOR BUT A CONTRIBUTOR
    query = {"contributors": `${req.user.username}`};
    Project.find(query, (err, projects) => {
        if (err) {
            console.log(err);
            console.log("ERROR IN PROJETS");
        } else {
            console.log("HERE THE PROJECTS");
            console.log(projects);
            res.json(projects);
            console.log("Working");
            console.log(projects);
        }
    });
});

router.get('/:projectId/:folderPath*', async (req, res) => {
    console.log("In Projects API REq");
    console.log(req.params);
    // current project chldren folder path
    var fullPath = req.params.folderPath + req.params["0"];
    var folderPath = fullPath.split("/");
    // folder title
    console.log("CURRENT ITEM NAME");
    var folderTitle = folderPath[folderPath.length - 1];
    console.log(folderTitle);
    // Current project item path
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
        res.json({"message":"Error : Project Does Not Exist"});
        return
    }

    var query = {"_id": objID};
    console.log("HERE IS THE QUERY");
    console.log(query);
    var data = {};
    // Validate the project is valid
    await Project.findOne(query, (err, project) => {
        if (err) {
            console.log(err);
            console.log("ERROR IN PROJETS");
        } else {
            console.log("HERE THE PROJECTS");
            console.log(project);
            if (project) {
                data.project = project;
                // res.json(project);
            } else {
                res.json({"message" : "Error : Project does not exist"});
            }
        }
    });

    // CHECK FOR IF THE CURRENT PROJECT ITEM EXISTS (can be a project or a folder)
    if (folderTitle == 'undefined') {
        data.currentItem = data.project;
    } else {
        await Folder.findOne({"project_id" : objID, "path" : folderPath, "title" : folderTitle}, (err, projectItem) => {
            if (err) {
                console.log("ERROR IN THE FIND ONE PROJECT ITEM");
            } else {
                console.log("HERE THE PROJECT ITEM");
                if (!projectItem) {
                    console.log("NO ITEM IS PRESENT HERE");
                    res.json({"message":"Error : This path of the project does not exist"});
                } else {
                    console.log(projectItem);
                    data.currentItem = projectItem;
                }
            }
        });
    }


    console.log("AFTER THE PORJECT SEARCH");
    console.log(fullPath);
    if (fullPath == 'undefined') {
        fullPath = '';
    }

    // GET THE CHILD FOLDERS OF THE CURRENT ITEM
    await Folder.find({"project_id" : objID, "path" : fullPath}, (err, folders) => {
        if (err) {
            console.log(err);
            console.log("Error on the folder query");
        } else {
            console.log("IN ELSE");
            console.log(folders);
            data.folders = folders;
            console.log("END OF QUERY OF THE FOLDERS");
        }
    });

    await Ticket.find({"project_id" : objID, "path" : fullPath}, (err, tickets) => {
        if (err) {
            console.log(err);
            console.log("Error on the ticket query");
        } else {
            console.log("IN ELSE");
            console.log(tickets);
            data.tickets = tickets;
            console.log("END OF QUERY OF THE FOLDERS");
        }
    })

    await Task.find({"project_id":objID, "path":fullPath}, (err, tasks) => {
        if (err) {
            console.log("ERROR ON THE tasks get API");
        } else {
            console.log("ALL GOOD TASKS");
            data.tasks = tasks;
        }
    });

    console.log("END OF THIS SHIT");
    console.log(data);
    res.json(data);
});

router.post('/', (req, res) => {
    console.log("ISSA POST");
    console.log(req.body);
    console.log(req.body.title);
    console.log(req.user)
    console.log("sope");
    // var newProject = new Project({
    //     title : "Post Topic",
    //     creator : "Bob Nuttdug",
    // });
    var newProject = new Project({
        title : req.body.title,
        creator : req.user.username,
        contributors : [req.user.username],
        managers : [req.user.username],
    });

    newProject.save(err => {
        if (err) {
            console.log(err);
            res.json({message : "Error : Server Error"});
        } else {
            res.json({project:newProject, message : `Success : ${newProject.title} created`});
        }
    })
});

router.delete('/', (req, res) => {
    console.log("IN THE DELETE AREA");
    console.log(req.body);
    console.log("body should be above");
    const id = req.body.id;
    query = {_id : req.body.id};
    Project.deleteOne(query)
    .then((result) => {
        console.log("SUCCESS MANE");
        console.log(result);
        console.log(id);
        res.json(id);
    })
    .catch((err) => {
        console.log("messed uip");
        console.log(err);
    });
});

module.exports = router;
