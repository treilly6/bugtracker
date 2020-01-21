import React from 'react';
import PropTypes from 'prop-types';
import Comments from '../Comments/Comments';
import AddComment from '../Comments/AddComment';
import TicketStatus from './TicketStatus';
import axios from 'axios';
import CommentAuthor from '../Comments/CommentAuthor';
import '../../../../App.css';

import io from 'socket.io-client';

// init the socket var outside the class
let socket;

class TicketItem extends React.Component {

    state = {
        ticketItem : '',
        message : '',
        dataFetched : false,
    };

    constructor(props) {
        super(props);
        console.log("CONTRUCTOR OF TICKET ITEM");
        console.log(props);

        // if no socket then create one listening to the server port
        if(!socket) {
            console.log("CREATING A SOCKET IN THE TICKET ITEM CONSTRUCTOR");
            socket = io(':5000');
        }
    }

    // Need to add an api call herer that sets the state of the comments
    componentDidMount(){
        console.log("MOUNTING OF THE TICKET ITEM COMPONENT");
        axios.get(`/api/singleTicket/${this.props.match.params.projectID}/${this.props.match.params.folders}`)
            .then(res => {
                console.log("IN THEN OF TICKET ITEM JS API CALL");
                console.log(res);
                this.setState({ticketItem : res.data.ticket, message : res.data.message, dataFetched : true});

                // When server emits a socket of the ticket items ID
                socket.on(`${res.data.ticket._id}`, (updatedTicketItem) => {
                    console.log("HERE IS THE UPDATED TICKET ON CLIENT SIDE SPECIFIC SHIT", updatedTicketItem)
                    console.log("GONNA SET THE STATE");
                    console.log("BEFORE : ", this.state.ticketItem);
                    this.setState({ticketItem : updatedTicketItem});
                    console.log("AFTER : ", this.state.ticketItem);
                });

            })
            .catch(err => console.log(err));
    }

    sendToSocket = (socket, comment) => {
        console.log("IN THE SEND SOCKET FUNCTION");
        socket.emit('ticket comments', comment);
    }

    addComment = async (comment) => {
        console.log("I THE TICKET ITEM JS DOOMMENT CFUIFND");
        console.log(window.location.href);
        console.log(window.location.pathname);
        console.log(this.props);
        await axios.post(`/api/comments/${this.state.ticketItem._id}`, {comment : comment, path : this.props.location.pathname})
            .then(res => {
                console.log(res);
                // var updatedItem = this.state.ticketItem;
                // updatedItem.comments.push(res.data.savedComment);

                // with sockets might not need this
                // this.setState({ticketItem: res.data.ticketSaved});

                // is calling the socket function
                // should probably only be the comment but im not sure
                // how sockets work fully yet
                this.sendToSocket(socket, res.data.ticketSaved);
            })
            .catch(err => console.log(err));
        console.log("DONE");

    };

    evalRequest = (data) => {
        console.log("IN APROVE REQ FUNC");
        axios.put(`/api/tickets/eval/${this.state.ticketItem._id}`, data)
            .then(res => {
                console.log("HERE RESULT");
                console.log(res);
                if(res.data.savedTicket) {
                    console.log("CHANGEING THE STATE");
                    this.setState({ticketItem : res.data.savedTicket});
                }
            })
            .catch(err => console.log(err));
    }


    render() {
        console.log("RENDERING TICKET ITEM COMPONENT");
        console.log(this.state);
        console.log("ABOVE STATE");

        console.log("MOST IMPORTANT SOCKET INFORmation");

        if(!this.state.dataFetched) {
            console.log("NULL RENDER");
            return null;
        } else if(this.state.ticketItem) {
            console.log("RENDERING THE TICKET ITEM");
            console.log(this.props);
            console.log("END OF THE PROPS IN RENDERING TICKERT");
            const title = this.props.title;
            var addComments;
            if(!this.state.ticketItem.closed) {
                addComments =
                <div>
                    <AddComment addComment = {this.addComment}></AddComment>
                </div>;
            }

            var ticketDate = new Date(this.state.ticketItem.date);
            var date = (ticketDate.getMonth() + 1).toString() + "/" + ticketDate.getDate().toString() + "/" + ticketDate.getFullYear().toString().substring(2);
            var time = ticketDate.getHours().toString() + ":" + (ticketDate.getMinutes() < 10 ? "0" + ticketDate.getMinutes().toString() : ticketDate.getMinutes().toString());
            var dt = date + " " + time;

            return (
                <div style={mainCont}>
                    <div className="itemBorder" style={{padding : "10px"}}>
                        <div style={{display : "flex", alignItems : "flex-start", margin : "5px 0px"}}>
                            <TicketStatus evalRequest={this.evalRequest.bind(this)} ticketItem={this.state.ticketItem} />
                        </div>

                        <h2 style={titleStyle}>{this.state.ticketItem.title}</h2>
                        <div className="flexWrapCenter" style={{minHeight : "100px"}}>
                            <div>{this.state.ticketItem.description}</div>
                        </div>
                        <div style={{display : "flex", justifyContent : "flex-end"}}>
                            <CommentAuthor author={this.state.ticketItem.author} date={dt} />
                        </div>
                    </div>
                    <div style={{marginTop : "10px"}}>
                        <Comments comments={this.state.ticketItem.comments}></Comments>
                    </div>
                    {addComments}
                </div>
            )
        } else {
            return(
                <div>
                    <h4>404 {this.state.message}</h4>
                </div>
            )
        }
    }
}

const mainCont = {
    marginTop : "15px",
    textAlign: "center",
}

const titleStyle = {
    padding : "5px",
    borderBottom : "1px solid #d5d8dd",
}

export default TicketItem;
