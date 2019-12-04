const express = require("express");
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;

let Project = require('../../models/Project');

router.post('/', (req, res) => {
    console.log("Auth ROUTE CHECK");
    console.log(req.session);
    try {
        if (req.session.passport.user) {
            console.log("Yes authenticate");
            return res.json({
                authenticated : true,
                user : req.user.username,
                message : "Success : User logged in",
            });
        } else {
            console.log("No authenticate");
            return res.json({
                authenticated : false,
                message : "User is not logged in"
            });
        }
    } catch {
        console.log("No authenticate");
        return res.json({
            authenticated : false,
            message : "User is not logged in"
        });
    }
    console.log("END");
});

router.get('/manager/:projectId/:folderPath*', async (req,res) => {
    console.log("IN THE MANAGER ROUTE");
    console.log(req.params);
    var folderPath = req.params.folderPath === 'undefined' ? '' : req.params.folderPath + req.params["0"];
    console.log("HERE THE FOLDER PATH ", folderPath);

    try {
        var projId = new ObjectId(req.params.projectId)
    } catch {
        return res.json({"message" : "Error : Project Id does not exist"});
    }

    if(folderPath === '') {
        // query project managers
        await Project.findOne({"_id": projId}, (err, project) => {
            if(err) {
                console.log("ERROR IN MANAGER CHECK API");
                console.log(err);
            } else {
                if(project) {
                    if(project.managers.includes(req.user.username)) {
                        console.log("IS MANAGER");
                        res.json({"manager":true})
                    } else {
                        console.log("IS NOT MANAGER");
                        res.json({"manager":false})
                    }
                } else {
                    return res.json({"message" : "Error : This project does not exist"});
                }
            }
        })
    } else {
        // query folder managers
        res.json({"message" : "NEED TO DO WORK HERE LINE 70 AUTH ROUTES"});
    }
});

router.get('/contributor/:projectId', (req,res) => {
    console.log("HERE IN THE CONTRIBUOTR API");
    console.log(req.params);
    console.log("HERE THE USER");
    console.log(req.user);

    if (req.user === undefined) {
        return res.json({"message":"Error : User not logged in"});
    }

    // This stuff below is if i want to validate the user by the ID instead of username
    // } else {
    //     try {
    //         userId = new ObjectId(req.user._id);
    //     }
    //     catch {
    //         return res.json({"error":"Invalid user Id"});
    //     }
    // }

    try {
        objId = new ObjectId(req.params.projectId)
    }
    catch {
        return res.json({"message":"Error : Project Does Not Exist"});
    }

    var query = {"_id" : objId}
    Project.findOne(query, (err, project) => {
        if(err) {
            console.log("ERROR ON AUTHROUTE.js get req contributor");
            console.log(err);
        } else {
            console.log("HERE THE PROJECT");
            console.log(project);
            if (project) {
                console.log("PROJECT DO EXIST IN THE IF BLOCK");
                // console.log("HERE THE USER ID ", userId);
                console.log("HERE THE USERNAME ", req.user.username);
                if(project.contributors.includes(req.user.username)) {
                    console.log("IS CONTRIB");
                    res.json({"contributor" : true, "message" : null});
                } else {
                    console.log("IS NOT A CONTRIB");
                    res.json({"contributor" : false, "message" : "Error : You are not a contributor for this project"});
                }
            } else {
                res.json({"contributor" : false, "message" : "Error : Project Does Not ExistT"});
            }
        }
    })
});

module.exports = router;
