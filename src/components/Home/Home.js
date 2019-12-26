import React from 'react';
import PropTypes from 'prop-types';
import Projects from './Projects/Projects';
import AddProject from './Projects/AddProject';
import MessageBox from '../../MessageBox';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class Home extends React.Component {

    state = {
        addedProjectData : null,
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

    getAddedProject = (addedProject) => {
        this.setState({addedProjectData : addedProject});
    }



    render() {

        var message;
        if (this.props.location.state && this.props.location.state.message) {
            message = <MessageBox message={this.props.location.state.message} />
        }

        return (
            <div>
                <h1 style={{fontSize:"1.5em", textAlign : "center", margin:"15px 0px"}}>Projects</h1>
                {message}
                <AddProject getAddedProject = {this.getAddedProject.bind(this)} />
                <Projects addedProjectData={this.state.addedProjectData} deleteProject={this.deleteProject} />
            </div>
        )
    }
}

export default Home;
