import React from 'react';
import PropTypes from 'prop-types';
import Projects from './Projects/Projects';
import AddProject from './Projects/AddProject';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class Home extends React.Component {

    state = {
        projects : [{
                "title" : "GET OWNSD",
            },
            {
                "title" : "BackEnd Dev",
            },
            {
                "title" : "Front End Dev",
            },
            {
                "title" : "Database management",
            },
            {
                "title" : "maybethus",
            }
        ],
    }

    componentDidMount() {
        axios.get('/api/projects')
            .then(projects => this.setState({projects : projects.data}));
        console.log("mounted api for projects");
    }

    addProject = (newProject) => {
        // need to add the current user as teh author for this method
        axios.post('/api/projects', newProject)
        .then((project) => {
            console.log("changeing the styate");
            this.setState({projects : [...this.state.projects, project.data]});
            console.log("state changed");
        })
        .catch(err => console.log(err));
    }

    deleteProject = (projectID) => {
        console.log("IN THE DELETE FUNC");
        var config = {
            headers: {
                'User-Agent':'',
                'Accept':'',
                'Host':''
            }
        };
        var data = {
            "id" : projectID
        };
        console.log("HERE");
        axios.delete('/api/projects', {data : data}, config)
        .then((res) => {
            console.log("success deleted");
            console.log(res);
        })
        .catch((err) => {
            console.log("ON NOEE");
            console.log(err)
        });
        console.log("END");
    }



    render() {
        return (
            <div>
                <h1>Projects Home Page</h1>
                <AddProject addProject = {this.addProject} />
                <Projects projects = {this.state.projects} deleteProject={this.deleteProject} />
            </div>
        )
    }
}

export default Home;
