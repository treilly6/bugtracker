import React from 'react';
import PropTypes from 'prop-types';
import MessageBox from '../../../../MessageBox';
import axios from 'axios';
import LoadingCircle from '../../../LoadingCircle/LoadingCircle';
import '../../../../App.css';

class Tasks extends React.Component {

    state = {
        showTasks : "open",
        tasks : [],
        dataFetched : false,
        manager  : null,
        markedTasks : new Set([]),
        displayTasks : true,
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
        var empty = false;
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
            empty = true;
            var type = (taskType === "Open" ? " " : " Completed ");
            taskItems =
            <div className="taskItem">
                <div>No{type}Tasks</div>
            </div>;

        }
        return {
            tasks : taskItems,
            empty : empty,
        }
    }

    toggleTasks = () => {
        this.setState({displayTasks : !this.state.displayTasks});
    }


    render() {
        console.log("RENDERING THE TASKS");
        console.log(this.props);
        console.log(this.state);

        if(!this.state.dataFetched) {
            return (
                <div style={{marginBottom:"20px"}}>
                    <div style={{display : "flex"}}>
                        <div className={"toolbar-header " + (this.state.showTasks === "open" ? "toolbar-selected" : "")} style={{textAlign : "center", display : "flex", alignItems : "center"}}>Tasks</div>
                        <div className={"toolbar-header " + (this.state.showTasks === "completed" ? "toolbar-selected" : "")} style={{textAlign : "center", display : "flex", alignItems : "center"}}>Completed Tasks</div>
                    </div>
                    <LoadingCircle content="Tasks" />
                </div>

            )
        } else {

            // var openTasks = this.formatTasks(this.props.tasks.filter(task => (this.state.openTasks.has(task._id))), "Open", this.props.manager);
            // var completedTasks = this.formatTasks(this.props.tasks.filter(task => (this.state.closedTasks.has(task._id))), "Completed", this.props.manager);

            var ot = this.state.tasks.filter(task => (!task.completed));
            var ct = this.state.tasks.filter(task => (task.completed));

            var openVals = this.formatTasks(ot, "Open", this.props.manager);
            var openTasks = openVals.tasks;
            var openEmpty = openVals.empty;

            var completedVals = this.formatTasks(ct, "Completed", this.props.manager);
            var completedTasks = completedVals.tasks;

            if(!openEmpty) {
                openTasks =
                <form onSubmit={this.submit}>
                    {openTasks}
                    <button style={{display : (this.state.markedTasks.size === 0 ? "none" : "block")}} type="submit">Mark Tasks Completed</button>
                </form>;
            }

            var toggleContent = (this.state.displayTasks ? "Hide" : "Show");

            var taskCount = {
                    open : ot.length,
                    completed : ct.length,
            };

            var shownTasks = this.state.showTasks;

            var spanDisplay = ((shownTasks === "open" || shownTasks === "completed") && taskCount[shownTasks] > 0 ? "flex" : "none");

            return (
                <div>
                    <div style={{display : "flex"}}>
                        <div className={"toolbar-header " + (this.state.showTasks === "open" ? "toolbar-selected" : "")} style={{textAlign : "center", display : "flex", alignItems : "center"}} onClick={() => this.setState({showTasks : "open"})}>Tasks</div>
                        <div className={"toolbar-header " + (this.state.showTasks === "completed" ? "toolbar-selected" : "")} style={{textAlign : "center", display : "flex", alignItems : "center"}} onClick={() => this.setState({showTasks : "completed"})}>Completed Tasks</div>
                        <span className="linkStyle hoverLink" style={{paddingLeft : "10px", fontSize : "15px", cursor:"pointer", display : spanDisplay, alignItems : "center"}} onClick={this.toggleTasks}>({toggleContent} Tasks)</span>
                    </div>
                    <div className="taskCont" style={{display : (this.state.displayTasks ? "block" : "none")}}>
                        <div style={{display : this.state.showTasks === "open" ? "block" : "none"}}>
                            {openTasks}
                        </div>
                        <div style={{display : this.state.showTasks === "completed" ? "block" : "none"}}>
                            {completedTasks}
                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default Tasks;
