import React from 'react';
import PropTypes from 'prop-types';
import TicketItem from './TicketItem'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Tickets extends React.Component {

    state = {}


    render() {
        console.log("Rendering tickets.js");
        var ticketItems = this.props.tickets.map((ticket) => (
            <div style={ticketDiv} >
                <div style={ticketCont}>
                    <div><Link to={`ticket/${ticket.title}`} >{ ticket.title }</Link></div>
                    <div>12/9/19 12:38 PM</div>
                </div>
            </div>
        ));
        return (
            <div>
                <h2>Tickets</h2>
                {ticketItems}
            </div>
        );
    }
}

const ticketDiv = {
    backgroundColor : "#555",
    padding : "20px 5px",
    borderBottom : "1px solid black",
}

const ticketCont = {
    display : "flex",
    justifyContent : "space-between"
}

export default Tickets;
