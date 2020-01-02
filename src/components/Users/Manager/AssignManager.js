import React from 'react';
import axios from 'axios';

class AssignManager extends React.Component {
    state = {
        managerUser : '',
        manager : false,
        showForm : true,
    }

    constructor(props){
        super(props);
        console.log("IN THE MANAGER CONTRUCTOR");
        if (this.props.manager === true) {
            this.state.manager = true;
        }
        console.log(this.state);
    }

    componentDidMount(){}

    changeInput = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    submit = async (e) => {
        e.preventDefault();
        console.log("SUBMIT OF THE MANAGER FUNCTION");
        console.log(this.props);
        var res = await axios.put(`/api/folders/${this.props.projectId}/${this.props.folderPath}`, {user : this.state.managerUser});
        console.log("HERE THE MESSAGE");
        console.log(res.data);
        console.log(res.data.message);
        this.setState({managerUser : ''});
        this.props.setMessage(res.data.message);
    }

    toggleForm = () => {
        console.log("IN THE TOGGLE");
        this.setState({showForm : !this.state.showForm});
    }

    render(){
        console.log("RENDERING MANAGER ASSIGN");
        console.log(this.state);
        if(this.state.manager) {
            return(
                <div style={{marginBottom : "15px"}}>
                    <div ><span onClick={this.toggleForm} style={{cursor : "pointer", color: "#0366d6"}}>Assign Manager</span></div>
                    <div className="itemBorder" style={{ display : (this.state.showForm ? "block" : "none"), width : "100%", padding:"10px"}}>
                        <form onSubmit={this.submit}>
                            <div className="inputCont">
                                <input className="formInput" type="text" name="managerUser" value={this.state.managerUser} placeholder="Enter Username" onChange={this.changeInput} />
                                <button className="plusButton" type="submit">+</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        } else {
            return null;
        }

    }
}

export default AssignManager;
