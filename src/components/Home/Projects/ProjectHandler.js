import React from 'react';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';
import TicketItem from './Tickets/TicketItem';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';


class ProjectHandler extends React.Component {

    state = {}

    componentDidMount() {}

    render() {
        var url = this.props.location.pathname;
        console.log(url);

        console.log("HERE SOME NEW STUFF HERE ABOUT THE ID OF THE THING");
        var projectID = this.props.match.params.projectID;

        axios.get(`/api/projects/${projectID}`)
            .then((res) => {
                console.log("HERE RES FOR ID REQ");
                console.log(res);
            })
            .catch(err => console.log(err));

        if (url[url.length - 1] === "/") {
            console.log("TRIMMING THE END");
            url = url.substring(0, url.length - 1);
        }

        const splitArray = url.split("/");
        const isTicket = splitArray[splitArray.length - 2] === "ticket" ? true : false;
        const itemName = splitArray[splitArray.length - 1];

        console.log(isTicket);
        console.log("HERE IS THE ITEM NAME");
        console.log(itemName);

        // Think i need the parent element to do stuff for querying tickets/comments
        var parentItem;
        var returnElement;

        if (isTicket) {
            console.log("IS TICKET");
            parentItem = splitArray[splitArray.length - 3];
            returnElement =
            <React.Fragment>
                <h5>Testing the ticket</h5>
                <Route render={(props) => <TicketItem {...props} title={itemName} />} />
            </React.Fragment>
        } else {
            console.log("IS NOT TICKER");
            parentItem = splitArray[splitArray.length - 2];
            returnElement =
            <React.Fragment>
                <h5>Testing the Folder</h5>
                <Route render={(props) => <ProjectItem {...props} title={itemName} />} />
            </React.Fragment>
        }

        console.log("HERE WE GO");

        return (returnElement)
    }
}

export default ProjectHandler;
