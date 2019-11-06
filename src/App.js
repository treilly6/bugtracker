import React from 'react';
import Tasks from './components/Tasks/Tasks';
import AddTask from './components/Tasks/AddTask';
import Header from './components/layout/Header';
import './App.css';

class App extends React.Component {
    state = {
        tasks : [
            {
                id : 1,
                description : "Front end Development",
                completed : false,
            },
            {
                id : 2,
                description : "Back end Development",
                completed : false,
            },
            {
                id : 3,
                description : "Database Development",
                completed : false,
            },
        ],
        count : 3,
    }

    markComplete = (taskObj) => {
        console.log("FROM APP.js");
        console.log(taskObj);
        this.setState({tasks : this.state.tasks.map(task => {
            if (taskObj.id === task.id) {
                task.completed = !task.completed;
            }
            return task;
        })});
    }

    deleteTask = (taskObj) => {
        console.log("IN APP.JS");
        console.log(taskObj);
        this.setState({tasks : [...this.state.tasks.filter(task => task.id !== taskObj.id)]});
    }

    addTask = (taskDescription) => {
        console.log("APP JS TASK ADDER");
        console.log(taskDescription);
        var id = this.state.count + 1;
        var newTask = {
            id : id,
            description : taskDescription,
            completed : false,
        };
        this.setState({count : id });
        this.setState({tasks : [...this.state.tasks, newTask]});
    }

    render() {
        return(
            <div className="App">
                <Header />
                <AddTask addTask = {this.addTask}/>
                <h3>STARTING AT SQUARE 1</h3>
                <Tasks tasks={this.state.tasks} markComplete = {this.markComplete} deleteTask = {this.deleteTask}/>
            </div>
        );
    }
}

export default App;
