import React from 'react';
import PropTypes from 'prop-types';
import '../../../../App.css';

class CommentItem extends React.Component {

    state = {}


    render() {
        console.log("REDNEDIN THE COMMENT ITEM COMMETNITEM.js");
        console.log(this.props);

        var completedRequest = null;
        if(this.props.comment.completedRequest && this.props.comment.completedRequest.request) {
            if(this.props.comment.completedRequest.approved) {
                completedRequest = <div>Close Request - <span className="statusSpan successMsg">Approved</span></div>;
            // checking for a string of true here b/c the Ticket model uses null as the deafault for rejected field on comments
            } else if(this.props.comment.completedRequest.rejected === "true") {
                completedRequest = <div>Close Request - <span className="statusSpan errorMsg">Rejected</span></div>;
            } else {
                completedRequest = <div>Close Request - <span className="statusSpan successMsg">Pending Approval</span></div>;
            }
        }

        return (
            <div className="itemBorder" style={divStyle}>
                {completedRequest}
                <h6 style={timeStyle}>{this.props.comment.date}</h6>
                <p>{this.props.comment.body}</p>
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
