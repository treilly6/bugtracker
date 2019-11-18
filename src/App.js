import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Components
import Tasks from './components/Tasks/Tasks';
import AddTask from './components/Tasks/AddTask';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Home from './components/Home/Home';
import ProjectItem from './components/Home/Projects/ProjectItem';
import TicketItem from './components/Home/Projects/Tickets/TicketItem';
import LogIn from './components/Users/LogIn';
import SignUp from './components/Users/SignUp';

// Style
import './App.css';

class App extends React.Component {
    state = {
        tasks : [],
        folders : [],
    }

    componentDidMount() {
        axios.get('/api/tickets')
            .then(tasks => this.setState({tasks : tasks.data}));
        console.log("mounted api");
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
                            <h3>Home Page</h3>
                            <AddTask addTask = {this.addTask}/>
                            <Tasks tasks={this.state.tasks} markComplete = {this.markComplete} deleteTask = {this.deleteTask}/>
                        </React.Fragment>
                    )} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route path="/login" exact component={LogIn} />
                    <ProtectedRoute path="/projects" exact component={Home} />
                    <ProtectedRoute path="/projects/:projectName" exact component = {ProjectItem} />
                    <ProtectedRoute path="/projects/:projectName/ticket/:ticketTitle" component = {TicketItem}/>
                    <Route path="/about" component = {About} />
                </div>
            </Router>
        );
    }
}

export default App;
