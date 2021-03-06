import React from 'react';
import PropTypes from 'prop-types';
import TicketItem from './TicketItem';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoadingCircle from '../../../LoadingCircle/LoadingCircle';
import axios from 'axios';
import '../../../../App.css';

class Tickets extends React.Component {

    state = {
        displayTickets : "open",
        tickets : [],
        dataFetched : false,
    }

    componentDidMount() {
        axios.get(`/api/tickets/${this.props.projectId}/${this.props.folderPath}`)
            .then(res => {
                this.setState({tickets : res.data.tickets, dataFetched : true});
            })
            .catch(err => {
                console.log("THER AN ERORR MAN");
                console.log(err);
            })
    }

    componentDidUpdate(prevProps){
        console.log("IN THE UPDATE");
        console.log(prevProps.addedTicketData);
        console.log(this.props.addedTicketData);
        if(this.props.addedTicketData !== prevProps.addedTicketData) {
            console.log("SET STAET ON THE UPDATE");
            this.setState({tickets : [...this.state.tickets, this.props.addedTicketData]});
        }
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

            var ticketDate = (type !== "Closed" ? new Date(ticket.date) : new Date(ticket.approved.date));
            var date = (ticketDate.getMonth() + 1).toString() + "/" + ticketDate.getDate().toString() + "/" + ticketDate.getFullYear().toString().substring(2);
            var time = ticketDate.getHours().toString() + ":" + (ticketDate.getMinutes() < 10 ? "0" + ticketDate.getMinutes().toString() : ticketDate.getMinutes().toString());


            return(
                <div style={ticketDiv}>
                    <div style={ticketCont}>
                        <div><Link className="linkStyle hoverLink" to={{
                            pathname : `ticket/${ticket.title}`
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

        if(!this.state.dataFetched) {
            return (
                <div style={{marginBottom:"20px"}}>
                    <div style={{display : "flex"}}>
                        <div className={"toolbar-header " + (this.state.displayTickets === "open" ? "toolbar-selected" : "")} style={{textAlign : "center"}}>Open Tickets</div>
                        <div className={"toolbar-header " + (this.state.displayTickets === "pending" ? "toolbar-selected" : "")} style={{textAlign : "center"}}>Pending Tickets</div>
                        <div className={"toolbar-header " + (this.state.displayTickets === "closed" ? "toolbar-selected" : "")} style={{textAlign : "center"}}>Closed Tickets</div>
                    </div>
                    <LoadingCircle content="Tickets" />
                </div>
            )
        } else {
            var openTickets = this.formatTickets(this.state.tickets.filter(ticket => !ticket.closed && !ticket.pending).sort((a,b) => {return new Date(a.date) - new Date(b.date)}), "Open");
            var pendingTickets = this.formatTickets(this.state.tickets.filter(ticket => ticket.pending).sort((a,b) => {return new Date(a.date) - new Date(b.date)}), "Pending")
            var closedTickets = this.formatTickets(this.state.tickets.filter(ticket => ticket.closed).sort((a,b) => {return new Date(b.approved.date) - new Date(a.approved.date)}), "Closed");

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
