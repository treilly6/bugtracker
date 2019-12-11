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
        ticketItems = this.props.tickets.map((ticket) => (
            <div style={ticketDiv} >
                <div style={ticketCont}>
                    <div><Link style={linkStyle} to={{
                        pathname : `ticket/${ticket.title}`,
                        state : {
                            ticketItem : ticket,
                        }
                    }} >{ ticket.title }</Link></div>
                    <div>12/9/19 12:38 PM</div>
                </div>
            </div>
        ));
        console.log("HERE TICKET ITEMS AFTER MAP");
        console.log(ticketItems)
        if(ticketItems.length === 0) {
            ticketItems =
                <h5>Currently No Tickets</h5>
        }

        return (
            <div style={ticketsCont}>
                <h2 style={{textAlign : "center", padding : "10px 0px"}}>Tickets</h2>
                {ticketItems}
            </div>
        );
    }
}

const linkStyle = {
    color : "black",
}

const ticketsCont = {
    maxWidth : "1200px",
    padding : "0 15px",
    margin : "0 auto",
}

const ticketDiv = {
    backgroundColor : "#f2f2f2",
    padding : "20px 5px",
    borderBottom : "1px solid black",
}

const ticketCont = {
    display : "flex",
    justifyContent : "space-between"
}

export default Tickets;
