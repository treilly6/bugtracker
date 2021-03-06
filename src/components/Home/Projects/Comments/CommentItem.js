import React from 'react';
import PropTypes from 'prop-types';
import CommentAuthor from './CommentAuthor';
import '../../../../App.css';

class CommentItem extends React.Component {

    state = {}


    render() {
        console.log("REDNEDIN THE COMMENT ITEM COMMETNITEM.js");
        console.log(this.props);

        var commentDate = new Date(this.props.comment.date);
        var date = (commentDate.getMonth() + 1).toString() + "/" + commentDate.getDate().toString() + "/" + commentDate.getFullYear().toString().substring(2);
        var time = commentDate.getHours().toString() + ":" + (commentDate.getMinutes() < 10 ? "0" + commentDate.getMinutes().toString() : commentDate.getMinutes().toString());
        var dt = date + " " + time;

        var completedRequest = null;
        if(this.props.comment.completedRequest && this.props.comment.completedRequest.request) {
            if(this.props.comment.completedRequest.approved) {
                completedRequest = <div className="flexWrapCenter"><span className="statusSpan successMsg">Approved</span></div>;
            // checking for a string of true here b/c the Ticket model uses null as the deafault for rejected field on comments
            } else if(this.props.comment.completedRequest.rejected === "true") {
                completedRequest = <div className="flexWrapCenter"><span className="statusSpan errorMsg">Rejected</span></div>;
            } else {
                completedRequest = <div className="flexWrapCenter"><span className="statusSpan successMsg">Pending Approval</span></div>;
            }
        }

        return (
            <div className="itemBorder" style={divStyle}>
                <div style={{display : "flex", justifyContent : "flex-start"}}>
                    {completedRequest}
                </div>
                <div>
                    {this.props.comment.body}
                </div>
                <div style={{display : "flex", justifyContent : "flex-end"}}>
                    <CommentAuthor author={this.props.comment.author} date={dt} />
                </div>
            </div>
        )
    }
}

const divStyle = {
    padding : "10px",
    margin : "10px 0px",
    minHeight : "50px",
};

const timeStyle = {
    textAlign : "left",
}

export default CommentItem;
