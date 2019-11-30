import React from 'react';
import PropTypes from 'prop-types';
import Projects from './Projects/Projects';
import AddProject from './Projects/AddProject';
import MessageBox from '../../MessageBox';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class Home extends React.Component {

    state = {
        projects : [],
    }

    componentDidMount() {
        axios.get('/api/projects')
            .then(projects => this.setState({projects : projects.data}))
            .catch(err => console.log(err));
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
            console.log("sucess shit mans");
            console.log(res.data);
            this.setState({projects : this.state.projects.filter((elem) => elem._id != res.data)});
            console.log("worked");
        })
        .catch((err) => {
            console.log("ON NOEE");
            console.log(err)
        });
        console.log("END");
    }



    render() {

        var message;
        if (this.props.location.state && this.props.location.state.error) {
            message = <MessageBox message={this.props.location.state.error} />
        }

        return (
            <div>
                <h1>Projects Home Page</h1>
                {message}
                <AddProject addProject = {this.addProject} />
                <Projects projects = {this.state.projects} deleteProject={this.deleteProject} />
            </div>
        )
    }
}

export default Home;
