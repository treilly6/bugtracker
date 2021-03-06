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
        console.log(isTicket);
        (isTicket ? this.state.projectType = "Ticket" : this.state.projectType = "Folder");
        const itemName = splitArray[splitArray.length - 1];
        var projectID = this.props.match.params.projectID;
        var folderPath = this.props.match.params.folders;

        console.log("CHECKING IF THERE ARE FOLDERS");
        console.log(folderPath);
        if(!isTicket) {
            console.log("IN THE AXIOS CALL JK MUTHA");
            this.state.dataFetched = true;
            this.state.data = 1;
        } else {
            console.log("IT IS TICKET HERE WE MAKE THE DAT FETCHED TRU");
            this.state.dataFetched = true;
            this.state.data = 1;
        }
    }

    componentDidMount() {
        console.log("Project Handler Component Mounted");
    }

    render() {
        if(!this.state.dataFetched) {
            console.log("NULL RENDER");
            return null;
        } else {
            console.log("SUPER IMPROTNANT HERE THE RENDER STATE STUFF");
            console.log(this.state);
            console.log("SUPER IMPROTANT PROPS STUFF");
            console.log(this.props);

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
                    <Route render={(props) => <TicketItem {...props} data={this.state.data} title={this.state.data.title} />} />
                </React.Fragment>;
            } else {
                console.log("IS NOT TICKER");
                returnElement =
                <React.Fragment>
                    <Route render={(props) => <ProjectItem key={this.props.match.params.folders} {...props} data={this.state.data} title={this.state.data.title} />} />
                </React.Fragment>
            }
            return (returnElement)
        }
    }
}

export default ProjectHandler;
