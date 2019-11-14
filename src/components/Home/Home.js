import React from 'react';
import PropTypes from 'prop-types';
import Projects from './Projects/Projects';
import AddProject from './Projects/AddProject';
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

    addProject = (newProject) => {
        this.setState({projects : [...this.state.projects, newProject]});
    }

    render() {
        return (
            <div>
                <h1>Projects Home Page</h1>
                <AddProject addProject = {this.addProject} />
                <Projects projects = {this.state.projects} />
            </div>
        )
    }
}

export default Home;
