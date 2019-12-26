import React from 'react';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoadingCircle from '../../LoadingCircle/LoadingCircle';
import '../../../App.css';


class Projects extends React.Component {

    state = {
        projects : [],
        dataFetched : false,
    }

    componentDidMount() {
        axios.get('/api/projects')
            .then(projects => this.setState({projects : projects.data, dataFetched : true}))
            .catch(err => console.log(err));
        console.log("mounted api for projects");
    }

    componentDidUpdate(prevProps) {
        if(this.props.addedProjectData !== prevProps.addedProjectData) {
            this.setState({projects : [...this.state.projects, this.props.addedProjectData]});
        }
    }

    render() {
        if(!this.state.dataFetched) {
            return (
                <div style={{marginBottom :"20px"}}>
                    <LoadingCircle content="Projects" />
                </div>
            )
        } else {
            console.log("IN THE REMDER FOR THE PROjects");
            var projectItems = this.state.projects.map((project) => (
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
}

export default Projects;
