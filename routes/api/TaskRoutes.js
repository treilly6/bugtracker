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

    var retArray = await req.body.completed.map((taskId) => {
        console.log("IN THE FIRST BLOCK");
        queryId = new ObjectId(taskId);
        return Task.findOne({_id : queryId})
            .then(async task => {
                task.completed = true;
                task.date.completed = new Date();

                // return task._id;

                var saveResult = await task.save()
                    .then(task => {
                        console.log("NO ERROR MAN below task saved");
                        console.log(task._id);
                        return task._id;
                    })
                    .catch(err => {
                        console.log("ERROR ON SAVE OF THE TASK IN THE PUT REQ");
                        return -1;
                    });

                console.log("SAVE RESULT AFTER SAVE");
                console.log(saveResult);
                return saveResult;
            })
            .catch(err => {
                console.log(err);
                console.log("THERE IS AN ERROR IN THE FIND ONE");
            });
    });

    console.log("AFTER THE MAP");
    console.log(retArray);

    Promise.all(retArray)
        .then(values => {
            console.log("IN THE THEN OF THE PROMIS ALL");
            console.log(retArray)
            console.log(values);
            return res.json({updatedTasks : values});
        })

})

module.exports = router
