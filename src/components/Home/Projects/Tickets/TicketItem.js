import React from 'react';
import PropTypes from 'prop-types';
import Comments from '../Comments/Comments';
import AddComment from '../Comments/AddComment';
import TicketStatus from './TicketStatus';
import axios from 'axios';
import CommentAuthor from '../Comments/CommentAuthor';
import '../../../../App.css';

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
        if (this.props.location.state === undefined) {
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
