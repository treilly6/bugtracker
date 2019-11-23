import React from 'react';
import PropTypes from 'prop-types';
import Comments from '../Comments/Comments';
import AddComment from '../Comments/AddComment';

class TicketItem extends React.Component {

    constructor(props) {
        super(props);
        console.log("CONTRUCTOR OF TICKET ITEM");
    }

    state = {
        comments : [
            {"description":"keep getting owned","timestamp":"12:36PM Oct 7",},
            {"description":"Maybe try this","timestamp":"12:36PM Oct 7",},
            {"description":"now do this","timestamp":"12:36PM Oct 7",},
            {"description":"still meedsssed up man","timestamp":"12:36PM Oct 7",},
            {"description":"some bullshit","timestamp":"12:36PM Oct 7",},
        ],
    };

    // Need to add an api call herer that sets the state of the comments
    componentDidMount(){
        console.log("MOUNTING OF THE TICKET ITEM COMPONENT");
    }

    addComment = (comment) => {
        console.log("I THE TICKET ITEM JS DOOMMENT CFUIFND");
        this.setState({comments : [...this.state.comments, comment]});
    };

    componentDidUpdate(prevProps, prevState) {
        console.log("TICKTE ITEM DID UPDATE FUNC");
    }

    render() {
        console.log("RENDERING THE TICKET ITEM");
        console.log(this.props);
        console.log("END OF THE PROPS IN RENDERING TICKERT");
        const title = this.props.title;
        const description = "TESTING THE DESCRIPTION AREA";
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
