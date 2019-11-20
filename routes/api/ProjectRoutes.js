const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

let Project = require('../../models/Project');


router.get('/', (req, res) => {
    console.log("In Projects API REq no extra url stuff");
    console.log(req.user);
    // PROB WANNA CHANGE THE AUTHOR QUERY HERE TO BE A ID AND ALSO INCLUDE IF
    // NOT JUST A CRAEATOR BUT A CONTRIBUTOR
    query = {"creator": `${req.user.username}`};
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

router.get('/:projectID', (req, res) => {
    console.log("In Projects API REq");
    console.log(req.params)
    var valid = true;
    try {
        const objID = new ObjectId(req.params.projectID)
    }
    catch {
        valid = false
    }

    if(!valid) {
        res.json({"error":"invalid project query"});
        return
    }

    var query = {"_id": objID};
    console.log("HERE IS THE QUERY");
    console.log(query);
    Project.findOne(query, (err, project) => {
        if (err) {
            console.log(err);
            console.log("ERROR IN PROJETS");
        } else {
            console.log("HERE THE PROJECTS");
            console.log(project);
            if (project) {
                res.json(project);
            } else {
                res.json({"error" : "Project does not exist"});
            }
        }
    });
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
    });

    newProject.save()
    .then(project => res.json(project))
    .catch(err => console.log(err));
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
