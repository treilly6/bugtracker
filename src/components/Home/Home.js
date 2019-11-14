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
        console.log(newProject);
        console.log("just befoer axios");
        axios.post('/api/projects', {params : newProject})
        .then(project => this.setState({projects : [...this.state.projects, project.data]}));
    }

    deleteProject = (projectID) => {
        console.log("IN DELETE FUND");
        console.log("clicked");
        console.log(projectID);
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
