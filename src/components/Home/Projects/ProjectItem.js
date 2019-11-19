import React from 'react';
import PropTypes from 'prop-types';
import AddTicket from './Tickets/AddTicket';
import Tickets from './Tickets/Tickets';
// import TicketItem from './Tickets/TicketItem';
import AddFolder from './Folders/AddFolder';
import Folders from './Folders/Folders';

import { BrowserRouter as Router, Route } from 'react-router-dom';


class ProjectItem extends React.Component {

    state = {
        tickets : [],
        folders : [
            {
                "title":"Folder 1"
            },
            {
                "title":"Folder 2"
            },
        ],
    }


    // need to add here a method that retrieves the given project record and sets the
    // state to hold all that projects folders and tickets
    componentDidMount() {
        fetch('/api/tickets')
            .then(res => res.json())
            .then(tickets => this.setState({tickets : tickets}));
    }

    addTicket = (ticket) => {
        console.log(ticket);
        console.log(this.state.tickets);
        this.setState({tickets : [...this.state.tickets, ticket]});
        console.log("IN THE HOME JS");
    }

    addFolder = (folder) => {
        console.log("HOME JS FOLDER SHIT");
        this.setState({folders : [...this.state.folders, folder]});
    }


    render() {
        console.log(this.props);
        console.log("END OF THE PROPS");
        const title = this.props.title;
        return (
            <div>
                <h1>Project PAGE for { title }</h1>
                <AddFolder addFolder = {this.addFolder} />
                <Folders folders = {this.state.folders} />
                <AddTicket addTicket = {this.addTicket} />
                <Tickets tickets={this.state.tickets} />
            </div>
        )
    }
}

export default ProjectItem;
