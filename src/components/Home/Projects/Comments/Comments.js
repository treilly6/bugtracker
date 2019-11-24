import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class Comments extends React.Component {

    state = {}


    render() {
        console.log("REDNERING COMMENTS COMMENTS.js")
        console.log(this.props);
        console.log(this.props.comments);
        console.log(this.props.comments.length);
        var commentItems = this.props.comments.map((comment) => (
            < CommentItem key={comment._id} comment = {comment} />
        ));

        if (commentItems.length == 0) {
            commentItems = <h4>No Comments</h4>
        }
        return (
            <div>
                <h2>Comments</h2>
                {commentItems}
            </div>
        )
    }
}

const divStyle = {
    border : "2px solid black",
    padding : "10px",
    margin : "10px",
    display : "flex",
    alignItems : "center",
    justifyContent : "center",
    textAlign : "center",
    width : "100px",
    height : "100px",
}

export default Comments;
