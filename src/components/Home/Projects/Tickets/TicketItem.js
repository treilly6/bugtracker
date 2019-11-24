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
        this.state.ticketItem = this.props.location.state.ticketItem;
    }

    state = {
        ticketItem : '',
    };

    // Need to add an api call herer that sets the state of the comments
    componentDidMount(){
        console.log("MOUNTING OF THE TICKET ITEM COMPONENT");
    }

    addComment = async (comment) => {
        console.log("I THE TICKET ITEM JS DOOMMENT CFUIFND");
        await axios.post(`/api/comments/${this.state.ticketItem._id}`, comment)
            .then(res => {
                console.log(res);
                var updatedItem = this.state.ticketItem;
                updatedItem.comments.push(res.data);
                this.setState({ticketItem: updatedItem});
            })
            .catch(err => console.log(err));
        console.log("DONE");
    };

    render() {
        console.log("RENDERING THE TICKET ITEM");
        console.log(this.props);
        console.log("END OF THE PROPS IN RENDERING TICKERT");
        const title = this.props.title;
        const description = "TESTING THE DESCRIPTION AREA";
        return (
            <div style={mainCont}>
                <div style={ticketDiv}>
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
