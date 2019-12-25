import React from 'react';
import PropTypes from 'prop-types';
import MessageBox from '../../../../MessageBox';
import axios from 'axios';
import '../../../../App.css';

class Tasks extends React.Component {

    state = {
        tasks : [],
        dataFetched : false,
        manager  : null,
        markedTasks : new Set([]),
    }

    constructor(props){
        super(props);
        console.log("TASK CONSTRUVTOR");
        console.log(props);
        this.state.manager = this.props.manager;
    }

    componentDidMount() {
        axios.get(`/api/tasks/${this.props.projectId}/${this.props.folderPath}`)
            .then(res => {
                console.log("HERE THE RES");
                console.log(res);
                this.setState({tasks : res.data.tasks, dataFetched : true});
            })
            .catch(err => {
                console.log(err);
                console.log("ERROR IN THE TASKS GET REQ COMPNent DID MOUnT");
            })
    }

    componentDidUpdate(prevProps){
        console.log("IN THE UPDATE");
        console.log(prevProps.addedTaskData);
        console.log(this.props.addedTaskData);
        if(this.props.addedTaskData !== prevProps.addedTaskData) {
            console.log("SET STAET ON THE UPDATE");
            this.setState({tasks : [...this.state.tasks, this.props.addedTaskData]});
        }
    }

    toggleForm = () => {
        this.setState({showForm : !this.state.showForm});
    }

    submit = (e) => {
        e.preventDefault();
        console.log(e);
        console.log("IN THE SUBMIT FOR THE TASKS");
        console.log("WTF MAN ");
        this.updateTasks([...this.state.markedTasks]);
    }

    updateTasks = async (taskIds) => {
        console.log("HERE TEH TASK IDS MAN");
        console.log(taskIds);

        var updatedTasks = await axios.put('/api/tasks/markTasks', {completed : taskIds})
            .then(res => {
                console.log("HERE ARE THE TASKS WE FINALLY MADE IT");
                console.log(res);
                var updatedOpen = new Set(this.state.openTasks);
                var updatedClosed = new Set(this.state.closedTasks);
                var changes = 0;

                var tasksCopy = [...this.state.tasks];

                res.data.updatedTasks.forEach(taskId => {
                    console.log("IN THE FOR EACH");
                    console.log(typeof(taskId), taskId);
                    var copyIndex = tasksCopy.findIndex(tasks => tasks._id === taskId);
                    console.log("HERE THE COPY INDEX ", copyIndex);
                    tasksCopy[copyIndex].completed = true;
                })

                console.log("AFTER TEH FOR EACH");
                console.log(tasksCopy === this.state.tasks);
                this.setState({tasks : tasksCopy, markedTasks : new Set()});
            })
            .catch(err => {
                console.log(err);
                console.log("ERROR ON THE PUT TASKS REQ");
            })


    }

    setTasks = (taskId) => {
        console.log("HERE TEH TASK");
        console.log(this.state.markedTasks)
        console.log("HERE TEH ID");
        console.log(taskId);
        console.log(this.state.markedTasks.has(taskId));
        if (this.state.markedTasks.has(taskId)) {
            var copySet = new Set(this.state.markedTasks);
            copySet.delete(taskId);
            console.log(this.state.markedTasks);
            console.log(copySet);
            this.setState({markedTasks : copySet});
        } else {
            this.setState({markedTasks : this.state.markedTasks.add(taskId)});
        }
    }

    formatTasks = (tasks, taskType, manager) => {
        var taskItems = tasks.map(task => {
            var item;
            if (manager && taskType === "Open") {
                item =
                <div className="taskItem">
                    <input type="checkbox" checked={(this.state.markedTasks.has(task._id))} onClick={() => this.setTasks(task._id)} />
                    {task.title}
                </div>
            } else {
                item =
                <div className="taskItem">
                    {task.title}
                </div>
            }
            return item;
        });
        if (taskItems.length === 0) {
            var type = (taskType === "Open" ? " " : " Completed ");
            return <div>No{type}Tasks</div>
        }
        return taskItems;
    }


    render() {
        console.log("RENDERING THE TASKS");
        console.log(this.props);
        console.log(this.state);

        if(!this.state.dataFetched) {
            return (<div>Loading Tasks ...</div>);
        } else {

            // var openTasks = this.formatTasks(this.props.tasks.filter(task => (this.state.openTasks.has(task._id))), "Open", this.props.manager);
            // var completedTasks = this.formatTasks(this.props.tasks.filter(task => (this.state.closedTasks.has(task._id))), "Completed", this.props.manager);

            var openTasks = this.formatTasks(this.state.tasks.filter(task => (!task.completed)), "Open", this.props.manager);
            var completedTasks = this.formatTasks(this.state.tasks.filter(task => (task.completed)), "Completed", this.props.manager);


            return (
                <div>
                    <div style={{display : "flex"}}>
                        <div className={"toolbar-header " + (this.state.showTasks === "open" ? "toolbar-selected" : "")} style={{textAlign : "center"}} onClick={() => this.setState({showTasks : "open"})}>Tasks</div>
                        <div className={"toolbar-header " + (this.state.showTasks === "completed" ? "toolbar-selected" : "")} style={{textAlign : "center"}} onClick={() => this.setState({showTasks : "completed"})}>Completed Tasks</div>
                    </div>
                    <div className="taskCont">
                        <div style={{display : this.state.showTasks === "open" ? "block" : "none"}}>
                            <form onSubmit={this.submit}>
                                {openTasks}
                                <button style={{display : (this.state.markedTasks.size === 0 ? "none" : "block")}} type="submit">Mark Tasks Completed</button>
                            </form>
                        </div>
                        <div style={{display : this.state.showTasks === "completed" ? "block" : "none"}}>{completedTasks}</div>
                    </div>
                </div>
            )
        }
    }
}


export default Tasks;
