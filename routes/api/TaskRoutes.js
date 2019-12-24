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
});

router.put('/markTasks', async (req, res) => {
    console.log("IN THE PUT REQUEST MAN");
    console.log(req.body);
    console.log("NO MAS");
    var taskItems;

    await req.body.completed.forEach(async (taskId) => {
        console.log("IN THE FIRST BLOCK");
        queryId = new ObjectId(taskId);
        await Task.findOne({_id : queryId})
            .then(task => {
                task.completed = true;
                task.date.completed = new Date();
                task.save(err => {
                    if(err){
                        console.log("ERROR ON SAVE OF THE TASK IN THE PUT REQ");
                    } else {
                        console.log("NO ERROR MAN below task saved");
                        console.log(task);
                    }
                })
            })
            .catch(err => console.log(err))
    })

    await Task.find({"project_id":new ObjectId(req.body.projectId), "path":req.body.folderPath}, (err, tasks) => {
        console.log("IN THE SECOND BLOCK");
        if (err) {
            console.log("ERROR ON THE tasks PUT UPDATE");
        } else {
            console.log("ALL GOOD TASKS");
            taskItems = tasks;
        }
    });

    console.log("JUST BEFORE FINISHED");
    console.log(taskItems);
    return res.json({tasks : taskItems, message : "Success - Goals Completed"});
})

module.exports = router
