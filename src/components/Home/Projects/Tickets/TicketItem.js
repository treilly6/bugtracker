import React from 'react';
import PropTypes from 'prop-types';

class TicketItem extends React.Component {

    state = {};

    render() {
        const { title, description } = this.props.ticket
        return (
            <div style={ticketDiv} >
                <div style={ticketCont}>
                    <div>{ title }</div>
                    <div>12/9/19 12:38 PM</div>
                </div>
            </div>
        )
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

export default TicketItem;
