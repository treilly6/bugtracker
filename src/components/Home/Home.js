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
        missingUsername : false,
        freshLogin : false,
    }

    getAddedProject = (addedProject) => {
        this.setState({addedProjectData : addedProject});
    }

    componentDidMount() {
        console.log("MOUNTING PROJECTS HOME...");
        axios.get('/api/user')
            .then(res => {
                console.log("HERE THE USER RESULT");
                if(!res.data.user.username) {
                    console.log("THIS MUTHAFUCK NEEDS A USERNAME");
                    this.setState({missingUsername : true});
                } else {
                    this.setState({freshLogin : res.data.freshLogin});
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        var message;
        console.log("HERE IS THE stuff ");
        console.log(this.props.location.state);
        if (this.props.location.state && this.props.location.state.message) {
            console.log("MESSAGE BOX STUFF");
            message = <MessageBox message={this.props.location.state.message} />
        } else if (this.state.missingUsername) {
            console.log("MESSAGE BOX Missing User");
            message = <MessageBox message={"missing username"} />
        } else if(this.state.freshLogin) {
            console.log("FRESH LOG BOX");
            message = <MessageBox message={"Welcome Back!"} />
        }

        return (
            <div>
                <h1 style={{fontSize:"1.5em", textAlign : "center", margin:"15px 0px"}}>Projects</h1>
                <div style={{display : "flex", justifyContent : "center"}}>
                    {message}
                </div>                
                <AddProject getAddedProject = {this.getAddedProject.bind(this)} />
                <Projects addedProjectData={this.state.addedProjectData} deleteProject={this.deleteProject} />
            </div>
        )
    }
}

export default Home;
