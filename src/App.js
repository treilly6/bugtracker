import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './components/pages/LandingPage';
import Home from './components/Home/Home';
import ProjectHandler from './components/Home/Projects/ProjectHandler';
import LogIn from './components/Users/LogIn';
import SignUp from './components/Users/SignUp';
import MailBox from './components/Users/MailBox/MailBox';
import MailItem from './components/Users/MailBox/MailItem';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faUser, faTrashAlt, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

// Style
import './App.css';

library.add(faEnvelope);
library.add(faTrashAlt);
library.add(faEnvelopeOpenText);
library.add(faUser);

class App extends React.Component {
    state = {}

    componentDidMount() {}

    render() {
        return(
            <Router>
                <div className="App">
                    <Header />
                    <div className="mainContentContainer">
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
                        <ProtectedRoute path="/mail/:mailId" exact component={MailItem} />
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}


export default App;
