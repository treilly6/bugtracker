import React from 'react';
import PropTypes from 'prop-types';

class AddTask extends React.Component {

    state = {
        description : '',
        // testVal1 : '',
        // testVal2 : '',
    }


    makeTask = (task) => {
        console.log("MAKING THE TASK");
        console.log("TASK");
        console.log(this);
    }

    changeTask = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTask(this.state.description);
        this.setState({description : ''});
    }

    render() {
        console.log("NIC");
        return (
            <form onSubmit={this.onSubmit} style={{ display : "flex"}}>
                <input style={{ flex : "10"}} type="text" name="description" placeholder="Add Task . . ." value={this.state.description} onChange={this.changeTask} />
                {/* <input style={{ flex : "10"}} type="text" name="testVal1" placeholder="Add Task . . ." value={this.state.dumpster} onChange={this.changeTask} />
                <input style={{ flex : "10"}} type="text" name="testVal2" placeholder="Add Task . . ." value={this.state.ass} onChange={this.changeTask} /> */}
                <input style={{ flex : "1"}} onClick={this.props.makeTask} value="Add" type="submit" />
            </form>
        )
    }
}

// PropTypes
AddTask.propTypes = {
    addTask : PropTypes.func.isRequired
}


export default AddTask;
