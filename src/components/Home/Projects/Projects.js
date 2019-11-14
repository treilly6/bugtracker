import React from 'react';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class Projects extends React.Component {

    state = {}

    render() {
        var projectItems = this.props.projects.map((project) => (
            <div style={divStyle}>
                <Link to={`projects/${project.title}/`}>{project.title}</Link>
            </div>
        ));

        if (projectItems.length == 0) {
            projectItems = <h4>THERE ARE NO PROJECTS</h4>
        }

        return (
            <div>
                <h3>Projects Page</h3>
                {projectItems}
            </div>
        )
    }
}

const divStyle = {
    padding : "10px",
    margin : "10px",
    border : "1px solid black",
}

export default Projects;
