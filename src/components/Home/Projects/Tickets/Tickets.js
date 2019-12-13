import React from 'react';
import PropTypes from 'prop-types';
import TicketItem from './TicketItem'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../../../../App.css';

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
                    <div><Link className="linkStyle hoverLink" to={{
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

const ticketsCont = {
    padding : "0 15px",
    margin : "0 auto",
}

const ticketDiv = {
    padding : "20px 5px",
    border : "1px solid #d5d8dd",
    borderRadius : "5px",
    marginBottom : "10px",
    backgroundColor : "#fff",
};

const ticketCont = {
    display : "flex",
    justifyContent : "space-between"
}

export default Tickets;
