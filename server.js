const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.get('/api/tasks', (req,res) => {
    const tasks = [
        {id : 4, description : "Test description 1", completed : false},
        {id : 5, description : "Test description 2", completed : false},
        {id : 6, description : "Test description 3", completed : false},
        {id : 7, description : "Back End Development", completed : false},
        {id : 8, description : "Front End Development", completed : false},
        {id : 9, description : "Database Dev", completed : false},
    ];

    res.json(tasks);
});

// Connect to DB
// mongoose.connect(url to the db);
// mongoose.connect(process.env.DB_CONNECTION)
// can use dotenv to hide the username and password

const port = 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
