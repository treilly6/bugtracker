import React from 'react';
import axios from 'axios';
import MessageBox from '../../../MessageBox';
import '../../../App.css';

class InviteContributors extends React.Component {
    state = {
        messageSubmitAttempt : 0,
        message : '',
        inviteUser : '',
        showForm : false,
    }

    toggleForm = (e) => {
        console.log("SHOW THAT INPT");
        this.setState({showForm : !this.state.showForm})
    }

    submit = (e) => {
        e.preventDefault();
        var userData = {"inviteUser" : this.state.inviteUser, "projectTitle" : this.props.projectItem.title, "projectId" : this.props.projectItem._id};
        this.setState({inviteUser : ''});
        axios.post('/api/user/invite', userData)
            .then(res => {
                console.log(res);
                console.log("ABOVE IS THE RES");
                this.setState({message : res.data.message, messageSubmitAttempt : this.state.messageSubmitAttempt + 1});
            })
            .catch(err => console.log(err));
        console.log("SUBMIT THIS SHIT PREVETN");
    }

    changeInput = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    render() {
        return(
            <div>
                <button className="toolbar-button" onClick={this.toggleForm}>Add Contributor</button>
                <MessageBox key={this.state.messageSubmitAttempt} message={this.state.message} />
                <div className="itemBorder" style={{ display : this.state.showForm ? "block" : "none" }}>
                    <form style={formStyle} onSubmit={this.submit}>
                        <input className="formInput" type="text" name="inviteUser" placeholder="Enter Username" onChange={this.changeInput} />
                        <button type="submit">Invite</button>
                    </form>
                </div>
            </div>
        )
    }
}

const formStyle = {
    padding : "10px",
};

export default InviteContributors;
