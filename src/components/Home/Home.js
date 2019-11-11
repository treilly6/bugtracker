import React from 'react';
import PropTypes from 'prop-types';
import AddTicket from './Tickets/AddTicket';
import Tickets from './Tickets/Tickets';
// import TicketItem from './Tickets/TicketItem';
import AddFolder from './Folders/AddFolder';
import Folders from './Folders/Folders';


class Home extends React.Component {

    state = {
        tickets : [],
        folders : [],
    }

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
        return (
            <div>
                <h1>HOME PAGE</h1>
                <AddFolder addFolder = {this.addFolder} />
                <AddTicket addTicket = {this.addTicket} />
                <Folders folders = {this.state.folders} />
                <Tickets tickets={this.state.tickets} />
            </div>
        )
    }
}

export default Home;
