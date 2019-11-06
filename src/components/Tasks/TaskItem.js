import React from 'react';
import PropTypes from 'prop-types';

class TaskItem extends React.Component {

    getStyle = () => {
        return {
            backgroundColor : "#f4f4f4",
            padding : "10px",
            borderBottom : "1px solid #000",
            textDecoration : this.props.task.completed ? "line-through":"none",
        }
    };

    render() {
        const { description } = this.props.task;
        return (
            <div style={this.getStyle()}>
                <input type="checkbox" onChange={this.props.markComplete.bind(this,this.props.task)} />{' '}
                { description }
                <button onClick={this.props.deleteTask.bind(this, this.props.task)} style={btnStyle}>x</button>
            </div>
        )
    }
}

// propTypes
TaskItem.propTypes = {
    task : PropTypes.object.isRequired,
    markComplete : PropTypes.func.isRequired,
    deleteTask : PropTypes.func.isRequired,
}

const btnStyle = {
    backgroundColor : "#ff0000",
    color : "fff",
    border : "none",
    padding : "4px 8px",
    borderRadius : "50%",
    float : "right",
}


export default TaskItem;
