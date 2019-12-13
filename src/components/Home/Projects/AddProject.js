import React from 'react';
import PropTypes from 'prop-types';
import MessageBox from '../../../MessageBox';
import '../../../App.css';

class AddProject extends React.Component {

    state = {
        title : "",
        message : "",
        submitAttempt : 0,
        showForm : false,
    }

    changeInput = (e) => {
        this.setState({ [e.target.name] : e.target.value});
    }

    submit = async (e) => {
        e.preventDefault();
        var newProject = {
            "title" : this.state.title
        };

        var message = await this.props.addProject(newProject);
        this.setState({
            "title" : "",
            message : message,
            submitAttempt : this.state.submitAttempt + 1,
        });
    }

    toggleForm = () => {
        this.setState({showForm : !this.state.showForm});
    }

    render() {
        return (
            <div style={{display : "inline-block", padding: "0px 5px"}}>
                <button className="toolbar-button" onClick={this.toggleForm}>Add Project</button>
                <MessageBox key={this.state.submitAttempt} message={this.state.message} />
                <form onSubmit={this.submit} style={{display : this.state.showForm ? "block" : "none"}}>
                    <input type="text" name="title" value={this.state.title} onChange={this.changeInput} />
                    <button type="submit">Add Project</button>
                </form>
            </div>
        )
    }
}

const divStyle = {
    padding : "10px",
    margin : "10px",
    border : "1px solid black",
}

export default AddProject;
