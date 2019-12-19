import React from 'react';
import PropTypes from 'prop-types';
import MessageBox from '../../../../MessageBox';
import '../../../../App.css';

class Tasks extends React.Component {

    state = {
        showTasks : false,
    }

    constructor(props){
        super(props);
    }

    toggleForm = () => {
        this.setState({showForm : !this.state.showForm});
    }


    render() {
        console.log("RENDERING THE TASKS");
        console.log(this.props);
        var taskItems = this.props.tasks.map(task => (
            <div className="taskItem">{task.title}</div>
        ));

        return (
            <div>
                <h3 style={{marginBottom : "10px"}}>Tasks</h3>
                <div className="taskCont">
                    {taskItems}
                </div>
            </div>
        )
    }
}


export default Tasks;
