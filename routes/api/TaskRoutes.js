const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

let Task = require('../../models/Task');


router.get('/:projectId/:folderPath*', async (req, res) => {
    console.log("IN THE GOALS GET API");
    console.log(req.params);
    const fullPath = (req.params.folderPath == 'undefined' ? '' : req.params.folderPath + req.params["0"]);
    console.log(fullPath);

    try {
        objID = new ObjectId(req.params.projectId)
    }
    catch {
        valid = false
    }

    let query = {"project_id":objID, "path":fullPath};

    Task.find(query, (err, tasks) => {
        if (err) {
            console.log("ERROR ON THE tasks get API");
        } else {
            console.log("ALL GOOD");
            res.json({"tasks" : tasks});
        }
    });
});

router.post('/:projectId/:folderPath*', async (req, res) => {
    console.log("TASK POST");
    console.log(req.body);
    const fullPath = (req.params.folderPath == 'undefined' ? '' : req.params.folderPath + req.params["0"]);
    console.log(fullPath);
    console.log(req.body.title);
    console.log(req.user.username);
    newTask = new Task({
        title : req.body.title,
        author : req.user.username,
        project_id : new ObjectId(req.params.projectId),
        path : fullPath,
    });

    newTask.save()
        .then(task => {
            console.log("saved the task");
            res.json({task, message : `Success : Created Task`});
        })
        .catch(err => {
            console.log("theres an error in post task route save attempt");
            console.log(err);
        });
    res.json({message : "Success : Created Task", task : newTask});
});

module.exports = router
