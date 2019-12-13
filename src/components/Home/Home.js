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

    addProject = async (newProject) => {
        var msg;
        await axios.post('/api/projects', newProject)
            .then((res) => {
                console.log("changeing the styate");
                msg = res.data.message
                this.setState({projects : [...this.state.projects, res.data.project]});
                console.log("state changed");
            })
            .catch(err => console.log(err));
        console.log("HERE THE MSG FROM ADD PROJ ", msg);
        return msg;
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
        if (this.props.location.state && this.props.location.state.message) {
            message = <MessageBox message={this.props.location.state.message} />
        }

        return (
            <div>
                <h1 style={{textAlign : "center", marginTop:"10px"}}>Projects</h1>
                {message}
                <AddProject addProject = {this.addProject} />
                <Projects projects = {this.state.projects} deleteProject={this.deleteProject} />
            </div>
        )
    }
}

export default Home;
