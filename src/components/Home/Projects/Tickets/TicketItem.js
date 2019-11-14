import React from 'react';
import PropTypes from 'prop-types';
import Comments from '../Comments/Comments';
import AddComment from '../Comments/AddComment';

class TicketItem extends React.Component {

    state = {
        comments : [
            {"description":"keep getting owned","timestamp":"12:36PM Oct 7",},
            {"description":"Maybe try this","timestamp":"12:36PM Oct 7",},
            {"description":"now do this","timestamp":"12:36PM Oct 7",},
            {"description":"still meedsssed up man","timestamp":"12:36PM Oct 7",},
            {"description":"some bullshit","timestamp":"12:36PM Oct 7",},
        ],
    };

    addComment = (comment) => {
        console.log("I THE TICKET ITEM JS DOOMMENT CFUIFND");
        this.setState({comments : [...this.state.comments, comment]});
    };

    render() {
        const title = this.props.match.params.ticketTitle;
        const description = "TESTING THE DESCRIPTOIOISDFJL";
        return (
            <div style={mainCont}>
                <div style={ticketDiv}>
                    <h2 style={titleStyle}>{title}</h2>
                    <p>{description}</p>
                </div>
                <div>
                    <Comments comments={this.state.comments}></Comments>
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
