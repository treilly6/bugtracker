import React from 'react';
import PropTypes from 'prop-types';
import '../../../../App.css';

class AddComment extends React.Component {

    state = {
        "body":"",
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
            "date" : new Date(),
        }
        this.props.addComment(newComment);
        this.setState({
            "body" : "",
        });
        console.log("COOOL");
    }


    render() {
        return (
            <div className="itemBorder" style={divStyle}>
                <form onSubmit={this.submit}>
                    <textarea onChange={this.changeInput} value={this.state.body} style={textAreaStyle} type="text" name="body" />
                    <div style={buttonsContainer}>
                        <div>
                            <input type="checkbox" checked={this.state.markCompleted} onChange={this.handleCheck} name="markCompleted" />
                            <label for="markCompleted">Mark Completed</label>
                        </div>
                        <div>
                            <button type="submit" className="toolbar-button" style={{backgroundColor : "#33cc33"}}>Comment</button>
                        </div>
                    </div>
                </form>
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

const textAreaStyle = {
    minWidth : "100%",
    maxWidth : "100%",
    height : "100px",
    minHeight : "100px",
}

const buttonsContainer = {
    display : "flex",
    justifyContent : "space-between",
    alignItems : "center",
    margin : "10px 0px",
}

export default AddComment;
