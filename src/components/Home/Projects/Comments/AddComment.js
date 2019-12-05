import React from 'react';
import PropTypes from 'prop-types';

class AddComment extends React.Component {

    state = {
        "body":"",
        "date":"9:37 AM Oct 9",
        "markCompleted" : false,
    }

    changeInput = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    handleCheck = (e) => {
        this.setState({markCompleted : !this.state.markCompleted});
    }

    submit = (e) => {
        e.preventDefault();
        var newComment = {
            "body" : this.state.body,
            "completedRequest" : {
                request : this.state.markCompleted,
                approved : false,
            },
            "date" : this.state.date,
        }
        this.props.addComment(newComment);
        this.setState({
            "body" : "",
        });
        console.log("COOOL");
    }


    render() {
        return (
            <div style={divStyle}>
                <form onSubmit={this.submit}>
                    <textarea onChange={this.changeInput} value={this.state.body} style={textAreaStyle} type="text" name="body" />
                    <div>
                        <label for="markCompleted">Mark completed</label>
                        <input type="checkbox" checked={this.state.markCompleted} onChange={this.handleCheck} name="markCompleted" />
                    </div>
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
