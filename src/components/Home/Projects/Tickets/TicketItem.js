import React from 'react';
import PropTypes from 'prop-types';
import Comments from '../Comments/Comments';
import AddComment from '../Comments/AddComment';
import axios from 'axios';

class TicketItem extends React.Component {

    constructor(props) {
        super(props);
        console.log("CONTRUCTOR OF TICKET ITEM");
        console.log(props);
        if (this.props.location.state === undefined) {
            console.log("ABOVE IS THE MONEY SHOT");
            axios.get(`/api/singleTicket/${this.props.match.params.projectID}/${this.props.match.params.folders}`)
                .then(res => {
                    console.log("IN THEN OF TICKET ITEM JS API CALL");
                    console.log(res);
                    this.setState({ticketItem : res.data.ticket, message : res.data.message, dataFetched : true});
                })
                .catch(err => console.log(err));
        } else {
            this.state.ticketItem = this.props.location.state.ticketItem;
            this.state.dataFetched = true;
        }
    }

    state = {
        ticketItem : '',
        message : '',
        dataFetched : false,
    };

    // Need to add an api call herer that sets the state of the comments
    componentDidMount(){
        console.log("MOUNTING OF THE TICKET ITEM COMPONENT");
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
                this.setState({ticketItem: res.data.ticketSaved});
            })
            .catch(err => console.log(err));
        console.log("DONE");
    };

    render() {
        console.log("RENDERING TICKET ITEM COMPONENT");
        console.log(this.state);
        console.log("ABOVE STATE");
        var ticketStatus;
        if(this.state.ticketItem.closed) {
            ticketStatus =
            <div>
                <h6>CLOSED</h6>
            </div>
        } else {
            if(this.state.ticketItem.pending) {
                ticketStatus =
                <div>
                    <h6>Pending Approval</h6>
                </div>;
            } else {
                ticketStatus =
                <div>
                    <h6>OPEN</h6>
                </div>;
            }
        }

        if(!this.state.dataFetched) {
            console.log("NULL RENDER");
            return null;
        } else if(this.state.ticketItem) {
            console.log("RENDERING THE TICKET ITEM");
            console.log(this.props);
            console.log("END OF THE PROPS IN RENDERING TICKERT");
            const title = this.props.title;
            const description = "TESTING THE DESCRIPTION AREA";
            return (
                <div style={mainCont}>
                    <div style={ticketDiv}>
                        {ticketStatus}
                        <h2 style={titleStyle}>{this.state.ticketItem.title}</h2>
                        <p>{this.state.ticketItem.description}</p>
                    </div>
                    <div>
                        <Comments comments={this.state.ticketItem.comments}></Comments>
                    </div>
                    <div>
                        <AddComment addComment = {this.addComment}></AddComment>
                    </div>
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

const ticketDiv = {
    backgroundColor : "#ccc",
    border : "2px solid black",
};

const mainCont = {
    maxWidth : "800px",
    marginLeft : "auto",
    marginRight : "auto",
    marginTop : "15px",
    textAlign: "center",
}

const titleStyle = {
    padding : "5px",
    borderBottom : "2px solid #bbb",
}

export default TicketItem;
