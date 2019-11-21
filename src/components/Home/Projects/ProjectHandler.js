import React from 'react';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';
import TicketItem from './Tickets/TicketItem';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';


class ProjectHandler extends React.Component {

    state = {
        data : '',
        error : '',
        projectType : '',
        dataFetched : false,
    }

    constructor(props){
        super(props);
        console.log("CONTRUSTOR PROPS");
        console.log(this.props);
        console.log("HEEELLL YAH");
        var url = this.props.location.pathname;
        if (url[url.length - 1] === "/") {
            url = url.substring(0, url.length - 1);
        }
        const splitArray = url.split("/");
        const isTicket = splitArray[splitArray.length - 2] === "ticket" ? true : false;
        (isTicket ? this.state.projectType = "Ticket" : this.state.projectType = "Folder");
        const itemName = splitArray[splitArray.length - 1];
        var projectID = this.props.match.params.projectID;
        var folderPath = this.props.match.params.folders;

        console.log("CHECKING IF THERE ARE FOLDERS");
        console.log(folderPath);

        axios.get(`/api/projects/${projectID}/${folderPath}`)
            .then((res) => {
                console.log("SETTING THE STATE");
                console.log(res.data);
                if (res.data.error) {
                    this.setState({error:res.data.error, dataFetched:true,});
                } else {
                    this.setState({data:res.data, dataFetched:true,});
                }
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        console.log("Project Handler Component Mounted");
    }

    render() {
        if(!this.state.dataFetched) {
            return null
        } else {
            console.log("SUPER IMPROTNANT HERE THE RENDER STATE STUFF");
            console.log(this.state);
            var returnElement

            if (!this.state.data) {
                console.log("DATA IS EMPTY");
                console.log(this.state.data);
                returnElement =
                <React.Fragment>
                    <h5>Missing Data 404</h5>
                    <h6>{this.state.error}</h6>
                </React.Fragment>
            } else if (this.state.projectType === "Ticket") {
                console.log("IS TICKET");
                returnElement =
                <React.Fragment>
                    <h5>Testing the ticket</h5>
                    <Route render={(props) => <TicketItem {...props} data={this.state.data} title={this.state.data.title} />} />
                </React.Fragment>;
            } else {
                console.log("IS NOT TICKER");
                returnElement =
                <React.Fragment>
                    <h5>Testing the Folder</h5>
                    <Route render={(props) => <ProjectItem {...props} data={this.state.data} title={this.state.data.title} />} />
                </React.Fragment>
            }
            return (returnElement)
        }
    }
}

export default ProjectHandler;
