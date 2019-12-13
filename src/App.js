import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Components
import Header from './components/layout/Header';
import LandingPage from './components/pages/LandingPage';
import About from './components/pages/About';
import Home from './components/Home/Home';
import ProjectHandler from './components/Home/Projects/ProjectHandler';
import LogIn from './components/Users/LogIn';
import SignUp from './components/Users/SignUp';
import MailBox from './components/Users/MailBox/MailBox';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// Style
import './App.css';

library.add(faEnvelope);

class App extends React.Component {
    state = {}

    componentDidMount() {}

    render() {
        return(
            <Router>
                <div className="App">
                    <Header />
                    <div style={contentContainer}>
                        <Route exact path="/" render={props => (
                            <React.Fragment>
                                <LandingPage />
                            </React.Fragment>
                        )} />
                        <Route path="/signup" exact component={SignUp} />
                        <Route path="/login" exact component={LogIn} />
                        <ProtectedRoute path="/projects" exact component={Home} />
                        <ProtectedRoute path="/projects/:projectID/:folders*" exact component = {ProjectHandler} />
                        <ProtectedRoute path="/mail" exact component={MailBox} />
                        <Route path="/about" component = {About} />
                    </div>

                </div>
            </Router>
        );
    }
}

const contentContainer = {
    maxWidth : "1500px",
    margin : "0 auto",
    backgroundColor: "#f1f2f4",
}

export default App;
