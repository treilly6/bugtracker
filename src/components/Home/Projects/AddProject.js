import React from 'react';
import PropTypes from 'prop-types';
import MessageBox from '../../../MessageBox';
import axios from 'axios';
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

    addProject = async (newProject) => {
        var data = {};
        await axios.post('/api/projects', newProject)
            .then((res) => {
                console.log("changeing the styate");
                data.message = res.data.message
                data.addedProject = res.data.addedProject
                console.log("state changed");
            })
            .catch(err => console.log(err));
        return data;
    }

    submit = async (e) => {
        e.preventDefault();
        var newProject = {
            "title" : this.state.title
        };

        var data = await this.addProject(newProject);
        this.setState({
            "title" : "",
            message : data.message,
            submitAttempt : this.state.submitAttempt + 1,
        });
        this.props.getAddedProject(data.addedProject);
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
