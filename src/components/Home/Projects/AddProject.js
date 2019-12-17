import React from 'react';
import PropTypes from 'prop-types';
import MessageBox from '../../../MessageBox';
import '../../../App.css';

class AddProject extends React.Component {

    state = {
        title : "",
        message : "",
        submitAttempt : 0,
        showForm : true,
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
                <div className={this.state.showForm ? "toolbar-selected" : ""} style={{display:"inline-block", cursor : "pointer", border : "1px solid #d5d8dd", padding : "10px", borderRadius:"5px"}} onClick={this.toggleForm}>Add Project</div>
                <MessageBox key={this.state.submitAttempt} message={this.state.message} />
                <div className="itemBorder" style={{display : this.state.showForm ? "block" : "none", padding : "10px"}}>
                    <form onSubmit={this.submit}>
                        <div className="inputCont">
                            <input className="formInput" type="text" name="title" value={this.state.title} onChange={this.changeInput} />
                            <button className="plusButton" type="submit">+</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default AddProject;
