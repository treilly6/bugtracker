import React from 'react';
import PropTypes from 'prop-types';
import TicketItem from './TicketItem'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../../../../App.css';

class Tickets extends React.Component {

    state = {
        displayTickets : "open",
    }

    formatTickets = (tickets, type) => {
        console.log("IN THE FORMAT TICKET FUNC HERE THE TICKETS");
        console.log(tickets);
        var formattedTickets = tickets.map((ticket) => {
            var ticketStatus;
            if (ticket.closed) {
                ticketStatus = <span className="statusSpan errorMsg">Closed</span>;
            } else {
                if(ticket.pending) {
                    ticketStatus = <span className="statusSpan successMsg">Pending</span>;
                } else {
                    ticketStatus = <span className="statusSpan successMsg">Open</span>;
                }
            }

            console.log("CHECKING THE TYPE OF THE TICEKT DATE");
            console.log(typeof(ticket.date));
            var ticketDate = new Date(ticket.date);
            var date = (ticketDate.getMonth() + 1).toString() + "/" + ticketDate.getDate().toString() + "/" + ticketDate.getFullYear().toString();
            var time = ticketDate.getHours().toString() + ":" + (ticketDate.getMinutes() < 10 ? "0" + ticketDate.getMinutes().toString() : ticketDate.getMinutes().toString());
            return(
                <div style={ticketDiv}>
                    <div style={ticketCont}>
                        <div><Link className="linkStyle hoverLink" to={{
                            pathname : `ticket/${ticket.title}`,
                            state : {
                                ticketItem : ticket,
                            }
                        }} >{ ticket.title }</Link><div style={{display:"inline-block", marginTop : "5px", padding:"0px 5px"}}>{ ticketStatus }</div></div>
                        <div style={{textAlign : "right"}}><span style={{padding : "0px 3px"}}>{date}</span><span style={{padding : "0px 3px"}}>{time}</span></div>
                    </div>
                </div>
            )
        })
        if(formattedTickets.length === 0) {
            return(
                <div style={ticketDiv}>
                    <div style={noTicketCont}>
                        <div>Currently No { type } Tickets</div>
                    </div>
                </div>
            )
        };
        return formattedTickets;
    }


    render() {
        console.log("Rendering tickets.js");
        console.log("TICKET PROPS");
        console.log(this.props);
        var openTickets = this.formatTickets(this.props.tickets.filter(ticket => !ticket.closed && !ticket.pending), "Open");
        var pendingTickets = this.formatTickets(this.props.tickets.filter(ticket => ticket.pending), "Pending")
        var closedTickets = this.formatTickets(this.props.tickets.filter(ticket => ticket.closed), "Closed");

        return (
            <div style={{margin : "15px 0px"}}>
                <div style={{display : "flex"}}>
                    <div className={"toolbar-header " + (this.state.displayTickets === "open" ? "toolbar-selected" : "")} style={{textAlign : "center"}} onClick={() => this.setState({displayTickets : "open"})}>Open Tickets</div>
                    <div className={"toolbar-header " + (this.state.displayTickets === "pending" ? "toolbar-selected" : "")} style={{textAlign : "center"}} onClick={() => this.setState({displayTickets : "pending"})}>Pending Tickets</div>
                    <div className={"toolbar-header " + (this.state.displayTickets === "closed" ? "toolbar-selected" : "")} style={{textAlign : "center"}} onClick={() => this.setState({displayTickets : "closed"})}>Closed Tickets</div>
                </div>
                <div>
                    <div style={{display : this.state.displayTickets === "open" ? "block" : "none"}}>{openTickets}</div>
                    <div style={{display : this.state.displayTickets === "closed" ? "block" : "none"}}>{closedTickets}</div>
                    <div style={{display : this.state.displayTickets === "pending" ? "block" : "none"}}>{pendingTickets}</div>
                </div>
            </div>
        );
    }
}

const ticketDiv = {
    padding : "20px 5px",
    border : "1px solid #d5d8dd",
    borderRadius : "5px",
    marginBottom : "10px",
    backgroundColor : "#fff",
};

const noTicketCont = {
    justifyContent : "center",
    display : "flex",
}

const ticketCont = {
    display : "flex",
    justifyContent : "space-between"
}

export default Tickets;
