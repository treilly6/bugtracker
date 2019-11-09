import React from 'react';
import TaskItem from './TaskItem';
import PropTypes from 'prop-types';

class Tasks extends React.Component {

    render() {
        return this.props.tasks.map((task) => (
            < TaskItem key={task._id} task={task} markComplete = {this.props.markComplete} deleteTask = {this.props.deleteTask} />
        ));
    }
}

// PropTypes
Tasks.propTypes = {
    tasks : PropTypes.array.isRequired,
    markComplete : PropTypes.func.isRequired,
    deleteTask : PropTypes.func.isRequired,
}

export default Tasks;
