import React from 'react';
import PropTypes from 'prop-types';

class AddComment extends React.Component {

    state = {
        "description":"",
        "timestamp":"9:37 AM Oct 9",
    }

    changeInput = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    submit = (e) => {
        e.preventDefault();
        var newComment = {
            "description" : this.state.description,
            "timestamp" : this.state.timestamp,
        }
        this.props.addComment(newComment);
        this.setState({
            "description" : "",
        });
        console.log("COOOL");
    }


    render() {
        return (
            <div style={divStyle}>
                <form onSubmit={this.submit}>
                    <textarea onChange={this.changeInput} value={this.state.description} style={textAreaStyle} type="text" name="description" />
                    <button type="submit">Add Comment</button>
                </form>
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

const textAreaStyle = {
    minWidth : "100%",
    maxWidth : "100%",
    height : "100px",
}

export default AddComment;
