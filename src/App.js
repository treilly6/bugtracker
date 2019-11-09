import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Tasks from './components/Tasks/Tasks';
import AddTask from './components/Tasks/AddTask';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Home from './components/Home/Home';

// Style
import './App.css';

class App extends React.Component {
    state = {
        tasks : [],
        folders : [],
    }

    componentDidMount() {
        fetch('/api/tickets')
            .then(res => res.json())
            .then(tasks => this.setState({tasks : tasks}));
    }

    markComplete = (taskObj) => {
        console.log("FROM APP.js");
        console.log(taskObj);
        this.setState({tasks : this.state.tasks.map(task => {
            if (taskObj._id === task._id) {
                task.completed = !task.completed;
            }
            return task;
        })});
    }

    deleteTask = (taskObj) => {
        console.log("IN APP.JS");
        console.log(taskObj);
        this.setState({tasks : [...this.state.tasks.filter(task => task._id !== taskObj._id)]});
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
            <Router>
                <div className="App">
                    <Header />
                    <Route exact path="/" render={props => (
                        <React.Fragment>
                            <Home />
                            <AddTask addTask = {this.addTask}/>
                            <h3>STARTING AT SQUARE 1</h3>
                            <Tasks tasks={this.state.tasks} markComplete = {this.markComplete} deleteTask = {this.deleteTask}/>
                        </React.Fragment>
                    )} />
                    <Route path="/about" component = {About} />
                </div>
            </Router>
        );
    }
}

export default App;
