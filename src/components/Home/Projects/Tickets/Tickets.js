import React from 'react';
import PropTypes from 'prop-types';
import TicketItem from './TicketItem'

class Tickets extends React.Component {

    state = {}


    render() {
        console.log("Rendering tickets.js");
        var ticketItems = this.props.tickets.map((ticket) => (
            < TicketItem key={ticket._id} ticket={ticket} />
        ));
        return (
            <div>
                <h2>Tickets</h2>
                {ticketItems}
            </div>
        );
    }
}

export default Tickets;
