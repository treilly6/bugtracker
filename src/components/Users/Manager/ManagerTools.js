import React from 'react';
import axios from 'axios';


class ManagerTools extends React.Component {
    state = {
        inviteUser : '',
        showForm : false,
    }

    constructor(props){
        super(props);
        console.log("MANAGER TOOLS PROPS");
        console.log(props);
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
            })
            .catch(err => console.log(err));
        console.log("SUBMIT THIS SHIT PREVETN");
    }

    changeInput = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    componentDidMount(){}

    render(){
        return(
            <div>
                <div>
                    <button onClick={this.toggleForm}>Add Contributor</button>
                    <div style={{ display : this.state.showForm ? "block" : "none" }}>
                        <form onSubmit={this.submit}>
                            <input type="text" name="inviteUser" onChange={this.changeInput} />
                            <button type="submit">Invite</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const formDiv = {
    display : "block",
}

export default ManagerTools;
