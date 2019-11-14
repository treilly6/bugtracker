const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let Project = require('../../models/Project');

router.get('/', (req, res) => {
    console.log("In Projects API REq");
    query = {};
    Project.find(query, (err, projects) => {
        if (err) {
            console.log(err);
            console.log("ERROR IN PROJETS");
        } else {
            res.json(projects);
            console.log("Working");
            console.log(projects);
        }
    });
});

router.post('/', (req, res) => {
    console.log("ISSA POST");
    console.log(req.body);
    console.log(req.body.title);
    console.log("sope");
    // var newProject = new Project({
    //     title : "Post Topic",
    //     creator : "Bob Nuttdug",
    // });
    var newProject = new Project({
        title : req.body.title,
        creator : "Bob Nuttdug",
    });

    newProject.save()
    .then(project => res.json(project))
    .catch(err => console.log(err));
})

module.exports = router;
