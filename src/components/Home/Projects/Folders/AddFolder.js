import React from 'react';
import PropTypes from 'prop-types';
import MessageBox from '../../../../MessageBox';
import '../../../../App.css';

class AddFolder extends React.Component {

    state = {
        "title" : "",
        showForm : false,
        submitAttempt : 0,
        message : '',
    }

    submit = async (e) => {
        e.preventDefault();
        console.log(this.state.title);
        var folder = {
            "title" : this.state.title,
        };
        var message = await this.props.addFolder(folder);
        console.log("ADDFOLDER JS RESULT OF FUCN");
        console.log(message);
        this.setState({"title":"", message : message, submitAttempt : this.state.submitAttempt + 1});
        console.log("IN THE SUBMIT");
    }

    changeInput = (e) => {
        this.setState({[e.target.name] : e.target.value });
        console.log(e.target.name);
    }

    toggleForm = () => {
        this.setState({showForm : !this.state.showForm});
    }


    render() {
        return (
            <div>
                <button className="toolbar-button" onClick={this.toggleForm}>Add Folder</button>
                <div style={{display : this.state.showForm ? "block" : "none"}}>
                    <MessageBox key={this.state.submitAttempt} message={this.state.message} />
                    <form style={formStyle} onSubmit={this.submit}>
                        <input type="text" name="title" value={this.state.title} onChange={this.changeInput} placeholder="Folder Title" />
                        <button>Add</button>
                    </form>
                </div>
            </div>
        )
    }
}

const formStyle = {
    backgroundColor : "#f2f2f2",
    padding : "10px",
};

export default AddFolder;
