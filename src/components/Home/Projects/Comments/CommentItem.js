import React from 'react';
import PropTypes from 'prop-types';

class CommentItem extends React.Component {

    state = {}


    render() {
        console.log("REDNEDIN THE COMMENT ITEM COMMETNITEM.js");
        console.log(this.props);
        return (
            <div style={divStyle}>
                <h6 style={timeStyle}>{this.props.comment.date}</h6>
                <p>{this.props.comment.body}</p>
            </div>
        )
    }
}

const divStyle = {
    border : "2px solid black",
    backgroundColor: "#ccc",
    padding : "10px",
    margin : "10px 0px",
    textAlign : "center",
    minHeight : "50px",
};

const timeStyle = {
    textAlign : "left",
}

export default CommentItem;
