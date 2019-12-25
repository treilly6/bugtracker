import React from 'react';
import PropTypes from 'prop-types';
import '../../../../App.css';
import axios from 'axios';

class AddTask extends React.Component {

    state = {
        "title" : "",
        showForm : false,
    }

    constructor(props){
        super(props);
        console.log("ADD TASK CONTRUCTOR");
        console.log(props);
    }

    addTask = async (task) => {
        console.log("ADDTASK FUNC IN PROJCET ITEM JS");
        console.log(task);
        var data = {};

        await axios.post(`/api/tasks/${this.props.projectId}/${this.props.folderPath}`, task)
            .then(res => {
                console.log("HERE RES");
                console.log(res);
                data.message = res.data.message;
                if(!res.data.error) {
                    console.log("NO ERROR SAVED THE STATE FOR THE TASK");
                    data.addedTask = res.data.task;
                    // this.setState({tasks : [...this.state.tasks, res.data.task]});
                }
            })
            .catch(err => {
                console.log("ERROR ADD TASK FUNC");
                console.log(err);
            })
        return data
    }

    submit = async (e) => {
        e.preventDefault();
        console.log(this.state.title);
        var task = {
            "title" : this.state.title,
        };
        var data = await this.addTask(task);
        this.props.setMessage(data.message);
        this.props.getAddedTask(data.addedTask);
        this.setState({"title":""});
    }

    changeInput = (e) => {
        this.setState({[e.target.name] : e.target.value });
        console.log(e.target.name);
    }

    toggleForm = () => {
        this.setState({showForm : !this.state.showForm});
    }


    render() {
        console.log("RENDERING THE ADD task");
        console.log(this.props);
        return (
            <div className={"toolbar-header " + (this.props.tool === "tasks" ? "toolbar-selected" : "")}>
                <div style={{textAlign:"center", cursor : "pointer"}} onClick={() => this.props.selectTool("tasks")}>Add Task</div>
                <div>
                    <div className="itemBorder itemAbsolute" style={{display : this.props.tool === "tasks" ? "block" : "none", width : "100%"}}>
                        <form style={formStyle} onSubmit={this.submit}>
                            <div className="inputCont">
                                <input className="formInput" type="text" name="title" value={this.state.title} onChange={this.changeInput} placeholder="Enter Task" />
                                <button className="plusButton">+</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const formStyle = {
    padding : "10px",
};

export default AddTask;
