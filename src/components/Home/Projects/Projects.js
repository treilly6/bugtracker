import React from 'react';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../../../App.css';


class Projects extends React.Component {

    state = {}

    render() {
        console.log("IN THE REMDER FOR THE PRO");
        console.log(this.props);
        var projectItems = this.props.projects.map((project) => (
            <div className="projectItemCont">
                <div className="projectItemDiv">
                    <Link className="linkStyle hoverLink" to={{
                        pathname : `projects/${project._id}/`,
                        state : project,
                    }}>{project.title}</Link>
                </div>
            </div>
        ));

        var flexCenter = false;
        if (projectItems.length == 0) {
            flexCenter = true;
            projectItems = <h4>You are not currently involved in any projects</h4>;
        }

        return (
            <div className="projectsContainer" style={{justifyContent : flexCenter ? "center" : "flex-start"}}>
                {projectItems}
            </div>
        )
    }
}

export default Projects;
