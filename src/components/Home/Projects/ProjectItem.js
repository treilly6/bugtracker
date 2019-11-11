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
        folders : [],
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
        // console.log(this.props.match.params);
        const title = this.props.match.params.projectName;
        return (
            <div>
                <h1>Project PAGE { title }</h1>
                <AddFolder addFolder = {this.addFolder} />
                <AddTicket addTicket = {this.addTicket} />
                <Folders folders = {this.state.folders} />
                <Tickets tickets={this.state.tickets} />
            </div>
        )
    }
}

export default ProjectItem;
