import React from 'react';
import PropTypes from 'prop-types';
import TicketItem from './TicketItem'

class Tickets extends React.Component {

    state = {}


    render() {
        console.log("TICKETS HEERRE");
        console.log(this.props);
        console.log(this.props.tickets);
        return this.props.tickets.map((ticket) => (
            < TicketItem key={ticket._id} ticket={ticket} />
        ));
    }
}

export default Tickets;
