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

    constructor(props){
        super(props);
        console.log("INVITE CONTIB PROPS");
        console.log(props);
        this.setState({tool : this.props.tool});
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
                <div style={{textAlign:"center"}} onClick={() => this.props.selectTool("contrib")}>Invite User</div>
                <MessageBox key={this.state.messageSubmitAttempt} message={this.state.message} />
                <div className="itemBorder itemAbsolute" style={{ display : this.props.tool === "contrib" ? "block" : "none", width : "100%"}}>
                    <form style={formStyle} onSubmit={this.submit}>
                        <div className="inputCont">
                            <input className="formInput" type="text" name="inviteUser" placeholder="Enter Username" onChange={this.changeInput} />
                            <button type="submit">+</button>
                        </div>
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
