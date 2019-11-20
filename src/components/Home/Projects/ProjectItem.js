import React from 'react';
import PropTypes from 'prop-types';
import AddTicket from './Tickets/AddTicket';
import Tickets from './Tickets/Tickets';
// import TicketItem from './Tickets/TicketItem';
import AddFolder from './Folders/AddFolder';
import Folders from './Folders/Folders';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';


class ProjectItem extends React.Component {

    state = {
        projectItem : '',
        tickets : [],
        folders : [],
    }

    // need to add here a method that retrieves the given project record and sets the
    // state to hold all that projects folders and tickets
    componentDidMount() {
        console.log("MOUNTING PROPS OF THE PROJECT ITEM");
        console.log(this.props);
        this.setState({projectItem : this.props.location.state});
        axios.get('/api/tickets')
            .then(res => {
                console.log("SUSSESFULLY LOADED TICKETS");
                this.setState({tickets : res.data.tickets});
            })
            .catch(err => console.log(err));
        axios.get('/api/folders')
            .then(res => {
                console.log("SUCCESSFUL FOLDER LOAD");
                console.log(res);
            })
            .catch(err => console.log(err));
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
