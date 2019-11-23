import React from 'react';
import PropTypes from 'prop-types';
import TicketItem from './TicketItem'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Tickets extends React.Component {

    state = {}


    render() {
        console.log("Rendering tickets.js");
        console.log("TICKET PROPS");
        console.log(this.props);
        var ticketItems;
        if (this.props.tickets.length == 0) {
            ticketItems =
            <h5>There are no tickets Right Now</h5>
        } else {
            ticketItems = this.props.tickets.map((ticket) => (
                <div style={ticketDiv} >
                    <div style={ticketCont}>
                        <div><Link to={{
                            pathname : `ticket/${ticket.title}`,
                            state : {
                                ticketItem : ticket,
                            }
                        }} >{ ticket.title }</Link></div>
                        <div>12/9/19 12:38 PM</div>
                    </div>
                </div>
            ));
        }

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
